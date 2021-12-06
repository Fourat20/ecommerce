const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Game = require('../schema/Game');
const Winner = require('../schema/Winner');

const User = require('../models/UserModel');

// get One game 
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id)
        if (game) {
            // display if there any winner his name and the timing 

            Winner.find({}).sort({_id: -1}).limit(1).then((winner) => {
                // console.log(winner[0])
                // if got user search for username
              
                // if user not null
                if(winner[0]){

                    const user_id = winner[0].user
                    // console.log(user_id);
                   User.findById(user_id).then((usr,  )=>{
                    console.log(usr)
                    // if user object exist get the NAME
                    const game_x = JSON.parse(JSON.stringify(game))
                    delete game_x['__v'];
                    game_x.last_winner = {username: usr.name, time: winner[0].created  }
                    //usr.name + " " + winner.created
                     res.json(game_x);
                  })
                    
                }else{
                    // NO user_id exists 
                    res.json(game);
                }
            })

            
/*             Winner.findOne(  function (err, docs) { 
                if (err){ 
                    console.log(err) 
                } 
                else{ 
                    console.log("Result : ", docs); 
                } 
            }); */ 

            
           

        } else {
            res.json({ error: "No Game exist" });
        }

    } catch (error) {
        console.log(error);
        res.json({ message: error })
    }
})


// get all games 
router.get('/', async (req, res) => {
    try {
        const games = await Game.find()
        res.json(games);
    } catch (error) {
        res.json({ message: error })
    }
})

// create a game
router.post('/', async (req, res) => {
    console.log("inside");
    try {
        // req.body.name = "sami"
        // req.body.end_date = "2020-01-04"
        let game = new Game(req.body);


        console.log(req.body);
        let data = await game.save()
        // * Retreive data 
        // > Convert ISO Date to timestamp 
        //  > console.log(data.end_date);
        // data.end_date = convertDateToMs(data.end_date) ;

        //  Fix an issue related to timestamp

        /*        data.end_date = "4@PROD "
               data['end_date'] = "4@PROD" ; */

        data = JSON.parse(JSON.stringify(data))
        //  Convert ISO date to timestamp
        data.end_date = convertDateToMs(data.end_date)



        /*         console.log(data.end_date);
                let _dt = convertDateToMs(data.end_date)
                let fr = {"name": "Fourat", date: _dt }
                fr.name  = "prod action "
                form.description = "moderated"  */


        res.json(data)
        // res.json(data)
    } catch (error) {
        res.status(500).json({ message: error })
    }
});


// update a game
router.put('/:id', async (req, res) => {
    console.log("inside");
    Game.updateMany({ _id: req.params.id }, { $set: req.body })
        .then(() => {
            res.status(200).json({ msg: "Game updated ...." })
        }).catch(err => {
            res.status(409).json(err)
        })
});


// Delete provider
router.delete('/:id', async (req, res) => {
    try {
        const game = await Game.deleteOne({ _id: req.params.id })
        res.status(200).json({
            message: 'Game has been deleted ...',
            data: game,
        })
    } catch (error) {

        res.status(500).json(error)
    }


});



// Tools Converter
function convertDateToMs(d) {
    var mydate = new Date(d);
    console.log(mydate.toDateString());
    let _timestamp = Math.floor(+mydate / 1000)

    return _timestamp;
}




module.exports = router;
// npm install signale --save --dev