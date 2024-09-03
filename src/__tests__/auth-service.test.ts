import { Hash } from '../helpers/hash.helper';
import { AuthService } from '../services/auth.service';
import { JwtToken } from '../helpers/jwt-token.helper';
import { LoginDto } from '../controllers/auth/dto/login.dto';
import { UsersRepository } from '../repositories/users.repository';
import { BadRequestError } from '../helpers/errors/bad-request-error';

jest.mock('../helpers/hash.helper');
jest.mock('../helpers/jwt-token.helper');
jest.mock('../repositories/users.repository');

describe('AuthService', () => {
  let usersRepository: any;
  let authService: AuthService;

  let hashHelper: jest.Mocked<typeof Hash>;
  let jwtTokenHelper: jest.Mocked<typeof JwtToken>;

  beforeEach(() => {
    hashHelper = Hash as jest.Mocked<typeof Hash>;
    jwtTokenHelper = JwtToken as jest.Mocked<typeof JwtToken>;

    usersRepository = new UsersRepository() as jest.Mocked<UsersRepository>;
    authService = new AuthService(usersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return an access token and user data upon successful login', async () => {
      const user = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
      };

      const loginDto: LoginDto = {
        password: 'password',
        email: 'john@example.com',
      };

      const accessToken = 'mocked_access_token';

      usersRepository.findOne.mockResolvedValue(user);

      hashHelper.comparePasswords.mockResolvedValue(true);
      jwtTokenHelper.generateToken.mockReturnValue(accessToken);

      const result = await authService.login(loginDto);

      expect(result).toEqual({
        data: { ...user },
        access_token: accessToken,
      });

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });

      expect(hashHelper.comparePasswords).toHaveBeenCalledWith(
        loginDto.password,
        'hashed_password'
      );

      expect(jwtTokenHelper.generateToken).toHaveBeenCalledWith({
        id: user.id,
        name: user.name,
        email: user.email,
        password: loginDto.password,
      });
    });

    it('should throw an error when providing invalid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'john@example.com',
        password: 'wrong_password',
      };

      usersRepository.findOne.mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow(
        BadRequestError
      );

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
    });
  });

  describe('validateUser', () => {
    it('should return the user if the credentials are valid', async () => {
      const user = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
      };

      usersRepository.findOne.mockResolvedValue(user);
      hashHelper.comparePasswords.mockResolvedValue(true);

      const result = await authService['validateUser'](
        'john@example.com',
        'password'
      );

      expect(result).toEqual({ ...user, password: undefined });

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });

      expect(hashHelper.comparePasswords).toHaveBeenCalledWith(
        'password',
        'hashed_password'
      );
    });

    it('should throw an error if the user is not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);

      await expect(
        authService['validateUser']('john@example.com', 'password')
      ).rejects.toThrow(BadRequestError);

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
    });

    it('should throw an error if the password is not valid', async () => {
      const user = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
      };

      usersRepository.findOne.mockResolvedValue(user);

      hashHelper.comparePasswords.mockResolvedValue(false);

      await expect(
        authService['validateUser']('john@example.com', 'wrong_password')
      ).rejects.toThrow(BadRequestError);

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });

      expect(hashHelper.comparePasswords).toHaveBeenCalledWith(
        'wrong_password',
        'hashed_password'
      );
    });
  });
});
