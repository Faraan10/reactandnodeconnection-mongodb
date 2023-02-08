const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
    productName:String,
    productPrice:Number,
    productDescription:String,
    productImage:String
})

const Product=mongoose.model("product",productSchema)

module.exports=Product