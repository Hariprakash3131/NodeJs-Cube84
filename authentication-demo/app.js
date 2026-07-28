const express=require('express')

const app=express()

app.use(express.json())


const user={
     email: "hari@gmail.com",
    password: "123456"
}

app.post("/login",(req,res)=>{
    const {email,password}=req.body
    if(email===user.email && password===user.password){
        return res.status(200).json({
            message:"Login Successful"
        })
    }
    return res.status(401).json({
        message:"Invalid Email or Password"
    })
})

app.listen(3000,()=>{
    console.log("server is running port:3000")
})