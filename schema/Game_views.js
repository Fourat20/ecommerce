

const mongoose = require('mongoose');
const { Int32 } = require('mongodb');
const Schema = mongoose.Schema;


const GameViewsSchema = mongoose.Schema({
     // game_id + user_id'
    game: {type: Schema.Types.ObjectId, ref: 'games', required: true}, 
    user: {type: Schema.Types.ObjectId, ref: 'users', required: true}, 
    watch_video:  { type: Number, min: 0, max: 1 },
    created: { type: Date, default: Date.now }  
})

module.exports = mongoose.model('GameViews', GameViewsSchema);


