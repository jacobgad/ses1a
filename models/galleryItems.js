const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	imageUrl: String,
});

module.exports = mongoose.model('GalleryItem', GalleryItemSchema);