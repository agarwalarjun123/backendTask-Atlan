require("dotenv").config()


const cluster = require("cluster")
const {stop_queue} = require("./module/queue_init")
const numCPUs = require("os").cpus().length

const workers = []
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology: true })
mongoose.connection
	.once("connected",()=>console.log("Connected to DB"))
	.on("error",()=>console.log("Error connecting to DB"))


const {handleFeedback} = require("./module/feedback")


const masterProcess = ()=>{
	console.log("master is running")

	for (let i = 0; i < numCPUs; i++) {
		console.log(`Forking process number ${i}...`)
		workers.push(cluster.fork())
		workers[i].on("message",async (msg)=>{
			
			await handleFeedback(msg)
		})
        
	}
	cluster.on("online",(worker)=>{
		console.log(`worker ${worker.process.pid} is listening...`)
	})
	cluster.on("exit",(worker,code,signal)=>{
		console.log(`Worker ${worker.process.pid} died with ${code} with ${signal}`)
		
		workers.push(cluster.fork())
		workers[workers.length-1].on("message",async (msg)=>{
			await handleFeedback(msg)	 
		})
	})

	stop_queue.process(async (job)=>{
		try{
			process.kill(job.data.pid,"SIGTERM")
			await handleFeedback({stop:{id:job.data.id}})
		}
		catch(e){
			console.log(e)
		}
	})


}

const childProcess = () => {
		
	require("./module/exec")

	
}

if (cluster.isMaster) {
	masterProcess()
} else {
	childProcess() 
}


