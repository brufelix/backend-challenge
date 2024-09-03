import { Hash } from '@/helpers/hash.helper';
import { User } from '@/entities/user.entity';
import { Database } from '@/config/database.config';
import { Address } from '@/entities/address.entity';
import { JwtToken } from '@/helpers/jwt-token.helper';
import { ConflictError } from '@/helpers/errors/conflict-error';
import { NotFoundError } from '@/helpers/errors/not-found-error';
import { UsersRepository } from '@/repositories/users.repository';
import { CreateUserDto } from '@/controllers/users/dto/create-user.dto';
import { UpdateUserDto } from '@/controllers/users/dto/update-user.dto';
import { UserLoggedResponse } from '@/@types/user-logged-response.type';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async insert(data: CreateUserDto): Promise<UserLoggedResponse> {
    const email = data.email.toLowerCase();

    await this.checkEmailAvailability(email);

    const hashedPassword = Hash.hashPassword(data.password);

    const user = await this.usersRepository.insert({
      ...data,
      email,
      password: hashedPassword,
    });

    const { id, name, password } = user;
    const payload = { id, name, email, password };

    const access_token = JwtToken.generateToken(payload);

    return { access_token, data: user };
  }

  async me(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });

    if (!user) throw new NotFoundError('Usuário não encontrado.');

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.me(id);

    const hasNewEmail = !!data?.email && user.email !== data.email;
    if (hasNewEmail) await this.checkEmailAvailability(data.email!);

    const hasNewPassword = !!data?.password;

    const oldOrNewPassword = hasNewPassword
      ? Hash.hashPassword(data.password as string)
      : user.password;

    return this.usersRepository.update(id, {
      ...data,
      password: oldOrNewPassword,
    });
  }

  async destroy(id: string): Promise<void> {
    const user = await this.me(id);

    const addressesId = user.addresses.map(({ id }) => id);

    const DatabaseInstance = await Database.getInstance();

    DatabaseInstance.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete(Address, addressesId);
      await transactionalEntityManager.delete(User, id);
    });
  }

  private async checkEmailAvailability(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new ConflictError(
        'Este e-mail já está cadastrado. Por favor, use um e-mail diferente.'
      );
    }
  }
}
