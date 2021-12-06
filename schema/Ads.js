
const mongoose = require('mongoose');
const { Int32 } = require('mongodb');
const Schema = mongoose.Schema;


const AdsSchema = mongoose.Schema({
    // offerid
    image: String,
    is_banner: { type: Boolean, default: false }, 
    status:  { type: Number, min: 0, max: 3 },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Ads', AdsSchema);


