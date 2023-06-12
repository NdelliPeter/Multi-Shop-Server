const pool = require('../connection')

pool.connect()

const data = {
    accounts: require('../data/account.json'),
    setAccounts: function (data) { this.accounts = data }
}

const bcrypt = require('bcryptjs')

const accountDataPath = './data/account.json'

const saveAccountData = (array) => {
    const finalArray = JSON.stringify(array)
    fs.writeFileSync(accountDataPath, finalArray)
}


const getAllAccounts = (req, res) => {
    pool.query(`Select * from accounts`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    pool.end
}

const handleNewAccount = async (req, res) => {
    const {firstname, lastname, username, email, password} = req.body;
    if( !firstname || !lastname || username || !email || !password) return res.status(400).json({ 'message': 'fristname, lastname, username, email, password are required.' })

    const duplicate = data.accounts.find(user => user.email === email)
    if (duplicate) return res.sendStatus(409)
    try {
        //encrypt password
        const hashedpassword = await bcrypt.hash(password, 10)
        
        const insertAccount = `insert into accounts(id, firstName, lastName, userName, email, password)
        values(${account.id}, '${account.firstName}', '${account.lastName}', '${account.userName}', '${account.email}', '${account.password}' )`
    } catch (error) {
        res.status(500).json({'message': error.message})
    }
}

const createAccount = (req, res) => {
    const account = req.body
    const insertAccount = `insert into accounts(id, firstName, lastName, userName, email, password)
    values(${account.id}, '${account.firstName}', '${account.lastName}', '${account.userName}', '${account.email}', '${account.password}' )`

    pool.query(insertAccount, (err, result) =>{
        if (!err){
            res.send('Insertion complete')
        }else{
            console.log(err.message);
        }
    })
    pool.end
}

const updateAccount = (req, res) => {
    let account = req.body
    let updateAccount = `update products
                        set firsName='${account.firstName}', 
                        lastName=${account.lastName}, 
                        userNmae='${account.userName}', 
                        email='${userName.email}',
                        password='${userName.password}',
                        where id=${account.id}`

    pool.query(updateAccount, (err, result) => {
        if(!err){
            res.send('Update is complete')
        }else{
            console.log(err.message)
        }
    })
    pool.end
}

const deleteAccount = (req, res) => {
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

const getAccount = (req, res) => {
    pool.query(`Select * from products where id= ${req.params.id}`, (err, result) => {
        if(!err) {
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