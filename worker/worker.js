require("dotenv").config()


const cluster = require("cluster")

const numCPUs = require("os").cpus().length

const workers = []

const masterProcess = ()=>{
	console.log("master is running")

	for (let i = 0; i < numCPUs; i++) {
		console.log(`Forking process number ${i}...`)
		workers.push(cluster.fork())
		workers[i].on("message",(msg)=>{
			console.log(msg)
		})
        
	}
	cluster.on("online",(worker)=>{
		console.log(`worker ${worker.process.pid} is listening...`)
	})
	cluster.on("exit",(worker,code)=>{
		console.log(`Worker ${worker.pid} died with ${code}`)
		workers.push(cluster.fork())
		workers[workers.length-1].on("message",(msg)=>{
			if(msg.error)
				console.log(msg.error)
		})
	})

}

const childProcess = () => {
	try{
	    require("./module/exec")
	}
	catch(e){
		process.send({error:new Error(e)})
	}
    
        


}

if (cluster.isMaster) {
	masterProcess()
} else {
	childProcess() 
}


