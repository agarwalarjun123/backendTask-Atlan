const mongoose = require("mongoose")
module.exports = mongoose.model("task",new mongoose.Schema({ 
	task:String,
	pid:String,
	status:String,
})) 