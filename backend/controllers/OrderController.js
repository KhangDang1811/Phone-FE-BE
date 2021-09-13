import expressAsyncHandler from "express-async-handler";
import  {OrderModel}  from "../models/OrderModel.js";
import dotenv from "dotenv";

dotenv.config();

export const GetAllOrderPendding = expressAsyncHandler(async (req, res) => {
    const Order = await OrderModel.find({
      $or: [{ status: "pendding" }, { paymentMethod: "payOnline" }],
    }).sort({
      createdAt: -1,
    });
    if (Order) {
      res.send(Order);
    } else {
      res.status(401).send({ message: "no order" });
    }
  });

  export const clientCancelOrder = expressAsyncHandler(async (req, res) => {
    const updateOrder = await OrderModel.findById({_id: req.params.id})
  
     if(updateOrder){
      updateOrder.cancelOrder = true
      await updateOrder.save()
     }
     res.send(updateOrder)
  });

  export const GetAllOrder = expressAsyncHandler(async (req, res) => {
    //await OrderModel.remove()
    const Order = await OrderModel.find({}).sort({ createdAt: -1 });
    if (Order) {
      res.send(Order);
    } else {
      res.status(401).send({ message: "no order" });
    }
  });