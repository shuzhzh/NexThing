
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
                popularThingsElement.innerText = "好像都";
            }
        })
        .catch(error => console.error('出错了', error));
    }
});
