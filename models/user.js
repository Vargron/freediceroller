var mongoose=require("mongoose")
var Schema=mongoose.Schema;
var UserSchema=new Schema({
    username:String,
    email:String,
    passhash:String,
})

mongoose.model("User", UserSchema);