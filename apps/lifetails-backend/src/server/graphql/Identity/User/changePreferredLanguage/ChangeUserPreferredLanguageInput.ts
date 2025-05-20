import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export enum LanguageCodeGraphqlEnum {
  EN = 'EN',
  ES = 'ES',
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
