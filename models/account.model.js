// const { Sequelize, DataTypes, Model } = require("sequelize");
// const pg = require('pg')
// // const Schema = pg.Schema


// module.exports = (Sequelize, DataTypes, Model) => {

//     class Accounts extends Model { }

//     Accounts.init({
//         id: { 
//             type: DataTypes.INTEGER,
//             allowNull: false 
//         },
//         fullname: { 
//             type: DataTypes.STRING,
//             allowNull: false 
//         },
//         role: { 
//             type: DataTypes.STRING, 
//         },
//         username: { 
//             type: DataTypes.STRING,
//             allowNull: false 
//         },
//         email: { 
//             type: DataTypes.NUMBER,
//             allowNull: false
//         },
//         password: { 
//             type: DataTypes.NUMBER 
//         }
//     },{
         
//         modelName: 'accounts'
//     })


//     return Accounts
// }

const { sq } = require('../config/db');
const { DataTypes } = require('sequelize');

const Accounts = sq.define('account', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            fullname: { 
                type: DataTypes.STRING,
                allowNull: false
            },
            role: { 
                type: DataTypes.STRING,
                allowNull: false 
            },
            username: { 
                type: DataTypes.STRING,
                allowNull: false 
            },
            email: { 
                type: DataTypes.NUMBER,
                allowNull: false
            },
            password: {
                type: DataTypes.NUMBER,
                allowNull: false
            }
        })

Accounts.sync().then(() => {
    console.log('Account model synced');
});

// const peter = Accounts.create({
//     id: 1234,
//     firstname: 'Ndelli',
//     lastname: 'Peter Ndemba',
//     username: 'Petex',
//     email: 'ndellipetex@gmail.com',
//     password: 'Ada/1234'
// })

module.exports = Accounts