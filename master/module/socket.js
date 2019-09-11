const {start_feedback,stop_feedback,error_feedback,task_completion} = require("./queue_init")
const task = require("./schema/task")
module.exports = (app)=>{
	const server = require("http").Server(app)
	const io = require("socket.io")(server)
	
	io.on("connection",(socket)=>{

		start_feedback.process((job)=>{

			task.findByIdAndUpdate(job.data.id,{
				$set:{
					pid:job.data.pid,
					status:"Running"
				}
			}).then(()=>{
				socket.emit("start_feedback",{msg:1,id:job.data.id})
			}).catch((err)=>socket.emit("error",{err}))

		
		})

		stop_feedback.process((job)=>{
			task.findByIdAndUpdate(job.data.id,{
				$set:{
					status:"terminated"
				}
			}).then(s=>{
				socket.emit("stop_feedback",{msg:2,id:job.data.id})

			}).catch((err)=>socket.emit("error",{err}))
			
			
		})
		task_completion.process((job)=>{
			task.findByIdAndUpdate(job.data.id,{
				$set:{
					status:"task completed"
				}
			}).then(s=>{
				socket.emit("task_completed",{msg:3,id:job.data.id})

			}).catch((err)=>socket.emit("error",{err}))
			
			
		})
		error_feedback.process((job)=>{
			task.findByIdAndUpdate(job.data.id,{
				$set:{
					status:`error:${job.data.error}`
				}
			}).then(s=>{
				socket.emit("error",{id:job.data.id,err:job.data.error})
			})
		})
		


            
        
	})
}