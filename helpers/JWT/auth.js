const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
 const token = req.header('auth-token');
 try{
  const verifyUser =  jwt.verify(token,process.env.SEC);
  req.user = verifyUser;
next();
 }catch(e){
     res.status(400).send(e);
 }

}

module.exports = auth;