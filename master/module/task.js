const {start_queue,stop_queue,pause_queue} = require("./queue_init")
const task = require("./schema/task")




const startTask = (id = null) => {
	return new Promise((resolve,reject)=>{
		task.findById(id)
			.then((e)=>{
				if(e && e.status == "paused"){
					start_queue.add({id,stage:e.stage})
					return resolve()
				}
				else{
					new task({
						task:"parsing xlsx file"
					}).save()
						.then((e) =>{
							start_queue.add({id:e.id})
							resolve()
						})  
						.catch((err) => reject(err))
				}


			})
			.catch((err)=>reject(err))

	})
}
const stopTask = (id) => {
	return new Promise((resolve,reject)=>{
		if(id)
		    stop_queue.add({id})
		    	.then(e =>resolve(e))
				.catch((err)=>reject(err))
		else 
			reject(new Error("Invalid Id error"))
	})
}
const pauseTask = (id) =>{
	return new Promise((resolve,reject)=>{
		if(id)
			pause_queue({id})
				.then((e) => resolve())
				.catch((err)=>reject(err))
		else 
			reject(new Error("Invalid Id error"))
	})
}


module.exports = {
	startTask,
	stopTask,
	pauseTask
}