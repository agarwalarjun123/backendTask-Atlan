const {error_queue,start_feedback,stop_feedback,task_completion}  = require("./queue_init")

const handleFeedback = async (msg) => {
	if(msg.error)
		await error_queue.add({error:msg.error})
	else if(msg.start)
		await start_feedback.add({pid:msg.start.process_id,id:msg.start.id})
	else if(msg.stop)
		await stop_feedback.add({id:msg.stop.id})
	else 
		await task_completion.add({id:msg.id})
}

module.exports  = {
	handleFeedback
}   