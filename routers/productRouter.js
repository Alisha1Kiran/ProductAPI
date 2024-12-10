const express = require('express')
const productRouter = express.Router()
const {getProducts, getProductByID, createProduct, updateProduct, deleteProduct} = require('./../controllers/productController')

productRouter.get('/', getProducts)
productRouter.get('/:id', getProductByID)

// create product
productRouter.post('/', createProduct)

// update product
productRouter.patch('/:id', updateProduct)

productRouter.delete('/:id', deleteProduct)


module.exports = productRouter;