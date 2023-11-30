<?php
$file = $_GET['file'];

// 设置文件类型
header('Content-type: text/calendar');

// 设置下载文件的名称
header('Content-Disposition: attachment; filename="' . $file . '"');

// 读取文件并输出
readfile($file);
?>
