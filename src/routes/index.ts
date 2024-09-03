import { Router } from 'express';

// Auth Middleware.
import { AuthMiddleware } from '@/middlewares/auth.middleware';

// Auth.
import { AuthRoutes } from './auth.route';
import { AuthService } from '@/services/auth.service';
import { AuthController } from '@/controllers/auth/auth.controller';

// Users.
import { UsersRoutes } from './users.route';
import { UsersService } from '@/services/users.service';
import { UsersRepository } from '@/repositories/users.repository';
import { UsersController } from '@/controllers/users/users.controller';

// Addresses.
import { AddressesRoutes } from './addresses.route';
import { AddressesService } from '@/services/addresses.service';
import { AddressesRepository } from '@/repositories/addresses.repository';
import { AddressesController } from '@/controllers/addresses/addresses.controller';

const router = Router();

// Auth Middleware.
const authMiddleware = new AuthMiddleware();

// addresses.
const addressesRepository = new AddressesRepository();
const addressesService = new AddressesService(addressesRepository);
const addressesController = new AddressesController(addressesService);

const addressesRoutes = new AddressesRoutes(
  authMiddleware,
  addressesController
).getAllRoutes();

// Users.
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

const usersRoutes = new UsersRoutes(
  authMiddleware,
  usersController
).getAllRoutes();

// Auth.
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

const authRoutes = new AuthRoutes(authController).getAllRoutes();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/addresses', addressesRoutes);

export default router;
