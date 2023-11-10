
document.addEventListener("DOMContentLoaded", function() {
    const currentTimeElement = document.getElementById("currentTime");
    const refreshButton = document.getElementById("refreshButton");

    // 更新当前时间，并设置格式为 HH:MM:SS
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeElement.innerText = hours + ":" + minutes + ":" + seconds;
    }

    // 刷新数据按钮点击事件处理
    refreshButton.addEventListener("click", function() {
        fetchData();
    });

    // 获取当前时间
    updateTime();

    // 设置当前时间的样式为紫色
    currentTimeElement.classList.add("purple");

    // 定时更新当前时间
    setInterval(updateTime, 1000);

    // 请求数据的函数
    function fetchData() {
        let currentTime = new Date().getHours();

        fetch('../php/get_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ time: currentTime })
        })
        .then(response => response.json())
        .then(data => {
            let popularThingsElement = document.getElementById("popularThings");
            let displayData = data.filter(item => item !== null && item !== undefined);
            if (displayData.length > 0) {
                popularThingsElement.innerText = displayData.join(", ");
                popularThingsElement.classList.add("purple");
            } else {
                popularThingsElement.innerText = "好像都躺平了";
            }
        })
        .catch(error => console.error('出错了', error));
    }
    function fetchData_lizhi() {
        let currentTime = new Date().getHours();

        fetch('../php/get_lizhi.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ time: currentTime })
        })
        .then(response => response.json())
        .then(data => {
            let popularThingsElement = document.getElementById("lizhiThings");
            let displayData = data.filter(item => item !== null && item !== undefined);
            if (displayData.length > 0) {
                popularThingsElement.innerText = displayData.join(", ");
                popularThingsElement.classList.add("purple");
            } else {
                popularThingsElement.innerText = "好像都躺平了";
            }
        })
        .catch(error => console.error('出错了', error));
    }
});


function recordActivity() {
    let activityInput = document.getElementById('activity');
    let activity = activityInput.value.trim();

    if (activity === '') {
        alert('请输入正在做的事情！');
        return;
    }

    let currentTime = new Date().getHours();

    fetch('../php/insert.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            time: currentTime,
            thing: activity
        })
    })
    .then(response => {
        console.log('Response:', response);
        return response.json();
    })
    .then(data => {
        console.log('Data:', data);
        document.getElementById('responseMessage').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
};

document.addEventListener("DOMContentLoaded", function() {
    // 在页面加载完成后执行
    fetchData(); // 调用获取数据的函数
});

window.onload = function() {  
    fetch('../php/toutiao.php')  
        .then(response => response.json())  
        .then(data => {  
            let list = data.result.list;  
            for(let i = 0; i < list.length; i++) {  
                let hotindex = list[i].hotindex;  
                let word = list[i].word;  
                document.getElementById("data-container").innerHTML += `搜索指数榜: ${hotindex}, 头条新闻: ${word}<br/>`;  
            }  
        })  
        .catch(error => console.error('Error:', error));  
};