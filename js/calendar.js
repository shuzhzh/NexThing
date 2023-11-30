document.addEventListener("DOMContentLoaded", function () {
    // 向后端请求数据
    fetch('../php/calendar.php') 
        .then(response => response.json())
        .then(data => {
            // 处理返回的数据
            displaySchedule(data);
        })
        .catch(error => console.error('Error:', error));
});

function formatTime(time) {
    // 将时间格式化为 00:00 的形式
    return (time < 10 ? '0' : '') + time + ':00';
}

function displaySchedule(schedule) {
    // 获取显示行程的容器
    var scheduleContainer = document.getElementById('schedule');

    // 遍历行程数据并显示在页面上
    schedule.forEach(item => {
        var nextHour = (item.time + 1) % 24;
        var scheduleItem = document.createElement('div');

        // 修正时间显示逻辑
        var displayStartHour = item.time;
        var displayEndHour = nextHour;

        scheduleItem.innerHTML = `<h3>${item.thing}</h3> ${formatTime(displayStartHour)} <br>`;
        
        scheduleItem.innerHTML += `<strong>Try this : <a href="${item.url}" target="_blank">${item.url}</a><br></strong>${item.other}<br><br>`;
        
        scheduleContainer.appendChild(scheduleItem);
    });
}
