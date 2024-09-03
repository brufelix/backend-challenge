import jwt from 'jsonwebtoken';
import { envs } from '@/constants/envs';

export interface DecodedUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

export class JwtToken {
  static generateToken(payload: DecodedUser): string {
    return jwt.sign(payload, envs.jwt.secret as string, {
      expiresIn: envs.jwt.expiresIn,
    });
  }

  static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, envs.jwt.secret as string) as DecodedUser;
  }
}
