const{user} = require('./user.schema');

const userValidation = async (req,res,next) => {
    const value = await user.validate(req.body);
    if(value.error){
        res.json({errors:true, message:value.error.details[0].message})
    }
   
        next();
    
}


exports.userValidation = userValidation;