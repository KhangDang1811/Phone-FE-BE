// import expressAsyncHandler from 'express-async-handler'
// import { ListTypeProductModel } from '../models/ListTypeProductModel.js'

// export const getAllTypeProduct = expressAsyncHandler(async (req, res) => {
//     console.log('get all type')
//     const allType = await ListTypeProductModel.find({})
//     console.log(allType)
//     res.send(allType)
// })

// export const getAllTypeProduct = (req,res) =>{
//     console.log(typeof req.params.type)
//     const product = data.find((x) => x.type == req.params.type);
//     if(product){
//         res.send(product)
//     } else {
//         res.status(404).send({message:'product not found'});
//     }
// }