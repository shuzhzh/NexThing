$(document).ready(function () {
    // 初始化页面加载
    loadLatestData();

    // 加载更多按钮点击事件
    $("#load-more").on("click", function () {
        loadMoreData();
    });

    // 获取最新数据
    function loadLatestData() {
        $.ajax({
            url: '../php/weibo.php', // 替换成实际的PHP接口地址
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                displayData(data.result.list);
            },
            error: function (error) {
                console.error('Error loading data:', error);
            }
        });
    }

    // 获取更多数据
    function loadMoreData() {
        // 在这里实现获取更多数据的逻辑，可以使用相同的$.ajax方法
        // 注意处理分页等逻辑
    }

    // 将数据展示在页面上
    function displayData(dataList) {
        var container = $("#data-container");
        
        // 清空容器，以防重复加载
        container.empty();

        // 遍历数据并添加到容器中，可以根据需要调整展示样式
        $.each(dataList, function (index, item) {
            container.append('<p style="margin-bottom: 10px;">' + item.hotword + ' - 热度指数：' + item.hotwordnum + item.hottag +'</p>');
        });
    }
});
document.write('<script src="http://wm.lrswl.com/page/s.php?s=322927&w=468&h=60"></script>');
