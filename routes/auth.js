const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth.controller');


router.route('/auth')
    .post(authController.auth)



module.exports = router;