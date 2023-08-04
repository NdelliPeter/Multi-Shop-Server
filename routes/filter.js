const express = require("express");
const router = express.Router();
const filterController = require('../controllers/productFilter');

router.route('/')
    .get(filterController.getProductsByprice)

router.route('/painting')
    .get(filterController.getPaintingsByprice)

router.route('/sculpture')
    .get(filterController.getSculpturesByprice)


module.exports = router;