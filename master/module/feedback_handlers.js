const {start_feedback,stop_feedback,error_queue,task_completion} = require("./queue_init")
const task = require("./schema/task")


start_feedback.process((job)=>{
	
	task.findByIdAndUpdate(job.data.id,{
		$set:{
			pid:job.data.pid,
			status:"Running"
		}
	}).then().catch((err)=>console.log({err}))
})

stop_feedback.process((job)=>{
	console.log(job.data.id)
	task.findByIdAndUpdate(job.data.id,{
		$set:{
			status:"terminated"
		}
	}).then((e)=>console.log(`Job Stopped ${job.data.id}`)).catch((err)=>console.log({err}))
    
    
})

task_completion.process((job)=>{

	task.findByIdAndUpdate(job.data.id,{
		$set:{
			status:"task completed"
		}
	})
		.then(()=>console.log("Job completed"))
		.catch((err)=>console.log({err}))
    
    
})
error_queue.process((job)=>{

	console.log(job.data.error)
	task.findByIdAndUpdate(job.data.id,{
		$set:{
			status:`error:${job.data.error}`
		}
	}).then()
		.catch((err)=>console.log(err))
})


