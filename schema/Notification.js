
const mongoose = require('mongoose');
const { Int32 } = require('mongodb');
const Schema = mongoose.Schema;


const NotificationSchema = mongoose.Schema({
    // offerid
    description: String,
    start_date: Date,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Notifications', NotificationSchema);


