import { Router } from 'express';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AddressesController } from '@/controllers/addresses/addresses.controller';

export class AddressesRoutes {
  private router: Router;
  private authMiddleware: AuthMiddleware;
  private addressesController: AddressesController;

  constructor() {
    this.router = Router();
    this.authMiddleware = new AuthMiddleware();
    this.addressesController = new AddressesController();
  }

  getAllRoutes() {
    const authMiddleware = this.authMiddleware.auth.bind(this.authMiddleware);

    // Insert.
    const insert = this.addressesController.insert.bind(
      this.addressesController
    );

    this.router.post('/', authMiddleware, insert);

    // List.
    const list = this.addressesController.list.bind(this.addressesController);

    this.router.get('/', authMiddleware, list);

    // Find By id.
    const findById = this.addressesController.findById.bind(
      this.addressesController
    );

    this.router.get('/:id', authMiddleware, findById);

    // Update.
    const update = this.addressesController.update.bind(
      this.addressesController
    );

    this.router.put('/:id', authMiddleware, update);

    // Delete.
    const destroy = this.addressesController.destroy.bind(
      this.addressesController
    );

    this.router.delete('/:id', authMiddleware, destroy);

    return this.router;
  }
}
