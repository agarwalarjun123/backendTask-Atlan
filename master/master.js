require("dotenv").config()
const express = require("express")
const app = express()
const cors= require("cors")
require("./module/feedback_handlers") 

// for verbose logging-
app.use(require("morgan")(process.env.logenv))
const bp = require("body-parser")
app.use(bp.json())
app.use(cors())
app.use(bp.urlencoded({extended:false}))


// connect to mongoDB
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology: true , useFindAndModify: false })
mongoose.connection
	.once("connected",()=>console.log("Connected to DB"))
	.on("error",()=>console.log("Error connecting to DB"))

//endpoints
app.use(express.static("views"))

app.use(require("./endpoints/index"))


app.use((err,req,res,next)=>{
	console.error(err)
	res.send({err:err.message})
})
app.listen(process.env.port || 3000,()=>console.log("listening..."))
module.exports=app
