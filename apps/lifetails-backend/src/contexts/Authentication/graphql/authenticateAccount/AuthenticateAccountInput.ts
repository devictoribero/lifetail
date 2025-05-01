import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthenticateAccountInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
