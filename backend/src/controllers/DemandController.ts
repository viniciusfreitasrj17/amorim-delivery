/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { verifyAdmin } from '../utils/verifyAdmin';

class DemandController {
  public async index(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const repo = getRepository(Demand);
      const data = await repo.find();

      const demandList = new Array();

      Promise.all(
        data.map(async demand => {
          demandList.push({
            id: demand.id,
            total: demand.total,
            client: demand.client,
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
      return res.status(400).json({ Mensagge: 'Index Demand Failed' });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

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

        newClient.updatedAt = objClient[0].updatedAt;

        const data = await repo.save(demand);

        if (objClient[0].demands.length > 0) {
          const array = [];
          array.push(data.id);
          for (let d of objClient[0].demands) {
            array.push(d);
          }
          newClient.demands = array;
        } else {
          if (
            objClient[0].demands[0] === null ||
            objClient[0].demands.length === 0
          ) {
            const array = [];
            array.push(data.id);
            newClient.demands = array;
          }
        }

        await repoClient.update(client, newClient);

        return res.status(200).json(data);
      }

      return res.status(400).json(erros.map(content => content.constraints));
    } catch (err) {
      console.log(err);
      return res.status(400).json({ Mensagge: 'Store Demand Failed' });
    }
  }

  public async show(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const { id } = req.params;
      const repo = getRepository(Demand);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Demand' });
      }

      const demand = {
        id: data.id,
        total: data.total,
        client: data.client,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        foods: await Promise.all(
          data.foods.map(async (idFood: string) => {
            let repo = getCustomRepository(FoodRepository);
            let [Food] = await repo.findByFoodId(idFood);

            return Food;
          })
        )
          .then(res => res)
          .catch(err => console.log('Promisse.all Foods Erro ->', err))
      };

      return res.status(200).json(demand);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Show Demand Failed' });
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
      const repo = getRepository(Demand);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Demand' });
      }

      const repoClient = getRepository(Client);
      const objClient = await repoClient.find({
        where: { id: data.client.id }
      });

      const newClient = new Client();
      newClient.demands = objClient[0].demands.filter(
        demandId => demandId !== data.id
      );

      await repoClient.update(objClient[0].id, newClient);
      await repo.remove(data);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Destroy Demand Failed' });
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
      const { total, foods } = req.body;
      const repo = getRepository(Demand);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Demand' });
      }

      const newDemand = repo.create({
        total: total || data.total,
        foods: foods || data.foods
      });

      await repo.update(id, newDemand);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Update Demand Failed' });
    }
  }

  public async storeToClient(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const client = req.userId;

      const { total, foods } = req.body;
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

        newClient.updatedAt = objClient[0].updatedAt;

        const data = await repo.save(demand);

        if (objClient[0].demands.length > 0) {
          const array = [];
          array.push(data.id);
          for (let d of objClient[0].demands) {
            array.push(d);
          }
          newClient.demands = array;
        } else {
          if (
            objClient[0].demands[0] === null ||
            objClient[0].demands.length === 0
          ) {
            const array = [];
            array.push(data.id);
            newClient.demands = array;
          }
        }

        await repoClient.update(client, newClient);

        return res.status(200).json(data);
      }

      return res.status(400).json(erros.map(content => content.constraints));
    } catch (err) {
      console.log(err);
      return res.status(400).json({ Mensagge: 'Store Demand Failed' });
    }
  }

  public async indexToClient(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      // @ts-ignore
      const client = req.userId;

      const repo = getRepository(Demand);
      const data = await repo.find();

      const demandOwner = data.filter(demand => demand.client.id === client);

      if (demandOwner.length === 0) {
        return res
          .status(400)
          .json({ Message: 'Not Found Demand for this Client' });
      }

      const demandList = new Array();

      Promise.all(
        demandOwner.map(async demand => {
          demandList.push({
            id: demand.id,
            total: demand.total,
            client: demand.client,
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
      return res.status(400).json({ Mensagge: 'Index Demand Failed' });
    }
  }
}

export default new DemandController();
