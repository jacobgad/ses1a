const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuItemSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: String,
	imageUrl: String,
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);