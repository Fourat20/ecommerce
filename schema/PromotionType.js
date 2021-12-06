const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PromotionTypeSchema = mongoose.Schema({
    name : String, 
    code : String,
    start_date: Date,
    exp_date: Date,
    // date 
    // Promotion for only one product or for all

})


module.exports = mongoose.model('PromotionTypeSchema', PromotionTypeSchema);

