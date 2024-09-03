import { ILike } from 'typeorm';
import { Address } from '@/entities/address.entity';
import { NotFoundError } from '@/helpers/errors/not-found-error';
import { AddressesRepository } from '@/repositories/addresses.repository';
import { CreateAddressDto } from '@/controllers/addresses/dto/create-address.dto';
import { ListAddressesDto } from '@/controllers/addresses/dto/list-addresses.dto';
import { UpdateAddressDto } from '@/controllers/addresses/dto/update-address.dto';

export class AddressesService {
  constructor(private readonly addressesRepository: AddressesRepository) {}

  async insert(data: CreateAddressDto): Promise<Address> {
    return this.addressesRepository.insert(data);
  }

  async findById(id: string): Promise<Address> {
    const address = await this.addressesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!address) throw new NotFoundError('Endereço não encontrado.');

    return address;
  }

  async list(query: ListAddressesDto): Promise<Address[]> {
    return this.addressesRepository.list({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      where: {
        ...(query?.userId && { userId: query.userId }),
        ...(query?.state && { state: ILike(query.state) }),
        ...(query?.country && { country: ILike(query.country) }),
      },
    });
  }

  async update(id: string, data: UpdateAddressDto): Promise<Address> {
    return this.addressesRepository.update(id, data);
  }

  async destroy(id: string): Promise<void> {
    await this.addressesRepository.destroy(id);
  }
}
