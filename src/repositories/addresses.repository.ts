import { Address } from '@/entities/address.entity';
import { IRepositoryBase } from '@/interfaces/Repository-Base.interface';

export class AddressesRepository extends IRepositoryBase<Address> {
  constructor() {
    super(Address);
  }
}
