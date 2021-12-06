const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const GameViews = require('../schema/Game_views');
const User = require('../models/UserModel');
const Game = require('../schema/Game');



// set view
router.post('/', async (req, res) => {
    console.log("inside game View 000");
    try {

        // Check user 

        // first of all check if the user exist 
        var user = await User.findById(req.body.user_id.trim()).exec()

        console.log(user);

        if (user == null) {
            // throw new Error('No provider exist')
            res.status(500).json({ message: 'No user exist' })
        }


        var game = await Game.findById(req.body.game_id.trim()).exec()

        if (game == null) {
            // throw new Error('No provider exist')
            res.status(500).json({ message: 'No game exist' })
        }

        console.log(game);


        req.body.user = user
        req.body.game = game



        let game_view = new GameViews(req.body);
        let data = await game_view.save()
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({ message: error })
    }
});



//get 
router.get('/', async (req, res) => {
    try {
        const winner = await GameViews.find();
        res.status(200).json(winner);
    } catch (error) {
        res.status(500).json({ message: error })
    }

});




module.exports = router;
// npm install signale --save --dev