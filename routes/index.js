const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

// Get the Homepage after successful login
router.get('/',
    controller.checkAuthenticated,
    controller.renderHomePage
);

router.delete('/logout', controller.renderLogout)


module.exports = router