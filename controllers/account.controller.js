const express =require('express');
const router = express.Router();


const  Account = require('../models/accounts.model');


router.get('/', (req, res) => {
    Account.find()
          .then(data => res.send(data))
          .catch(err => console.log(err))
  })

module.exports = router
