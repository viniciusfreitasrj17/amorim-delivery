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
import Promo from '../models/Promo';
import FoodRepository from '../repositories/FoodRepository';
// import Client from '../models/Client';
import { verifyAdmin } from '../utils/verifyAdmin';
// import Demand from '../models/Demand';

class PromoController {
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

      const repo = getRepository(Promo);
      const data = await repo.find();

      const promoList = new Array();

      Promise.all(
        data.map(async promo => {
          promoList.push({
            id: promo.id,
            name: promo.name,
            image: promo.image,
            total: promo.total,
            createdAt: promo.createdAt,
            updatedAt: promo.updatedAt,
            foods: await Promise.all(
              promo.foods.map(async (idFood: string) => {
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
        .then(() => res.status(200).json(promoList))
        .catch(err => console.log('Promisse.all Mount Object Erro ->', err));
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Index Promo Failed' });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const { name, foods, image, total } = req.body;

      const repo = getRepository(Promo);

      const promo = repo.create({
        name,
        foods,
        image,
        total
      });

      const erros = await validate(promo);

      if (erros.length !== 0) {
        return res.status(400).json(erros.map(content => content.constraints));
      }

      const data = await repo.save(promo);

      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ Mensagge: 'Store Promo Failed' });
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
      const repo = getRepository(Promo);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Promo' });
      }

      const promo = {
        id: data.id,
        name: data.name,
        image: data.image,
        total: data.total,
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

      return res.status(200).json(promo);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Show Promo Failed' });
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
      const repo = getRepository(Promo);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Promo' });
      }

      await repo.remove(data);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Destroy Promo Failed' });
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
      const { name, foods, image, total } = req.body;
      const repo = getRepository(Promo);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Promo' });
      }

      const newPromo = repo.create({
        name: name || data.name,
        image: image || data.image,
        foods: foods || data.foods,
        total: total || data.total
      });

      await repo.update(id, newPromo);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Update Promo Failed' });
    }
  }

  public async indexToClient(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      // @ts-ignore
      const client = req.userId;

      if (!client) {
        return res.status(400).json({ Mensagge: 'Error Login Client' });
      }

      const repo = getRepository(Promo);
      const data = await repo.find();

      if (data.length === 0) {
        return res
          .status(200)
          .json({ Message: 'Not Found Promo for this Client' });
      }

      const promoList = new Array();

      Promise.all(
        data.map(async promo => {
          promoList.push({
            id: promo.id,
            name: promo.name,
            total: promo.total,
            image: promo.image,
            createdAt: promo.createdAt,
            updatedAt: promo.updatedAt,
            foods: await Promise.all(
              promo.foods.map(async (idFood: string) => {
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
        .then(() => res.status(200).json(promoList))
        .catch(err => console.log('Promisse.all Mount Object Erro ->', err));
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'IndexToClient Promo Failed' });
    }
  }
}

export default new PromoController();
