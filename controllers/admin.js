const User = require('../models/user');
const Discount = require('../models/discount');
const Menu = require('../models/menuItems');
const Emails = require('../controllers/emails');

module.exports.renderIndex = async (req, res) => {
	res.render('admin/index', {page: 'index'});
};

module.exports.renderFirstAdmin = async (req, res) => {
	const admin = await User.findOne({ role: 'admin' });
	if (admin) return res.redirect('/admin');
	res.render('admin/new');
};

module.exports.firstAdmin = async (req, res) => {
	const admin = await User.findOne({ role: 'admin' });
	if (admin) return res.redirect('/admin');
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username, role: 'admin' });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash('success', `Welcome ${username}`);
			res.redirect('/admin');
			Emails.welcome(email, username);
		});
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/admin/new');
	}
};

module.exports.renderStaff = async (req, res) => {
	const users = await User.find({});
	res.render('admin/staff', { users, page: 'staff' });
};

module.exports.newStaff = async (req, res) => {
	try {
		const { email, username, password, role } = req.body;
		if (role === 'admin' && req.user.role !== 'admin') {
			req.flash('error', 'You do not have permission to do that');
			return res.redirect('/admin/staff');
		}
		const user = new User({ email, username, role });
		await User.register(user, password);
		req.flash('success', `${username} has been added as ${role}`);
		res.redirect('/admin/staff');
		Emails.welcome(email, username);
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/admin/staff');
	}
};

module.exports.updateStaff = async (req, res) => {
	try {
		const { id, newUsername, email, password, role } = req.body;
		if (role === 'admin' && req.user.role !== 'admin') {
			req.flash('error', 'You do not have permission to do that');
			return res.redirect('/admin/staff');
		}
		const user = await User.findByIdAndUpdate(
			id,
			{ username: newUsername, email: email, role: role },
			{ runValidators: true }
		);
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

module.exports.renderDiscounts = async (req, res) => {
	const discounts = await Discount.find({});
	res.render('admin/discount', { discounts, page: 'discounts' });
};

module.exports.newDiscount = async (req, res) => {
	try {
		const { code, percentage } = req.body;
		// const coup = coupGen();
		const discount = new Discount({
			code: code,
			amount: percentage,
		});
		await discount.save();
		res.redirect('/admin/discounts');
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/admin/discounts');
	}
};

module.exports.deleteDiscount = async (req, res) => {
	const { id } = req.body;
	await Discount.findByIdAndRemove({ _id: id });
	req.flash('success', 'Successfully deleted discount');
	res.redirect('/admin/discounts');
};

module.exports.renderMenu = async (req, res) => {
	const menu = await Menu.find({});
	res.render('admin/menu', { menu, page: 'menu' });
};
