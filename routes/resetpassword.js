const express = require("express");
const router = express.Router();
const resetPasswordController = require('../controllers/resetpassword.controller');

router.route('/:id')
    .put(resetPasswordController.resetpassword)


module.exports = router;
