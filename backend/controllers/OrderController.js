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

  export const GetAllOrderPaypal = expressAsyncHandler(async (req, res) => {
    const Order = await OrderModel.find({ paymentMethod: "payOnline" }).sort({
      createdAt: -1,
    });
    if (Order) {
      res.send(Order);
    } else {
      res.status(401).send({ message: "no order" });
    }
  });

  export const GetAllOrderShipping = expressAsyncHandler(async (req, res) => {
    const Order = await OrderModel.find({ status: "shipping" }).sort({
      createdAt: -1,
    });
    if (Order) {
      res.send(Order);
    } else {
      res.status(401).send({ message: "no order" });
    }
  });

  
export const createOrder = expressAsyncHandler(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "cart is emty" });
  } else {
    const order = new OrderModel({
      order_code: "",
      to_ward_code: req.body.to_ward_code,
      to_district_id: req.body.to_district_id,
      order_code:req.body.shippingAddress.Postalcode,
      cancelOrder: false,

      orderItems: req.body.orderItems,
      shippingAddress: {
        address:req.body.shippingAddress.address,
        fullName: req.body.shippingAddress.fullName,
        city:req.body.shippingAddress.city,
        name: req.body.shippingAddress.name,
        phone: req.body.shippingAddress.phone,
      },
      paymentMethod: req.body.paymentMethod,
      paymentResult: req.body.paymentResult
        ? {
            id: req.body.paymentResult.id,
            status: req.body.paymentResult.status,
            update_time: req.body.paymentResult.update_time,
            email_address: req.body.paymentResult.payer.email_address,
          }
        : "",
      totalPrice: req.body.totalPrice,
      status: req.body.status ? req.body.status : "pendding",
      name: req.body.name,
      user: req.body.user,
    });

    const createOrder = await order.save();
    res.status(201).send({ message: "new order created", order: createOrder });
  }
});

export const GetOrderPenddingByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    user: req.params.id,
    status: "pendding",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
});

export const DeleteOrder = expressAsyncHandler(async (req, res) => {
  const deleteOrder = await OrderModel.findById({_id: req.params.id});

  if (deleteOrder) {
    await deleteOrder.remove();
    res.send({ message: "product deleted" });
  } else {
    res.send("error in delete order");
  }
});