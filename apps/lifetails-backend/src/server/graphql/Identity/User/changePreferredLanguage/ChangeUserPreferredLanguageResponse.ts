import { Field, ObjectType } from '@nestjs/graphql';
import { LanguageCodeGraphqlEnum } from './ChangeUserPreferredLanguageInput';

@ObjectType()
export class ChangeUserPreferredLanguageResponse {
  @Field(() => Boolean)
  success: boolean;
}
