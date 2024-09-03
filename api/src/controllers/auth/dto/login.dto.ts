import { z } from 'zod';
import { loginValidation } from '../validations/login.validation';

export type LoginDto = z.infer<typeof loginValidation>;
