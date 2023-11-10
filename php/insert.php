<?php
// 连接数据库
$servername = "localhost";
$username = "nexthing";
$password = "Shuzhzh0923";
$dbname = "nexthing";

$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 获取POST请求的数据
$data = json_decode(file_get_contents("php://input"));

// 防止SQL注入攻击
$time = mysqli_real_escape_string($conn, $data->time);
$thing = mysqli_real_escape_string($conn, $data->thing);

// 检查是否已存在相同的记录
$checkQuery = "SELECT * FROM nexthing WHERE time = $time AND thing = '$thing'";
$checkResult = $conn->query($checkQuery);

if ($checkResult->num_rows > 0) {
    // 存在相同的记录
    $response = array('message' => '相同的记录已存在，不允许重复插入。');
} else {
    // 插入新记录
    $insertQuery = "INSERT INTO nexthing (time, thing) VALUES (?, ?)";
    $stmt = $conn->prepare($insertQuery);
    
    // 使用 bind_param 绑定参数
    $stmt->bind_param("is", $time, $thing);
    
    // 执行预处理语句
    $stmt->execute();
    

    if ($conn->query($insertQuery) === TRUE) {
        $response = array('message' => '记录插入成功。');
    } else {
        $response = array('message' => '插入记录时发生错误：' . $conn->error);
    }
}

// 关闭数据库连接
$conn->close();

// 将响应以 JSON 格式返回
header('Content-Type: application/json');
echo json_encode($response);
?>
