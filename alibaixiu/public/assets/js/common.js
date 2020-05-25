$("#logout").on("click",function(){
    var isConfirm=confirm("您真的要退出吗?");
    if(isConfirm){
      $.ajax({
        type:"post",
        url:"/logout",
        success:function(){
          // console.log(response);
          location.href="login.html";
        },
        error:function(){
          alert("退出失败");
        }
      })
    }
})
// 处理日期时间格式
function formateData(date){
  // 将日期时间字符串转换成日期对象
  date=new Date(date);
  return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}
// 向服务器端发送请求 索要登录用户信息
// userID就是登录用户的id，是由status接口返回的
$.ajax({
  type:"get",
  url:"/users/"+userId,
  success:function(response){
    $(".avatar").attr("src",response.avatar);
    $(".profile .name").html(response.nickName);
  }
})