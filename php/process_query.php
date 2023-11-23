<?php  
// 允许来自任何域的请求
header('Access-Control-Allow-Origin: *');

// 连接数据库（根据实际情况填写数据库信息）  
$servername = "localhost";  
$username = "nexthing";  
$password = "Shuzhzh0923";
$dbname = "nexthing";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("连接失败: ". $conn->connect_error);
}

// 查询所有数据
$sql = "SELECT * FROM nexthing ORDER BY time";

// 执行查询操作
$result = $conn->query($sql);

// 检查结果
if ($result->num_rows > 0) {
    // 输出数据行
    while($row = $result->fetch_assoc()) {
        echo "时间: ". $row["time"]. " 点，可以做的事情: ". $row["thing"]. "<br>";
    }
} else {
    echo "没有数据";
}

$conn->close();
?>
