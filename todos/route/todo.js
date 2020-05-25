const express=require("express");
// 对象校验
const Joi=require("joi");
// 工具库
const _=require("lodash")
// 创建todo案例路由
const todoRouter=express.Router();

// 导入todo集合构造函数
const Task=require("../model/task");
todoRouter.get("/task",async(req,res)=>{
    const task=await Task.find();
    // 响应
    res.send(task);
});
// 添加任务
todoRouter.post("/addTask",async(req,res)=>{
	// 接收客户端传递过来的任务名称
    const {title}=req.body;
    const schema={
        title:Joi.string().required().min(2).max(30)
    };
	// 验证客户端传递过来的请求参数 
    const {error}=Joi.validate(req.body,schema);
    if(error){
		// 将错误信息响应给客户端
        return res.status(400).send({message:error.details[0].message});
    }
	// 创建任务实例
    const task=new Task({title:title,completed:false});
    await task.save();
    // 插入任务的另一种方式
    // const task=await Task.create({title:title,completed:false});
	// 响应
    setTimeout(()=>{
        res.send(task);
    },2000)
});
// 删除任务
todoRouter.get("/deleteTask",async(req,res)=>{
	// 要删除的任务id
    const {_id}=req.query;
    // 验证规则    安全保证也可以不加
	// const schema = {
	// 	_id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
	// }
	// // 验证客户端传递过来的请求参数 
	// const { error } = Joi.validate(req.query, schema);
	// // 验证失败
	// if (error) {
	// 	// 将错误信息响应给客户端
	// 	return res.status(400).send({message: error.details[0].message})
	// }
	// 删除任务
    const task=await Task.findOneAndDelete({_id:_id});
    // console.log(task);
    res.send(task);
    // console.log(_id);
})
// 修改任务
todoRouter.post("/modifyTask",async(req,res)=>{
	// 执行修改操作
    // const task=await Task.findOneAndUpdate({_id:req.body._id},{completed:req.body.completed});
    const task=await Task.findOneAndUpdate({_id:req.body._id},_.pick(req.body,["title","completed"]),{new:true});
    res.send(task);
})
// 查询未完成任务
todoRouter.get("/active",async (req,res)=>{
    // 执行查询操作
    const task=await Task.find({completed:false});
    res.send(task);
})
// 更改任务全部为完成状态
todoRouter.get("/allComplete",async (req,res)=>{
    await Task.updateMany({},{completed:true});
    const task=await Task.find({completed:true});
    res.send(task);
})
// 清除完成任务
todoRouter.get("/clearTask",async(req,res)=>{
    // 执行清空操作
    await Task.deleteMany({completed:true});
    const task=await Task.find();
    res.send(task);
})
// 将todo案例路由作为模块成员进行导出
module.exports=todoRouter