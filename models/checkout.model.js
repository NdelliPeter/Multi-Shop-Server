const { Sequelize, DataTypes, Model } = require("sequelize");



module.exports = function createCheckoutModel(sequelize) {
    const Checkout = sequelize.define('checkout', {
        subtotal: {
            type: Sequelize.DataTypes.INTEGER,
        },
        shipping: {
            type: Sequelize.DataTypes.INTEGER,
        },
        generaltotal: {
            type: Sequelize.DataTypes.INTEGER,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
    );

    return Checkout
}