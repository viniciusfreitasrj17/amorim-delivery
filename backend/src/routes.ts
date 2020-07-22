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
routes.put('/client/:id', ClientController.update);
routes.post('/client/auth', ClientController.auth);
routes.post('/client/forgotPassword', ClientController.forgotPassword);

// routes Food
routes.get('/food', FoodController.index);
routes.get('/food/:id', FoodController.show);
routes.post('/food', FoodController.store);
routes.delete('/food/:id', FoodController.destroy);
routes.put('/food/:id', FoodController.update);

// routes Category
routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.store);
routes.delete('/category/:id', CategoryController.destroy);
routes.put('/category/:id', CategoryController.update);

// routes Demand
routes.get('/demand', DemandController.index);
routes.get('/demand/:id', DemandController.show);
routes.post('/demand', DemandController.store);
routes.delete('/demand/:id', DemandController.destroy);
routes.put('/demand/:id', DemandController.update);

export default routes;
