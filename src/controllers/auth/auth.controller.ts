import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { loginValidation } from './validations/login.validation';
import { ErrorHandler } from '@/interfaces/Error-Handler.interface';

export class AuthController extends ErrorHandler {
  constructor(public authService = new AuthService()) {
    super();
  }

  async login({ body }: Request, res: Response): Promise<void> {
    try {
      const parsed = loginValidation.parse(body);
      const data: LoginDto = parsed;

      const result = await this.authService.login(data);
      res.status(201).json(result);
    } catch (error: any) {
      this.sendErrorResponse(res, error);
    }
  }
}
