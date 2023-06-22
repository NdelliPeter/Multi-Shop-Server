const pool = require('../connection');



const accountsDB = (req, res) => {
    pool.query(`Select * from accounts`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    pool.end
}

module.exports = {
    accountsDB
}