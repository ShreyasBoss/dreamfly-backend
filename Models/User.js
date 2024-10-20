const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    mobile:{type:Number, required:true},
    city:{type:String},
    address:{type:String},
    dob:{type:Date,required:true},
    password:{type:String, required:true},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = mongoose.model('user',userSchema);

