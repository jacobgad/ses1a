const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
	date: {
		type: Date,
		required: true,
	},
	noGuests: {
		type: Number,
		required: true,
	},
	table: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('Booking', BookingSchema);
