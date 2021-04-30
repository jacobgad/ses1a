const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
	date: {
		type: Date,
		required: true,
	},
	tables: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const TableSchema = new Schema({
	id: String,
	seating: Number,
})

module.exports = mongoose.model('Table', TableSchema);
module.exports = mongoose.model('Booking', BookingSchema);
