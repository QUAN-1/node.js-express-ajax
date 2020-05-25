const express=require("express");
const path=require("path");
// 导入bodyParser模块
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname,"public")));
// 处理post请求参数    
// app.use(bodyParser.urlencoded({extended:false}));
// 处理post请求参数    json
app.use(bodyParser.json()); 

// 数据库连接
mongoose.connect("mongodb://quan:quan@localhost:27017/todo",{useNewUrlParser:true,useUnifiedTopology: true})

// app.get("/base",(req,res)=>{
//     res.send({
//         name:"quan",
//         age:21
//     })
// })
// app.post("/base",(req,res)=>{
//     res.status(400).send({
//         name:"ding-wei-quan",
//         age:1000000
//     })
// })
// app.post("/user",(req,res)=>{
//     res.send(req.body);
// })
// app.get("/jsonp",(req,res)=>{
//     const cb=req.query.cb;
//     const data=cb+'({name:"hahahahahahahhahahah"})'
//     res.send(data);
//     // res.jsonp({
//     //     name:"quan",
//     //     age:21
//     // })
// })


// 导入todo路由案例
const todoRouter=require("./route/todo");
// 当客户端的请求路径以/todo开头时
app.use("/todo",todoRouter);

app.listen(3000);
console.log("服务器启动成功");