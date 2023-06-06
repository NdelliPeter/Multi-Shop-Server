const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Charles/123",
    database: "postgres"
})
module.exports = client

const { Pool } = require('pg')

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Charles/123",
    database: "postgres"
})
module.exports = pool

