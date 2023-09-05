const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER,process.env.PGPASSWORD, {dialect: "postgres"})


//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.accounts = require('./account.model') (sequelize, DataTypes)
db.products = require('./product.model') (sequelize, DataTypes)
db.baskets = require('./basket.model') (sequelize, DataTypes)
db.checkout = require('./checkout.model') (sequelize, DataTypes)


module.exports = db