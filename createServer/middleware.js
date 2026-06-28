const expMiddle=require("express")

const middlewareSample=expMiddle()

middlewareSample.use((req,res,next)=>{
       console.log("Middleware Executed")
       next()
})

middlewareSample.get('/',(req,res)=>{
     res.send("This Home Page use Middleware :")
})

middlewareSample.listen(3000,()=>{
    console.log("The server is running Localhost:6000")
})