const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    email: {type: String, require: true},
    dateTime: {type: String, require: true},
    numberBooked: {
        children: Number,
        adults: Number
    }
});

module.export = mongoose.model('Booking', BookingSchema);