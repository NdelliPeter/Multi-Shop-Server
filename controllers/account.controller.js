const fs = require('fs')

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
    fs.readFile(accountDataPath, 'utf8', (err, ans) => {
        if (err) {
            console.error(err);
        }
        console.log(ans);
        let all = JSON.parse(ans)
        res.send(all)
    })
}


const createAccount = (req, res) => {
    const newaccountId = Math.floor(100000 + Math.random() * 900000)
    const newAccount = {
        id: newaccountId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
    }

    if (!newAccount.firstName || !newAccount.lastName || !newAccount.email || !newAccount.userName || !newAccount.password) {
        return res.status(404).json({ 'message': `Accout's first name, last name, email, user name and password are required.` })
    }

    data.setAccounts([...data.accounts, newAccount])
    saveAccountData(data.accounts)

    res.status(201).json(data.accounts)
}

const updateAccount = (req, res) => {
    const account = data.accounts.find(acc => acc.id === parseInt(req.body.id))
    if (!account) {
        return res.status(404).json({ 'message': `Products ID ${req.body.id} not found` })
    }
    if (req.body.firstName) account.firstName = req.body.firstName
    if (req.body.lastName) account.lastName = req.body.lastName
    if (req.body.email) account.email = req.body.email
    if (req.body.userName) account.userName = req.body.userName
    if (req.body.password) account.password = req.body.password
    const filteredArray = data.accounts.filter(acc => acc.id !== parseInt(req.body.id))
    const unsortedArray = [...filteredArray, account]
    data.setAccounts(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    saveAccountData(data.accounts)
    res.json(data.accounts)
}

const deleteAccount = (req, res) => {
    const account = data.accounts.find(acc => acc.id === parseInt(req.body.id))
    if (!account) {
        return res.status(404).json({ 'message': `Products ID ${req.body.id} not found` })
    }
    const filteredArray = data.accounts.filter(acc => acc.id !== parseInt(req.body.id))
    data.setAccounts([...filteredArray])
    const finalArray = JSON.stringify(data.accounts)
    fs.writeFileSync(accountDataPath, finalArray)
    res.json(data.accounts)
}

const getAccount = (req, res) => {
    console.log(req.params.id);
    fs.readFile(accountDataPath, 'utf8', (err, ans) => {
        let all = JSON.parse(ans)
        res.send(all.find((acc) => (acc.id === parseInt(req.params.id))))
    })
}


module.exports = {
    getAllAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    getAccount
}