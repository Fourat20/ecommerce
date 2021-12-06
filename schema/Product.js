const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = mongoose.Schema({
    name : String, 
    //created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Products', ProductSchema);

