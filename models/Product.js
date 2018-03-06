var mongoose=require("mongoose")
var Schema=mongoose.Schema;
var ProductSchema=new Schema({
    name:String,
    display:Number,
    desc:String,
    link:String,
    img_link:String,
    
})

mongoose.model("Product", ProductSchema);