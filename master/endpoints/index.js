const router = require("express").Router()
const {
	startTask,
	stopTask,
	getTask
} = require("../module/task")

router.get("/start",(req,res,next)=>{
	startTask()
		.then((e)=>res.json({msg:"task starting..."}))
		.catch((err) => next(new Error(err)))
})
router.post("/stop",(req,res,next)=>{

	stopTask(req.body.id)
		.then(e => res.json({msg:"task stopping..."}))
		.catch((err)=>next(new Error(err)))
        
})
router.get("/tasks",(req,res,next)=>{
	getTask()
		.then(e =>{
			res.json({e})
		})
		.catch((err)=>next(err))
})
module.exports = router