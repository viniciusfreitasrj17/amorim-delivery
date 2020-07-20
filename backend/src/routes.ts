import { Router } from 'express';
import ClientController from './controllers/ClientController';
import FoodController from './controllers/FoodController';
import CategoryController from './controllers/CategoryController';
import DemandController from './controllers/DemandController';

const routes = Router();

// routes Client
routes.get('/client', ClientController.index);
routes.get('/client/:id', ClientController.show);
routes.post('/client', ClientController.store);
routes.delete('/client/:id', ClientController.destroy);

// routes Food
routes.get('/food', FoodController.index);
routes.get('/food/:id', FoodController.show);
routes.post('/food', FoodController.store);
routes.delete('/food/:id', FoodController.destroy);

// routes Category
routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.store);
routes.delete('/category/:id', CategoryController.destroy);

// routes Demand
routes.get('/demand', DemandController.index);
routes.get('/demand/:id', DemandController.show);
routes.post('/demand', DemandController.store);

export default routes;
