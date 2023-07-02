
const pool = require('../connection')
const jwt = require('jsonwebtoken')
// const cookie = require('cookie-parser')
require('dotenv').config()
const db = require('../models');

pool.connect()

const Account = db.accounts

const bcrypt = require('bcrypt')



const getAccount = (req, res) => {

    pool.query(`Select * from accounts where email= ${req.body.email}`, (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    })
    pool.end
}

const auth = async (req, res) => {
    // const { email, password} = req.body;
    const account = req.body;

    const email= req.body.email
    // console.log('kflkvfdfd', account);
    const find = pool.query(`Select * from accounts where id= ${req.body.id}`, (err, result) => {
        if(!err) {
            res.send(result.rows)
            console.log(result.rows);
        }
    })
    pool.end
    
    console.log(find);

    const match = await bcrypt.compare(account.password, find.password)

    if (match) {
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
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000}) 
        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }

}


// const auth = async (req, res) => {
//     try {
//    const { email, password } = req.body;
   
//       //find a user by their email
//       const account = await Account.findOne({
//         where: {
//         email: email
//       } 
        
//       });
   
//       //if user email is found, compare password with bcrypt
//       if (account) {
//         const isSame = await bcrypt.compare(account, user.password);
   
//         //if password is the same
//          //generate token with the user's id and the secretKey in the env file
   
//         if (isSame) {
//           let token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
//             expiresIn: 1 * 24 * 60 * 60 * 1000,
//           });
   
//           //if password matches wit the one in the database
//           //go ahead and generate a cookie for the user
//           res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
//           console.log("user", JSON.stringify(user, null, 2));
//           console.log(token);
//           //send user data
//           return res.status(201).send(account);
//         } else {
//           return res.status(401).send("Authentication failed");
//         }
//       } else {
//         return res.status(401).send("Authentication failed");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//    };

module.exports = { auth }
