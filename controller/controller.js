// Import modules
const passport = require('passport');
const bcrypt = require('bcrypt');

// To authenticate user
const initializePassport = require('../passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

// Array that stores user details temporarily
const users = []

// Check if user is authenticated
exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

// Check if user is not authenticated
exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

// Setup registration details here
exports.registrationDetailSetup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users); // for dev environment
}

// Render pages
exports.renderHomePage = (req, res) => {
    res.render('index', {
        name: req.user.name,
        title: 'Home | Loginapp'
    })
}

exports.renderLoginPage = (req, res) => {
    res.render('login', {
        title: 'Login | EMVIS'
    })
}

exports.renderRegisterPage = (req, res) => {
    res.render('register', {
        title: 'Register | Loginapp'
    })
}

exports.renderLogout = (req, res) => {
    req.logOut()
    res.redirect('/login')
}