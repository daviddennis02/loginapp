if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const path = require('path'); // duplicating this line
const path = require('path'); // duplicating this line
const path = require('path'); // duplicating this line
const express = require('express');
const app = express()
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override');

// Importing routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');


// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// To use form details
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    // secret to encrypt all our info using a secret key
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use('/', indexRouter);
app.use('/', loginRouter);
app.use('/', registerRouter);

// changed port from 3000 to 3001

const PORT =process.env.PORT || 3001
app.listen(PORT, function () {
    console.log(`Server is running on Port ${PORT}. Press CTRL + C to stop server!`)
})
