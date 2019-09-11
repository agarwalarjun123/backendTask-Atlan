const router = require("express").Router()
const {
	startTask,
	stopTask
} = require("../module/task")

router.get("/start",(req,res,next)=>{
	startTask()
		.then((e)=>res.json({msg:"task starting..."}))
		.catch((err) => next(new Error(err)))
})
router.get("/stop",(req,res,next)=>{

	stopTask(req.body.id)
		.then(e => res.json({msg:"task stopping..."}))
		.catch((err)=>next(new Error(err)))
        
})
module.exports = router