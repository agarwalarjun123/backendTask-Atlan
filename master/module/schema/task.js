const mongoose = require("mongoose")
module.exports = mongoose.model("task",new mongoose.Schema({ 
	task:String,
	processId:String,
	status:String,
})) 