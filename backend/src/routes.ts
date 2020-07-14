import { Router } from 'express';
import ClientController from './controllers/ClientController';

const routes = Router();

// routes Client
routes.get('/client', ClientController.index);
routes.post('/client', ClientController.store);

export default routes;
