<?php  
// 开始一个 PHP 文件  
  
class Sample {  
    // 定义一个名为 Sample 的类  
  
    const API_KEY = "k0wQ99Yz6UED2icWpxCZkSvT";  
    // 声明一个常量 API_KEY，并赋值为 "k0wQ99Yz6UED2icWpxCZkSvT"  
  
    const SECRET_KEY = "XY0UOdNHrUaCgyX5eZ80Yd6yb04hIGm9";  
    // 声明一个常量 SECRET_KEY，并赋值为 "XY0UOdNHrUaCgyX5eZ80Yd6yb04hIGm9"  
  
    public function run() {  
        // 定义一个公共方法 run，该方法用于执行与百度千帆大模型的对话  
  
        $curl = curl_init();  
        // 初始化一个 cURL 会话，并返回一个 cURL 句柄  
  
        curl_setopt_array($curl, array(  
            // 设置 cURL 句柄的选项数组  
  
            CURLOPT_URL => "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token={$this->getAccessToken()}",  
            // 设置请求的 URL，其中包含了通过 getAccessToken 方法获取的访问令牌  
  
            CURLOPT_TIMEOUT => 30,  
            // 设置请求的超时时间为 30 秒  
  
            CURLOPT_RETURNTRANSFER => true,  
            // 设置 cURL 将返回的结果作为字符串返回，而不是直接输出到屏幕上  
  
            CURLOPT_SSL_VERIFYPEER  => false,  
            // 设置不验证 SSL 证书的对等主机  
  
            CURLOPT_SSL_VERIFYHOST  => false,  
            // 设置不验证 SSL 证书的主机名  
  
            CURLOPT_CUSTOMREQUEST => 'POST',  
            // 设置请求方法为 POST  
  
            CURLOPT_HTTPHEADER => array(  
                // 设置请求的 HTTP 头部信息  
                'Content-Type: application/json'  
            ),  
        ));  
  
        $response = curl_exec($curl);  
        // 执行 cURL 请求，并将返回的结果存储在变量 $response 中  
  
        curl_close($curl);  
        // 关闭 cURL 会话，释放资源  
  
        return $response;  
        // 返回请求的结果  
    }  
      
    /**  
     * 使用 AK，SK 生成鉴权签名（Access Token）  
     * @return string 鉴权签名信息（Access Token）  
     */  
    private function getAccessToken(){  
        // 定义一个私有方法 getAccessToken，用于生成鉴权签名（Access Token）  
  
        $curl = curl_init();  
        // 初始化一个 cURL 会话  
  
        $postData = array(  
            // 构建 POST 请求的数据数组  
            'grant_type' => 'client_credentials',  
            // 设置授权类型为客户端凭证  
  
            'client_id' => self::API_KEY,  
            // 设置客户端 ID 为 Sample 类中的 API_KEY 常量值  
  
            'client_secret' => self::SECRET_KEY  
            // 设置客户端密钥为 Sample 类中的 SECRET_KEY 常量值  
        );  
  
        curl_setopt_array($curl, array(  
            // 设置 cURL 句柄的选项数组（与 run 方法中的设置类似）  
            CURLOPT_URL => 'https://aip.baidubce.com/oauth/2.0/token',  
            CURLOPT_CUSTOMREQUEST => 'POST',  
            CURLOPT_SSL_VERIFYPEER  => false,  
            CURLOPT_SSL_VERIFYHOST  => false,  
            CURLOPT_RETURNTRANSFER => true,  
            CURLOPT_POSTFIELDS => http_build_query($postData)  
            // 设置 POST 请求的数据为上面构建的 $postData 数组（经过 http_build_query 函数处理）  
        ));  
  
        $response = curl_exec($curl);  
        // 执行 cURL 请求，并将返回的结果存储在变量 $response 中（与 run 方法中的操作类似）  
  
        curl_close($curl);  
        // 关闭 cURL 会话（与 run 方法中的操作类似）  
          
        $rtn = json_decode($response);  
        // 将返回的 JSON 数据解码为 PHP 对象，存储在变量 $rtn 中  
  
        return $rtn->access_token;  
        // 返回解码后的对象中的 access_token 属性值作为鉴权签名（Access Token）  
    }  
}  
// 结束 Sample 类的定义  
  
$rtn = (new Sample())->run();

?>