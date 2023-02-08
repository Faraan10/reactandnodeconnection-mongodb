const express=require("express")
const app=express();
const port=4005
const cors=require("cors")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const Product=require("./productSchema")

mongoose.connect("mongodb+srv://faraan:faraan@cluster0.akvpjxh.mongodb.net/products?retryWrites=true&w=majority")
	.then(()=>{
		console.log("MongoDB Connected")
	})
	.catch((err)=>{
		console.log(err)
	})
app.use(bodyParser.urlencoded({
	extended:true
}))

app.use(bodyParser.json())

app.use(cors())

app.get("/",(req,res)=>{
	console.log("working server")
})

app.get("/retrieve",async (req,res)=>{
	await Product.find()
	.then(found=>res.json(found))
})

app.post("/create",(req,res)=>{
	const {productName, productPrice, productDescription, productImage}=req.body
	console.log(req.body)
	const newProduct=new Product({
		productName, productPrice, productDescription, productImage
	})
	newProduct.save().then((res)=>{
		console.log(res)
	});
	res.status(201).send("created successfully")
})

app.delete("/delete/:id",(req,res)=>{
	const id=req.params.id;
	Product.findByIdAndRemove(id).exec()
	res.status(202).send("Deleted Successfully")
})

app.listen(port,()=>console.log("port is running"))