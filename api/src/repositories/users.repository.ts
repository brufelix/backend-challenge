import { User } from '@/entities/user.entity';
import { IRepositoryBase } from '@/interfaces/Repository-Base.interface';

export class UsersRepository extends IRepositoryBase<User> {
  constructor() {
    super(User);
  }
}
