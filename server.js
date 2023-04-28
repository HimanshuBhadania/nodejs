const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path:'./config.env'})
const app = require("./app")

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true
}).then((con)=>{
    console.log("db working fine")
}).catch((err)=>{
    console.log(err)
})



// const testUser = new User({name:"himanshu",age:23,address:"ahmedabad",gender:"male"})

// testUser.save().then((docs)=>{
// console.log(docs)
// }).catch((err)=>{console.log(Err)})

app.listen(3002,()=>{
    console.log("server is started")
})