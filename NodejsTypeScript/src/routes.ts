import express from 'express'
import UserController from './controllers/UserController';
// const UserController = require('./controllers/UserController');

const routes = express.Router();
const userController = new UserController();

routes.get('/users', userController.index);
routes.get('/users/:id', userController.indexUser);
routes.post('/users', userController.create);
routes.delete('/users/:id', userController.delete);
routes.put('/users/:id', userController.update);

export default routes;


