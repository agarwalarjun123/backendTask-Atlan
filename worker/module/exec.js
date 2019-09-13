const {start_queue} = require("./queue_init")
const {doTask} = require("./task")


start_queue.process(async (job) =>{
	
	await doTask("./task.csv",job.data.id)
})




