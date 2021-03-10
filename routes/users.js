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
		req.flash('success', `Welcome ${username}`);
		res.redirect('/');
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/register');
	}
});

router.get('/login', (req, res) => {
	res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
	req.flash('success', `Welcome ${req.user.username}`);
	res.redirect('/');
});

router.get('/logout', (req, res) => {
	req.flash('success', `Goodbye ${req.user.username}`);
	req.logout();
	res.redirect('/');
});

router.get('/users/:username/edit', async (req, res) => {
	const { username } = req.body;
	const user = await User.findOne({ username: 'jacob' });
	if (!user) {
		req.flash('error', 'Cannot find that User');
		return res.redirect('/');
	}
	res.render('users/edit', { user });
});

module.exports = router;
