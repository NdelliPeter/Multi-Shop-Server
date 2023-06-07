const express = require("express");
const cors  = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

// Create express app
const app = express();
// client.connect()

const port = process.env.PORT || 4000;

// middleware
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route
const routes = require('./routes/Route');
app.use('/', routes);
app.use('/products' , require('./routes/products'));
app.use('/accounts' , require('./routes/accounts'));
app.use('/baskets', require('./routes/baskets'));



app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});