const User = require('../models/user');
const Emails = require('../controllers/emails');

module.exports.renderIndex = (req, res) => {
	res.render('admin/index');
};

module.exports.renderNewAdmin = (req, res) => {
	res.render('admin/new');
};

module.exports.newAdmin = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username, role: 'admin' });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash('success', `Welcome ${username}`);
			res.redirect('/admin/staff');
			Emails.welcome(email, username);
		});
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/admin/new');
	}
};

module.exports.renderStaff = async (req, res) => {
	const users = await User.find({});
	res.render('admin/staff', { users });
};

module.exports.newStaff = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username, role: 'staff' });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash('success', `Welcome ${username}`);
			res.redirect('/admin/staff');
			Emails.welcome(email, username);
		});
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/admin/staff');
	}
};

module.exports.updateStaff = async (req, res) => {
	try {
		const { id } = req.body;
		const { newUsername, email, password } = req.body;
		const user = await User.findByIdAndUpdate(id, { username: newUsername, email: email });
		if (password) {
			await user.setPassword(password);
		}
		await user.save();
		req.flash('success', 'Successfully updated user');
		res.redirect('/admin/staff');
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/admin/staff');
	}
};

module.exports.deleteStaff = async (req, res) => {
	const { id } = req.body;
	await User.findByIdAndRemove({ _id: id });
	req.flash('success', 'Successfully deleted user');
	res.redirect('/admin/staff');
};
