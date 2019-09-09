
const csv = require("csv-parser")
const fs = require("fs")
const doTask = (file)=>{
	return new Promise((resolve,reject)=>{
		fs.createReadStream(file)
			.pipe(csv())
			.on("data",(row)=>{
				console.log(row)
				save()
			})
			.on("end",()=>{
				console.log("task done successfully")
				endTask()
                
				return resolve()
			})
			.on("error",(err)=>{
				return reject(err)
			})
	})
	
}

module.exports = doTask