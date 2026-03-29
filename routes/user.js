
const { Router } = require("express");
const userrouter = Router();
const {userModel} = require('../schema');
const {z} = require('zod');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

  const userschema = z.object({
    firstname: z.string().min(3).max(100),
    lastname: z.string().min(3).max(100),
    email: z.string().email(),
    password: z
      .string()
      .min(3)
      .max(100)
      .regex(/[A-Z]/, "Must contain atleast one uppercase letter")
      .regex(/[a-z]/, "Must contain atleast one lowercase letter")
      .regex(/[^A-Za-z0-9]/, "Must contain atleast one special char"),
  });

userrouter.post("/signup", async (req, res) => {
   
     const parsedData = userschema.safeParse(req.body);

     if (!parsedData.success) {
       return res.status(400).json({
         message: "Invalid Format",
         errors: parsedData.error.errors,
       });
     }
     const firstname = req.body.firstname;
     const lastname = req.body.lastname;
     const email = req.body.email;
     const password = req.body.password;
    const hashpassword = await bcrypt.hash(password, 10);

    try { 
        const user = await userModel.create({
         firstname:firstname,
         lastname:lastname,
         email:email,
         password:hashpassword
    })
    res.json({
        message :"Signup Successfully",
    })
} 
catch(e){
    return res.status(409).json({
        message:"User already exist"
    })
}
});

userrouter.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

  try{  const user = await userModel.findOne({
        email:email
    })

    if(!user){
        return res.status(404).json({
            message:"User does not exist"
        })
    }
    const comparepassword = await bcrypt.compare(password , user.password);
    const JWT_SECRET = process.env.JWT_SECRET;

    if(comparepassword){
        const token = jwt.sign({
            id:user._id.toString()
        },JWT_SECRET,{expiresIn:'1d'});
        
        res.cookie('token' ,token,{
           httpOnly:true,
           secure:flase,
           sameSite:'strict',
           maxAge:24 * 60 * 60 * 1000
        })
        return res.json({
            token:token,
            message:"Successfully signin"
        })
    }
    else{
        res.status(401).json({
            message:"Invalid credentials"
        })
    }
}
catch(e){
   return res.status(500).json({
    message:"Internal Server error"
   })
}
});

userrouter.post("/enroll_course", async (req, res) => {

});

userrouter.get("/purchase-courses", async (req, res) => {});


module.exports = {
    userrouter
}
