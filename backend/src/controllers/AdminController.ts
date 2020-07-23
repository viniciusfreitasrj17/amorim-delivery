/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Admin from '../models/AdminMaster';
import { generateToken } from '../utils/generateToken';
import mailer from '../services/mailer';
import { verifyAdminMaster } from '../utils/verifyAdmin';

const BCRYPT_HASH_ROUND = 10;

class AdminController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdminMaster(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const repo = getRepository(Admin);

      const data = await repo.find();

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Index Admin Failed' });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdminMaster(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const repo = getRepository(Admin);

      const { name, email, password, master } = req.body;

      if (await repo.findOne({ where: { email } })) {
        return res
          .status(400)
          .json({ Message: 'E-mail is already being used' });
      }

      if (master) {
        const adminMaster = await repo.findOne({ where: { master: true } });
        if (adminMaster) {
          return res
            .status(400)
            .json({ Message: 'Admin Master already exists' });
        }
      }

      const admin = repo.create({
        name,
        email,
        password,
        master: master || false
      });

      const erros = await validate(admin);

      if (erros.length !== 0) {
        return res.status(400).json(erros.map(content => content.constraints));
      }

      if (password !== String) {
        admin.password = password.toString();
      }

      admin.password = await bcrypt.hash(admin.password, BCRYPT_HASH_ROUND);

      const data = await repo.save(admin);
      delete data.password;
      delete data.passwordResetExpires;
      delete data.passwordResetToken;

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Store Admin Failed' });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdminMaster(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const repo = getRepository(Admin);

      const { id } = req.params;
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Admin' });
      }

      return res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Show Admin Failed' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdminMaster(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const repo = getRepository(Admin);

      const { id } = req.params;
      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Admin' });
      }

      await repo.remove(data);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Destroy Admin Failed' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      // @ts-ignore
      const verify = await verifyAdminMaster(req.userId, res);
      if (!verify) {
        return res.status(400).json({ Message: 'Error, Log in again' });
      }

      const repo = getRepository(Admin);

      const { id } = req.params;
      const { name, email, password, master } = req.body;

      if (email) {
        if (await repo.findOne({ where: { email } })) {
          return res
            .status(400)
            .json({ Message: 'E-mail is already being used' });
        }
      }

      const data = await repo.findOne({ where: { id } });

      if (!data) {
        return res.status(400).json({ Mensagge: 'Not Found Admin' });
      }

      if (master) {
        const adminMaster = repo.findOne({ where: { master: true } });
        if (adminMaster) {
          return res
            .status(400)
            .json({ Message: 'Admin Master already exists' });
        }
      }

      const newAdmin = repo.create({
        name: name || data.name,
        email: email || data.email,
        password: password || data.password,
        master: master || data.master
      });

      if (password) {
        if (password !== String) {
          newAdmin.password = password.toString();
        }

        newAdmin.password = await bcrypt.hash(
          newAdmin.password,
          BCRYPT_HASH_ROUND
        );
      }

      await repo.update(id, newAdmin);
      return res.status(200).json();
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Update Admin Failed' });
    }
  }

  public async auth(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;
      let { password } = req.body;
      const repo = getRepository(Admin);

      const admin = await repo.findOne({
        where: { email },
        select: [
          'id',
          'name',
          'email',
          'password',
          'master',
          'createdAt',
          'updatedAt'
        ]
      });

      if (!admin) {
        return res.status(400).json({ Error: 'User not found' });
      }

      if (password !== String) {
        password = password.toString();
      }

      if (!(await bcrypt.compare(password, admin.password))) {
        return res.status(400).json({ Error: 'Invalid Password' });
      }

      delete admin.password;

      return res
        .status(200)
        .json({ admin, token: generateToken({ id: admin.id }) });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ Mensagge: 'Auth Admin Failed' });
    }
  }

  public async forgotPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      const repo = getRepository(Admin);

      const admin = await repo.findOne({
        where: { email }
      });

      if (!admin) {
        return res.status(400).json({ Error: 'User not found' });
      }

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1); // 1 Hour fot expired

      await repo.update(admin.id, {
        passwordResetToken: token,
        passwordResetExpires: now
      });

      mailer.sendMail(
        {
          from: 'suporte@site.app',
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
      return res.status(400).json({ Mensagge: 'ForgotPassword Admin Failed' });
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { email, token } = req.body;
      let { password } = req.body;

      const repo = getRepository(Admin);

      const admin = await repo.findOne({
        where: { email },
        select: [
          'id',
          'name',
          'email',
          'password',
          'master',
          'createdAt',
          'updatedAt',
          'passwordResetExpires',
          'passwordResetToken'
        ]
      });

      if (!admin) {
        return res.status(400).json({ Error: 'User not found' });
      }

      if (token !== admin.passwordResetToken) {
        return res.status(400).json({ Error: 'Token invalid' });
      }

      const now = new Date();

      if (now > admin.passwordResetExpires) {
        return res
          .status(400)
          .json({ Error: 'Token expired, generate a new one' });
      }

      if (password !== String) {
        password = password.toString();
      }

      const newAdmin = repo.create({
        ...admin,
        password
      });

      const erros = await validate(newAdmin);

      if (erros.length !== 0) {
        return res.status(400).json(erros.map(content => content.constraints));
      }

      delete newAdmin.passwordResetExpires;
      delete newAdmin.passwordResetToken;
      delete newAdmin.createdAt;
      delete newAdmin.updatedAt;

      newAdmin.password = await bcrypt.hash(
        newAdmin.password,
        BCRYPT_HASH_ROUND
      );

      await repo.update(admin.id, newAdmin);

      return res.status(200).json({ Message: 'New Password Modificad' });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ Mensagge: 'Reset Password Admin Failed' });
    }
  }
}

export default new AdminController();
