require("dotenv").config()
const {pause_queue,start_queue,stop_queue} = require("./module/queue_init")

setTimeout(()=>{
	stop_queue.add({foo:"test"})
},50)
