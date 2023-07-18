
const pool = require('../connection')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
require('dotenv').config()
const db = require('../models');

pool.connect()

const Account = db.accounts

const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { where } = require('sequelize');




const auth = async (req, res) => {
    const { email, password} = req.body;
    const find = await Account.findOne({where: {email: email}})
    // const hash = await bcrypt.hash(password, 10)
    // console.log('find item', find);
    const match = await bcrypt.compare(password, find.password)
    // console.log(match);
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
        
        // await Account.upsert('accounts', {id: find.id }, {refreshtoken: refreshToken}, {id: find.id})
        if(find){
            find.refreshtoken = refreshToken
            await find.save()
        }else{
            console.log('Account not found');
        }
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAgae: 24 * 60 * 60 * 1000 }) 
        res.json({ accessToken })
    } else {
        res.sendStatus(401,{message:'Email or Password not correct'})
    }

}


// const auth = async (req, res) => {
//     try {
//         const {email, password} = req.body;
//         // const session = req.secret.email;

//         const find = await Account.findOne({where: {email: email}})

//         if(!find) {
//             return res.status(403).json({
//                 message: 'Wrong email or password.'
//             })
//         }
//         // console.log(find);
//         // const hash = await bcrypt.hash(password, 10)

//         const match = await bcrypt.compare(password, find.password)
        
//         if(match) {
//             const {password, bio, ...rest} = find
//             const userInfo  = Object.assign({}, { ...rest})

//             const token = createToken(userInfo)

//             const decodedToken = jwtDecode(token)
//             const expiresAt = decodedToken.exp

//             req.session.find = userInfo
//         // console.log(req.session.find);
//             res.json({
//                 message: 'Authentication successful!',
//                 token,
//                 userInfo,
//                 expiresAt
//             })
//         }else {
//             res.status(403).json({message: 'Wrong email or password.'})
//         }
        
//     } catch (err) {
//         console.log(err);
//         return res.status(400).json({message: 'Something went wrong.'})
//     }

// }


module.exports = { auth }
