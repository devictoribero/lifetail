import * as bcrypt from 'bcrypt';
import { PasswordHashValueObject } from 'src/contexts/Lifetails/Shared/domain/PasswordHashValueObject';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';

export class PasswordHasher {
  async hash(password: StringValueObject): Promise<PasswordHashValueObject> {
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    return new PasswordHashValueObject(hashedPassword);
  }

  async compare(
    plainPassword: StringValueObject,
    hashedPassword: PasswordHashValueObject,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword.toString(), hashedPassword.toString());
  }
}
