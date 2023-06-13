const express = require("express");
const router = express.Router();
const checoutController = require('../controllers/checkout.controller');


router.route('/checkout')
    .get(checoutController.getCheckout)
    .post(checoutController.createCheckout)


module.exports = router;