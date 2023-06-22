const express = require("express");
const router = express.Router();
const accountsController = require('../controllers/account.controller');


router.route('/accounts')
    .get(accountsController.getAllAccounts)
    .post(accountsController.createAccount)

router.route('accounts/:id')
    .put(accountsController.updateAccount)
    .delete(accountsController.deleteAccount)


router.route('/accounts/:id') 
    .get(accountsController.getAccount)

module.exports = router;

// const express = require('express');
// const accountsController = require('../controllers/account.controller');
// const { signup, login } = accountsController
// const accountAuth = require('../middleware/accountAuth');

// const router = express.Router();

// router.post('/signup', accountAuth.saveAccount, signup);

// router.post('/login', login)


// module.exports = router
