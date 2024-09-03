import { z } from 'zod';
import { createUserValidation } from '../validations/create-user.validation';

export type CreateUserDto = z.infer<typeof createUserValidation>;
