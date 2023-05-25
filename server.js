const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config()

// Create express app
const app = express();

// Local imports
// const db = require('./data/db.json');
// const accountRoutes = require('./routes/Route')
// const productRoutes = require('./routes/Route')

const port = process.env.PORT || 5000;

// middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// route
const routes = require('./routes/Route')
app.use('/', routes)
app.use('/products' , require('./routes/products'))
app.use('/accounts' , require('./routes/account'))


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});