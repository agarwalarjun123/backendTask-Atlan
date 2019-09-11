const Queue = require("bull")
const redis_url = process.env.broker_url

module.exports = {
	start_queue:new Queue("start",redis_url),
	stop_queue:new Queue("stop",redis_url),
	start_feedback:new Queue("start_feedback",redis_url),
	stop_feedback:new Queue("stop_feedback",redis_url),
	error_queue: new Queue("error_feedback",redis_url),
	task_completion:new Queue("task_complete",redis_url)
}
