const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	url: String,
	filename: String,
});

const MenuItemSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: String,
	image: ImageSchema,
	course:{
		type: String,
		enum: ['Entree', 'Main', 'Dessert'],
		
	},
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
