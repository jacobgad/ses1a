const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: String, 
		enum: ['user', 'staff', 'admin'],
		default: 'user',
		required: true,
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
