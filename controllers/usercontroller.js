var mongoose=require("mongoose")// extabilishes mongoose operations
var User=mongoose.model("User")//note is replaced by desired variable establishes table equivalent
var  bcrypt = require('bcrypt')//requires bcrypt

module.exports={
//each of these is a function that serves a route and will be called by said route
//     index:function(req,res){
//         console.log("hello");
//         return res.render("client/dist");
//         // test looks like this if you are not sure if your linked
//         // return res.json("index");
//    }
    create:function(req,res){
        // console.log("in controller")
        // console.log(req.body)
        req.body["admin"]=false;
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if(err){
                // console.log(err)
                res.json({status:"failed on hash"})
                
            }
            else{
                req.body["passhash"]=hash;
                User.find({username:req.body.username}, 
                    (err, result)=>{
                        // console.log(result)
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
        })

        
    },

    login:function(req,res){
        // console.log("hitting login")
        User.find({username:req.body.username}, 
        (err, userresult)=>{
            // console.log(result, req.body)
            if(userresult.length==0){
                res.json({
                    status:"error",
                    error:"user does not exist"})
            }else{
                bcrypt.compare(req.body.password, userresult[0].passhash, function(err, result){

                    // console.log("err", err)
                    // console.log("result", result)
                    if(err){
                        res.json({status:"error",
                    error:"failed on bcrypt compare"})
                    }else if(result==true){
                        res.json({
                            status:"sucess",
                            user:userresult[0]
                        })
                        req.session["user"]=result[0];
                        // console.log(req.session)
                        
        
                    }else{
                        res.json({
                            status:"error",
                            error:"passwords do not match"
                        })
                    }
                })
            }
        })      
    },
    
        
    




}