import UsersController from '@controllers/UsersController';
import { Router } from 'express';

const routes = Router();

routes.get('/users', UsersController.index);
routes.post('/users', UsersController.store);

export default routes;
