document.addEventListener('DOMContentLoaded', function() {  
  // 获取当前时间并格式化  
  const currentTime = new Date();  
  const year = currentTime.getFullYear();  
  const month = String(currentTime.getMonth() + 1).padStart(2, '0');  
  const date = String(currentTime.getDate()).padStart(2, '0');  
  const hours = String(currentTime.getHours()).padStart(2, '0');  
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');  
  const seconds = String(currentTime.getSeconds()).padStart(2, '0');  
  
  // 格式化为 "yyyy-mm-dd hh:mm"  
  const formattedTime = `${year}-${month}-${date} ${hours}:${minutes}`;  
  
  // 将格式化后的时间显示在页面上  
  document.getElementById('current-time').textContent = `现在时间：${formattedTime}`;  
  
  // 动态更新时间  
  setInterval(function() {  
    const currentTime = new Date();  
    const year = currentTime.getFullYear();  
    const month = String(currentTime.getMonth() + 1).padStart(2, '0');  
    const date = String(currentTime.getDate()).padStart(2, '0');  
    const hours = String(currentTime.getHours()).padStart(2, '0');  
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');  
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');  
  
    const formattedTime = `${year}-${month}-${date} ${hours}:${minutes}`;  
    document.getElementById('current-time').textContent = `现在时间：${formattedTime}`;  
  }, 1000); // 每秒更新一次时间  
});