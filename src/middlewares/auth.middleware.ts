import { JwtToken } from '@/helpers/jwt-token.helper';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '@/helpers/errors/unauthorized-error';

export class AuthMiddleware {
  auth(request: Request, response: Response, next: NextFunction) {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedError('Access token not found.');
      }

      const [, token] = authHeader.split(' ');

      if (!token) {
        throw new UnauthorizedError('Access token not found.');
      }

      const user = JwtToken.decodeToken(token);
      request.user = user;

      return next();
    } catch (error) {
      console.error(error);
      return response.status(401).end();
    }
  }
}
