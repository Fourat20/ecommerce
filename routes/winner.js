// just for test not used as link
const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const Winner = require('../schema/Winner');


const User = require('../models/UserModel');
const Game = require('../schema/Game');

const GameViews = require('../schema/Game_views');


// set view
router.post('/', async (req, res) => {
    // console.log("inside winner View 000");
/*     try {

        // Check user 

        // first of all check if the user exist 
        var user = await User.findById(req.body.user_id.trim()).exec()


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



        let winner = new Winner(req.body);
        let data = await winner.save()
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({ message: error })
    } */
    res.status(200).json({"message": "not working"}); 
});



//get winners - passing game ID as params
// http://localhost:8000/winner/draw/602028034f165d2020b9dc6e

router.get('/draw/:id', async (req, res) => {
    try {
        /*         const winner = await GameViews.find();
                res.status(200).json(winner); */

        // Get the count of all views
        GameViews.find({ watch_video: 1, game: req.params.id }).count().exec(function (err, count) {

            // Get a random entry
            var random = Math.floor(Math.random() * count)

            // Again query all views but only fetch one offset by our random #
            GameViews.findOne({ watch_video: 1, game: req.params.id }).skip(random).exec(
                function (err, result) {

                    // if got a valid result 
                    // save data to winner DB 
                    req.body.user = result.user
                    req.body.game = result.game


                    let winner = new Winner(req.body);
                    // let winner_info =
                    winner.save().then((winner_info) => {

                        // console.log("we are here ");
                        // display the winner name and details 

                        const winner_infox = JSON.parse(JSON.stringify(winner_info))
                        delete winner_infox['__v'];

                        //console.log(winner_info);

                        User.findById(result.user).then((usr,) => {
                            // if user object exist get the NAME

                            if (usr) {
                                winner_infox.details = { username: usr.name, time: winner_info.created }
                                //usr.name + " " + winner.created
                                res.json(winner_infox);
                            } else {
                                res.json(winner_info);
                            }

                        })
                            .catch(err => console.log(err))
                    })

                    //res.status(200).json(result);
                    // console.log(result)
                })
        })


    } catch (error) {
        res.status(500).json({ message: error })
    }


});


//  List winners 
router.get('/', async (req, res) => {
    
    try {

        const winners = await Winner.find()
        res.json(winners);

    } catch (error) {
        res.json({ message: error })
    }

})


module.exports = router;
