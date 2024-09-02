import { Router } from 'express';
import { AuthRoutes } from './auth.route';
import { UsersRoutes } from './users.route';
import { AddressesRoutes } from './addresses.route';

const router = Router();

const authRoutes = new AuthRoutes().getAllRoutes();
const usersRoutes = new UsersRoutes().getAllRoutes();
const addressesRoutes = new AddressesRoutes().getAllRoutes();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/addresses', addressesRoutes);

export default router;
