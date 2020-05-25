const mongoose=require("mongoose");
// 数据库连接
// mongoose.connect("mongodb://quan:quan@localhost:27017/todo",{useNewUrlParser:true,useUnifiedTopology: true})
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
    // {versionKey:false}去掉后面的_v
    // 通过mongoose中的save方法保存记录时document文档默认最后会有一个字段"__v"，这个字段表示该文档是否是刚刚创建的，如果是则字段"__v"的值为0
},{versionKey:false});
const Task=mongoose.model("task",taskSchema);
// 手动创建
// Task.create({
//     title:"wei",
//     completed:false
// }).then(()=>console.log("创建成功"))
//   .catch(()=>console.log("创建失败"))
module.exports=Task;