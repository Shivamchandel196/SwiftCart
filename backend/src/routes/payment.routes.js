import express from 'express';

import { createdOrder,verifypayment } from '../controller/payment.controller.js';


const paymentrouter = express.Router();






paymentrouter.post('/order',createdOrder);
paymentrouter.post('/verify',verifypayment);




export default paymentrouter;