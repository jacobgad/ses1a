const Booking = require('../models/Booking');

module.exports.renderBooking = (req, res) => {
	res.render('bookings/index');
};

module.exports.registerBooking = async (req, res) => {
	try {
		let { date, time, tables } = req.body;
		date = new Date(date + ' ' + time);
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
