import { User } from 'src/entities/user.entity';

export type UserLoggedResponse = {
  data: User;
  access_token: string;
};
