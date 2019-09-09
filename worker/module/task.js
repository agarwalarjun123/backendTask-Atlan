const csv = require("csv-parser")
const {exec} = require("child_process")
const fs = require("fs")


const countrows = (file)=>{
	return new Promise((resolve,reject)=>{
		exec(`cat ${file} | wc -l`,(err,stdout,stderr)=>{
			if(err)
				reject(err)
			resolve(stdout)
            
		})
	})
}

countrows("./task.csv")
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
