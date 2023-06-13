const { Sequelize, DataTypes, Model } = require("sequelize");




module.exports = (Sequelize, DataTypes, Model) => {

    class Checkout extends Model { }

    Checkout.init({
        id: { 
            type: DataTypes.SRING,
            allowNull: false
        },        
        subtotal: { 
            type: DataTypes.NUMBER,

        },
        shipping: { 
            type: DataTypes.NUMBER, 
        },
        generaltotal: { 
            type: DataTypes.NUMBER,

        },

    },{
        Sequelize, 
        modelName: 'checkout'
    })


    return Checkout
}