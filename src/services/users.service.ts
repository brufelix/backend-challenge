import { Hash } from '@/helpers/hash.helper';
import { User } from '@/entities/user.entity';
import { Address } from '@/entities/address.entity';
import { JwtToken } from '@/helpers/jwt-token.helper';
import { dataSource } from '@/config/data-source.config';
import { ConflictError } from '@/helpers/errors/conflict-error';
import { UsersRepository } from '@/repositories/users.repository';
import { CreateUserDto } from '@/controllers/users/dto/create-user.dto';
import { UpdateUserDto } from '@/controllers/users/dto/update-user.dto';

export class UsersService {
  constructor(public usersRepository = new UsersRepository()) {}

  async insert(data: CreateUserDto) {
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

    return { access_token, user };
  }

  async me(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

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

  async destroy(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    const addressesId = user.addresses.map(({ id }) => id);

    await dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete(User, id);
      await transactionalEntityManager.delete(Address, addressesId);
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
