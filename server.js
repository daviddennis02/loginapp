if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const app = express()
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
 const methodOverride = require('method-override');


// To authenticate user
const initializePassport = require('./passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

const users = []

// setup view engine
app.set('view engine', 'ejs');


// To use form details
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    // secret to encrypt all our info using a secret key
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// setup route for our app
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index', {name: req.user.name})
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
});

// POST 
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.post('/register', checkNotAuthenticated, async(req, res) => {
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
    // console.log(users); // for dev environment
})

// Logout user
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

// Check if user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

// Check if user is not authenticated
function checkNotAuthenticated(req, res, next) {
     if (req.isAuthenticated()) {
        return res.redirect('/')
    } 
    next()
}

const PORT =process.env.PORT || 3000
app.listen(PORT, function () {
    console.log(`Server is running on Port ${PORT}. Press CTRL + C to stop server!`)
})