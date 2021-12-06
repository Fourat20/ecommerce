// manager offers 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OfferSchema = mongoose.Schema({
    title: String, 
    description: String, 
    image: String,
    price_before: String,
    price_after: String,
    percentage: String,
    priority: { type: Number, min: 1, max: 3 }, // liste de 1 a 3 
    start_date: Date,
    end_date: Date,
    provider: {type: Schema.Types.ObjectId, ref: 'providers', required: true}, 
    category: {type: Schema.Types.ObjectId, ref: 'categories', required: true}, 
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Offers', OfferSchema);

