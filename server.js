const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require("path");


require('dotenv').config();

const routes = require('./src/routes')

const app = express()
const port = 5000

// Static Files
app.use(express.static(`${__dirname}/public`));
app.set("views", path.join(__dirname, "./src/views"));


// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs')

app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: "ilovecats",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 8),
        maxAge: 1000 * 60 * 60 * 8
    }
}))

app.use(express.json())

// Routes
app.get('', (req, res) => {
    res.render('index', { title: 'Home Page'})
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' })
})

routes(app);

app.use((req, res, next) => {
    res.locals = { user: req.cookies.user }
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});


app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`);
})
