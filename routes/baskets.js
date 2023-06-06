const express = require("express");
const router = express.Router();
const basketController = require('../controllers/basket.controller');


router.route('/baskets')
    .get(basketController.getAllProducts)
    .post(basketController.createNewProduct)

router.route('/baskets/:id')
    .put(basketController.updateProduct)
    .delete(basketController.deleteProduct)
router.route('/baskets/:id') 
    .get(basketController.getProduct)

module.exports = router;