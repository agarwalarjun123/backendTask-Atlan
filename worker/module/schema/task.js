const mongoose = require("mongoose")

const x =  mongoose.model("file",new mongoose.Schema({
	
	date:{
		type:Date,
		default:Date.now()
	},
	taskId:{
		type:String
	},
	processId:String

}))
module.exports = x