var mongoose=require("mongoose")// extabilishes mongoose operations
var User=mongoose.model("User")//note is replaced by desired variable establishes table equivalent
// const bcrypt = require('bcrypt-as-promised')//requires bcrypt

module.exports={
//each of these is a function that serves a route and will be called by said route
//     index:function(req,res){
//         console.log("hello");
//         return res.render("client/dist");
//         // test looks like this if you are not sure if your linked
//         // return res.json("index");
//    }
    create:function(req,res){
        console.log("in controller")
        console.log(req.body)
        User.find({username:req.body.username}, 
            (err, result)=>{
                console.log(result)
                if(result.length!=0){
                    res.json({status:"error username already exists"})
                }else{
                    User.create(req.body, (err, done)=>{
                        if(err){
                            res.json({status:"failed on add"})
                        }
                        else{
                            res.json({status:"sucess"})
                        }
                    })
                    
                }
               
                
            })
        
        
    }




}