import { JwtToken } from '@/helpers/jwt-token.helper';
import { NextFunction, Request, Response } from 'express';
import { UsersRepository } from '@/repositories/users.repository';
import { ErrorHandler } from '@/interfaces/Error-Handler.interface';
import { UnauthorizedError } from '@/helpers/errors/unauthorized-error';

export class AuthMiddleware extends ErrorHandler {
  constructor(public usersRepository = new UsersRepository()) {
    super();
  }

  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedError('Access token not found.');
      }

      const [, token] = authHeader.split(' ');

      if (!token) {
        throw new UnauthorizedError('Access token not found.');
      }

      const user = JwtToken.decodeToken(token);

      const existingUser = await this.usersRepository.findOne({
        where: { id: user.id },
      });

      if (!existingUser) {
        throw new UnauthorizedError('O usuário não existe mais.');
      }

      req.user = user;

      return next();
    } catch (error: any) {
      this.sendErrorResponse(res, error);
    }
  }
}
