const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
 
router.get('/register',
    controller.checkNotAuthenticated,
    controller.renderRegisterPage
);

router.post('/register',
    controller.checkNotAuthenticated,
    controller.registrationDetailSetup
);

module.exports = router