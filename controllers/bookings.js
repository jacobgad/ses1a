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

module.exports.renderNewBooking = async (req, res) => {
	const bookings = await Booking.find({ date: { $gte: Date.now(), $lte: Date.now() + 12096e5 } });
	let bookedSlots = avalibility(bookings);
	res.render('bookings/new', { bookedSlots });
};

//Helper Functions
function avalibility(bookings) {
	let avalibility = {};
	for (let booking of bookings) {
		const { date } = booking;
		avalibility[date] ? (avalibility[date] += 1) : (avalibility[date] = 1);
	}
	return avalibility;
}
