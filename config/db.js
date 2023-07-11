

const { Pool } = require("pg")
require("dotenv").config()

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
 
// const connected = async () => {
//     try {
//         const pool = new Pool({
//             user: process.env.PGUSER,
//             host: process.env.PGHOST,
//             database: process.env.PGDATABASE,
//             password: process.env.PGPASSWORD,
//             port: process.env.PGPORT
//         })
 
//         await pool.connect()
//         const res = await pool.query('SELECT * FROM accounts')
//         console.log(res)
//         await pool.end()
//     } catch (error) {
//         console.log(error)
//     }
// }
 
// connected()

const pool = new Pool({
    connectionString: isProduction ? process.env.PGURL : connectionString
})

module.exports = { pool }