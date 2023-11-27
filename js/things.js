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

// 动态插入一个广告脚本
var script = document.createElement('script');
script.src = 'http://wm.lrswl.com/page/s.php?s=322927&w=468&h=60';
document.body.appendChild(script);

    // 获取提示框和按钮元素
    var homepagePrompt = document.getElementById('homepagePrompt');
    var setHomepageBtn = document.getElementById('setHomepageBtn');

    // 检查是否已经设置过主页
    var homepageSet = localStorage.getItem('homepageSet');

    // 如果未设置过主页或者用户手动设置为主页，则显示提示框
    if (!homepageSet || isHomepageSetManually()) {
        homepagePrompt.style.display = 'block';
    }

    // 设置主页按钮点击事件
    setHomepageBtn.addEventListener('click', function () {
        // 在这里添加设置主页的逻辑
        if (typeof InstallTrigger !== 'undefined') {
            // Firefox
            alert('请手动设置主页，暂不支持自动设置主页。');
        } else if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
            // Chrome or Edge
            chrome.runtime.sendMessage({
                type: 'homepage',
                url: window.location.href
            }, function (response) {
                if (response && response.success) {
                    // 隐藏提示框
                    homepagePrompt.style.display = 'none';

                    // 提示用户设置成功
                    alert('页面已成功设置为浏览器主页！');
                } else {
                    alert('设置主页失败。');
                }
            });
        } else if (window.safari) {
            // Safari
            alert('请手动设置主页，暂不支持自动设置主页。');
        } else {
            // 其他浏览器
            alert('对不起，暂不支持您的浏览器。');
        }

        // 使用本地存储标记已设置主页
        localStorage.setItem('homepageSet', 'true');
    });

    // 检查用户是否手动设置了主页
    function isHomepageSetManually() {
        // 获取浏览器主页的URL
        var browserHomepage = getBrowserHomepage();
        // 获取当前页面的URL
        var currentPageUrl = window.location.href;

        // 判断浏览器主页是否等于当前页面的URL
        return browserHomepage === currentPageUrl;
    }

    // 获取浏览器主页的URL
    function getBrowserHomepage() {
        // 在这里添加根据不同浏览器获取主页的逻辑
        if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
            // Chrome or Edge
            return chrome.runtime.getManifest().homepage_url;
        } else if (window.safari) {
            // Safari
            return window.location.origin;
        } else {
            // 其他浏览器
            return '';
        }
    }