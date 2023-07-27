const express = require("express");
const router = express.Router();
const filterController = require('../controllers/productFilter');

router.route('/')
    .get(filterController.getProductsByprice)

// router.route('/products/range')
//     .get(productsController.getProductsByprice)


module.exports = router;