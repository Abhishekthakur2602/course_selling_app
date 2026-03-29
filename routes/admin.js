const { Router } = require("express");
const adminrouter = Router();
const {adminModel} = require('../schema');
const {courseModel} = require('../schema');
const bcrypt = require('bcrypt');
const {z} = require("zod");
const jwt = require('jsonwebtoken');
const {auth_admin} = require('../middlewares/auth_admin') 

const adminschema = z.object({
   firstname: z.string().min(3).max(100),
   lastname: z.string().min(3).max(100),
   email: z.string().email(),
   password: z
     .string()
     .min(3)
     .max(25)
     .regex(/[A-Z]/, "Must contain at least one uppercase letter")
     .regex(/[a-z]/, "Must contain at least one lowercase letter")
     .regex(/[^A-Za-z0-9]/, "Must contain at least one special letter"),
 });

adminrouter.post("/signup", async (req, res) => {
   
  const parsedData = adminschema.safeParse(req.body);

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

   try{

    const hashedpassword = await bcrypt.hash(password , 5);

    await adminModel.create({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:hashedpassword

    })
    return  res.json({
        message:"Successfully signup"
    })
   }
   catch(e){
    return res.status(400).json({
        message:"User already exists",
    })

   }
});

adminrouter.post("/signin", async (req, res) => {
   try {  const email = req.body.email;
         const password = req.body.password;

    const admin = await adminModel.findOne({
        email:email,
    })
    if(!admin){
       return res.status(400).json({
            message:"User does not exist"
        })
    }
    
    const ispasswordmatch = await bcrypt.compare(password , admin.password);
    const JWT_SECRET = process.env.JWT_SECRET_ADMIN;

    if(ispasswordmatch){
        const token = jwt.sign(
          {
            id: admin._id.toString(),
          },JWT_SECRET ,{expiresIn:"1d"});

          res.cookie('token' , token ,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            maxAge:24 * 60 * 60 * 1000
          });
           return res.json({
             token: token,
             message: "Successfully signin",
           });
    }
    else {
        res.status(401).json({
           message:"Invalid credentials"
        })
    }

}
    catch(e){
        return res.json(401).json({
            message :"Internal server error "
        })
    }
});
 const courseschema = z.object({
   title: z.string().min(5),
   description: z.string().min(8),
   image_url: z.string(),
   price: z.number(),
 });
adminrouter.post("/create_course", auth_admin , async (req, res) => {
   
   const parseddata = courseschema.safeParse(req.body);
   if(!parseddata.success){
      return res.status(400).json({
        message:"Invalid format",
        errors:parseddata.error.errors,
      })
   }
   const creatorid = req.creatorid;
   const {title , description ,image_url , price } = req.body;
   
   try {
      
   const course =  await courseModel.create({
        title:title,
        description:description,
        price:price,
        image_url:image_url,
        creatorid:creatorid
    })
    
    return res.json({
        message:"Successfully course created",
        courseid : course._id
    })
   }
   catch(e){
      return res.json({
        message:"Invalid Creator"
      })
   }
   

});

adminrouter.put('/course' , auth_admin,async(req, res) => {
    const creatorid = req.creatorid;

 const parseddata = courseschema.safeParse(req.body);
 if (!parseddata.success) {
   return res.status(400).json({
     message: "Invalid format",
     errors: parseddata.error.errors,
   });
 }
 
 const { title, description, image_url, price , courseid } = req.body;   


 try {
   const updatedcourse = await courseModel.findOneAndUpdate({
      _id : courseid,
      creatorid : creatorid
   },
    {
     title: title,
     description: description,
     price: price,
     image_url: image_url,
       
   } , { new: true });
   if (!updatedcourse) {
     return res.status(403).json({
       message: "Course not found or unauthorized",
     });
   }
   return res.json({
     message: "Successfully course updated",
     courseid: updatedcourse._id,
   });
 }
  catch (e) {
   return res.json({
     message: "Invalid Creator",
     error:e.message
   });
 }

});
adminrouter.delete("/delete_course",auth_admin, async (req, res) => {
  try {
    const creatorid = req.creatorid;
    const { courseid } = req.body;

    if (!courseid) {
      return res.status(400).json({
        message: "Course ID is required",
      });
    }

    const deletedCourse = await courseModel.findOneAndDelete({
      _id: courseid,
      creatorid: creatorid,
    });

    if (!deletedCourse) {
      return res.status(403).json({
        message: "Course not found or unauthorized",
      });
    }

    return res.json({
      message: "Course deleted successfully",
      courseid: deletedCourse._id,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong",
      error: e.message,
    });
  }
});

module.exports = {
  adminrouter,
};
