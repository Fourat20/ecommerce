const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Category = require('../schema/Category');


// get all categories  
router.get('/', async (req, res) => {
    try {
        const category = await Category.find()
        res.json(category);
    } catch (error) {
        res.json({ message: error })
    }
})


// create caregory
router.post('/', async (req, res) => {
    console.log("inside");
    try {
        let provider = new Category(req.body);
        let data = await provider.save()
        res.json(data)
    } catch (error) {
        res.json({ message: error })
    }
});

// update category 
router.put('/:id', async (req, res) => {
    console.log("inside");
    Category.updateMany({ _id: req.params.id }, { $set: req.body })
        .then(() => {
            res.status(200).json({ msg: "Category updated ...." })
        }).catch(err => {
            res.status(409).json(err)
        })
});


// Delete category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.deleteOne({ _id: req.params.id })
        res.status(200).json({
            message: 'category has been deleted ...',
            data: category,
        })
    } catch (error) {
        res.status(500).json(error)
    }


});


module.exports = router;