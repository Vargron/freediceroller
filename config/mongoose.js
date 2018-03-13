var mongoose=require("mongoose");
var path=require("path");
var fs=require("fs");
var mp=path.join(__dirname,"./../models");
mongoose.connect('mongodb://localhost/freediceroller1-1');//change the mong db link to a freshdb


fs.readdirSync(mp).forEach(function(file){
    //this code imports all of the models established in the models folder
    if(file.indexOf('.js')>0){
        require(mp+"/"+file)
    }
})