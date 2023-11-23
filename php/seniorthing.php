
<?php

// 允许来自任何域的请求
header('Access-Control-Allow-Origin: *');

// 连接数据库
$servername = "localhost";
$username = "nexthing";
$password = "Shuzhzh0923";
$dbname = "nexthing";

$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接是否成功
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 获取当前用户访问的小时数
$currentHour = date("G");

// 构建查询语句，获取符合条件的最大三个数据内容
$sql = "SELECT thing, url, other FROM senior_thing WHERE time = $currentHour ORDER BY thing DESC LIMIT 3";
$result = $conn->query($sql);

// 将查询结果转换为数组并输出为 JSON
$data = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
echo json_encode($data);

// 关闭数据库连接
$conn->close();
?>