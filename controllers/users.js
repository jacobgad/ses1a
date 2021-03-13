const crypto = require('crypto');

const User = require('../models/user');
const Emails = require('../controllers/emails');

module.exports.renderRegister = (req, res) => {
	res.render('users/register');
};

module.exports.register = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash('success', `Welcome ${username}`);
			res.redirect('/');
			Emails.welcome(email, username);
		});
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/register');
	}
};

module.exports.renderLogin = (req, res) => {
	res.render('users/login');
};

module.exports.login = (req, res) => {
	req.flash('success', `Welcome ${req.user.username}`);
	const redirectUrl = req.session.returnTo || '/';
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
	const { username } = req.user;
	req.logout();
	req.flash('success', `Goodbye ${username}`);
	res.redirect('/');
};

module.exports.renderEdit = async (req, res) => {
	const { username } = req.user;
	const user = await User.findOne({ username: username });
	if (!user) {
		req.flash('error', 'Cannot find that User');
		return res.redirect('/');
	}
	res.render('users/edit', { user });
};

module.exports.updateUser = async (req, res) => {
	const { username } = req.user;
	try {
		const { newUsername, email, password } = req.body;
		const user = await User.findOneAndUpdate({ username: username }, { username: newUsername, email: email });
		if (password) {
			await user.setPassword(password);
		}
		await user.save();
		req.flash('success', 'Successfully updated account');
		res.redirect(`/users/${newUsername}/edit`);
	} catch (e) {
		req.flash('error', e.message);
		res.redirect(`/users/${username}/edit`);
	}
};

module.exports.deleteUser = async (req, res) => {
	const { username } = req.user;
	await User.findOneAndDelete({ username: username });
	req.flash('success', 'Successfully deleted account');
	res.redirect('/');
};

module.exports.renderForgot = (req, res) => {
	res.render('users/forgot');
};

module.exports.forgot = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email: email });
	if (!user) {
		req.flash('error', 'No account with that email exists, please register with a new account');
		return res.redirect('/register');
	}

	const token = crypto.randomBytes(20).toString('hex');
	user.resetPasswordToken = token;
	user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	await user.save();

	Emails.forgot(email, token);
	req.flash('success', `A recovery email has been sent to ${email}`);
	res.redirect('/login');
};

module.exports.renderReset = async (req, res) => {
	const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
	if (!user) {
		req.flash('error', 'Password reset token is invalid or expired');
		return res.redirect('/login');
	}
	res.render('users/reset', { token: req.params.token });
};

module.exports.reset = async (req, res) => {
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
};
