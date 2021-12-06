const express = require('express');
const router = express.Router();
const Provider = require('../schema/Provider');


// get all providers 
router.get('/', async (req, res) => {
    try {
        const providers = await Provider.find()
        res.json(providers);
    } catch (error) {
        res.json({ message: error })
    }
})

// create a provider
router.post('/', async (req, res) => {
    console.log("inside");
    try {
        let provider = new Provider(req.body);
        let data = await provider.save()
        res.json(data)
    } catch (error) {
        res.json({ message: error })
    }
});

// update a provider
router.put('/:id', async (req, res) => {
    console.log("inside");
    Provider.updateMany({ _id: req.params.id }, { $set: req.body })
        .then(() => {
            res.status(200).json({ msg: "Provider updated ...." })
        }).catch(err => {
            res.status(409).json(err)
        })
});


// Delete provider
router.delete('/:id', async (req, res) => {
    try {
        const skill = await Provider.deleteOne({ _id: req.params.id })
        res.status(200).json({
            message: 'provider has been deleted ...',
            data: skill,
        })
    } catch (error) {
        res.status(500).json(error)
    }


});



module.exports = router;
// npm install signale --save --dev