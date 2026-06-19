import { Router } from 'express';
import multer from 'multer';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductsController from './app/controllers/productsController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import multerConfig from './config/multer.cjs';
import authMiddleware from './app/middlewares/auth.js';
import adminMiddleware from './app/middlewares/admin.js';



                        
const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', adminMiddleware, upload.single('file'), ProductsController.store);
routes.put('/products/:id', adminMiddleware, upload.single('file'), ProductsController.update);
routes.get('/products', ProductsController.index);

routes.post('/categories', adminMiddleware, upload.single('file'), CategoryController.store);
routes.put('/categories/:id', adminMiddleware, upload.single('file'), CategoryController.update);
routes.get('/categories', CategoryController.index);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', adminMiddleware, OrderController.update);




export default routes;

/*
routes é onde ficam as rotas da aplicação, que são usadas para definir os endpoints da API e as ações que 
devem ser executadas quando esses endpoints são acessados. Ele importa o Router do Express e define as rotas 
usando os métodos HTTP (get, post, put, delete, etc.) e os caminhos dos endpoints. Cada rota tem uma função de 
callback que é executada quando a rota é acessada, e essa função recebe os objetos req (request) e res (response) 
como parâmetros para manipular a crequisição e enviar a resposta.
*/
