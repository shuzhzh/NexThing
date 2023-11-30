<?php
// 从请求中获取时区信息
$userTimeZone = $_GET['timezone'];

// 检查时区是否有效
if (!in_array($userTimeZone, timezone_identifiers_list())) {
    die("Invalid timezone");
}

// 设置 PHP 时区
date_default_timezone_set($userTimeZone);

// 替换以下信息为你的数据库连接信息
$servername = "localhost";
$username = "nexthing";
$password = "Shuzhzh0923";
$dbname = "nexthing";

// 创建数据库连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接是否成功
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 获取明日的日期
$tomorrow = date('Y-m-d', strtotime('+1 day'));

// 定义 iCal 文件内容
$icalContent = "BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN";

// 每个整点随机选择一条记录
for ($hour = 0; $hour < 24; $hour++) {
    // 获取明日某个整点的随机记录
    $sql = "SELECT * FROM senior_thing WHERE HOUR(time) = $hour ORDER BY RAND() LIMIT 1";
    $result = $conn->query($sql);

    // 如果有记录，则加入到 iCal 文件中
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // 计算事件的开始和结束时间
        $eventStartDate = date('Ymd\THis', strtotime("{$tomorrow} {$hour}:00:00"));
        $eventEndDate = date('Ymd\THis', strtotime("{$tomorrow} {$hour}:59:59"));

        $icalContent .= "
BEGIN:VEVENT
DTSTART:{$eventStartDate}
DTEND:{$eventEndDate}
SUMMARY:{$row['thing']}
DESCRIPTION:{$row['other']}
URL:{$row['url']}
LOCATION:NexThing.cc
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT";
    }
}

$icalContent .= "
END:VCALENDAR";

// 输出 iCal 内容
header('Content-Type: text/calendar; charset=utf-8');
header('Content-Disposition: attachment; filename="nexthing_calendar.ics"');
echo $icalContent;

// 关闭数据库连接
$conn->close();
?>
