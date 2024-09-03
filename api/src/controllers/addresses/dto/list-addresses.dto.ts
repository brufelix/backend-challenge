import { CreateAddressDto } from './create-address.dto';

export type ListAddressesDto = Partial<
  Omit<CreateAddressDto, 'city' | 'complement' | 'neighborhood' | 'zipCode'>
>;
