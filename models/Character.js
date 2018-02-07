var mongoose=require("mongoose")
var Schema=mongoose.Schema;
var CharacterSchema=new Schema({
    
    author_id:String,
    name:String,
    desc:String,
    rolls:Array,

})

mongoose.model("Character", CharacterSchema);