/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Router } from 'express';
import ClientController from './controllers/ClientController';
import AdminController from './controllers/AdminController';
import FoodController from './controllers/FoodController';
import CategoryController from './controllers/CategoryController';
import DemandController from './controllers/DemandController';
import authMiddleware from './middlewares/auth';

const routes = Router();

// routes Client
routes.get('/client', ClientController.index);
routes.get('/client/:id', ClientController.show);
routes.post('/client', ClientController.store);
routes.delete('/client/:id', ClientController.destroy);
routes.put('/client/:id', ClientController.update);
routes.post('/client/auth', ClientController.auth);
routes.post('/client/forgotPassword', ClientController.forgotPassword);
routes.post('/client/resetPassword', ClientController.resetPassword);

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

// routes Demand to Admin
routes.get('/demandAdmin', DemandController.index);
routes.get('/demandAdmin/:id', DemandController.show);
routes.post('/demandAdmin', DemandController.store);
routes.delete('/demandAdmin/:id', DemandController.destroy);
routes.put('/demandAdmin/:id', DemandController.update);

// routes Demand to Client
// @ts-ignorets
routes.get('/demand/:client', authMiddleware, DemandController.indexToClient);
// @ts-ignorets
routes.post('/demand/:client', authMiddleware, DemandController.storeToClient);

// routes Admin Master
// @ts-ignorets
routes.get('/admin', authMiddleware, AdminController.index);
// @ts-ignorets
routes.get('/admin/:id', authMiddleware, AdminController.show);
// @ts-ignorets
routes.post('/admin', authMiddleware, AdminController.store);
// @ts-ignorets
routes.delete('/admin/:id', authMiddleware, AdminController.destroy);
// @ts-ignorets
routes.put('/admin/:id', authMiddleware, AdminController.update);
routes.post('/admin/auth', AdminController.auth);
routes.post('/admin/forgotPassword', AdminController.forgotPassword);
routes.post('/admin/resetPassword', AdminController.resetPassword);

export default routes;
