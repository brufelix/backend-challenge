import { Hash } from '../helpers/hash.helper';
import { User } from '../entities/user.entity';
import { Database } from '../config/database.config';
import { Address } from '../entities/address.entity';
import { JwtToken } from '../helpers/jwt-token.helper';
import { UsersService } from '../services/users.service';
import { ConflictError } from '../helpers/errors/conflict-error';
import { NotFoundError } from '../helpers/errors/not-found-error';
import { UsersRepository } from '../repositories/users.repository';
import { UpdateUserDto } from '../controllers/users/dto/update-user.dto';
import { CreateUserDto } from '../controllers/users/dto/create-user.dto';

jest.mock('../helpers/hash.helper');
jest.mock('../config/database.config');
jest.mock('../helpers/jwt-token.helper');
jest.mock('../repositories/users.repository');

describe('UsersService', () => {
  let usersRepository: any;
  let usersService: UsersService;

  let hashHelper: jest.Mocked<typeof Hash>;
  let jwtTokenHelper: jest.Mocked<typeof JwtToken>;
  let database: jest.Mocked<typeof Database>;

  beforeEach(() => {
    usersRepository = new UsersRepository() as jest.Mocked<UsersRepository>;
    hashHelper = Hash as jest.Mocked<typeof Hash>;
    jwtTokenHelper = JwtToken as jest.Mocked<typeof JwtToken>;
    database = Database as jest.Mocked<typeof Database>;

    usersService = new UsersService(usersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('insert', () => {
    it('should insert a new user, generate an access token and return the user data', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        password: 'password',
        email: 'test@example.com',
      };

      const hashedPassword = 'hashed_password';

      const user = {
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        password: hashedPassword,
      };

      const accessToken = 'mocked_access_token';

      usersRepository.findOne.mockResolvedValue(null);
      hashHelper.hashPassword.mockReturnValue(hashedPassword);

      usersRepository.insert.mockResolvedValue(user);
      jwtTokenHelper.generateToken.mockReturnValue(accessToken);

      const result = await usersService.insert(createUserDto);

      expect(result).toEqual({ access_token: accessToken, data: user });

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: createUserDto.email.toLowerCase() },
      });

      expect(hashHelper.hashPassword).toHaveBeenCalledWith(
        createUserDto.password
      );

      expect(usersRepository.insert).toHaveBeenCalledWith({
        ...createUserDto,
        email: createUserDto.email.toLowerCase(),
        password: hashedPassword,
      });

      expect(jwtTokenHelper.generateToken).toHaveBeenCalledWith({
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
      });
    });

    it('should throw an error if the email is already in use', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'password',
      };

      const existingUser = {
        id: '1',
        name: 'Existing User',
        email: 'test@example.com',
        password: 'hashed_password',
      };

      usersRepository.findOne.mockResolvedValue(existingUser);

      await expect(usersService.insert(createUserDto)).rejects.toThrow(
        ConflictError
      );
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: createUserDto.email.toLowerCase() },
      });
    });
  });

  describe('me', () => {
    it('should return user data when id is valid', async () => {
      const user = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        addresses: [],
      };

      usersRepository.findOne.mockResolvedValue(user);

      const result = await usersService.me('1');

      expect(result).toEqual(user);
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['addresses'],
      });
    });

    it('should throw an error if the user is not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      await expect(usersService.me('1')).rejects.toThrow(NotFoundError);

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['addresses'],
      });
    });
  });

  describe('update', () => {
    it('should update the user and return the updated data', async () => {
      const user = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        addresses: [],
      };

      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      const updatedUser = {
        ...user,
        ...updateUserDto,
      };

      usersRepository.findOne.mockResolvedValue(user);
      usersRepository.update.mockResolvedValue(updatedUser);

      const result = await usersService.update('1', updateUserDto);
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if the email is already in use when trying to update', async () => {
      const user = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        addresses: [],
      };

      const updateUserDto: UpdateUserDto = {
        email: 'existing@example.com',
      };

      const existingUser = {
        id: '2',
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'hashed_password',
      };

      usersRepository.findOne.mockResolvedValueOnce(user);
      usersRepository.findOne.mockResolvedValueOnce(existingUser);

      await expect(usersService.update('1', updateUserDto)).rejects.toThrow(
        ConflictError
      );

      expect(usersRepository.findOne).toHaveBeenCalledTimes(2);
    });
  });

  describe('destroy', () => {
    it('should delete the user and its related addresses', async () => {
      const user = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        addresses: [{ id: '10' } as Address],
      };

      const transactionalEntityManager = {
        delete: jest.fn(),
      };

      usersRepository.findOne.mockResolvedValue(user);

      database.getInstance.mockResolvedValue({
        transaction: (callback: any) => callback(transactionalEntityManager),
      } as any);

      await usersService.destroy('1');

      expect(transactionalEntityManager.delete).toHaveBeenCalledWith(Address, [
        '10',
      ]);

      expect(transactionalEntityManager.delete).toHaveBeenCalledWith(User, '1');
    });

    it('should throw an error if the user is not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      await expect(usersService.destroy('1')).rejects.toThrow(NotFoundError);

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['addresses'],
      });
    });
  });

  describe('checkEmailAvailability', () => {
    it('should throw an error if the email is already in use', async () => {
      const existingUser = {
        id: '1',
        name: 'John Doe',
        email: 'existing@example.com',
        password: 'hashed_password',
      };

      usersRepository.findOne.mockResolvedValue(existingUser);

      await expect(
        usersService['checkEmailAvailability']('existing@example.com')
      ).rejects.toThrow(ConflictError);

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'existing@example.com' },
      });
    });

    it('should not throw an error if the email is not in use', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      await expect(
        usersService['checkEmailAvailability']('new@example.com')
      ).resolves.not.toThrow();

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'new@example.com' },
      });
    });
  });
});
