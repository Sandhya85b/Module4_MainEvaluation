const fs=require("fs")
const  morganLogger=(req,res,next)=>{
    const currentDate=newDate().toISOString()
    const logData=`Method:${req.method}|URL:${req.url}|Date:${currentDate}\n`
    fs.appendFileSync("./logs.txt",logData)
    next()
}

module.exports=morganLogger