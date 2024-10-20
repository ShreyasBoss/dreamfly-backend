const{getBlogById,getBlogUpdate,getBlogs,createBlogs,deleteBlog} = require('../Controller/BlogController');

const route = require('express').Router();

const auth = require('../helpers/JWT/auth');

route.post('/',auth,async (req,res)=>{

    try{
            const result = await createBlogs(req.body);
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

route.put('/update/:id',auth,async (req,res)=>{

    try{
        const id = req.params.id;
            const result = await getBlogUpdate(id,req.body);
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


route.get('/',async (req,res)=>{

    try{
            const result = await getBlogs();
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




route.get('/getOne/:id',async (req,res)=>{

    try{
            
        const id = req.params.id;
            
            const result = await getBlogById(id);
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


route.delete('/delete/:id',auth,async (req,res)=>{

    try{
            
        const id = req.params.id;
            
            const result = await deleteBlog(id);
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


