$(document).ready(function () {
    var newsContainer = $('#news-container');
    var loadMoreBtn = $('#load-more-btn');
    var pageNum = 1; // 初始化页码

    // 加载新闻数据的函数
    function loadNews() {
        var num = 10; // 每次加载的新闻数量

        // 发送请求获取新闻数据
        $.ajax({
            url: 'https://www.nexthing.cc/php/weixin.php',
            type: 'POST',
            data: {num: num, page: pageNum},
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {
                    // 成功获取新闻数据，将新闻展示在页面上
                    displayNews(data.result.list);
                    pageNum++; // 页码加1，准备加载下一页数据
                } else {
                    console.error('获取新闻数据失败：' + data.msg);
                }
            },
            error: function () {
                console.error('请求新闻数据失败');
            }
        });
    }

    // 在页面上展示新闻的函数
    function displayNews(newsData) {
        // 遍历新闻数据并添加到新闻容器中
        newsData.forEach(function (news) {
            var newsItem = $('<div class="news-item">' +
                '<h3>' + news.title + '</h3>' +
                '<p>' + news.description + '</p>' +
               //显示图片，但是图片无效 '<img src="' + news.picurl + '" alt="News Image">' +
                '<p>作者：' + news.author + '</p>' +
                '<p>时间：' + news.ctime + '</p>' +
                '<a href="' + news.url + '" target="_blank">阅读原文</a>' +
                '</div>');
            newsContainer.append(newsItem);
        });
    }

    // 初次加载新闻
    loadNews();

    // 点击"加载更多"按钮时触发加载新闻数据
    loadMoreBtn.on('click', function () {
        loadNews();
    });
});

