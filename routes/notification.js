// just for test not used as link
const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const Notification = require('../schema/Notification');

const Offer = require('../schema/Offer');

// set view
router.post('/', async (req, res) => {
    try {
        // first of all check if the offer exist 
        var offer = await Offer.findById(req.body.offer_id.trim()).exec()

        if (offer == null) {
            res.status(500).json({ message: 'No offer exist' })
        }

        req.body.offer = offer
       
        let notification = new Notification(req.body);
        let data = await notification.save()
        res.json(data)

    } catch (error) {
        console.log(error);
        res.json({ message: error })
    }
});


//get notifications
router.get('/',  async (req,res)=>{
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({message: error})
    }

});



// update notification
router.put('/:id', async (req, res) => {
    console.log("inside");
    Notification.updateMany({ _id: req.params.id }, { $set: req.body })
        .then(() => {
            res.status(200).json({ msg: "Notification updated ...." })
        }).catch(err => {
            res.status(409).json(err)
        })
});


// Delete notification
router.delete('/:id', async (req, res) => {
    try {
        const notification = await Notification.deleteOne({ _id: req.params.id })
        res.status(200).json({
            message: 'Notification has been deleted ...',
            data: notification,
        })
    } catch (error) {
        res.status(500).json(error)
    }
}); 

module.exports = router;
