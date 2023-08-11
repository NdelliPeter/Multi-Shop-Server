
const pool = require('../connection')
const db = require('../models');

const { ClientBase, Client } = require('pg')

// pool.connect()
const Product = db.products

const getAllProducts = async (req, res) => {
    const products = await Product.findAll();
    // console.log(products);
    res.status(201).send(products)
}

const createNewProduct = async (req, res) => {
    try {
    const data = req.body
    const d = {
        id: data.id,
        name: data.name,
        price: data.price,
        category: data.category,
        image: data.image
    }
    console.log(d);
    const product = await Product.create(d)
    console.log(product);
    if(product){
        return res.status(200).json(product)
    }else{
        return res.status(409).send("Details are not correct");
    }
    } catch (error) {
        res.status(404).json(error)
    }
}

const updateProduct = (req, res) => {
    const product = req.body
    console.log(product);
    let updateProduct = `update products
                        set name='${product.name}', 
                        price=${product.price}, 
                        image='${product.image}', 
                        category='${product.category}'
                        where id=${product.id}`

    pool.query(updateProduct, (err, result) => {
        if(!err){
            res.send('Update is complete')
        }else{
            console.log(err.message)
        }
    })
    pool.end

}

const deleteProduct = (req, res) => {

    let insertQuery = `delete from products where id=${req.params.id}`
    console.log(insertQuery);
    pool.query(insertQuery, (err, result) => {
        if(!err) {
            res.send('Delete complete')
        }else{
            console.log(err.message);
        }
    })
    pool.end


}



const getProduct = (req, res) => {
    pool.query(`Select * from products where id= ${req.params.id}`, (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    })
    pool.end

}


module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    // getProductsByprice
}