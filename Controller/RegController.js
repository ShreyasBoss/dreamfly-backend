const User = require('../Models/User');
const bcrypt = require('bcrypt');

//create user
exports.createUser =async (user)=>{
try{
       const salt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(user.password,salt);

    const users = new User({
        name: user.name,
        email: user.email,
        address: user.address,
        mobile: user.mobile,
        dob: user.dob,
        password: hashPassword

    });

    const emailExists = await User.findOne({email: user.email});

    if(emailExists) return {errors:true,message:"User already exists"}
    
    const data = await users.save();

    return {errors:false, data:data}

}catch(e){
    console.log(e);
    return {errors:true,message:e}
}
}


exports.getUser =async ()=>{
    try{
    
        const data = await User.find();
      
    
        return {errors:false, data:data}
    
    }catch(e){
        return {errors:true,message:e}
    }
    
    
    }