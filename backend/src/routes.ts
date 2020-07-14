import { Router } from 'express';
import ClientController from './controllers/ClientController';
import FoodController from './controllers/FoodController';

const routes = Router();

// routes Client
routes.get('/client', ClientController.index);
routes.post('/client', ClientController.store);

// routes Food
routes.get('/food', FoodController.index);
routes.post('/food', FoodController.store);

export default routes;
