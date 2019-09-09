const queue = require("bull")
const redis_url = process.env.broker_url

module.exports = {
	start_queue:new queue("start",redis_url),
	stop_queue:new queue("stop",redis_url),
	pause_queue:new queue("pause",redis_url)
}
