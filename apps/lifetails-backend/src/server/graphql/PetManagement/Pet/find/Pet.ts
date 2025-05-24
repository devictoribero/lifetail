import { Field, ObjectType } from '@nestjs/graphql';
import { GenderGraphqlEnum } from 'src/server/graphql/Shared/Gender';
import { Image } from 'src/server/graphql/Shared/Image';

@ObjectType()
export class Pet {
  @Field()
  id: string;

  @Field()
  species: string;

  @Field()
  name: string;

  @Field(() => GenderGraphqlEnum)
  gender: GenderGraphqlEnum;

  @Field()
  sterilized: boolean;

  @Field()
  color: string;

  @Field()
  birthDate: string;

  @Field()
  arrivalDate: string;

  @Field()
  createdAt: string;

  @Field()
  ownerId: string;

  @Field()
  age: number;

  @Field({ nullable: true })
  microchipNumber: string | null;

  @Field(() => Image, { nullable: true })
  image: Image | null;
}
