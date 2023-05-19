const express = require('express');
const router = express.Router();
const fs = require('fs');

// Account route
const accountRoutes = require('./account.js');
router.use(accountRoutes);

// Product route
const productRoutes =require('./products.js');
router.use(productRoutes);


module.exports = router;