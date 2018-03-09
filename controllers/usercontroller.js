var mongoose=require("mongoose")// extabilishes mongoose operations
var User=mongoose.model("User")//note is replaced by desired variable establishes table equivalent
var  bcrypt = require('bcrypt')//requires bcrypt
var session= require("express-session")

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
                        // console.log(userresult[0])
                        req.session["user"]=userresult[0];
                        req.session.save()
                        // console.log(req.session)
                        // console.log(session.id)


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
    checksession:function(req,res){
        // console.log(req.session)
        // console.log(session.id)
        if(req.session.user!=null){
            res.json({status:"sucess",
            user:req.session.user})
        }else{
            res.json({status:"failure"})
        }

    },
    logout:function(req,res){
        req.session.user=null;
        req.session.save()
        // console.log("logout test",req.session)
        res.json({status:"sucess"});
    },
    all:function(req,res){

        User.find({},
        (err,result)=>{
            res.json(result)

        })

    },
    edit:function(req,res){


        User.find({_id:req.body._id},
            (err, user)=>{
                // console.log(user, "found user")
                let new_user={}
                bcrypt.hash(req.body.password, 10,
                    (err, hash)=>{
                        // console.log(user._id)
                        if (req.body.password==""){
                            new_user={
                                // _id:user._id,
                                username:req.body.username,
                                passhash:user.passhash,
                                admin:req.body.admin,

                            }
                        }
                        else{

                            new_user={
                                // _id:user._id,
                                username:req.body.username,
                                passhash:hash,
                                admin:req.body.admin,

                            }


                        }

                        // console.log(new_user, "requested changes")



                        // console.log(req.body._id)
                        User.findOneAndUpdate({_id:req.body._id}, new_user,
                            (err, result)=>{
                                // console.log("err",err)
                                // console.log("res", result)
                                if(err){
                                    res.json({status:"failed on update"})
                                }
                                else{
                                    res.json({status:"success"})
                                }

                            }
                        )

                    }
                )
            }
        )







    },
    // this function is to avoid creating an admin manualy in the database to acces the user manager
    defaultadmin:function(req,res){
        User.find({admin:true},
         (err, result)=>{
            console.log(result)
            if(result.length==0){
                bcrypt.hash("hammerthis", 10,
                    (err, hash)=>{


                            let thor=new User({
                                username:"thor",
                                email:"thor@thor.com",
                                passhash:hash,
                                admin:true,

                            })
                            thor.save()
                            res.json({sucess:"sucess"})

                        }



                )
            }else{
                res.json({status:"failure, there is already an admin"})
            }

        })




    },
    checkadmin:function(req,res){
        if (req.session==undefined){
            // console.log("no session");
            return false;
        }
        if (req.session.user==undefined){
            // console.log("not in session")
            return false
        }
        User.find({_id:req.session.user._id},
            (err, result)=>{
                if (err){
                    // console.log("searcherror");
                    return false;
                }
                if(result.length!=1){
                    // console.log("user not in database or too many users");
                    return false
                }
                else{
                    if(result[0].admin){
                        // console.log("user is admin")
                        return true;

                    }
                    else{
                        // console.log("user exists but not admin")
                        return false
                    }


                }

            }
        )
    },
    verifyadmin:function(req,res){
        if (req.session==undefined){
            // console.log("no session");
            res.json({admin:false})
        }
        else if (req.session.user==undefined){
            // console.log("not in session")

            res.json({admin:false})
        }
        else{
            User.find({_id:req.session.user._id},
                (err, result)=>{
                    if (err){
                        // console.log("searcherror");
                        res.json({admin:false});
                    }
                    if(result.length!=1){
                        // console.log("user not in database or too many users");
                        res.json({admin:false});
                    }
                    else{
                        if(result[0].admin){
                            // console.log("user is admin")
                            res.json({admin:true});

                        }
                        else{
                            // console.log("user exists but not admin")
                            res.json({admin:false});
                        }


                    }

                }
            )

        }




    },
    delete:function(req,res){
        // console.log(req.body.id)

        if(req.session.user._id==req.body.id){
            res.json({error:"you cannot delte your self"})
        }
        else{
            User.remove({_id:req.body.id},
                (err, result)=>{
                    if (err){
                        res.json({status:"failed on delete query"})
                    }
                    else{
                        res.json({status:"success"})
                    }
                }
            )

        }

    },
    verifypassword:function(req,res){
        User.find({_id:req.body._id}, (err,userresult)=>{
            if (err ||userresult.length==0){
                res.json({verified:false})
            }
            // console.log(err,"err", result,"result")
            // console.log(result[0].username, user.username)
            else{
                bcrypt.compare(req.body.password, userresult[0].passhash, 
                    function(err, result){
                        var errors=[]
                        if(userresult[0].username!=req.body.username){
                            errors.push("username did not match")
    
                        }
                        if (!result){
                            errors.push("invalid password")
                        }
                        if(!errors.length){
                            res.json({verified:true})
                        }
                        else{
                            res.json({verified:false, errors:errors})
    
                        }
                        
    
                    }
                )
    
                
            }

        })


    },
    changepassword:function(req,res){
        bcrypt.hash(req.body.password, 10, 
            (err, hash)=>{
                if (err){
                    res.json({Status:"failure"})
                }
                else{
                    req.body.user["passhash"]=hash;
                    User.findOneAndUpdate({_id:req.body.user._id}, req.body.user, 
                        (err,result)=>{
                        console.log(err,result)
                        res.json({status:!err, result:result})
                    })
                }
                
        })
        
        

    }










}
