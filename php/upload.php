<?php

// 检查是否有文件上传
if (isset($_FILES['image'])) {
    $file = $_FILES['image'];

    // 要存储的目录
    $uploadDirectory = '../img/user/' . date('Y-m-d') . '/';

    if (!file_exists($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true);
    }

    $fileName = $file['name'];
    $filePath = $uploadDirectory . $fileName;
    
    // 处理重名文件
    $i = 1;
    while (file_exists($filePath)) {
        $fileName = pathinfo($file['name'], PATHINFO_FILENAME) . $i . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
        $filePath = $uploadDirectory . $fileName;
        $i++;
    }

    // 移动上传的文件到指定目录
    move_uploaded_file($file['tmp_name'], $filePath);

    // 存储路径和文件名到数据库（这里假设有一个数据库连接）
    $servername = "localhost";
    $username = "nexthing";
    $password = "Shuzhzh0923";
    $dbname = "nexthing";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("数据库连接失败: " . $conn->connect_error);
    }

    $sql = "INSERT INTO images (file_path) VALUES ('$filePath')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("file_path" => $filePath, "message" => "文件上传成功"));
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
} else {
    echo json_encode(array("message" => "未选择要上传的文件"));
}
?>
