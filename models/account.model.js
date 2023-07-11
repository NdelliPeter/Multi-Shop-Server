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

