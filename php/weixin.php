<?php
// 允许来自任何域的请求
header('Access-Control-Allow-Origin: *');

function posturl($url, $data)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    $output = curl_exec($curl);
    curl_close($curl);
    return $output;
}

$parArr = array('key' => '66e263806d51ebe800dc5d91548953fc', 'num' => '50');
$tianapi_data = posturl('https://apis.tianapi.com/wxnew/index', $parArr);
$json = json_decode($tianapi_data, true); //将JSON解析成数组

header('Content-Type: application/json'); // 设置响应头，告诉浏览器返回的是 JSON 数据

if ($json['code'] == 200) { //判断状态码
    echo json_encode($json, JSON_UNESCAPED_UNICODE); // 使用 json_encode 输出 JSON 格式的字符串
} else {
    echo json_encode(array('error' => '错误提示：' . $json['msg']), JSON_UNESCAPED_UNICODE);
}
?>
