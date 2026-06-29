const expDum=require('express')

const dummyServer=expDum()

dummyServer.get('/',(req,res)=>{
    res.send("Welcome The Dummy server")
})

dummyServer.listen(4000,()=>{
    console.log("The  server is running in Localhost:4000")
})