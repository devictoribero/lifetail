import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Image {
  @Field()
  key: string;

  @Field(() => Date)
  uploadedAt: Date;
}
