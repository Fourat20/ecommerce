const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = mongoose.Schema({
    name : { type: String, required: true } , 
    image: String,
    //created: { type: Date, default: Date.now }
    
})

module.exports = mongoose.model('Categories', CategorySchema);

