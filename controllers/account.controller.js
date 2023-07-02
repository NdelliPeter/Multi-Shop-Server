const pool = require('../connection')
const db = require('../models');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser')

pool.connect()

const Account = db.accounts

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


const createAccount = async (req, res) => {

    const {id, fullname, userName, role, email, password} = req.body


    try {

        const data = {
            id: id,
            fullname: fullname,
            username: userName,
            role: role,
            email: email,
            password: await bcrypt.hash(password, 10)
        }

        console.log(data);

        // Saving an account
        // const account = await Account.create(data)
        const insertAccount =  `insert into accounts(id, fullname, role, userName, email, password)
        values(${data.id}, '${data.fullname}', '${data.username}', '${data.role}', '${data.email}', '${data.password}' )`

        pool.query( insertAccount, (err, result) =>{
            if (!err){
                res.send('Insertion complete')
            }else{
                console.log(err.message)
            }
        })
        pool.end

        if (insertAccount) {
            let token = jwt.sign({ id: insertAccount.id }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: 1 * 24 * 60 * 60 * 1000,
            });
       
            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("account", JSON.stringify(insertAccount, null, 2));
            console.log(token);
            //send account details
            return res.status(201).send(insertAccount);
        }else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error)
    }

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
    pool.query(`Select * from accounts where id= ${req.params.id}`, (err, result) => {
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


// const bcrypt = require('bcrypt');
// const db = require('../models');
// const jwt = require('jsonwebtoken');

// const Account = db.accounts;


// const signup = async (req, res) => {
//         const { id, firstname, lastname, username, email, password} = req.body;

//     try {
//         const data = {
//             id,
//             firstname,
//             lastname,
//             username,
//             email,
//             password: await bcrypt.hash(password, 10),

//         }

//         const account = await Account.create(data);


//         if ( account ) {
//             let token = jwt.sign({id: account.id}, process.env.secretKey, {
//                 expiresIn: 1 * 24 * 60 * 1000,
//             });

//             res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true});
//             console.log('account', JSON.stringify(account, null, 2));
//             console.log(token);
//             return res.status(201).send(account)
//         }else {
//             return res.status(409).send('Details are not cottect');
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }

// const login =async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const account = await Account.findOne({
//             where: {
//                 email: email
//             }
//         });


//         if (account) {
//             const isSame = await bcrypt.compare(password, account.password);



//             if (isSame) {
//                 let token = jwt.sign({id: account.id}, process.env.secretKey, {
//                     expiresIn: 1 * 24 * 60 * 1000,
//                 });

//                 res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true});
//             console.log('account', JSON.stringify(account, null, 2));
//             console.log(token);
//             return res.status(201).send(account)
            
//             }else {
//                 return res.status(401).send("Authentication failed");
//             }
//         }else {
//             return res.status(401).send("Authentication failed");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };


// module.exports = {
//     signup,
//     login
// }
