import { Router } from 'express';
import RunController from './controllers/RunController';

const routes = Router();

// routes Run
routes.get('/', RunController.index);

export default routes;
