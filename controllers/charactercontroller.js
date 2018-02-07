var mongoose=require("mongoose")// extabilishes mongoose operations
var User=mongoose.model("User")//note is replaced by desired variable establishes table equivalent
var Character=mongoose.model("Character")
var  bcrypt = require('bcrypt')//requires bcrypt
var session= require("express-session")

module.exports={
    add:function(req,res){

        
        Character.create(req.body.character, 
            (err, result)=>{
                if (err){
                    res.json({status:"error"})
                }
                else{
                    res.json({status:"success"})
                }
                
                
            }
        )
    },
    searchbyuser:function(req,res){
        //finds allcharacters for a user
        
        console.log(req.body.user._value["_id"], req.body.user._value)
        Character.find({author_id:req.body.user._value["_id"]},
            (err, result)=>{
 
                console.log("err", err)
                console.log("result", result)
                res.json(result)
            }
        )

        
    },
    delete:function(req,res){
        console.log(req.body)
        res.json(req.body)
    },
    view:function(req,res){
        console.log(req.body)
        Character.find({_id:req.body.id},(err,result)=>{
            res.json(result);
        })
        
    },
    update:function(req,res){
        console.log(req.body)
        Character.findOneAndUpdate({_id:req.body._id},req.body, (err,result)=>{
            console.log(result)
            res.json(result)
        })
        
    },




        



    
}