const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/checkAuth');

//  VPS logger added to fetch errors 
const signale = require('signale');





//GET ALL USERS
//checkAuth,
router.get('/',  async (req,res)=>{
    signale.debug('get Users', "user passed ");
    try {
        const users = await UserModel.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({message: error})
    }
    
});

//CREATE NEW USER
router.post('/signup',async (req,res)=>{
    console.log("launched method");
    try {
        const existingUser = await UserModel.find({email:req.body.email})
        console.log("---"+ existingUser);
        if(existingUser.length !== 0){
            return res.status(409).json({message : "This User already exist ..."})
        }
        // console.log("--- AFter " );
        // console.log(req.body);
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashPassword);
       
       
       /*  const role = new UserModel({
           // _id: new mongoose.Types.ObjectId(),
            label: 'customer'
        }) */

    //  const r =  await  role.save()
    // res.status(201).json(r);

       /*  const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            role: role._id, 
        }); */

        // search role  : 
        const existingRole = await UserModel.find({role: {label: 'user'}  })

        if(existingRole.length !== 0){
            return res.status(409).json({message : "The role does exist ..."})
        }


        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            role: {label: 'user'}, 
        });


       const createdUser = await user.save();
       res.status(201).json(createdUser);

    } catch (error) {
        console.log(error)
        res.status(500).json({message : error})
    }
});

//UPDATE USER INFO
router.put('/:user_id',checkAuth,(req,res)=>{
    UserModel.updateMany({_id : req.params.user_id},{$set : req.body}).exec()
    .then(()=>{
        res.json(req.body)
    }).catch(err =>{
        res.json({message : err})
    })
});

//DELETE USER
router.delete('/:userID',checkAuth,async (req,res)=>{
    try {
        const deletedUser =  await UserModel.deleteOne({ _id : req.params.userID})
        res.status(200).json({
            message : 'User been deleted ...',
            data : deletedUser,
        })
    } catch (error) {
        res.status(500).json({message : error})
    }
});

router.post('/login',(req,res)=>{
    UserModel.findOne({email : req.body.email }).exec()
        .then(user =>{
            console.log(user);
                if(user){
                    verifyPassword(user,req,res)
                }else{
                    res.json({message : "Incorrect email or password..."})
                }
            }).catch(error =>{
                res.status(500).json({message : `error : ${error}` })
        })
})


router.post('/admin/login',(req,res)=>{
    // Check in th salt 
    // if salt not mentioned or wrong 
    if(req.body.salt !== process.env.salt ){
      return  res.status(401).json({message : "Unauthorized Access"})
    }

    UserModel.findOne({email : req.body.email }).exec()
        .then(user =>{
            console.log(user);
                if(user){
                    verifyAdminPassword(user,req,res)
                }else{
                    res.json({message : "Incorrect email or password..."})
                }
            }).catch(error =>{
                res.status(500).json({message : `error : ${error}` })
        })
})



//VERIFY PASSWORD
const verifyPassword = (user,req,res)=>{
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(err) return res.status(500).json({message : err})
        else{
            if(result) return getToken(user,res)
            else return res.json({message : "Authentication failed ..."})
        }
    })
}

const getToken = (user,res) =>{
    const token = jwt.sign({ email: user.email, userId : user._id,},
        process.env.JWT_KEY, { expiresIn:"1h"})
    res.json({
        message : "Auth successful",
        user,
        token : token
    });
}


// -----------------------------
// Login and token for ADMIN
// -----------------------------

//VERIFY PASSWORD
const verifyAdminPassword = (user,req,res)=>{
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(err) return res.status(500).json({message : err})
        else{
            if(result) return getAdminToken(user,res)
            else return res.json({message : "Authentication failed ..."})
        }
    })
}

const getAdminToken = (user,res) =>{
    const token = jwt.sign({ email: user.email, userId : user._id, role: 'admin', salt: 'NRRoB0W_#3#5' },
        process.env.JWT_KEY, { expiresIn:"1h"})
    res.json({
        message : "Auth successful",
        user,
        token : token
    });
}





module.exports = router;