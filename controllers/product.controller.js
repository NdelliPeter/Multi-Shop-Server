// const express = require('express')
// const router =express.Router()
const { log } = require('console')
const fs = require('fs')

const data = {
    products: require('../data/products.json'),
    setProducts: function (data) {this.products = data}
}
// const Product = require('../models/product.model')


// router.get('/', (req,res) => {
//     Product.find()
//         .then(data => res.send(data))
//         .catch(err => res.send(err))
// })
   
// module.exports = router

const productDataPath = './data/products.json'

const saveProductData = (array) => {
    const finalArray = JSON.stringify(array)
    fs.writeFileSync(productDataPath, finalArray)
}
const getProductData = () => {

    const jsonData = fs.readFileSync(productDataPath, 'utf8')
    return JSON.parse(jsonData)

}

const getAllProducts = (req, res) => {
    // const allProducts = fs.readFileSync(productDataPath, 'utf8')
    // res.status(200).json(allProducts);
    const products = getProductData()
    console.log(products);
    res.send(products)
}

const createNewProduct = (req, res) => {
    const newProductId = Math.floor(100000 + Math.random() * 900000)
    const newProduct = {
        id: newProductId,
        productname: req.body.productname,
        productprice: req.body.productprice,
        productimage: req.body.productimage,
        productcategory: req.body.productcategory
    }

    if (!newProduct.productname || !newProduct.productprice || !newProduct.productimage) {
        return res.status(404).json({ 'message': 'Product name, price and image are required.'})
    }

    data.setProducts([...data.products, newProduct])
    saveProductData(data.products)

    res.status(201).json(data.products)
}

const updateProduct = (req, res) => {
    const product =data.products.find(prod => prod.id === parseInt(req.body.id))
    if (!product) {
        return res.status(404).json({ 'message': `Products ID ${req.body.id} not found`})
    }
    if (req.body.productname) product.productname =req.body.productname
    if (req.body.productprice) product.productprice =req.body.productprice
    if (req.body.productimage) product.productimage =req.body.productimage
    if (req.body.productcategory) product.productcategory =req.body.productcategory
    const filteredArray = data.products.filter(prod => prod.id !== parseInt(req.body.id))
    const unsortedArray = [...filteredArray, product]
    data.setProducts(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    saveProductData(data.products)
    res.json(data.products)
}

const deleteProduct = (req, res) => {
    const product =data.products.find(prod => prod.id === parseInt(req.body.id))
    if (!product) {
        return res.status(404).json({ 'message': `Products ID ${req.body.id} not found`})
    }
    const filteredArray = data.products.filter(prod => prod.id !== parseInt(req.body.id))
    data.setProducts([...filteredArray])
    const finalArray = JSON.stringify(data.products)
    fs.writeFileSync(productDataPath, finalArray)
    res.json(data.products)
}

const getProduct = (req, res) => {

    const product = data.products.find(prod => prod.id === parseInt(req.body.id))
    if (!product) {
        return res.status(404).json({ 'message': `Products ID ${req.body.id} not found`})
    }
    console.log(product);
    res.json(product)
}


module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct
}