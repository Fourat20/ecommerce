const express = require('express');
const router = express.Router();
const Product = require('../schema/Product');

const checkAdmin = require('../middleware/chekAdmin');


//Add product
// router.get('/add', checkAuth, async (req,res)=>{
    router.get('/add' ,checkAdmin, async (req,res)=>{

/*     try {
        const users = await Product.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({message: error})
    } */

   /*  let product = new  Product({name: 'product 1'})
    await product.save() */


    //  fetch the product 
    Product.findOne({name: 'product 1'}, ( error, products ) =>{
        console.log("we got product");
        console.log(products);

    } )

    var ress = await Product.findOne({name: 'product 1'}) 
/*     res.status(200).json({
        message : 'skill has been deleted ...',
        
    }) */

    if(ress ==  null){
        let product = new  Product({name: 'product 1'})
        await product.save() 
        res.status(200).json({message: 'success added product !! ', product: product})
    }else{
        // res.status(200).json({message: 'product already exist '})
        res.status(200).json({message: 'product already exist ', product: ress._id})
    }


    /* 
    Post.find({},function(error, posts){
        console.log(posts)
        process.exit(1)
      })
 */
   


});



//Update product
router.get('/update',  async (req,res)=>{
    try {
        const users = await Product.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({message: error})
    }
});

module.exports = router;