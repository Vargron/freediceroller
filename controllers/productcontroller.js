var mongoose=require("mongoose")// extabilishes mongoose operations
// var User=mongoose.model("User")//note is replaced by desired variable establishes table equivalent
// var Character=mongoose.model("Character")
var Product=mongoose.model("Product")

var session= require("express-session")
module.exports={
    add(req,res){
        console.log(req.body)
        let thingy=new Product(req.body)
        thingy.save()
        console.log(thingy)
        res.json(thingy)
    },
    getall(req,res){
        Product.find({},
            (err,result)=>{
            if(err){
                res.json({status:"failure"})
            }else{
                // let ans=[]
                // let counter=0;
                // while (ans.length<result.length){
                //     for(let i=0; i<)
                // }
                res.json({status:"Success", result:result})
            }
            
        }).sort({display:1})
        
    },
    delete(req,res){
        Product.findByIdAndRemove({_id:req.body._id},
        (err,response)=>{
            console.log(err)
            if(err){
                res.json({status:"error",error:err})
            }
            else{
                res.json({status:"success",res:response})
            }

        })
    },
    edit(req,res){
        Product.findOneAndUpdate({_id:req.body._id}, req.body, 
            (err,response)=>{
                console.log(err,response)
                res.json({body:req.body, err:err, resp:response})

        })
        
    }

}