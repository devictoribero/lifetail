import { registerEnumType } from '@nestjs/graphql';

enum LanguageCode {
  English = 'en',
  Spanish = 'es',
}

registerEnumType(LanguageCode, {
  name: 'LanguageCode',
});
