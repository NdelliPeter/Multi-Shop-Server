const express = require("express");
const router = express.Router();
const checoutController = require('../controllers/checkout.controller');


router.route('/')
    .get(checoutController.getCheckout)
    .post(checoutController.createCheckout)

router.route('/:id')
    // .put(basketController.updateBasket)
    .delete(checoutController.deleteCheckout)


module.exports = router;