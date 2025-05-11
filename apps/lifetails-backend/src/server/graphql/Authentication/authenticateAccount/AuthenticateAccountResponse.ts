import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ObjectType()
export class AuthenticateAccountResponse {
  @Field(() => String)
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @Field(() => String)
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @Field(() => String)
  token: string;
}
