import { ILike } from 'typeorm';
import { Address } from '../entities/address.entity';
import { AddressesService } from '../services/addresses.service';
import { NotFoundError } from '../helpers/errors/not-found-error';
import { AddressesRepository } from '../repositories/addresses.repository';
import { CreateAddressDto } from '../controllers/addresses/dto/create-address.dto';
import { UpdateAddressDto } from '../controllers/addresses/dto/update-address.dto';
import { ListAddressesDto } from '../controllers/addresses/dto/list-addresses.dto';

jest.mock('../repositories/addresses.repository');

describe('AddressesService', () => {
  let addressesRepository: any;
  let addressesService: AddressesService;

  beforeEach(() => {
    addressesRepository =
      new AddressesRepository() as jest.Mocked<AddressesRepository>;
    addressesService = new AddressesService(addressesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('insert', () => {
    it('should enter a new address', async () => {
      const mockAddress = new Address();
      const createAddressDto: CreateAddressDto = {
        userId: '1',
        country: 'BR',
        state: 'Ceará',
        city: 'Fortaleza',
        zipCode: '68552-263',
        neighborhood: 'São lopes',
      };

      addressesRepository.insert.mockResolvedValue(mockAddress);

      const result = await addressesService.insert(createAddressDto);

      expect(result).toBe(mockAddress);
      expect(addressesRepository.insert).toHaveBeenCalledWith(createAddressDto);
    });
  });

  describe('findById', () => {
    it('should return an address when found', async () => {
      const mockAddress = new Address();
      addressesRepository.findOne.mockResolvedValue(mockAddress);

      const result = await addressesService.findById('1');

      expect(result).toBe(mockAddress);
      expect(addressesRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['user'],
      });
    });

    it('should throw NotFoundError if address is not found', async () => {
      addressesRepository.findOne.mockResolvedValue(null);

      await expect(addressesService.findById('1')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe('list', () => {
    it('should list addresses with the correct filters', async () => {
      const mockAddresses = [new Address(), new Address()];
      const query: ListAddressesDto = {
        userId: '1',
        state: 'SP',
        country: 'Brazil',
      };

      addressesRepository.list.mockResolvedValue(mockAddresses);

      const result = await addressesService.list(query);

      expect(result).toBe(mockAddresses);
      expect(addressesRepository.list).toHaveBeenCalledWith({
        relations: ['user'],
        order: { createdAt: 'DESC' },
        where: {
          userId: query.userId,
          state: ILike(query.state),
          country: ILike(query.country),
        },
      });
    });
  });

  describe('update', () => {
    it('should update an address with the data provided', async () => {
      const mockAddress = new Address();
      const updateAddressDto: UpdateAddressDto = {
        neighborhood: 'São nunes',
      };

      addressesRepository.update.mockResolvedValue(mockAddress);

      const result = await addressesService.update('1', updateAddressDto);

      expect(result).toBe(mockAddress);
      expect(addressesRepository.update).toHaveBeenCalledWith(
        '1',
        updateAddressDto
      );
    });
  });

  describe('destroy', () => {
    it('should delete an address by id', async () => {
      addressesRepository.destroy.mockResolvedValue();

      await addressesService.destroy('1');

      expect(addressesRepository.destroy).toHaveBeenCalledWith('1');
    });
  });
});
