const express = require("express");
const router = express.Router();
const productsController = require('../controllers/product.controller');

router.route('/')
    .get(productsController.getAllProducts)
    .post(productsController.createNewProduct)

// router.route('/products/range')
//     .get(productsController.getProductsByprice)

router.route('/products/:id')
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)
router.route('/products/:id') 
    .get(productsController.getProduct)

module.exports = router;