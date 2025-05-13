import { Field, ObjectType } from '@nestjs/graphql';
import { LanguageCodeGraphqlEnum } from './ChangeUserPreferredLanguageInput';

@ObjectType()
export class ChangeUserPreferredLanguageResponse {
  @Field(() => LanguageCodeGraphqlEnum)
  languageCode: LanguageCodeGraphqlEnum;
}
