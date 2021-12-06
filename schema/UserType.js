const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserTypeSchema = mongoose.Schema({
    name : String, 
})


module.exports = mongoose.model('UserType', UserTypeSchema);

