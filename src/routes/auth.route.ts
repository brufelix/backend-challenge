import { Router } from 'express';
import { AuthController } from '@/controllers/auth/auth.controller';

export  class AuthRoutes {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
  }

  getAllRoutes() {
    // Login.
    const login = this.authController.login.bind(this.authController);
    this.router.post('/login', login);

    return this.router;
  }
}
