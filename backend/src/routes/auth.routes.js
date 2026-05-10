import express from 'express'

const authrouter = express.Router();
import { registerUser,loginUser,getUsers } from '../controller/auth.controller.js';
import {protect} from '../middleware/authMiddleware.js'
import { admin } from '../middleware/adminMiddleware.js';

authrouter.post('/register',registerUser);
authrouter.post('/login',loginUser);
authrouter.get('/users',protect,admin,getUsers);




export default authrouter;