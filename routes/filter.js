const express = require("express");
const router = express.Router();
const filterController = require('../controllers/productFilter');

router.route('/')
    .get(filterController.getProductsByprice)

router.route('/painting')
    .get(filterController.getPaintingsByprice)

router.route('/sculpture')
    .get(filterController.getSculpturesByprice)
router.route('/fabric')
    .get(filterController.getFabricByprice)


module.exports = router;