const { Sequelize, DataTypes, Model } = require("sequelize");




module.exports = (Sequelize, DataTypes, Model) => {

    class Products extends Model { }

    Products.init({
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
        Quantity: { 
            type: DataTypes.NUMBER 
        }
    },{
        Sequelize, 
        modelName: 'products'
    })


    return Products
}