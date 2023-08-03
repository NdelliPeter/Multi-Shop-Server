
const pool = require('../connection')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
require('dotenv').config()
const db = require('../models');

pool.connect()

const Account = db.accounts

const bcrypt = require('bcrypt');



const resetpassword = async (req, res) => {
    const { email, oldpassword, newpassword} = req.body;
    // console.log(email, oldpassword, newpassword);
    const find = await Account.findOne({where: {email: email}})
    // const hash = await bcrypt.hash(password, 10)
    // console.log('find item', find);
    const match = await bcrypt.compare(oldpassword, find.password)
    // console.log(match);
    if (match) {
        const hash = await bcrypt.hash(newpassword, 10)
        // find.password = hash
        const a = await Account.upsert({ 
            id: find.id,
            fullname: find.fullname,
            username: find.username,
            email: find.email,
            role: find.role,
            refreshtoken: find.refreshtoken, 
            password: hash})
        // const a = await Account.save()
        console.log(a);
        res.status(200).json(a)

    } else {
        res.sendStatus(401,{message:'Email or Password not correct'})
    }

}



module.exports = { resetpassword }
