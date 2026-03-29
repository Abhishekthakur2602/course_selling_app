const express = require('express');
const app = express();

app.use(express.json());

function auth_user( next , req , res){

    try{
    const token = req.cookie.token;

    if(!token){
        return res.status(400).json({
            message :"Token Missing",
        })
    }

    const decodeddata = jwt.verify(token, jwt_secret);
    req.userid = decodeddata.id;
    next(); 
    }
    catch{
        res.status(401).json({
            message:"Inavlid Authorization",
        })
    }

}