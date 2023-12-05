document.addEventListener("DOMContentLoaded", function () {
    // 获取页面中的元素
    const currentTimeElement = document.getElementById("currentTime");
    const refreshButton = document.getElementById("refreshButton");
    const popularThingsContainer = document.getElementById("popularThings");
    const lizhiThingsContainer = document.getElementById("lizhiThings");
    const dynamicDataContainer = document.getElementById("dynamicDataContainer");

    // 刷新数据按钮点击事件处理
    if (refreshButton) {
        refreshButton.addEventListener("click", function () {
            fetchData('https://www.nexthing.cc/php/get_data.php', 'popularThings');
            fetchData('https://www.nexthing.cc/php/get_lizhi.php', 'lizhiThings');
            fetchData('https://www.nexthing.cc/php/seniorthing.php', 'thing-container');
        });
    }

    // 获取并显示数据的函数
    function fetchData(apiUrl, containerId) {
        fetchAndDisplayData(apiUrl, containerId);
    }

    // 从 API 获取数据并显示在页面上
    function fetchAndDisplayData(apiUrl, containerId) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Check if data is empty
                if (data.length === 0) {
                    const message = document.createElement('p');
                    message.textContent = "好像所有人都躺平了。还是摸一会鱼,就洗洗睡吧。";
                    document.body.appendChild(message);
                } else {
                    let things = data.result.things || []; // 获取数据库中的数据

                    // 如果数据为空，显示默认消息
                    const displayContent = things.length > 0
                        ? things.map(thing => `<p>${thing}</p>`).join('')
                        : '<p>好像现在所有人都躺平了</p>';

                    const container = document.getElementById(containerId);

                    if (container) {
                        container.innerHTML = displayContent;
                    } else {
                        console.error(`Container with id ${containerId} not found.`);
                    }
                }
            })
            .catch(error => {
                console.error(`Error fetching data from ${apiUrl}:`, error);
            });
    }

    // 获取并显示英语数据
    fetch('https://www.nexthing.cc/php/english.php')
        .then(response => response.json())
        .then(data => {
            var content = data.result.content;
            var htmlContent = `<p><strong>Content:</strong> ${content}</p>`;
            if (dynamicDataContainer) {
                dynamicDataContainer.innerHTML = htmlContent;
            }
        })
        .catch(error => {
            console.error('Error fetching English data:', error);
        });

    // 在页面加载完成后执行
    updateTime();                         // 更新当前时间
    currentTimeElement.classList.add("purple");  // 添加 CSS 类
    setInterval(updateTime, 1000);        // 每秒更新时间
    fetchData('https://www.nexthing.cc/php/get_data.php', 'popularThings'); // 调用获取数据的函数
    fetchData('https://www.nexthing.cc/php/get_lizhi.php', 'lizhiThings');  // 调用获取努力的人数据的函数
    fetchData('https://www.nexthing.cc/php/seniorthing.php', 'thing-container'); // 调用获取 seniorthing 数据的函数
});

// 每秒更新计时器
setInterval(function () {
    // 如果这里有其他代码，请将其添加在这里
}, 1000);