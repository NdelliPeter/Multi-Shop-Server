
const pool = require('../connection')
const db = require('../models');

const { ClientBase, Client } = require('pg')

// pool.connect()
const Product = db.products

const getAllProducts = async (req, res) => {
    const products = await Product.findAll();
    console.log(products);
    res.status(201).send(products)
}

const createNewProduct = (req, res) => {
    const product = req.body
    const insertProduct = `insert into products(id, name, price, image, category)
    values(${product.id}, '${product.name}', ${product.price}, '${product.image}', '${product.category}' )`

    pool.query(insertProduct, (err, result) =>{
        if (!err){
            res.send('Insertion complete')
        }else{
            console.log(err.message);
        }
    })
    pool.end
}

const updateProduct = (req, res) => {
    let product = req.body
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