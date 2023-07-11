const { Sequelize, DataTypes, Model } = require("sequelize");




// module.exports = (Sequelize, DataTypes, Model) => {

//     class Baskets extends Model { }

//     Baskets.init({
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
//         },
//         quantity: { 
//             type: DataTypes.NUMBER 
//         },
//         total: {
//             type: DataTypes.NUMBER
//         }
//     },{
//         Sequelize, 
//         modelName: 'baskets'
//     })


//     return Baskets
// }


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
    {}
    );

    return Baskets
}