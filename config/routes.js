var mongoose=require("mongoose")
var user = require(".././controllers/usercontroller.js");
var character =require(".././controllers/charactercontroller.js")
var path=require('path')
var product= require(".././controllers/productcontroller.js")
//this imports the controller that will serve the pages
module.exports=function(app){
    app.post("/user/create", function(req,res){
        user.create(req,res);
    })
    app.post("/user/login", function(req, res){
        user.login(req, res);
    })
    app.get("/user/checksession",function(req,res){
        user.checksession(req,res);
    })
    app.get("/user/logout", function(req,res){
        user.logout(req,res);
    })
    app.get("/user/all", function(req,res){
        user.all(req,res);
    })
    app.post("/user/edit", function(req,res){
        user.edit(req,res);
    })
    app.get("/users/createdefaultadmin", function(req,res){
        user.defaultadmin(req,res);
    })
    app.get("/verifyadmin", function(req,res){
        user.verifyadmin(req,res);
    })
    app.post("/user/delete", function(req,res){
        user.delete(req,res);
    })
    app.post("/character/add", function(req,res){
        character.add(req,res);
    })
    app.post("/character/searchbyuser", function(req,res){
        character.searchbyuser(req,res);
    })
    app.post("/character/view", function(req,res){
        character.view(req,res);
    })
    app.post("/character/delete", function(req,res){
        character.delete(req,res);
    })

    app.post("/character/update", function(req,res){
        character.update(req,res);
    })
    app.post('/product/add', function(req,res){
        // console.log("in product add")
        product.add(req,res)
    })
    app.get('/product/all', function(req,res){
        // console.log("in product all")
        
        product.getall(req,res)
    })
    app.post('/product/delete', function(req,res){
        console.log("routes")
        product.delete(req,res)
    })
    app.post('/product/edit', function(req,res){
        product.edit(req,res)
    })
    



    app.get("**", function(req,res){
        res.redirect("/")
    })

}