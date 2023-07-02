const express = require("express");
const router = express.Router();
const refreshController = require('../controllers/refreshToken.controller');


router.route('/refresh')
    .get(refreshController.handleRefreshToken)



module.exports = router;