const ProductData = require('./../models/product')

const getProducts = async (req, res) => {
    // res.send("Getting all products")
    try{
        const products = await ProductData.find()
        res.status(200).json(products)
    } catch (error){
        res.status(500).json({error:error.message})
    }
}

const getProductByID = async (req, res) => {
    try{
        const productId = req.params.id
        const product = await ProductData.findById(productId)
        if(!product) return res.status(404).json({message: "product not found"})
            res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Create
const createProduct = async(req, res) => {
    try{
        const {name, price, image, description} = req.body;
        const newProduct = new ProductData({name,price,image,description})
        await newProduct.save()
        res.status(201).json(newProduct)

    } catch (error){
        res.status(500).json({error: error.message})
    }
}

// update
const updateProduct = async (req, res) => {
    try{
        const productId = req.params.id
        const product = await ProductData.findByIdAndUpdate(productId, req.body, {new:true})
        if(!product) return res.status(404).json({message: "product not found"})
            res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// delete
const deleteProduct = async (req, res) => {
    try{
        const productId = req.params.id
        const product = await ProductData.findByIdAndDelete(productId)
        if(!product) return res.status(404).json({message: "product not found"})
            res.status(200).json({message: "product deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {getProducts, getProductByID, createProduct, updateProduct, deleteProduct}