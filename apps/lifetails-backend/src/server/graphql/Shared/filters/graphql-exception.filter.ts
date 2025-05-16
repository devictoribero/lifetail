import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

const logger = new Logger('GraphQLExceptionFilter');

@Catch()
export class GraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    // 1. Handle domain exceptions
    if (exception?.code) {
      return new GraphQLError(exception.message, {
        extensions: {
          code: exception.code,
          name: exception.name ?? exception.constructor.name,
        },
      });
    }

    // 2. Handle validation errors (e.g. from ValidationPipe)
    if (exception instanceof HttpException) {
      const response: any = exception.getResponse();
      if (Array.isArray(response?.message)) {
        // Validation error
        return new GraphQLError('Validation failed', {
          extensions: {
            code: 'VALIDATION_ERROR',
            fieldErrors: response.message,
          },
        });
      }

      // Other HTTP exceptions
      return new GraphQLError(response?.message ?? 'Request error', {
        extensions: {
          code: response?.code ?? 'BAD_REQUEST',
          status: exception.getStatus(),
        },
      });
    }

    // 3. Fallback for internal/unexpected errors
    logger.error('Unhandled exception', exception);

    return new GraphQLError('Internal server error', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
}
