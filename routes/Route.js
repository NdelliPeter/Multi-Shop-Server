const express = require('express');
const router = express.Router();
// const fs = require('fs');

// Account route
const accountRoutes = require('./accounts.js');
router.use(accountRoutes);

// Product route
const productRoutes =require('./products.js');
router.use(productRoutes);

// Basket route
const basketRoutes = require('./baskets.js');
router.use(basketRoutes);

// Checkout route
const checkoutRoutes = require('./checkout.js');
router.use(checkoutRoutes);


module.exports = router;