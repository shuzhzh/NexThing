<?php	
// 允许来自任何域的请求
header('Access-Control-Allow-Origin: *');

function posturl($url,$data){
	$curl = curl_init();
	curl_setopt($curl,CURLOPT_URL,$url);
	curl_setopt($curl,CURLOPT_POST,1);
	curl_setopt($curl,CURLOPT_POSTFIELDS,$data);
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,false);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,false);
	$output = curl_exec($curl);
	curl_close($curl);
	return  $output;
}

      $parArr = array('key' => '66e263806d51ebe800dc5d91548953fc');
      $tianapi_data = posturl('https://apis.tianapi.com/weibohot/index',$parArr);
      $json = json_decode($tianapi_data,true);//将json解析成数组

// 设置响应头，确保输出的是 JSON 格式
header('Content-Type: application/json');

if ($json['code'] == 200) {
    // 输出 JSON 数据
    echo json_encode($json);
} else {
    // 输出错误信息
    echo json_encode(array('error' => '错误提示：' . $json['msg']));
}

?>