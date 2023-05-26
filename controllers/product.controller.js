
const client = require('../connection')

const { ClientBase, Client } = require('pg')

client.connect()


const getAllProducts = (req, res) => {
    client.query(`Select * from products`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end
}

const createNewProduct = (req, res) => {
    const product = req.body
    const insertProduct = `insert into products(id, name, price, image, category)
    values(${product.id}, '${product.name}', ${product.price}, '${product.image}', '${product.category}' )`

    client.query(insertProduct, (err, result) =>{
        if (!err){
            res.send('Insertion complete')
        }else{
            console.log(err.message);
        }
    })
    client.end
}

const updateProduct = (req, res) => {
    let product = req.body
    let updateProduct = `update products
                        set name='${product.name}', 
                        price=${product.price}, 
                        image='${product.image}', 
                        category='${product.category}'
                        where id=${product.id}`

    client.query(updateProduct, (err, result) => {
        if(!err){
            res.send('Update is complete')
        }else{
            console.log(err.message)
        }
    })
    client.end

}

const deleteProduct = (req, res) => {

    let insertQuery = `delete from products where id=${req.params.id}`
    console.log(insertQuery);
    client.query(insertQuery, (err, result) => {
        if(!err) {
            res.send('Delete complete')
        }else{
            console.log(err.message);
        }
    })
    client.end


}

const getProduct = (req, res) => {
    client.query(`Select * from products where id= ${req.params.id}`, (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    })
    client.end

}


module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct
}