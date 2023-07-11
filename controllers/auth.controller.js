
const pool = require('../connection')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
require('dotenv').config()
const db = require('../models');

pool.connect()

const Account = db.accounts

const bcrypt = require('bcrypt');
const { json } = require('body-parser');



// const getAccount = (req, res) => {

//     pool.query(`Select * from accounts where email= ${req.body.email}`, (err, result) => {
//         if(!err) {
//             res.send(result.rows)
//         }
//     })
//     pool.end
// }

const auth = async (req, res) => {
    const { email, password} = req.body;
    // const account = req.body;

    console.log('kflkvfdfd', email , password);
    const find = await Account.findAll({where: {email: email}})
    // const finder = JSON.stringify(find)

    // console.log('find item', find);
    // console.log('finder item', finder);

    // const match = await bcrypt.compare(password, finder.password)
    // console.log(match);
    if (find) {
        const accessToken = jwt.sign(
            {'email': find.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '60s'}
        )
        const refreshToken = jwt.sign(
            {'email': find.email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000}) 
        res.json({ accessToken, find })
    } else {
        res.sendStatus(401)
    }

}


module.exports = { auth }
