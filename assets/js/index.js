$(function () {
    getUserInfo();
    var layer = layui.layer
    $("#btnLogout").on("click", function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1退出登陆后要做的事情
            localStorage.removeItem('token');
            //2重新跳转到登录页面
            location.href = '/login.html';
            //3关闭confirm询问框
            layer.close(index);
        });




    });














});
//调用用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        //请求头 配置对象
        /*headers: {
            Authorization: localStorage.getItem('token') || ''
        },*/
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            //调用渲染用户头像
            renderAvatar(res.data);
        },
        //无论成功或者失败都会调用complete这个函数  不登录永远不会访问主页
        /*complete: function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！');
            {
                //1强制清除token
                localStorage.removeItem('token');
                //2强制跳回到登录页面
                //location.href = '/login.html';
            }
        }*/
    });







}
//渲染用户头像方法
function renderAvatar(user) {
    //1获得用户名称
    var name = user.nickname || user.username;
    //2设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //3按需渲染用户头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show();
    } else {
    }
}
