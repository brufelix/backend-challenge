import { CreateAddressDto } from '@/controllers/addresses/dto/create-address.dto';
import { ListAddressesDto } from '@/controllers/addresses/dto/list-addresses.dto';
import { UpdateAddressDto } from '@/controllers/addresses/dto/update-address.dto';
import { AddressesRepository } from '@/repositories/addresses.repository';

export class AddressesService {
  constructor(public addressesRepository = new AddressesRepository()) {}

  async insert(data: CreateAddressDto) {
    return this.addressesRepository.insert(data);
  }

  async findById(id: string) {
    return this.addressesRepository.findOne({
      where: { id },
    });
  }

  async list(query: ListAddressesDto) {
    return this.addressesRepository.list({
      relations: ['users'],
      order: { createdAt: 'DESC' },
      where: {
        ...(query?.state && { state: query.state }),
        ...(query?.userId && { userIdI: query.userId }),
        ...(query?.country && { country: query.country }),
      },
    });
  }

  async update(id: string, data: UpdateAddressDto) {
    return this.addressesRepository.update(id, data);
  }

  async destroy(id: string) {
    return this.addressesRepository.destroy(id);
  }
}
