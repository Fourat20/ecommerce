const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Offer = require('../schema/Offer');
const Provider = require('../schema/Provider');
// add the Category to the Offer 
const Category = require('../schema/Category');
const Statistic = require('../schema/Statistics');


// call coupon code HERE 
const Coupon = require('../schema/Coupon');



// get all offers 
router.get('/', async (req, res) => {
    try {
        // try to save some stats 
        let statistic = new Statistic({ userID: "--", offerID: "all-offers" });
        let stat = await statistic.save()

        // minus date 
        let d = new Date
        let minus_date = d.setDate(d.getDate() - 1)


        const offers = await Offer.find({ start_date: { $gte: minus_date } })
        // const ads = await Ads.find({status: 1,created:{$gte: new Date} });

        // try to return statistics for each offer --nb views 


        /*         offers.forEach((element) => {
                    element.views = "30"
                    console.log(element);
                });
        
                for (let i = 0; i < offers.length; i++) {
                    offers[i].percentage = "30"
                    // console.log(data.products[i].product_desc); //use i instead of 0
                } */


        const offs = JSON.parse(JSON.stringify(offers))
        delete offs['__v'];


        for (let i = 0; i < offs.length; i++) {
            // const stats = await Statistic.count({ offerID: offs[i]._id });
            const stats = await Statistic.countDocuments({ offerID: offs[i]._id });
            //collection.countDocuments

            offs[i].views = stats
            // console.log(data.products[i].product_desc); //use i instead of 0
        }

        // res.json(offers);
        res.json(offs);
    } catch (error) {
        res.json({ message: error })
    }
})




// get Offer coupon Codes
router.get('/coupons/:id', async (req, res) => {
    try {
        const coupons = await Coupon.find({ offer: req.params.id })
        res.json(coupons);
    } catch (error) {
        res.json({ message: error })
    }
})




// create an offer
router.post('/-draft', async (req, res) => {
    console.log("inside");
    try {
        // add the provider NOW 
        var ObjectId = require('mongoose').Types.ObjectId;
        if (mongoose.Types.ObjectId(req.body.provider_id.trim()) === false) {
            throw new Error('No valid ID')
        }
        // first of all check if the provider exist 
        var provider = await Provider.findById(req.body.provider_id.trim()).exec()

        if (provider == null) {
            // throw new Error('No provider exist')
            res.status(500).json({ message: 'No provider exist' })
        }

        // check if the category exists 
        var category = await Category.findById(req.body.category_id.trim()).exec()

        if (category == null) {
            res.status(500).json({ message: 'No Category exist' })
            // console.log("No Category exist");
            // throw new Error('No Category exist')
        }

        req.body.provider = provider
        req.body.category = category

        let offer = new Offer(req.body);
        let data = await offer.save()
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error })
    }
});


// Test can I
router.get('/cani', async (req, res) => {
    // console.log(Math.random() < 0.1);
    data = { response: Math.random() < 0.8 }
    res.json(data)
})

// update an offer 
router.put('/:id', async (req, res) => {
    console.log("inside");
    Offer.updateMany({ _id: req.params.id }, { $set: req.body })
        .then(() => {
            res.status(200).json({ msg: "Offer updated ...." })
        }).catch(err => {
            res.status(409).json(err)
        })
});


// Delete provider
router.delete('/:id', async (req, res) => {
    try {
        const offer = await Offer.deleteOne({ _id: req.params.id })
        res.status(200).json({
            message: 'Offer has been deleted ...',
            data: offer,
        })
    } catch (error) {
        res.status(500).json(error)
    }


});


// find One Offer 
router.get('/:id', async (req, res) => {

    try {
        const offer = await Offer.findById(req.params.id)
        if (offer) {
            // try to save some stats 
            // get the offer ID 
            let statistic = new Statistic({ userID: "--", offerID: offer.id });
            let stat = await statistic.save()
            // const off = offer
            // check if offer Exist and try to return coupon code if possible

            /*             offer.coupon = { coupon_code: 3 }
                        offer.priority = 1
                        offer['fr'] = 33 */


            /*             const y =  JSON.stringify(off)
                         console.log(JSON.parse(y)); 
                         const fr = JSON.parse(y)  ;
                         delete fr['__v'];
                         fr.coupon = {coupon_code: "xxx-yyyy"} */


            if (caniReturnCoupon()) {

                // Search a coupon code that have  valid status
                const coupon = await Coupon.findOne({ offer: offer, status: 0 })
                // console.log(coupon);
                // build full system
                if (coupon === null) {
                    res.json(offer);
                } else {
                    // if there is avalid coupon code 
                    const off = JSON.parse(JSON.stringify(offer))
                    delete off['__v'];
                    off.promo = { coupon_code: coupon.coupon_code, discount: coupon.discount + "%" }
                    // offer = JSON.parse(JSON.stringify(off))
                    // offer.coupon = {coupon_code: "xxx-yyyy"}
                    // res.json(fr);


                    // if got a promo_code set status to used : 1
                    Coupon.updateOne({ _id: coupon._id }, { $set: { status: 1 } })
                        .then(() => {
                            // Display stats NOW 
                            const stats = Statistic.countDocuments({ offerID: off._id }).then((stats) => {
                                off.views = stats
                                res.json(off);
                            });



                        })
                    // END update coupon code     

                }


            } else {

                // Display stats 
                const offs = JSON.parse(JSON.stringify(offer))
                delete offs['__v'];

                // const stats = await Statistic.count({ offerID: offs._id });
                const stats = await Statistic.countDocuments({ offerID: offs._id });
                offs.views = stats
                // console.log(offs);
                // res.json(offers);
                res.json(offs);
                // res.json(offer);
            }



        } else {
            // console.log("not exist");
            res.json({ error: "No offer exist" });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }


});





// create an offer with coupons 
router.post('/', async (req, res) => {
    console.log("inside offer with coupon ");
    try {
        // add the provider NOW 
        var ObjectId = require('mongoose').Types.ObjectId;
        if (mongoose.Types.ObjectId(req.body.provider_id.trim()) === false) {
            throw new Error('No valid ID')
        }
        // first of all check if the provider exist 
        var provider = await Provider.findById(req.body.provider_id.trim()).exec()

        if (provider == null) {
            // throw new Error('No provider exist')
            res.status(500).json({ message: 'No provider exist' })
        }

        // check if the category exists 
        var category = await Category.findById(req.body.category_id.trim()).exec()

        if (category == null) {
            res.status(500).json({ message: 'No Category exist' })
            // console.log("No Category exist");
            // throw new Error('No Category exist')
        }

        req.body.provider = provider
        req.body.category = category




        // after saving the Offer set promo-codes 

        let offer = new Offer(req.body);
        let data_offer = await offer.save()


        // Try to create coupon codes and back to offer 
        //  Check coupon_codes number & and discount values 
        let nb_coupon = req.body.nb_coupons
        let discount = req.body.discount


        if (nb_coupon !== "" && discount !== "") {


            for (var i = 0; i < parseInt(nb_coupon); i++) {

                let coupon = new Coupon({ offer: data_offer, status: 0, discount: parseInt(discount), coupon_code: generateKey() });
                let _checker = await coupon.save()
            }

        }







        res.json(data_offer)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
});


// find One Offer 
router.get('/hss/me', async (req, res) => {



    // return text;


    res.json({ key: generateKey() });
});



function generateKey() {

    var coupon = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 9; i++)
        coupon += possible.charAt(Math.floor(Math.random() * possible.length));

    return coupon;

}

function caniReturnCoupon() {
    // data = { response: Math.random() < 0.3 }
    // res.json(data)
    data = Math.random() < 0.1
    // console.log(data);
    return data;
}



module.exports = router;
// npm install signale --save --dev