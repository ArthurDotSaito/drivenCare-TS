import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import routes from './routes/index.js'
import { handleApplicationErrors } from './middlewares/handleAppErrors.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());   
app.use(cors());
app.use(routes);
app.use(handleApplicationErrors)

const server = app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})

server.on('error', (error: Error) =>{
    return console.log("Unable to listen to server");
})
