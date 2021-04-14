const Booking = require('../models/Booking');

module.exports.renderBooking = (req, res) => {
	res.render('booking/index');
};

module.exports.registerBooking = async (req, res) => {
	try {
		const { date, tables } = req.body;
		const user = req.user.id;
		const newBooking = new Booking({ date, tables, user });
		await newBooking.save();
		res.redirect('/bookings');
	} catch (e) {
		req.flash('error', 'There was an error please try again soon');
		res.redirect('/bookings');
	}
};

module.exports.renderNewBooking = (req, res) => {
	res.render('bookings/new');
};
