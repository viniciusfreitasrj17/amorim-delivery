/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-array-constructor */
import { Response, Request } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import Demand from '../models/Demand';
import FoodRepository from '../repositories/FoodRepository';
import Client from '../models/Client';

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
      const { total, foods, client } = req.body;

      const repo = getRepository(Demand);

      const demand = new Demand();
      demand.total = total;
      demand.foods = foods;
      demand.client = client;

      const erros = await validate(demand);

      if (erros.length === 0) {
        const repoClient = getRepository(Client);
        const objClient = await repoClient.find({ where: { id: client } });
        const newClient = new Client();

        newClient.id = objClient[0].id;
        newClient.createdAt = objClient[0].createdAt;
        newClient.updatedAt = objClient[0].updatedAt;
        newClient.name = objClient[0].name;
        newClient.email = objClient[0].email;
        newClient.password = objClient[0].password;
        newClient.street = objClient[0].street;
        newClient.address = objClient[0].address;
        newClient.number = objClient[0].number;

        console.log(objClient[0].demands);

        if (objClient[0].demands.length > 0) {
          const array = [];
          array.push(demand.id);
          for (let d of objClient[0].demands) {
            array.push(d);
            console.log('d ->', d);
          }
          console.log('demand.id ->', demand.id);
          console.log('array ->', array);
          newClient.demands = array;
        } else {
          if (
            objClient[0].demands[0] === null ||
            objClient[0].demands.length === 0
          ) {
            const array = [];
            array.push(demand.id);
            console.log('demand.id ->', demand.id);
            console.log('array ->', array);
            newClient.demands = array;
          }
        }

        await repoClient.update(client, newClient);

        const data = await repo.save(demand);
        return res.status(200).json(data);
      }

      return res.status(400).json(erros.map(content => content.constraints));
    } catch (err) {
      console.log(err);
      return res.status(400).json({ Mensagge: 'Store Demand Failed' });
    }
  }
}

export default new DemandController();
