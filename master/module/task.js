const {start_queue,stop_queue,pause_queue} = require("./queue_init")
const task = require("./schema/task")




const startTask = () => {
	return new Promise((resolve,reject)=>{
		
		new task({
			task:"parsing xlsx file",
			status:"Pending"
		}).save()
			.then((e) =>{
				start_queue.add({id:e.id})
					.then(()=>{
						resolve()
					})
					.catch((err)=>reject(err))
			})  
			.catch((err) => reject(err))
	})
}
const stopTask = (id) => {
	return new Promise((resolve,reject)=>{
		
		if(id){
			task.findById(id)
				.then( e =>{
					if(e)
						stop_queue.add({stop:{id:e.id,process_id:e.process_id}})
		    				.then(e =>resolve(e))
							.catch((err)=>reject(err))
					else 
						reject(new Error("Invalid Id Error"))
				})
				.catch(err => reject(new Error(err)))
		}
		else 
			reject(new Error("Invalid Id error"))
	})
}



module.exports = {
	startTask,
	stopTask
	
}