import { registerEnumType } from '@nestjs/graphql';
import { LanguageEnum } from 'src/contexts/Shared/domain/Language';

registerEnumType(LanguageEnum, {
  name: 'LanguageCode',
});
