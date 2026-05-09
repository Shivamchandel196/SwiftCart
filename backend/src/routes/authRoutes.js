import express from 'express'

const authrouter = express.Router();
import { registerUser, loginUser, logoutUser } from '../controller/auth.controller.js';


authrouter.post('/register',registerUser);
authrouter.post('/login',loginUser);
authrouter.post('/user',logoutUser);




export default authrouter;