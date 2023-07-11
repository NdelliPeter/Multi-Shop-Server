const { Sequelize, DataTypes, Model } = require("sequelize");




// module.exports = (Sequelize, DataTypes, Model) => {

//     class Products extends Model { }

//     Products.init({
//         name: { 
//             type: DataTypes.STRING,
//             allowNull: false 
//         },
//         image: { 
//             type: DataTypes.IMAGE, 
//         },
//         category: { 
//             type: DataTypes.STRING,
//             allowNull: false 
//         },
//         price: { 
//             type: DataTypes.NUMBER,
//             allowNull: false
//         }
//     },{
//         Sequelize, 
//         modelName: 'products'
//     })


//     return Products
// }

module.exports = function createProductModel(sequelize) {
    const Products = sequelize.define('products', {
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
    {}
    );

    return Products
}