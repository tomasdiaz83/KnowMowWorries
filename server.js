//TEMP Model Imports
const Listing = require('./models/Listing')
const Review = require('./models/Review')
const SavedListing = require('./models/SavedListing')
const User = require('./models/User')

//Importing dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Importing routes/helpers
const routes = require('./controllers');
const sequelize = require('./config/connection')
//const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

//const hbs = exphbs.create({ helpers });

const sess = {
    secret: process.env.SESS_SEC,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//app.engine('handlebars', hbs.engine);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Now listening for KnowMowWorries'));
});