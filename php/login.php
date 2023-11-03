<?php
// 模拟数据库连接和用户验证
$host = 'localhost';
$username = 'nexthing';
$password = 'Shuzhzh0923';
$database = 'nexthing';

// 建立数据库连接
$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("数据库连接失败: " . $conn->connect_error);
}

// 获取前端发送的用户名和密码
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

// 在实际场景中需要进行安全处理，例如使用密码哈希和准备语句来防止 SQL 注入

// 查询数据库进行用户验证
$sql = "SELECT * FROM user WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $response = array('success' => true);
} else {
    $response = array('success' => false);
}

echo json_encode($response);

$conn->close();
?>
