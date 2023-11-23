<?php
// 允许来自任何域的请求
header('Access-Control-Allow-Origin: *');
// 假设这里是你的数据库连接信息
$servername = "localhost";
$username = "nexthing";
$password = "Shuzhzh0923";
$dbname = "nexthing";

// 获取前端发送的时间
$data = json_decode(file_get_contents('php://input'), true);
$time = $data['time'];

// 创建数据库连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接是否成功
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 查询数据库中对应时间的随机三个数据
$sql = "SELECT thing FROM lizhi WHERE time = $time ORDER BY RAND() LIMIT 3";
$result = $conn->query($sql);

$things = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        array_push($things, $row['thing']);
    }
}

// 将查询到的数据发送回前端
echo json_encode($things);

$conn->close();
?>
