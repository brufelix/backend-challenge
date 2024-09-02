import { Request, Response } from 'express';
import { AddressesService } from '@/services/addresses.service';
import { CreateAddressDto } from '@/controllers/addresses/dto/create-address.dto';
import { ListAddressesDto } from '@/controllers/addresses/dto/list-addresses.dto';
import { UpdateAddressDto } from '@/controllers/addresses/dto/update-address.dto';
import { createAddressValidation } from './validations/create-address.validation';

export class AddressesController {
  constructor(public addressesService = new AddressesService()) {}

  async insert({ user, body }: Request, res: Response): Promise<void> {
    try {
      const { id: userId } = user;
      const parsed = createAddressValidation.parse({
        userId,
        ...body,
      });

      const data: CreateAddressDto = parsed;

      const result = await this.addressesService.insert(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async findById({ params }: Request, res: Response): Promise<void> {
    try {
      const { id } = params;
      const result = await this.addressesService.findById(id);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const { id: userId } = req.user;
      const query: ListAddressesDto = { userId, ...req.query };

      const result = await this.addressesService.list(query);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateAddressDto = req.body;

      const result = await this.addressesService.update(id, data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async destroy(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.addressesService.destroy(id);

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
