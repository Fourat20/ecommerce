// Ajouter fournisseur 

const mongoose = require('mongoose');
const { Int32 } = require('mongodb');
const Schema = mongoose.Schema;


const CouponSchema = mongoose.Schema({
    status:  { type: Number, min: 0, max: 3 },
    discount : { type: Number, min: 0, max: 100 }, 
    coupon_code: String,
    offer: {type: Schema.Types.ObjectId, ref: 'offers', required: true}, 
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Coupons', CouponSchema);


