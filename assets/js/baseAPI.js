//每次使用$Ajax  get 或POST之前都会调用  
//拼接地址URL 
$.ajaxPrefilter(function (options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    //统一为有权限的的接口设置headers请求头
    //为有权限的接口做判断
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //全局统一挂载complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1强制清除token
            localStorage.removeItem('token');
            //2强制跳回到登录页面  只要不登录就无法进入主页
            location.href = '/login.html';
        }








    }





});