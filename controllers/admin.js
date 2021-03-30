const User = require('../models/user');

module.exports.newAdmin = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username , role: 'admin'});
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

module.exports.renderIndex = (req, res) => {
    res.render('admin/index');

}
module.exports.renderNewAdmin = (req, res) => {
    res.render('admin/new')
}