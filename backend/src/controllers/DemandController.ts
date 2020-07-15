import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import Demand from '../models/Demand';

class DemandController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const repo = getRepository(Demand);
      const data = await repo.find();

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Get Demand Failed' });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { date, total } = req.body;
      const repo = getRepository(Demand);

      const demand = repo.create({
        date,
        total
      });
      const erros = await validate(demand);

      if (erros.length === 0) {
        const data = await repo.save(demand);
        return res.status(200).json(data);
      }

      return res.status(400).json(erros.map(content => content.constraints));
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Store Demand Failed' });
    }
  }
}

export default new DemandController();
