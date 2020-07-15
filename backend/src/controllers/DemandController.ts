import { Response, Request } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import Demand from '../models/Demand';
import FoodRepository from '../repositories/FoodRepository';

class DemandController {
  public async index(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const repo = getRepository(Demand);
      const data = await repo.find();

      const demandList = new Array();

      Promise.all(
        data.map(async demand => {
          demandList.push({
            id: demand.id,
            total: demand.total,
            createdAt: demand.createdAt,
            updatedAt: demand.updatedAt,
            foods: await Promise.all(
              demand.foods.map(async (idFood: string) => {
                let repo = getCustomRepository(FoodRepository);
                let [Food] = await repo.findByFoodId(idFood);

                return Food;
              })
            )
              .then(res => res)
              .catch(err => console.log('Promisse.all Foods Erro ->', err))
          });
        })
      )
        .then(() => res.status(200).json(demandList))
        .catch(err => console.log('Promisse.all Mount Object Erro ->', err));
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Get Demand Failed' });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { total, foods } = req.body;

      const repo = getRepository(Demand);

      const demand = new Demand();
      demand.total = total;
      demand.foods = foods;

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
