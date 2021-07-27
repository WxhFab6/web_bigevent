$(function () {
    $("#link_reg").on("click", function () {
        //点击去注册账号的链接
        $(".login-box").hide();
        $(".reg-box").show();
    });



    //点击去登录的链接
    $("#link_login").on("click", function () {

        $(".login-box").show();
        $(".reg-box").hide();
    });



    //自定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        'pwd': [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],


        //校验两次密码是否一致 规则
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val();
            if (pwd !== value) {
                return "两次密码不一致！";
            }
        }
    });


    //监听注册表单的提交事件 注意 注册功能接口有问题！
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username:
                $("#form_reg[name=username]").val(),
            password:
                $("#form_reg[name=password]").val()
        }
        $.ajax({
            url: "/api/reguser",
            method: "POST",
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("注册失败！");
                }
                layer.msg("注册成功请登录！");
                //模拟人的点击行为
                $("#link_login").click();

            }
        });
    });


    //监听登录表单的提交事件
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({

            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登陆失败！");
                }
                layer.msg("登陆成功！");
                //得到的token字符串保存到localStroage
                localStorage.setItem('token', res.token);

                //跳转到后台主页
                location.href = "/index.html";

            }
        });






    });






































});