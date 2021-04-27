const User = require('../models/user');

module.exports.isNotUser = async (req, res, next) => {
	const { id } = req.user;
	const user = await User.findById(id);
	if (user.role === 'user') {
		req.flash('error', 'You do not have permission to do that');
		return res.redirect('/');
	}
	next();
};

module.exports.isStaff = async (req, res, next) => {
	const { id } = req.user;
	const user = await User.findById(id);
	if (user.role !== 'staff') {
		req.flash('error', 'You do not have permission to do that');
		return res.redirect('/');
	}
	next();
};

module.exports.isAdmin = async (req, res, next) => {
	const { id } = req.user;
	const user = await User.findById(id);
	if (user.role !== 'admin') {
		req.flash('error', 'You do not have permission to do that');
		return res.redirect('/');
	}
	next();
};

module.exports.noAdmin = async (req, res, next) => {
	const admin = await User.findOne({ role: 'admin' });
	if (!admin) return res.redirect('/admin/new');
	next();
};
