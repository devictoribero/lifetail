import { registerEnumType } from '@nestjs/graphql';
import { LanguageCodeEnum } from 'src/contexts/Shared/domain/LanguageCode';

registerEnumType(LanguageCodeEnum, {
  name: 'LanguageCode',
});
