/* eslint-disable no-console */
import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import Food from '../models/Food';

class FoodController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
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
      const { id } = req.params;
      const repo = getRepository(Food);
      const data = await repo.findOne({ where: { id } });

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Show Food Failed' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const repo = getRepository(Food);
      const data = await repo.findOne({ where: { id } });

      if (data) {
        await repo.remove(data);
        return res.status(200).json();
      }

      return res.status(400).json({ Mensagge: 'Not Found Food' });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Destroy Food Failed' });
    }
  }
}

export default new FoodController();
