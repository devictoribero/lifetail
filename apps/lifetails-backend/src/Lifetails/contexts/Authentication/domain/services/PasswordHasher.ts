import * as bcrypt from 'bcrypt';
import { PasswordHashValueObject } from '../../../Shared/domain/PasswordHashValueObject';

export class PasswordHasher {
  async hash(password: string): Promise<PasswordHashValueObject> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new PasswordHashValueObject(hashedPassword);
  }

  async compare(plainPassword: string, hashedPassword: PasswordHashValueObject): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword.toString());
  }
}
