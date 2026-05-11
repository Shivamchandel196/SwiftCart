import express from 'express'
import cors from "cors";
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js';
import productsRoutes from "./routes/products.Routes.js";
import router from './routes/order.routes.js'
import paymentrouter from './routes/payment.routes.js';
import analyticsrouter from './routes/analytics.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.get('/',(req,res)=>{
    res.send("test");
})

app.use('/api/auth',authRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/orders',router)
app.use('/api/payments',paymentrouter)
app.use('/api/analytics',analyticsrouter)




export default app;