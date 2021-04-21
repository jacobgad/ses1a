const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const DiscountCodeSchema = mongoose.Schema({

    code: {
        type: String,
        required: true,
        unique: true
    },
    isPercent: {
        type: Boolean,
        // required: true,
        default: true
    },
    amount: {
        type: Number,
        required: true
    },
    expireDate: {
        type: Boolean,
        // required: true,
        default: true
    }});

    // DiscountCodeSchema.pre('save', function (next)){
    //     let currentDate = new Date();
    //     this.update_at = currentDate;
    //     if(!this.created_at){
    //         this.created_at = currentDate;
    //     }
    //     next();
    // }
// });

module.exports = mongoose.model('DiscountCodes', DiscountCodeSchema);
