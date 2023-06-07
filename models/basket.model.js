const { Sequelize, DataTypes, Model } = require("sequelize");




module.exports = (Sequelize, DataTypes, Model) => {

    class Baskets extends Model { }

    Baskets.init({
        name: { 
            type: DataTypes.STRING,
            allowNull: false 
        },
        image: { 
            type: DataTypes.IMAGE, 
        },
        category: { 
            type: DataTypes.STRING,
            allowNull: false 
        },
        price: { 
            type: DataTypes.NUMBER,
            allowNull: false
        },
        quantity: { 
            type: DataTypes.NUMBER 
        },
        total: {
            type: DataTypes.NUMBER
        }
    },{
        Sequelize, 
        modelName: 'baskets'
    })


    return Baskets
}