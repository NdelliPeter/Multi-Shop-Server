const express = require("express");
const router = express.Router();
const basketController = require('../controllers/basket.controller');


router.route('/baskets')
    .get(basketController.getAllBasket)
    .post(basketController.createNewBasket)

router.route('/baskets/:id')
    .put(basketController.updateBasket)
    .delete(basketController.deleteBasket)
router.route('/baskets/:id') 
    .get(basketController.getBasket)

module.exports = router;