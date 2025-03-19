import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { clerkWebhooks, stripeWebHooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/UserRoutes.js';
import connectDB from './configs/mongodb.js';

const app = express();

// connect to database
await connectDB();
await connectCloudinary();



app.use(cors());
app.use(clerkMiddleware())


app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.post('/clerk',express.json(),clerkWebhooks)
app.use('/api/educator',express.json(),educatorRouter)
app.use('/api/course',express.json(),courseRouter)
app.use('/api/user',express.json(),userRouter)
app.post('/stripe',express.raw({type:'application/json'}),stripeWebHooks)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
    
})
