import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// connect to database
await connectdb();
app.use(cors());


app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.post('/clerk', express.json(),clerkWebhooks)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
    
})
