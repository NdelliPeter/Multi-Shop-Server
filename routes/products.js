const express = require("express");
const router = express.Router();
const productsController = require('../controllers/product.controller');


router.route('/products')
    .get(productsController.getAllProducts)
    .post(productsController.createNewProduct)

router.route('/products/:id')
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)
router.route('/:id') 
    .get(productsController.getProduct)

module.exports = router;