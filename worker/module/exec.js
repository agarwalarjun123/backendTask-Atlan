const {start_queue,stop_queue} = require("./queue_init")
const {doTask,stopTask} = require("./task")


start_queue.process(async (job) =>{
	
	await doTask("./task.csv",job.data.id)
})




