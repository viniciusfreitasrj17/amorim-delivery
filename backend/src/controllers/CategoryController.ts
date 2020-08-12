/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-console */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import Category from '../models/Category';
import { verifyAdmin } from '../utils/verifyAdmin';

class CategoryController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const repo = getRepository(Category);
      const data = await repo.find();

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Message: 'Index Category Failed' });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

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
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const { id } = req.params;
      const repo = getRepository(Category);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Category' });
      }
      await repo.remove(data);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Message: 'Destroy Category Failed' });
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
      const { name } = req.body;
      const repo = getRepository(Category);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Category' });
      }

      const newCategory = repo.create({
        name: name || data.name
      });

      await repo.update(id, newCategory);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Message: 'Update Category Failed' });
    }
  }

  public async indexToClient(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const client = req.userId;

      if (!client) {
        return res.status(400).json({ Mensagge: 'Error Login Client' });
      }

      const repo = getRepository(Category);
      const data = await repo.find();

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Message: 'IndexToClient Category Failed' });
    }
  }
}

export default new CategoryController();
