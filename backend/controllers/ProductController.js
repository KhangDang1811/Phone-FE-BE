import { data } from '../data2.js';
import expressAsyncHandler from 'express-async-handler';

export const getProductById = (req,res) =>{
    console.log(typeof req.params.id)
    const product = data.products.find((x) => x.id == req.params.id);
    if(product){
        res.send(product)
    } else {
        res.status(404).send({message:'product not found'});
    }
}


 export const filterProductByType = expressAsyncHandler(async (req, res) => {
    console.log(typeof req.params.type)
    const product = data.find((x) => x.type == req.params.type);
    if(product){
        res.send(product)
    } else {
        res.status(404).send({message:'product not found'});
    }
})

export const getAllProduct = expressAsyncHandler(async (req, res) => {
    // await ProductModel.remove()
    // const product = await ProductModel.insertMany(data.products)
    // ProductModel.find()
    //     .then(product => res.send(product))
    //     .catch(err => console.log(err))
  
    const products = await data.find({})
    console.log("hihi")
    res.send(products)
})