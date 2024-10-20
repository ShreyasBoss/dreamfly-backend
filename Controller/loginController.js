const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.login = async (user)=>{
    try{
     
     const users = await User.findOne({email: user.email});
 
     if(!users) return {errors:true,message:"Email or password is incorrect"}

     const validPassword = await bcrypt.compare(user.password,users.password);

     if(!validPassword) return {errors:true,message:"Email or password is incorrect"}
     console.log(users);

   const token = await jwt.sign({_id:users._id},process.env.SEC);
 
     return {errors:false, data:users,token:token}
 
 }catch(e){
     console.log(e);
     return {errors:true,message:e}
 }

}