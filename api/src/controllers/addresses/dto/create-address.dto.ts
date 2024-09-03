import { z } from 'zod';
import { createAddressValidation } from '../validations/create-address.validation';

export type CreateAddressDto = z.infer<typeof createAddressValidation>;
