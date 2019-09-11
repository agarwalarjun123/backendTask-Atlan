const csv = require("csv-parser")
const fs = require("fs")
const task = require("./schema/task")
const killTask = require("./kill")



const stopTask = (pid,id)=>{
	return new Promise((resolve,reject)=>{

		killTask(pid)
			.then(e =>{
				process.send({stop:{id}})
				return resolve()
			})
			.catch((err)=>{
				process.send({error:err})
				return reject(new Error(err))
			})

	})
}



const doTask = (file,id)=>{
	return new Promise((resolve,reject)=>{
		let i =1
		process.send({start:{process_id:process.pid,id}})
		fs.createReadStream(file)
			.pipe(csv())
			.on("data",(row)=>{
				new task({
					taskId:id,
					processId:process.pid
				}).save()
					.then((e)=>{
						console.log(e)

					})
					.catch(err =>{
						console.log(err)
						process.send("Error",{error:err})
					})

			})
			.on("end",()=>{
				process.send({id})
				return resolve()


			})
			.on("error",(err)=>{
				process.send({error:new Error(err)})
				return reject(err)
			})
	})
	
}


module.exports = {
	doTask,
	stopTask
}