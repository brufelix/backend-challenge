import { Hash } from '@/helpers/hash.helper';
import { User } from '@/entities/user.entity';
import { JwtToken } from '@/helpers/jwt-token.helper';
import { LoginDto } from '@/controllers/auth/dto/login.dto';
import { UsersRepository } from '@/repositories/users.repository';
import { BadRequestError } from '@/helpers/errors/bad-request-error';
import { UserLoggedResponse } from '@/@types/user-logged-response.type';

export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async login({ email, password }: LoginDto): Promise<UserLoggedResponse> {
    const validUser = await this.validateUser(email, password);

    const { id, name } = validUser;
    const payload = { id, name, email, password };

    const access_token = JwtToken.generateToken(payload);
    return { data: validUser, access_token };
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestError('Usuário ou Senha inválida.');
    }

    const isMatch: boolean = await Hash.comparePasswords(
      password,
      user.password
    );

    if (!isMatch) {
      throw new BadRequestError('Usuário ou Senha inválida.');
    }

    delete user.password;

    return user;
  }
}
