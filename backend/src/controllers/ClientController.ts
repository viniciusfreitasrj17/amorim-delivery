/* eslint-disable no-console */
import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import Client from '../models/Client';

class ClientController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const repo = getRepository(Client);
      const data = await repo.find();

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Index Client Failed' });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, street, address, number } = req.body;
      const repo = getRepository(Client);

      const client = repo.create({
        name,
        email,
        password,
        street,
        address,
        number
      });
      const erros = await validate(client);

      if (erros.length === 0) {
        const data = await repo.save(client);
        return res.status(200).json(data);
      }

      return res.status(400).json(erros.map(content => content.constraints));
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Store Client Failed' });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const repo = getRepository(Client);
      const data = await repo.findOne({ where: { id } });

      if (data) {
        return res.status(200).json(data);
      }

      return res.status(400).json({ Mensagge: 'Not Found Client' });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Show Client Failed' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const repo = getRepository(Client);
      const data = await repo.findOne({ where: { id } });

      if (data) {
        await repo.remove(data);
        return res.status(200).json();
      }

      return res.status(400).json({ Mensagge: 'Not Found Client' });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Destroy Client Failed' });
    }
  }
}

export default new ClientController();
