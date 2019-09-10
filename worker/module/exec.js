const {pause_queue,start_queue,stop_queue} = require("./queue_init")
const doTask = require("./task")


start_queue.process(async (job) =>{
	return doTask("./task.csv")	
})
stop_queue.process(async (job)=>{
	
	console.log("test")
})
pause_queue.process(async (job) =>{

	return pauseTask(job.data.id)
})
