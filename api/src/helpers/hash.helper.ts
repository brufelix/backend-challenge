import bcrypt from 'bcryptjs';

export class Hash {
  static async comparePasswords(
    passowrd: string,
    hashPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(passowrd, hashPassword);
  }

  static hashPassword(text: string) {
    return bcrypt.hashSync(text, bcrypt.genSaltSync(10));
  }
}
