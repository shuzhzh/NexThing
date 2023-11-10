document.addEventListener("DOMContentLoaded", function() {
    const currentTimeElement = document.getElementById("currentTime");
    const refreshButton = document.getElementById("refreshButton");
    const refreshLizhiButton = document.getElementById("refreshLizhiButton");

    // 更新当前时间，并设置格式为 HH:MM:SS
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeElement.innerText = `${hours}:${minutes}:${seconds}`;
    }

    // 刷新数据按钮点击事件处理
    refreshButton.addEventListener("click", fetchData);

    // 刷新努力的人按钮点击事件处理
    refreshLizhiButton.addEventListener("click", fetchDataLizhi);

    // 记录活动的函数
    function recordActivity() {
        const activityInput = document.getElementById('activity');
        const activity = activityInput.value.trim();

        if (activity === '') {
            alert('请输入正在做的事情！');
            return;
        }

        const currentTime = new Date().getHours();

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
        .then(response => response.json())
        .then(data => {
            console.log('Data:', data);
            document.getElementById('responseMessage').innerText = data.message;
        })
        .catch(error => {
            console.error('Error recording activity:', error);
        });
    }

    // 请求数据的函数
    function fetchData() {
        const currentTime = new Date().getHours();

        fetchAndDisplayData('../php/get_data.php', 'popularThings', currentTime);
    }

    function fetchDataLizhi() {
        const currentTime = new Date().getHours();

        fetchAndDisplayData('../php/get_lizhi.php', 'lizhiThings', currentTime);
    }

    // 获取新闻数据
    function fetchNews() {
        const newsApiUrl = "../php/toutiao.php";

        fetch(newsApiUrl)
            .then(response => response.json())
            .then(data => {
                displayNews(data.result.list);
            })
            .catch(error => {
                console.error('Error fetching news data:', error);
            });
    }

    // 显示新闻数据
    function displayNews(newsList) {
        const newsContainer = document.getElementById("news-container");
        const newsListElement = document.createElement("ul");

        newsList.forEach(newsItem => {
            const newsItemElement = document.createElement("li");
            newsItemElement.textContent = newsItem.word;
            newsListElement.appendChild(newsItemElement);
        });

        newsContainer.appendChild(newsListElement);
    }

    // 在页面加载完成后执行
    updateTime();
    currentTimeElement.classList.add("purple");
    setInterval(updateTime, 1000);
    fetchData(); // 调用获取数据的函数
    fetchNews(); // 调用获取新闻的函数
});

// 通用的数据获取和展示函数
function fetchAndDisplayData(url, elementId, currentTime) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time: currentTime })
    })
    .then(response => response.json())
    .then(data => {
        const element = document.getElementById(elementId);
        const displayData = data.filter(item => item !== null && item !== undefined);
        if (displayData.length > 0) {
            element.innerText = displayData.join(", ");
            element.classList.add("purple");
        } else {
            element.innerText = "好像都躺平了";
        }
    })
    .catch(error => {
        console.error(`Error fetching and displaying data for ${elementId}:`, error);
    });
}
