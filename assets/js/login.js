$(function () {
    // 实现登录和注册的切换功能
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 LayUI 中获取 form\layer 对象
    const form = layui.form;
    const layer = layui.layer;

    // 通过 form.verify() 方法自定义校验规则
    form.verify({
        // 自定义一个叫 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致的规则
        repwd: (val) => {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $(".reg-box [name=password]").val();
            if (pwd !== val) return "两次密码不一致"
        },
    });
    // const baseUrl = 'http://www.liulongbin.top:3007'
    // 注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg("注册成功！");
                // 注册成功后跳转到登录界面
                $("#link_login").click();
            },
        })
    })
    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: res => {
                // console.log(res);
                if (res.status !== 0) return layer.msg('登录失败！');
                layer.msg('登陆成功！')
                // 保存token数据
                localStorage.setItem('token', res.token)
                // 跳转页面
                location.href = '/index.html'
            }
        })
    })



})