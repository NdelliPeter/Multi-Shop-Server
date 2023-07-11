const pool = require('../connection')
const db = require('../models');
const Basket = db.baskets

const { ClientBase, Client } = require('pg')

pool.connect()


const getAllBasket = (req, res) => {
    pool.query(`Select * from baskets`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    pool.end
}

const createNewBasket = (req, res) => {
    const basket = req.body
    basket.quantity = 1
    basket.total = basket.price
    console.log(basket);
    const insertProduct = `insert into baskets(id, name, price, image, category, quantity, total)
    values(${basket.id}, '${basket.name}', ${basket.price}, '${basket.image}', '${basket.category}', ${basket.quantity}, ${basket.total} )`

    pool.query(insertProduct, (err, result) =>{
        if (!err){
            res.send('Insertion complete')
        }else{
            console.log(err.message);
        }
    })
    pool.end
}

const updateBasket = (req, res) => {
    let basket = req.body
    basket.total =basket.price * basket.quantity
    console.log(basket);
    let updateBasket = `update baskets
                        set name='${basket.name}', 
                        price=${basket.price}, 
                        image='${basket.image}', 
                        category='${basket.category}',
                        quantity=${basket.quantity},
                        total=${basket.total}
                        where id=${basket.id}`

    pool.query(updateBasket, (err, result) => {
        if(!err){
            res.send('Update is complete')
        }else{
            console.log(err.message)
        }
    })
    pool.end

}

const deleteBasket = (req, res) => {

    let insertQuery = `delete from baskets where id=${req.params.id}`
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
const deleteAll = (req, res) => {

    let insertQuery = `delete from baskets where *`
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

const getBasket = (req, res) => {
    pool.query(`Select * from baskets where id= ${req.params.id}`, (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    })
    pool.end

}


module.exports = {
    getAllBasket,
    createNewBasket,
    updateBasket,
    deleteBasket,
    getBasket,
    deleteAll
}