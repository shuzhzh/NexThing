document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const submitButton = document.getElementById('submitButton');
    const outputText = document.getElementById('outputText');
    const chartContainer = document.querySelector('.chart-container');
    const charCountDisplay = document.getElementById('charCount');

    // 字符限制
    const maxChars = 140;

    // 存储提交的内容
    let submittedData = [];

    // 初始化字符计数
    charCountDisplay.textContent = `0/${maxChars}`;

    submitButton.addEventListener('click', function() {
        const inputValue = userInput.value.trim();
        if (inputValue !== '') {
            const currentTime = getCurrentTime(); // 获取当前时间
            const dataEntry = currentTime + '，我准备：' + inputValue;

            // 去除之前输入的重复内容
            submittedData = submittedData.filter(entry => !entry.endsWith('，我准备：' + inputValue));

            submittedData.unshift(dataEntry); // 将数据添加到数组开头
            updateChart(submittedData);

            // 清空输入框内容
            userInput.value = '';
            charCountDisplay.textContent = `0/${maxChars}`; // 重置字符计数
        }
    });

    // 监听输入框内容变化，实时计算字符数量
    userInput.addEventListener('input', function() {
        const text = userInput.value;
        const remainingChars = maxChars - text.length;
        charCountDisplay.textContent = `${text.length}/${maxChars}`;

        // 超过字符限制时截断输入
        if (remainingChars < 0) {
            userInput.value = text.slice(0, maxChars);
            charCountDisplay.textContent = `${maxChars}/${maxChars}`;
        }
    });

    function getCurrentTime() {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        return `${month}/${day} ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }

    function formatTime(timeValue) {
        return timeValue < 10 ? '0' + timeValue : timeValue;
    }

    function updateChart(data) {
        chartContainer.style.display = 'block'; // 显示柱状图容器

        const chartBars = data.map(entry => {
            const parts = entry.split('：');
            const text = parts[1];

            // 随机生成颜色
            const randomColor = getRandomColor();

            const percentage = (countOccurrences(data, text) / data.length) * 100;
            return `<div class="chart-bar" style="background-color: ${randomColor};"><div class="bar" style="width: ${percentage}%"></div><span class="percentage">${percentage.toFixed(2)}%</span></div>`;
        });

        outputText.innerHTML = data.join('<br>') + chartBars.join('');
    }

    function countOccurrences(array, value) {
        return array.filter(entry => entry.endsWith('，我准备：' + value)).length;
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
