const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    firstname: { type:String, required:true},
    lastname:String,
    email:{type:String, required:true,unique:true},
    password:String,
    
})

const adminSchema = new Schema({
    firstname:{
        type:String   
    },
    lastname:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    courses:[String],
   
})

const courseSchema = new Schema({
    title:{type:String, required:true},
    description:String,
    image_url:String,
    creatorid:ObjectId,
    price:{type:Number,required:true}

})

const purchaseSchema = new Schema({
    userid:ObjectId,
    courseid:ObjectId
})

const userModel = mongoose.model('User', userSchema);
const adminModel = mongoose.model('admin',adminSchema);
const courseModel = mongoose.model('course' , courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}