import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Veterinary {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  address: string | null;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => String, { nullable: true })
  primaryPhone: string | null;

  @Field(() => String, { nullable: true })
  emergencyPhone: string | null;

  @Field(() => String, { nullable: true })
  notes: string | null;

  @Field(() => String)
  createdAt: string;

  @Field(() => String, { nullable: true })
  updatedAt: string | null;

  @Field(() => String, { nullable: true })
  deletedAt: string | null;
}
