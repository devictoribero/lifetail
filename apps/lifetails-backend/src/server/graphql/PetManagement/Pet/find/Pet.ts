import { Field, ObjectType } from '@nestjs/graphql';
import { GenderGraphqlEnum } from 'src/server/graphql/Shared/Gender';

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

  @Field({ nullable: true })
  anniversaryDate: string | null;

  @Field()
  createdAt: string;

  @Field()
  ownerId: string;

  @Field({ nullable: true })
  microchipNumber: string | null;

  @Field()
  color: string;
}
