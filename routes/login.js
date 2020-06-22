const express = require('express');
const passport = require('passport');
const router = express.Router();

const controller = require('../controller/controller');

router.get('/login',
    controller.checkNotAuthenticated,
    controller.renderLoginPage
);

router.post('/login',
    controller.checkNotAuthenticated,

    /* If passport authenticates user successfully, redirect user to 
    the main page, else redirect back to the login page. */
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

module.exports = router