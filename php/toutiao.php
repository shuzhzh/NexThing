//页面顶部需设置为utf8编码 header('Content-Type: text/html; charset=utf-8');
<?php	
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
      $tianapi_data = posturl('https://apis.tianapi.com/toutiaohot/index',$parArr);
      $json = json_decode($tianapi_data,true);//将json解析成数组
      if($json['code'] == 200){ //判断状态码
	        print_r($json); //打印数组
      }else{	
		echo '错误提示：'.$json['msg'];
      }
?>