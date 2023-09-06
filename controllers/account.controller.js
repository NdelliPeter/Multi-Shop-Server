const pool = require('../connection')
const db = require('../models');
// const jwt = require('jsonwebtoken');
// const cookie = require('cookie-parser')
const ROLES_LIST = require('../config/roles_list')


// pool.connect()

const Account = db.accounts

const bcrypt = require('bcryptjs')

const getAllAccounts = (req, res) => {
    pool.query(`Select * from accounts`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    pool.end
    // const accounts = Account.findAll()
    // console.log(accounts);
    // res.status(201).send(accounts)
}


const createAccount = async (req, res) => {

    const { id, fullname, userName, email, password } = req.body
    try {
        const data = {
            id: id,
            fullname: fullname,
            username: userName,
            role: ROLES_LIST.User,
            email: email,
            password: await bcrypt.hash(password, 10)
        }
        // Saving an account
        const account = await Account.create(data)
        if (account) {
            return res.status(201).send(account);
        } else {
            return res.status(409).send("Details are not correct");
        }
        // res.send(account)
    } catch (error) {
        console.log(error)
    }

}





const updateAccount = async (req, res) => {
    // const acc = Account.findOne({where:{id: req.params}})
    // console.log(acc);

    try {
        const account = req.body
        const pass = await bcrypt.hash(account.password, 10)
        console.log('jsdkjkvvkjsnsvkjnvf', pass);
        let updateAccount = `update accounts
                            set fullname='${account.fullname}', 
                            username='${account.username}', 
                            role=${account.role},
                            email='${account.email}',
                            password='${pass}',
                            refreshtoken='${account.refreshtoken}'
                            where id=${account.id}`

        pool.query(updateAccount, (err, result) => {
            if(!err){
                res.send('Update is complete')
            }else{
                console.log(err.message)
            }
        })
        pool.end
    } catch (error) {
        res.status(404).json(error)
    }
}



const deleteAccount = (req, res) => {
    let insertQuery = `delete from products where id=${req.params.id}`
    console.log(insertQuery);
    pool.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Delete complete')
        } else {
            console.log(err.message);
        }
    })
    pool.end
}

const getAccount = (req, res) => {
    pool.query(`Select * from accounts where id= ${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    pool.end
}


module.exports = {
    getAllAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    getAccount
}

