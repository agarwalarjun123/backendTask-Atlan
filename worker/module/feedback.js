const {error_queue,start_feedback,stop_feedback,pause_feedback}  = require("./queue_init")

const handleFeedback = async (msg) => {
	if(msg.error)
		await error_queue.add({error:msg.error})
	else if(msg.start)
		await start_feedback.add({process_id:msg.start.process_id})
	else if(msg.stop)
		await stop_feedback.add({id:msg.stop.id})
	else 
		await pause_feedback.add({id:msg.id,stage:msg.stage}) 
}
module.exports  = {
	handleFeedback
}