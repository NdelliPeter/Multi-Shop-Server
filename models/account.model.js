const { Sequelize, DataTypes } = require('sequelize')



module.exports = function createAccountModel(sequelize) {
    const Account = sequelize.define('accounts', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true
        },
        fullname: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
    );

    return Account
}


// const pool = require('../config/db')
// const bcrypt = require('bcrypt')
// require('dotenv').config()

// class Accounts {
//     async create(account) {

//         try{
//             const conn = pool;
//             const create = 'INSERT INTO accounts (fullname, username, email, password) VALUES($1, $2, $3, $4) RETURNING *'
//             const password = bcrypt.hashSync(account.password + process.env.ACCESS_TOKEN_SECRET)
//             const result = await conn.query(create, [account.fullname, account.username, account.email, password])
//             const user = result.rows[0]
//             conn.release()
//             return user
//         } catch(err){
//             console.log(err);
//         }



//         // try {
//         //     const pepper = process.env.JWT_TOKEN_PAS;
//         //     const saltRounds = process.env.SALT_ROUNDS ?? '10';
//         //     // @ts-ignore
//         //     const conn = await database_1.default.connect();
//         //     const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
//         //     const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
//         //     const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
//         //     const user = result.rows[0];
//         //     conn.release();
//         //     return user;
//         // }
//         // catch (err) {
//         //     throw new Error(`unable create user (${u.firstname}): ${err}`);
//         // }
//     }
// }