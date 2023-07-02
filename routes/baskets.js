const express = require("express");
const router = express.Router();
const basketController = require('../controllers/basket.controller');


router.route('/')
    .get(basketController.getAllBasket)
    .post(basketController.createNewBasket)
    .delete(basketController.deleteAll)

router.route('/baskets/:id')
    .put(basketController.updateBasket)
    .delete(basketController.deleteBasket)
router.route('/baskets/:id') 
    .get(basketController.getBasket)

module.exports = router;