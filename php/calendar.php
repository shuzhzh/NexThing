<?php

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

// 生成一天的行程
$daySchedule = array();

for ($hour = 0; $hour < 24; $hour++) {
    // 随机从数据库中取一条数据
    $query = "SELECT * FROM senior_thing WHERE time = $hour ORDER BY RAND() LIMIT 1";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $daySchedule[] = $row;
    }
}

// 将行程数据转换为 JSON 格式
echo json_encode($daySchedule);

// 关闭数据库连接
$conn->close();

?>
