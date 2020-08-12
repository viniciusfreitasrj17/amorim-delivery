/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-console */
import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import Food from '../models/Food';
import { verifyAdmin } from '../utils/verifyAdmin';

class FoodController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const repo = getRepository(Food);
      const data = await repo.find();

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Index Food Failed' });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const { name, stock, price, category } = req.body;
      const repo = getRepository(Food);

      const food = repo.create({
        name,
        stock,
        price,
        category
      });
      const erros = await validate(food);

      if (erros.length === 0) {
        const data = await repo.save(food);
        return res.status(200).json(data);
      }

      return res.status(400).json(erros.map(content => content.constraints));
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Store Food Failed' });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const { id } = req.params;
      const repo = getRepository(Food);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Food' });
      }

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Show Food Failed' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const { id } = req.params;
      const repo = getRepository(Food);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Food' });
      }

      await repo.remove(data);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Destroy Food Failed' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const { id } = req.params;
      const { name, price, stock, category } = req.body;
      const repo = getRepository(Food);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Food' });
      }

      const newFood = repo.create({
        name: name || data.name,
        price: price || data.price,
        stock: stock !== undefined ? stock : data.stock,
        category: category || data.category
      });

      await repo.update(id, newFood);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Update Food Failed' });
    }
  }

  public async indexToClient(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const client = req.userId;

      if (!client) {
        return res.status(400).json({ Mensagge: 'Error Login Client' });
      }

      const repo = getRepository(Food);
      const data = await repo.find();

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'IndexToClient Food Failed' });
    }
  }
}

export default new FoodController();
