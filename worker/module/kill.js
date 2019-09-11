const {exec} = require("child_process")
module.exports = (pid) =>{
	return new Promise((resolve,reject)=>{
		exec(`kill -9 ${pid}`,(err,stdout,stderr)=>{
			if(err)
				return reject(err)
			if(stdout)
				return resolve(stdout)
			else 
				return resolve(stderr)
            
		})
	})
    
    
} 