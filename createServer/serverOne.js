const exp=require('express')

const serverOne=exp()

serverOne.get('/',(req,res)=>{
    res.send("This is ServerOne")
})

serverOne.listen(5000,()=>{
    console.log("The server running in localhost:5000")
})