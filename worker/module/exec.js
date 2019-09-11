const {pause_queue,start_queue,stop_queue} = require("./queue_init")
const {doTask,stopTask,pauseTask} = require("./task")


start_queue.process(async (job) =>{
	await doTask("./task.csv")
})
stop_queue.process(async (job)=>{
	await stopTask(job.data.id)
	
})
pause_queue.process(async (job) =>{
	return pauseTask(job.data.id)
})
