const queue = require("bull")
module.exports = {
	start_queue:new queue("start",process.env.broker_url),
	stop_queue:new queue("stop",process.env.broker_url),
	pause_queue:new queue("pause",process.env.broker_url)
}
