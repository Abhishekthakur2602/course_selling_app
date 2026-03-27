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
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    courses:[String],
    createdAt: { type: Date, default: Date.now }
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

module.exports = {
    userModel,
    adminModel,
    courseModel
}