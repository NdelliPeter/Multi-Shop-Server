const { Sequelize, DataTypes, Model } = require("sequelize");



module.exports = function createProductModel(sequelize) {
    const Products = sequelize.define('products', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
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
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
    );

    return Products
}