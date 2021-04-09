const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    email: {type: String, require: true},
    dateTime: {type: String, require: true},
    numberBooked: {type: Number, require: true}
});

module.export = mongoose.model('Booking', BookingSchema);