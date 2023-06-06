
const client = require('../connection')

const { ClientBase, Client } = require('pg')

client.connect()


const getAllBasket = (req, res) => {
    client.query(`Select * from products`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end
}

const createNewBasket = (req, res) => {
    const basket = req.body
    const insertProduct = `insert into baskets(id, name, price, image, category, quantity, total)
    values(${basket.id}, '${basket.name}', ${basket.price}, '${basket.image}', '${basket.category}', ${basket.quantity}, ${basket.total} )`

    client.query(insertProduct, (err, result) =>{
        if (!err){
            res.send('Insertion complete')
        }else{
            console.log(err.message);
        }
    })
    client.end
}

const updateBasket = (req, res) => {
    let basket = req.body
    let updateProduct = `update products
                        set name='${basket.name}', 
                        price=${basket.price}, 
                        image='${basket.image}', 
                        category='${basket.category}',
                        quantity=${basket.quantity},
                        total=${basket.total}
                        where id=${basket.id}`

    client.query(updateBasket, (err, result) => {
        if(!err){
            res.send('Update is complete')
        }else{
            console.log(err.message)
        }
    })
    client.end

}

const deleteBasket = (req, res) => {

    let insertQuery = `delete from baskets where id=${req.params.id}`
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

const getBasket = (req, res) => {
    client.query(`Select * from baskets where id= ${req.params.id}`, (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    })
    client.end

}


module.exports = {
    getAllBasket,
    createNewBasket,
    updateBasket,
    deleteBasket,
    getBasket
}