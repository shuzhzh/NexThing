document.getElementById('baidu_search_button').addEventListener('click', function() {  
  // 获取搜索关键词  
  var keyword = document.getElementById('baidu_search_input').value;  
  
  // 构建百度搜索的URL  
  var baiduUrl = 'https://www.baidu.com/s?wd=' + encodeURIComponent(keyword);  
  
  // 跳转到百度搜索结果页  
  window.location.href = baiduUrl;  
});

// 获取按钮元素
const buttons = document.querySelectorAll('button');

// 存储点击次数的对象
let clicks = {};

// 监听按钮点击事件
buttons.forEach(button => {
  button.addEventListener('click', function() {
    // 获取当前时间（小时）
    const hour = new Date().getHours();

    // 如果点击次数对象中没有该小时的数据，则创建一个空数组
    if (!clicks[hour]) {
      clicks[hour] = [];
    }

    // 将当前按钮的点击次数添加到该小时的数组中
    clicks[hour].push(this.id);

    // 计算并显示按钮点击次数占比
    const result = calculatePercentage(clicks);
    document.getElementById('result').innerHTML = result;
  });
});

// 计算按钮点击次数占比的函数
function calculatePercentage(clicks) {
  // 计算每个按钮在当前小时的点击次数
  const button1Count = clicks['0'].filter(id => id === 'button1').length;
  const button2Count = clicks['0'].filter(id => id === 'button2').length;
  const button3Count = clicks['0'].filter(id => id === 'button3').length;

  // 计算每个按钮点击次数占比
  const button1Percentage = button1

  // 获取输入框和按钮元素
const labelInput = document.getElementById('labelInput');
const countButton = document.getElementById('countButton');
const result = document.getElementById('result');

// 存储点击次数的对象
let clicks = {};

// 监听按钮点击事件
countButton.addEventListener('click', function() {
  // 获取输入框中的标签文案
  const label = labelInput.value;

  // 如果点击次数对象中没有该标签文案的数据，则创建一个空数组
  if (!clicks[label]) {
    clicks[label] = [];
  }

  // 将当前标签的点击次数添加到该标签文案的数组中
  clicks[label].push(label);

  // 计算并显示标签点击次数占比
  const percentage = calculatePercentage(clicks);
  result.innerHTML = percentage;
});

// 计算标签点击次数占比的函数
function calculatePercentage(clicks) {
  // 计算每个标签文案在当前小时的点击次数
  const labelCount = Object.values(clicks).reduce((a, b) => a + b.length, 0);

  // 计算标签点击次数占比
  const percentage = labelCount / Object.keys(clicks).length;

  return percentage.toFixed(2);
}