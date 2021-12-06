// just for test not used as link

// just for test not used as link
const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const Coupon = require('../schema/Coupon');


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
       
        let coupon = new Coupon(req.body);
        let data = await coupon.save()
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({ message: error })
    }
});




module.exports = router;
