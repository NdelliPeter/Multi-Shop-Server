const express = require("express");
const app = express();
const bodyParser = require('body-parser')

// Local imports
const db = require('./data/db.json');
const accountRoutes = require('./controllers/account.controller')

const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use('/api/accounts', accountRoutes);



db().then(() => {
  console.log('db connected Successfully');
  app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
  });
}).catch(err => console.log(err))


