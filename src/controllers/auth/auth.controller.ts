import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { loginValidation } from './validations/login.validation';

export class AuthController {
  constructor(public authService = new AuthService()) {}

  async login({ body }: Request, res: Response): Promise<void> {
    try {
      const parsed = loginValidation.parse(body);
      const data: LoginDto = parsed;

      const result = await this.authService.login(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
