import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ProductRouter from './routers/indexRouter.js';
import UserRouter from './routers/UserRouter.js';
import connectDB from './config/db/db.js';
import orderRouter from './routers/OrderRouter.js';
import ChatRouter from './routers/ChatRouter.js';

import {ConnectSocket} from './config/socket/socket.js';
import {createServer} from 'http'

dotenv.config();
process.env.TOKEN_SECRET;

const app = express();
const PORT = 5000;
const server = createServer(app)


ConnectSocket(server)
connectDB();

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});

app.use('/', ProductRouter)
app.use('/user', UserRouter)
app.use('/orders',orderRouter)
app.use('/chat', ChatRouter)
// app.use('/payment', PaymentRouter)

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

// app.listen(PORT, () => {
//     console.log(`Sever at https://localhost:${PORT}`);
// });

server.listen(PORT, () => console.log(`server running on port ${PORT}`))
