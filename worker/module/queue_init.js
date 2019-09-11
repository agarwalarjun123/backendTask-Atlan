const Queue = require("bull")
const redis_url = process.env.broker_url

module.exports = {
	start_queue:new Queue("start",redis_url),
	stop_queue:new Queue("stop",redis_url),
	pause_queue:new Queue("pause",redis_url),
	start_feedback:new Queue("start_feedback",redis_url),
	stop_feedback:new Queue("stop_feedback",redis_url),
	pause_feedback:new Queue("pause_feedback",redis_url)
}
