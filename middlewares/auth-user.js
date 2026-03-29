const jwt = require("jsonwebtoken");

function auth_user( next , req , res){

    try{
    const token = req.cookie.token;

    if(!token){
        return res.status(400).json({
            message :"Token Missing",
        })
    }
    const JWT_SECRET = process.env.JWT_SECRET_USER;
    const decodeddata = jwt.verify(token, JWT_SECRET);
    req.userid = decodeddata.id;
    next(); 
    }
    catch{
        res.status(401).json({
            message:"Inavlid Authorization",
        })
    }

}

module.exports = {
    auth_user:auth_user
}