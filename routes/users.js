const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
	res.render('users/register');
});

router.post('/register', async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash('success', `Welcome ${username}`);
			res.redirect('/');
		});
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/register');
	}
});

router.get('/login', (req, res) => {
	res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
	req.flash('success', 'Welcome back');
	res.redirect('/');
});

module.exports = router;
