//TEMP Model Imports
// const Listing = require('./models/Listing')
// const Review = require('./models/Review')
// const SavedListing = require('./models/SavedListing')


//Importing dependencies
const path = require('path');
const express = require('express');
const passport = require('passport');
const app = express();
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
var authRoute = require('./controllers/api/auth')(app,passport);
var models = require("./models");
require('./config/passport/passport')(passport, models.user);


//Importing routes/helpers
const routes = require('./controllers');
const sequelize = require('./config/connection')
const helpers = require('./utils/helpers');


var authRoute = require('./controllers/authController.js');
app.use(express.urlencoded({
    extended: true
    })
);
app.use(express.json());
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: process.env.SESS_SEC,
    cookie: {},
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Now listening for KnowMowWorries'));
});