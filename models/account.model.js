const { Sequelize, DataTypes, Model } = require("sequelize");




module.exports = (Sequelize, DataTypes, Model) => {

    class Accounts extends Model { }

    Accounts.init({
        firstName: { 
            type: DataTypes.STRING,
            allowNull: false 
        },
        lastName: { 
            type: DataTypes.IMAGE, 
        },
        userName: { 
            type: DataTypes.STRING,
            allowNull: false 
        },
        email: { 
            type: DataTypes.NUMBER,
            allowNull: false
        },
        password: { 
            type: DataTypes.NUMBER 
        }
    },{
        Sequelize, 
        modelName: 'accounts'
    })


    return Accounts
}