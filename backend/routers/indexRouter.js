import express from 'express'
import { filterProductByType, getAllProduct, getProductById } from '../controllers/ProductController.js';

const ProductRouter = express.Router()

ProductRouter.get('/api/products/:id', getProductById);
ProductRouter.get('/api/:type', filterProductByType);
ProductRouter.get("/", getAllProduct);



export default ProductRouter