document.addEventListener("DOMContentLoaded", function() {  
    const containers = ['data-container-1', 'data-container-2', 'data-container-3'];  
  
    fetch('https://www.nexthing.cc/php/seniorthing.php')  
        .then(response => response.json())  
        .then(data => {  
            // 检查返回的数据是否为空数组  
            if (data.length === 0) {  
                // 如果数据为空，向第一个container显示提示信息  
                const container = document.getElementById(containers[0]);  
                container.textContent = "好像所有人都躺平了，你也休息一下吧！";  
            } else {  
                // 遍历每个数据项  
                data.forEach((item, index) => {  
                    const container = document.getElementById(containers[index]);  
                    const element = document.createElement('a');  
                    element.textContent = item.thing + ' ' + (item.other || '');  
                    element.href = item.url;  
                    element.target = '_blank';  
                    container.appendChild(element);  
                    container.appendChild(document.createElement('br'));  
                });  
            }  
        });  
});