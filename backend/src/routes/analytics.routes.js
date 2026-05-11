import express from 'express';

import {protect} from '../middleware/authMiddleware.js'
import { admin } from '../middleware/adminMiddleware.js';
import {getAdminStats} from '../controller/analytics.controller.js';

const analyticsrouter = express.Router();

analyticsrouter.get('/',protect,admin,getAdminStats);













export default analyticsrouter;