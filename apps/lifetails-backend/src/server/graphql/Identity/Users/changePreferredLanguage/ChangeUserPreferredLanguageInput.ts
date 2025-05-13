import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export enum LanguageCodeGraphqlEnum {
  en = 'en',
  es = 'es',
}

registerEnumType(LanguageCodeGraphqlEnum, {
  name: 'LanguageCode',
});

@InputType()
export class ChangeUserPreferredLanguageInput {
  @Field(() => LanguageCodeGraphqlEnum)
  @IsNotEmpty()
  languageCode: LanguageCodeGraphqlEnum;
}
