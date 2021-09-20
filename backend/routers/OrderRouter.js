import express from 'express';
// import { getOrderPenddingByUser } from '../../demo/src/actions/OderAction.js';
import { clientCancelOrder, createOrder, DeleteOrder, GetAllOrder, GetAllOrderPaypal, GetAllOrderPendding, GetAllOrderShipping, GetOrderPenddingByUser } from '../controllers/OrderController.js';

const OrderRouter = express.Router();

OrderRouter.get("/", GetAllOrder);
OrderRouter.get("/orderPendding", GetAllOrderPendding);
OrderRouter.post("/cancel/:id", clientCancelOrder);
OrderRouter.delete('/delete/:id', DeleteOrder)

OrderRouter.get("/:id", GetAllOrder);
OrderRouter.get("/orderPendding/:id", GetOrderPenddingByUser);

OrderRouter.get("/orderPaypal", GetAllOrderPaypal);
OrderRouter.get("/orderShipping", GetAllOrderShipping);

OrderRouter.post("/create", createOrder);

export default OrderRouter