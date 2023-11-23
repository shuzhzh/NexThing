document.addEventListener('DOMContentLoaded', function() {  
    var form = document.getElementById('chat-form');  
    var userInput = document.getElementById('user-input');  
    var responseDiv = document.getElementById('response');  
  
    form.addEventListener('submit', function(event) {  
        event.preventDefault(); // 阻止表单默认提交行为  
  
        // 发送 AJAX 请求到 PHP 文件  
        var xhr = new XMLHttpRequest();  
        xhr.open('POST', '../php/yiyan.php', true); // 将 'your-php-file.php' 替换为你的 PHP 文件名  
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  
        xhr.onreadystatechange = function() {  
            if (xhr.readyState === XMLHttpRequest.DONE) {  
                if (xhr.status === 200) {  
                    // 请求成功，显示响应结果到页面上  
                    responseDiv.innerHTML = xhr.responseText;  
                } else {  
                    // 请求失败，显示错误信息  
                    responseDiv.innerHTML = '请求失败：' + xhr.status;  
                }  
            }  
        };  
        xhr.send('user_input=' + encodeURIComponent(userInput.value)); // 将用户输入作为参数发送到 PHP 文件  
    });  
});