const pool = require('../connection');

pool.connect();


const getCheckout = (req, res) => {
    pool.query(`Select * from checkout`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    pool.end
}

const createCheckout = (req, res) => {
    const checkout = req.body;
    const insert = `insert into checkout(id, subtotal, shipping, generaltotal)
    values(${checkout.id}, ${checkout.subtotal}, ${checkout.shipping}, ${checkout.generaltotal})`

    pool.query(insert, (err ,result) => {
        if (!err) {
            res.send('Insertion Comptete');
        }else{
            console.log(err.message);
        }
    })
    pool.end
}


module.exports = {
    getCheckout,
    createCheckout
}