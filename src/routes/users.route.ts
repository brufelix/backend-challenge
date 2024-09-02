import { Router } from 'express';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { UsersController } from '@/controllers/users/users.controller';

export class UsersRoutes {
  private router: Router;
  private authMiddleware: AuthMiddleware;
  private usersController: UsersController;

  constructor() {
    this.router = Router();
    this.authMiddleware = new AuthMiddleware();
    this.usersController = new UsersController();
  }

  getAllRoutes() {
    const authMiddleware = this.authMiddleware.auth.bind(this.authMiddleware);

    // Insert.
    const insert = this.usersController.insert.bind(this.usersController);
    this.router.post('/', insert);

    // Me.
    const me = this.usersController.me.bind(this.usersController);
    this.router.get('/me', authMiddleware, me);

    // Update.
    const update = this.usersController.update.bind(this.usersController);
    this.router.put('/:id', authMiddleware, update);

    // Delete.
    const destroy = this.usersController.destroy.bind(this.usersController);
    this.router.put('/:id', authMiddleware, destroy);

    return this.router;
  }
}
