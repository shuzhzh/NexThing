<?php  
// 连接到数据库  
$servername = "localhost";  
$username = "nexthing";  
$password = "Shuzhzh0923";  
$dbname = "nexthing";  
  
$conn = new mysqli($servername, $username, $password, $dbname);  
  
// 检查连接是否成功  
if ($conn->connect_error) {  
    die("连接失败: " . $conn->connect_error);  
}  
  
// 获取从客户端发送的小时参数  
$hour = $_POST['hour'];  
  
// 查询数据库  
$sql = "SELECT thing FROM nexthing WHERE HOUR(time) = $hour";  
$result = $conn->query($sql);  
  
// 检查查询结果  
if ($result->num_rows > 0) {  
    // 随机选择3行数据  
    $randomRows = array();  
    $totalRows = $result->num_rows;  
    $randomIndex = array_rand($result->fetch_assoc(), 3); // 随机选择3个索引  
    for ($i = 0; $i < 3; $i++) {  
        $randomRows[] = $result->fetch_assoc($randomIndex[$i]); // 将随机选择的数据添加到数组中  
    }  
    // 将随机选择的数据转换为JSON格式并返回给客户端  
    echo json_encode($randomRows);  
} else {  
    echo "好像所有人都在摸鱼。";  
}  
  
// 关闭连接  
$conn->close();  
?>