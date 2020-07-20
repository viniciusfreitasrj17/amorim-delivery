/* eslint-disable no-console */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import Category from '../models/Category';

class CategoryController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const repo = getRepository(Category);
      const data = await repo.find();

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Message: 'Get Category Failed' });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const repo = getRepository(Category);

      const category = repo.create({ name });
      const erros = await validate(category);

      if (erros.length === 0) {
        const data = await repo.save(category);
        return res.status(200).json(data);
      }

      return res.status(400).json(erros.map(content => content.constraints));
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Store Category Failed' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const repo = getRepository(Category);
      const data = await repo.findOne({ where: { id } });

      if (data) {
        await repo.remove(data);
        return res.status(200).json();
      }

      return res.status(400).json({ Mensagge: 'Not Found Category' });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Message: 'Destroy Category Failed' });
    }
  }
}

export default new CategoryController();
