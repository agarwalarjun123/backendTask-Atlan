const mongoose = require("mongoose")

module.exports =  mongoose.model("file",new mongoose.Schema({
	date:{
		type:Date,
		default:Date.now
	},
	data:{
		type:Object
	},
	taskId:{
		type:String
	},
	ProcessId:{
		type:String
	}
}))
