const accountsDB ={
    accounts: require('./state.controller'),
    setAccounts: function (data) { this.accounts = data}
}

const pool = require('../connection')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
require('dotenv').config()

pool.connect()


const bcrypt = require('bcrypt')


const auth = async (req, res) => {
    const { email, password} = req.body;

    const find = pool.query(`Select * from accounts where id= ${email}`, (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    })
    pool.end

    console.log(find);
    const match = await bcrypt.compare(password, find.password)
    if (match) {
        const accessToken = jwt.sign(
            {'username': find.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '300s'}
        )
        const refreshToken = jwt.sign(
            {'username': find.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        const allAccount = pool.query(`Select * from accounts`, (err, result) => {
            if (!err) {
                res.send(result.rows)
            }
        })
        pool.end
        const otheraccounts = allAccount.filter((acc) => (acc.email !== find.email))
        const currentuser = { ...find, refreshToken }
        let updateAccount = `update products
                        set firsName='${currentuser.firstName}', 
                        lastName=${currentuser.lastName}, 
                        userNmae='${currentuser.userName}', 
                        email='${currentuser.email}',
                        password='${currentuser.password}',
                        where id=${currentuser.id}`

        pool.query(updateAccount, (err, result) => {
            if(!err){
                res.send('Update is complete')
            }else{
                console.log(err.message)
            }
        })
        pool.end
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) 
        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }

}


module.exports = { auth }
