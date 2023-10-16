// 获取当前时间并显示在网页上  
function showTime() {  
    var date = new Date();  
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();  
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();  
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();  
    document.getElementById('time').innerHTML = date.toLocaleTimeString() + " " + hours + ":" + minutes + ":" + seconds;  
}  
  
// 每秒钟更新一次时间  
setInterval(function() {  
    showTime();  
}, 1000);