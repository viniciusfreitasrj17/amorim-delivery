/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Client from '../models/Client';
import { generateToken } from '../utils/generateToken';
import mailer from '../services/mailer';
import { verifyAdmin } from '../utils/verifyAdmin';

const BCRYPT_HASH_ROUND = 10;

class ClientController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdmin(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

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

      if (await repo.findOne({ where: { email } })) {
        return res
          .status(400)
          .json({ Message: 'E-mail is already being used' });
      }

      const client = repo.create({
        name,
        email,
        password,
        street,
        address,
        number
      });
      const erros = await validate(client);

      if (erros.length !== 0) {
        return res.status(400).json(erros.map(content => content.constraints));
      }

      client.password = await bcrypt.hash(client.password, BCRYPT_HASH_ROUND);

      const data = await repo.save(client);
      delete data.password;
      delete data.passwordResetExpires;
      delete data.passwordResetToken;

      return res
        .status(200)
        .json({ data, token: generateToken({ id: data.id }) });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Store Client Failed' });
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
      const repo = getRepository(Client);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Client' });
      }

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Show Client Failed' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const id = req.userId;
      const repo = getRepository(Client);
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Client' });
      }

      await repo.remove(data);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Destroy Client Failed' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const id = req.userId;
      const { name, email, password, street, address, number } = req.body;
      const repo = getRepository(Client);

      if (email) {
        if (await repo.findOne({ where: { email } })) {
          return res
            .status(400)
            .json({ Message: 'E-mail is already being used' });
        }
      }

      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Client' });
      }

      const newClient = repo.create({
        name: name || data.name,
        email: email || data.email,
        password: password || data.password,
        street: street || data.street,
        address: address || data.address,
        number: number || data.number,
        demand: data.demand,
        demands: data.demands
      });

      await repo.update(id, newClient);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Update Client Failed' });
    }
  }

  public async auth(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;
      let { password } = req.body;
      const repo = getRepository(Client);

      const client = await repo.findOne({
        where: { email },
        select: [
          'id',
          'name',
          'email',
          'password',
          'street',
          'address',
          'number',
          'createdAt',
          'updatedAt'
        ]
      });

      if (!client) {
        return res.status(400).json({ Error: 'User not found' });
      }

      if (password !== String) {
        password = password.toString();
      }

      if (!(await bcrypt.compare(password, client.password))) {
        return res.status(400).json({ Error: 'Invalid Password' });
      }

      delete client.password;

      return res
        .status(200)
        .json({ client, token: generateToken({ id: client.id }) });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Auth Client Failed' });
    }
  }

  public async forgotPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      const repo = getRepository(Client);

      const client = await repo.findOne({
        where: { email }
      });

      if (!client) {
        return res.status(400).json({ Error: 'User not found' });
      }

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1); // 1 Hour fot expired

      await repo.update(client.id, {
        passwordResetToken: token,
        passwordResetExpires: now
      });

      mailer.sendMail(
        {
          from: 'viniciusfreitasrj17@gmail.com',
          to: email,
          // @ts-ignore
          template: 'forgotPassword',
          context: { token }
        },
        err => {
          if (err) {
            console.log(err);
            return res
              .status(400)
              .json({ Error: 'Cannot send forgot password email' });
          }
        }
      );
      return res.status(200).json({ Message: 'E-mail Sended' });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ Mensagge: 'ForgotPassword Client Failed' });
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { email, token } = req.body;
      let { password } = req.body;

      const repo = getRepository(Client);

      const client = await repo.findOne({
        where: { email },
        select: [
          'id',
          'name',
          'email',
          'password',
          'street',
          'address',
          'number',
          'createdAt',
          'updatedAt',
          'passwordResetExpires',
          'passwordResetToken'
        ]
      });

      if (!client) {
        return res.status(400).json({ Error: 'User not found' });
      }

      if (token !== client.passwordResetToken) {
        return res.status(400).json({ Error: 'Token invalid' });
      }

      const now = new Date();

      if (now > client.passwordResetExpires) {
        return res
          .status(400)
          .json({ Error: 'Token expired, generate a new one' });
      }

      if (password !== String) {
        password = password.toString();
      }

      const newClient = repo.create({
        ...client,
        password
      });

      const erros = await validate(newClient);

      if (erros.length !== 0) {
        return res.status(400).json(erros.map(content => content.constraints));
      }

      delete newClient.passwordResetExpires;
      delete newClient.passwordResetToken;
      delete newClient.createdAt;
      delete newClient.updatedAt;

      newClient.password = await bcrypt.hash(
        newClient.password,
        BCRYPT_HASH_ROUND
      );

      await repo.update(client.id, newClient);

      return res.status(200).json({ Message: 'New Password Modificad' });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ Mensagge: 'Reset Password Client Failed' });
    }
  }
}

export default new ClientController();
