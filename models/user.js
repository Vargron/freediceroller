var mongoose=require("mongoose")
var Schema=mongoose.Schema;
var UserSchema=new Schema({
    username:String,
    email:String,
    passhash:String,
    admin:Boolean,
})

mongoose.model("User", UserSchema);