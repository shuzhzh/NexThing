document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    // 发送登录信息到后端验证
    fetch('../php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '../pages/SQL.html'; // 登录成功，跳转到指定网页
        } else {
            document.getElementById('loginMessage').innerText = '登录失败，请检查用户名和密码。';
        }
    })
    .catch(error => {
        console.error('登录过程出现错误:', error);
    });
});


var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?2d8c330e76a8c66771dbe6e73ef3694a";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
