// to discuss later ON 
// take the userID and the offer ID and the timing at the same time 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatisticSchema = mongoose.Schema({
    userID : String, 
    offerID: String, 
    created: { type: Date, default: Date.now }
    //created: { type: Date, default: Date.now }
    
})

module.exports = mongoose.model('Statistics', StatisticSchema);


