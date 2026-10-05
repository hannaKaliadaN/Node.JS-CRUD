const Product = require('./product-model')
const mongoose = require('mongoose')

const handleValidationError = (error, res, next) => {
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: error.message })
    }
    return next(error)
}

const getProduct = async (req, res) => {
    const products = await Product.find()
    res.send(products)
}

const getProductByID = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).send({ message: 'Product not found' })
    }
    res.send(product)
}

const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body)
        res.send(product)
    } catch (error) {
        handleValidationError(error, res, next)
    }
}

const updateProduct = async (req, res, next) => {
    let product
    try {
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    } catch (error) {
        return handleValidationError(error, res, next)
    }
    if (!product) {
        return res.status(404).send({ message: 'Product not found' })
    }
    res.send(product)
}

const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
        return res.status(404).send({ message: 'Product not found' })
    }
    res.send(product)
}


module.exports = {
    getProduct,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
}