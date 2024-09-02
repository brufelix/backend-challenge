import { Request, Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from '@/services/users.service';
import { createUserValidation } from './validations/create-user.validation';

export class UsersController {
  constructor(public usersService = new UsersService()) {}

  async insert({ body }: Request, res: Response): Promise<void> {
    try {
      const parsed = createUserValidation.parse(body);
      const data: CreateUserDto = parsed;

      const result = await this.usersService.insert(data);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }

  async me({ user }: Request, res: Response): Promise<void> {
    try {
      const { id } = user;
      const result = await this.usersService.me(id);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateUserDto = req.body;

      const result = await this.usersService.update(id, data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async destroy(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.usersService.destroy(id);

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
