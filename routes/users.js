const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const Emails = require('../controllers/emails');
const crypto = require('crypto');

router.get('/register', (req, res) => {
	res.render('users/register');
});

router.post('/register', async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.flash('success', `Welcome ${username}`);
		res.redirect('/login');
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
	const { username } = req.params;
	const user = await User.findOne({ username: username });
	if (!user) {
		req.flash('error', 'Cannot find that User');
		return res.redirect('/');
	}
	res.render('users/edit', { user });
});

router.put('/users/:username', async (req, res) => {
	const { username } = req.params;
	const { newUsername, email, password } = req.body;
	const user = await User.findOneAndUpdate({ username: username }, { username: newUsername, email: email });
	if (password) {
		await user.setPassword(password);
	}
	await user.save();
	req.flash('success', 'Successfully updated account');
	res.redirect(`/users/${newUsername}/edit`);
});

router.delete('/users/:username', async (req, res) => {
	const { username } = req.params;
	await User.findOneAndDelete({ username: username });
	req.flash('success', 'Successfully deleted account');
	res.redirect('/');
});

router.get('/forgot', (req, res) => {
	res.render('users/forgot');
});

router.post('/forgot', async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email: email });
	if (!user) {
		req.flash('error', 'No account with that email exists.');
		res.redirect('users/forgot');
	}

	const token = crypto.randomBytes(20).toString('hex');
	user.resetPasswordToken = token;
	user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	await user.save();

	Emails.forgot(email, token);
	req.flash('success', 'A recovery email has been sent, please check you inbox');
	res.redirect('/login');
});

router.get('/reset/:token', async (req, res) => {
	const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
	if (!user) {
		req.flash('error', 'Password reset token is invalid or expired');
		return res.redirect('/login');
	}
	res.render('users/reset', { token: req.params.token });
});

router.post('/reset/:token', async (req, res) => {
	const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
	if (!user) {
		req.flash('error', 'Password reset token is invalid or expired');
		res.redirect('/login');
	}
	await user.setPassword(req.body.password);
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	await user.save();
	req.flash('success', 'Password has been reset');
	res.redirect('/login');
});

module.exports = router;
