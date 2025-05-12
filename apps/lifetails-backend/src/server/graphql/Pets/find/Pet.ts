import { Field, ObjectType } from '@nestjs/graphql';
import { GenderGraphqlEnum } from '../../shared/Gender';

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
  chipId: string | null;
}
