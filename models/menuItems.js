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
	course:{
type: String,
enum: ['Entree', 'Main', 'Dessert'],
required: true,
	},

	
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
