const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuItemSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		require: true,
	},
	description: String,
	image: String,
});

module.exports = mongoose.model('Menu', MenuItemSchema);
