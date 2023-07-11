const { Sequelize, DataTypes, Model } = require("sequelize");


module.exports = function createBasketModel(sequelize) {
    const Baskets = sequelize.define('baskets', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true
        }, 
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.DataTypes.INTEGER
        },
        total: {
            type: Sequelize.DataTypes.INTEGER
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
    );

    return Baskets
}