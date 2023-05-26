const client = require('../connection')

client.connect

const data = {
    accounts: require('../data/account.json'),
    setAccounts: function (data) { this.accounts = data }
}

const accountDataPath = './data/account.json'

const saveAccountData = (array) => {
    const finalArray = JSON.stringify(array)
    fs.writeFileSync(accountDataPath, finalArray)
}


const getAllAccounts = (req, res) => {
    client.query(`Select * from accounts`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end
}


const createAccount = (req, res) => {
    const account = req.body
    const insertAccount = `insert into products(id, name, price, image, category)
    values(${account.id}, '${account.firstName}', '${account.lastName}', '${account.userName}', '${account.email}', '${account.password}' )`

    client.query(insertAccount, (err, result) =>{
        if (!err){
            res.send('Insertion complete')
        }else{
            console.log(err.message);
        }
    })
    client.end
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

    client.query(updateAccount, (err, result) => {
        if(!err){
            res.send('Update is complete')
        }else{
            console.log(err.message)
        }
    })
    client.end
}

const deleteAccount = (req, res) => {
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

const getAccount = (req, res) => {
    client.query(`Select * from products where id= ${req.params.id}`, (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    })
    client.end
}


module.exports = {
    getAllAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    getAccount
}