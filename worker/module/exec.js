const {start_queue,stop_queue} = require("./queue_init")
const {doTask,stopTask} = require("./task")


start_queue.process(async (job) =>{
	
	await doTask("./module/task.csv",job.data.id)
})



stop_queue.process(async (job)=>{
	await stopTask(job.data.pid,job.data.id)
	
})

