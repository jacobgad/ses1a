const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
	id: String,
	seating: Number,
})

module.exports = mongoose.model('Table', TableSchema);