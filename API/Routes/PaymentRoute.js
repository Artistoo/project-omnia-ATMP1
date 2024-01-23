import express from 'express';
import Pay_ServiceController from '../controller/Pay_Service_controller.js';
import Create_OrderController from '../controller/CreateOrder_controller.js';

//MIDDLEWARES
import createRequiredCredentials from '../middleware/createRequiredCredentials.js';

const Router = express.Router();

Router.post(`/pay`, createRequiredCredentials, Pay_ServiceController);
Router.post(`/create_order`, createRequiredCredentials, Create_OrderController);

export default Router;
