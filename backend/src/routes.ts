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
// @ts-ignore
routes.get('/client', authMiddleware, ClientController.index); // Admin
// @ts-ignore
routes.get('/client/:id', authMiddleware, ClientController.show); // Admin
routes.post('/client', ClientController.store);
// @ts-ignore
routes.delete('/client', authMiddleware, ClientController.destroy); // Client
// @ts-ignore
routes.put('/client', authMiddleware, ClientController.update); // Client
routes.post('/client/auth', ClientController.auth);
routes.post('/client/forgotPassword', ClientController.forgotPassword);
routes.post('/client/resetPassword', ClientController.resetPassword);

// routes Food
// @ts-ignore
routes.get('/food', authMiddleware, FoodController.index); // Admin
// @ts-ignore
routes.get('/food/:id', authMiddleware, FoodController.show); // Admin
// @ts-ignore
routes.post('/food', authMiddleware, FoodController.store); // Admin
// @ts-ignore
routes.delete('/food/:id', authMiddleware, FoodController.destroy); // Admin
// @ts-ignore
routes.put('/food/:id', authMiddleware, FoodController.update); // Admin

// routes Category
// @ts-ignore
routes.get('/category', authMiddleware, CategoryController.index); // Admin
// @ts-ignore
routes.post('/category', authMiddleware, CategoryController.store); // Admin
// @ts-ignore
routes.delete('/category/:id', authMiddleware, CategoryController.destroy); // Admin
// @ts-ignore
routes.put('/category/:id', authMiddleware, CategoryController.update); // Admin

// routes Demand to Admin
// @ts-ignore
routes.get('/demandAdmin', authMiddleware, DemandController.index); // Admin
// @ts-ignore
routes.get('/demandAdmin/:id', authMiddleware, DemandController.show); // Admin
// @ts-ignore
routes.post('/demandAdmin', authMiddleware, DemandController.store); // Admin
// @ts-ignore
routes.delete('/demandAdmin/:id', authMiddleware, DemandController.destroy); // Admin
// @ts-ignore
routes.put('/demandAdmin/:id', authMiddleware, DemandController.update); // Admin

// routes Demand to Client
// @ts-ignorets
routes.get('/demand', authMiddleware, DemandController.indexToClient); // Client
// @ts-ignorets
routes.post('/demand', authMiddleware, DemandController.storeToClient); // Client

// routes Admin Master
// @ts-ignorets
routes.get('/admin', authMiddleware, AdminController.index); // Admin Master
// @ts-ignorets
routes.get('/admin/:id', authMiddleware, AdminController.show); // Admin Master
// @ts-ignorets
routes.post('/admin', authMiddleware, AdminController.store); // Admin Master
// @ts-ignorets
routes.delete('/admin/:id', authMiddleware, AdminController.destroy); // Admin Master
// @ts-ignorets
routes.put('/admin/:id', authMiddleware, AdminController.update); // Admin Master
routes.post('/admin/auth', AdminController.auth);
routes.post('/admin/forgotPassword', AdminController.forgotPassword);
routes.post('/admin/resetPassword', AdminController.resetPassword);

export default routes;
