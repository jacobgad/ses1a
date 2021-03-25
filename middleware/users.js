module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		req.flash('error', 'You must be signed in first!');
		return res.redirect('/login');
	}
	next();
};

module.exports.isUser = (req, res, next) => {
	const { username } = req.params;
	if (username !== req.user.username) {
		req.flash('error', 'You do not have permission to do that');
		return res.redirect('/login');
	}
	next();
};
