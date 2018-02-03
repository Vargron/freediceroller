var mongoose=require("mongoose")
var user = require(".././controllers/usercontroller.js");
var path=require('path')
//this imports the controller that will serve the pages
module.exports=function(app){
    app.post("/user/create", function(req,res){
        user.create(req,res);
    })
    app.post("/user/login", function(req, res){
        user.login(req, res);
    })
    


    // app.get("/",  function(req,res){
    //     user.index(req,res)
    // })
    app.get("**", function(req,res){
        res.redirect("/")
    })

}