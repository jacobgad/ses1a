if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongo')(session);
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');

//Connect to Mongo Database
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/restaurant';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => console.error('Connected to Database'));

//Express Setup
const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

//Express sessions
const secret = process.env.SECRET || '$6S%NU#SkkfB4qBQu!8u';

const store = new MongoDBStore({
	url: dbUrl,
	secret,
	touchAfter: 24 * 60 * 60,
});

store.on('error', function (e) {
	console.log('SESSION STORE ERROR', e);
});

const sessionConfig = {
	store,
	name: 'session',
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};
app.use(session(sessionConfig));

//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Express Routes
app.get('/', (req, res) => {
	res.render('home');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`serving on port ${port}`);
});
