const express = require("express");
const cors = require("cors")({origin: true});
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser()) ;
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

app.use(express.static(`${__dirname}/public`));
app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");
app.locals.moment = require('moment');

app.use(
  session({
    secret: "secret001",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


app.options("*", cors);

const dashboard = require("./routes/dashboard");
const studentsRoute = require("./routes/students");

app.use("/", dashboard);
app.use("/students", studentsRoute);

module.exports = app;
