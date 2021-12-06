const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        res.userData = decoded;
        // check the admin Role and the salt hash by 4@ 
        if(res.userData.role !== 'admin' || res.userData.salt !== process.env.salt ){
            console.log(res.userData.role);
            console.log(res.userData.salt);
            return res.status(401).json({message : "Auth failed as Admin"})
        }

        // console.log(res.userData)
        next();
    } catch (error) {
        res.status(401).json({message : "Auth failed"})
    }
}