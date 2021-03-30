const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MenuItemSchema = new Schema({
    itemName: {type: String, require: true},
    itemPrice: {type: Number, require: true},
    itemDisc: String, 
    itemImageUrl: String,
})

module.exports = mongoose.model('Menu', MenuItemSchema)