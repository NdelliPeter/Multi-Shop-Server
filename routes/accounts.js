const express = require("express");
const router = express.Router();
const accountsController = require('../controllers/account.controller');
// const veriftyJWT = require('../middleware/veriftyJWT')

router.route('/accounts')
    .get( accountsController.getAllAccounts)
    .post(accountsController.createAccount)

router.route('/:id')
    .put(accountsController.updateAccount)
    .delete(accountsController.deleteAccount)


router.route('/accounts/:id') 
    .get(accountsController.getAccount)

module.exports = router;
