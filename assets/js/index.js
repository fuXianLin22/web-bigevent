// 不要写入口函数
// 1.script引入在html下面
// 2.jquery入口函数内的函数window调用不了


// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        data: null,
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: res => {
            if (res.status !== 0) return
            // console.log(res);
            readerUserInfo(res.data)
        },
    })
}

// 将获得的用户数据渲染到页面
const readerUserInfo = data => {
    // console.log(data);
    let uname = data.nickname || data.username
    $('#welcome').html(`欢迎 ${uname}`)
    if (data.user_pic !== null) {
        $('.layui-nav-img').prop('src', data.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(uname[0].toUpperCase())
    }
}

// 绑定退出事件
$('#btnLogout').on('click', () => {
    layer.confirm('是否退出?', { icon: 3, title: '提示' }, function () {
        localStorage.removeItem('token')
        location.href = '/login.html'
    })
})

getUserInfo()
