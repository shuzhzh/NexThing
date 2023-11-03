<?php  
// 连接数据库（根据实际情况填写数据库信息）  
$servername = "localhost";  
$username = "nexthing";  
$password = "Shuzhzh0923";  
$dbname = "nexthing";  

$conn = new mysqli($servername, $username, $password, $dbname);  

if ($conn->connect_error) {  
    die("连接失败: " . $conn->connect_error);  
}  
  
// 处理表单提交的数据并插入到数据库表中  
$time = $_POST['time'];  
$thing = $_POST['thing'];  
$sql = "INSERT INTO nexthing (time,thing) VALUES ('$time', '$thing')";  
if ($conn->query($sql) === TRUE) {  
    echo "数据插入成功";  
} else {  
    echo "错误: " . $sql . "<br>" . $conn->error;  
}  
$conn->close();  
?>