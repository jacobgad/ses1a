if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const User = require('./models/user');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const menuRoutes = require('./routes/menu');

//Connect to Mongo Database
const dbUrl = process.env.MONGO_URL;
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => console.error('Connected to Database'));

//Express Setup
const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());

//Express sessions
const secret = process.env.SECRET;

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

//Express Middleware
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

//Express Routes
app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/menu', menuRoutes);

app.get('/', (req, res) => {
	res.render('home');
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`serving on port ${port}`);
});
