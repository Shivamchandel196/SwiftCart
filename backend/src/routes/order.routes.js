import express  from 'express';
import {protect} from '../middleware/authMiddleware.js'
import {admin} from '../middleware/adminMiddleware.js'
import * as orderController from "../controller/order.controller.js";

const router = express.Router();



router.post('/',protect, orderController.createOrder);
router.get('/',protect, admin,orderController.getOrders);
router.get('/myorders', protect, orderController.getMyOrders);
router.get('/:id',protect, orderController.getOrderById);
router.put('/:id',protect, admin, orderController.updateOrderStatus);


export default router;