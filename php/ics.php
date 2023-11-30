<?php
// 从请求中获取时区信息（这里假设前端将时区信息作为参数发送）
$userTimeZone = $_GET['timezone']; // 请根据你的实际情况修改这里

// 设置 PHP 时区
date_default_timezone_set($userTimeZone);

// 允许来自任何域的请求
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/calendar; charset=utf-8');
header('Content-Disposition: attachment; filename="nexthing_calendar.ics"');

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
$daySchedule = '';

for ($hour = 0; $hour < 24; $hour++) {
    // 随机从数据库中取一条数据
    $query = "SELECT * FROM senior_thing WHERE time = $hour ORDER BY RAND() LIMIT 1";
    $result = $conn->query($query);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // 计算事件的开始和结束时间
        $currentDate = date('Ymd\T00:00:00');
        $eventStartDate = date('Ymd\THis', strtotime("+{$hour} hours"));
        $eventEndDate = date('Ymd\THis', strtotime("+{$hour} hours +1 hour"));

        $daySchedule .= "BEGIN:VEVENT\r\n";
        $daySchedule .= "DTSTART:{$eventStartDate}\r\n";
        $daySchedule .= "DTEND:{$eventEndDate}\r\n";
        $daySchedule .= "SUMMARY:{$row['thing']}\r\n";
        $daySchedule .= "DESCRIPTION:{$row['other']}\r\n";
        $daySchedule .= "URL:{$row['url']}\r\n";
        $daySchedule .= "LOCATION:NexThing.cc\r\n";
        $daySchedule .= "STATUS:CONFIRMED\r\n";
        $daySchedule .= "SEQUENCE:0\r\n";
        $daySchedule .= "END:VEVENT\r\n";
    }
}

// 创建ICS文件头部
echo "BEGIN:VCALENDAR\r\n";
echo "VERSION:2.0\r\n";
echo "CALSCALE:GREGORIAN\r\n";
echo "PRODID:-//NexThing//Your NexThing//EN\r\n";

// 输出行程数据
echo $daySchedule;

// 创建ICS文件尾部
echo "END:VCALENDAR";

// 关闭数据库连接
$conn->close();
?>
