// just for test not used as link
const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const Ads = require('../schema/Ads');

const Offer = require('../schema/Offer');

// set Ads
router.post('/', async (req, res) => {
    try {
        let ads = new Ads(req.body);
        let data = await ads.save()
        res.json(data)

    } catch (error) {
        console.log(error);
        res.json({ message: error })
    }
});


//get ads
router.get('/',  async (req,res)=>{
    try {
        // display only active ads
        const ads = await Ads.find({status: 1});
        // const ads = await Ads.find({status: 1,created:{$gte: new Date} });
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({message: error})
    }

});



// update an ads
router.put('/:id', async (req, res) => {
    console.log("inside");
    Ads.updateMany({ _id: req.params.id }, { $set: req.body })
        .then(() => {
            res.status(200).json({ msg: "Ads updated ...." })
        }).catch(err => {
            res.status(409).json(err)
        })
});


// Delete Ads
router.delete('/:id', async (req, res) => {
    try {
        const ads = await Ads.deleteOne({ _id: req.params.id })
        res.status(200).json({
            message: 'Ads has been deleted ...',
            data: ads,
        })
    } catch (error) {
        res.status(500).json(error)
    }


});


module.exports = router;
