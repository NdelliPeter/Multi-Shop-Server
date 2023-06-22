// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres', 'postgres', 'Charles/123');

// // const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI)


// const testDbConnection = async () => {
//     try {
//       await sequelize.authenticate();
//       console.log("Connection has been established successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
//   };

//   module.exports = { sq: sequelize, testDbConnection };


// // module.exports = {
// //   HOST: "localhost",
// //   USER: "postgres",
// //   PASSWORD: "Charles/123",
// //   DB: "postgres",
// //   dialect: "postgres",
// //   pool: {
// //     max: 5,
// //     min: 0,
// //     acquire: 30000,
// //     idle: 10000
// //   }
// // };


const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()
 
const connectDb = async () => {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
 
        await client.connect()
        const res = await client.query('SELECT * FROM accounts')
        console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}
 
connectDb()

module.exports = {connectDb}