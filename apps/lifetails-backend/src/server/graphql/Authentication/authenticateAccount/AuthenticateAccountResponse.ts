import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ObjectType()
export class AuthenticateAccountResponse {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  accountId: string;
}
