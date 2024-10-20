const{createUser,getUser} = require('../Controller/RegController');
const{login} = require('../Controller/loginController')
const route = require('express').Router();
const{userValidation} = require('../helpers/validation/user.validation');
const auth = require('../helpers/JWT/auth');

route.post('/reg',userValidation,async (req,res)=>{

    try{
            const result = await createUser(req.body);
            if(result.errors){
                res.status(400).send({errors:true, message:result.message})
            }
            else{
                res.status(200).send({errors:false, data:result.data})
            }
    }
    catch(err){
        res.status(400).send(err);
    }

})

route.post('/login',async (req,res)=>{

    try{
            const result = await login(req.body);
            if(result.errors){
                res.status(400).send({errors:true, message:result.message})
            }
            else{
                res.status(200).send({errors:false, data:result.data,token:result.token})
            }
    }
    catch(err){
        res.status(400).send(err);
    }

})


route.get('/reg', auth,async (req,res)=>{

    try{
            const result = await getUser();
            if(result.errors){
                res.status(400).send({errors:true, message:result.message})
            }
            else{
                res.status(200).send({errors:false, data:result.data})
            }
    }
    catch(err){
        res.status(400).send(err);
    }

})





module.exports = route;


