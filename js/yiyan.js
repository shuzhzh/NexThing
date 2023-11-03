// 定义API密钥  
var apiKey = 'k0wQ99Yz6UED2icWpxCZkSvT';  
  
// 定义初始配置参数  
var config = {  
    container: 'ewm-container', // 对话框容器ID  
    apiKey: apiKey, // API密钥  
    chatBotName: '小树', // 对话框标题  
    logoUrl: 'https://www.example.com/logo.png', // Logo URL（可选）  
    chatBotAvatarUrl: 'https://www.example.com/avatar.png' // 对话框头像URL（可选）  
};  
  
// 定义开始对话函数  
function startConverse() {  
    var ewm = new EWMBot(config);  
    ewm.start(); // 开始对话  
}