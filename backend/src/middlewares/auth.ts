/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable consistent-return */
import { Response, Request, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

import authConfig from '../config/auth.json';

type TReq = {
  userId: Request<[string], unknown, number, unknown> | unknown | string;
  headers: {
    authorization: string;
  };
};

type TDecoded = {
  id: string | number | unknown;
};

export default function (
  req: Request & TReq,
  res: Response & void,
  next: NextFunction
): Promise<Response> | string | unknown {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ Error: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ Error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ Error: 'Token malformatted' });
  }

  jwt.verify(
    token,
    authConfig.secret,
    (err: VerifyErrors | null, decoded: object | undefined | TDecoded) => {
      if (err) {
        return res.status(401).json({ Error: 'Token invalid' });
      }

      req.userId = (<TDecoded>decoded).id;
      return next();
    }
  );
}
