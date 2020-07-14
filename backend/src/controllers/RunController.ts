import { Response, Request } from 'express';
// import { getRepository } from 'typeorm';
// import Run from '../models/Run';

class RunController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      // const repo = getRepository(Run);
      // const data = await repo.find();

      return res.status(200).json({ Message: 'Run ... 😎' });
    } catch (err) {
      // console.log(err.message);
      return res.status(400).json({ Mensagge: 'Get Run Failed' });
    }
  }
}

export default new RunController();
