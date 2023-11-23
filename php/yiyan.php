    <?php
    // Replace [YOUR_API_KEY] and [YOUR_SECRET_KEY] with your actual Baidu API key and secret key
    $apiKey = "k0wQ99Yz6UED2icWpxCZkSvT";
    $secretKey = "XY0UOdNHrUaCgyX5eZ80Yd6yb04hIGm9";
    
    // Get user input from the front end
    $userInput = $_POST['userInput'];
    
    // Baidu chat API endpoint
    $apiUrl = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=" . getAccessToken();
    
    // Prepare data for the Baidu API request
    $data = array(
        "messages" => array(
            array(
                "role" => "user",
                "content" => $userInput
            )
        )
    );
    
    // Convert data to JSON format
    $dataJson = json_encode($data);
    
    // Call Baidu API using cURL
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $dataJson);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    
    // Execute the cURL request
    $response = curl_exec($ch);
    
    // Close cURL session
    curl_close($ch);
    
    // Return AI's response to the front end
    echo json_decode($response)->result;
    exit();
    
    function getAccessToken() {
        // Baidu access token endpoint
        $tokenUrl = "https://aip.baidubce.com/oauth/2.0/token";
    
        global $apiKey, $secretKey;
    
        // Parameters for the access token request
        $params = array(
            "grant_type" => "client_credentials",
            "client_id" => $apiKey,
            "client_secret" => $secretKey
        );
    
        // Build URL for the access token request
        $tokenUrl .= '?' . http_build_query($params);
    
        // Execute the access token request
        $tokenResponse = json_decode(file_get_contents($tokenUrl));
    
        // Return the access token
        return $tokenResponse->access_token;
    }
    ?>
    