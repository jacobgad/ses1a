const Booking = require('../models/bookingModel')

module.exports.renderBooking = (req, res) => {
    res.render('booking/index');
}

module.exports.registerBooking = async (req, res) => {
    try {
        const { date, time, number} = req.body;
        const dateTime = time + date;
        const bookingMade = await Booking.register(dateTime, number)

    } catch (e) {
        req.flash('error', 'There was an error please try again soon');
        res.redirect('/booking')
    }
}