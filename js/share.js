
  // 分享到Facebook
  function shareToFacebook() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href));
  }

  // 分享到Twitter
  function shareToTwitter() {
    window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href));
  }

  // 分享到微信
  function shareToWeChat() {
    // 使用微信分享 API，需要根据微信开放平台的文档进行配置
    alert('请使用微信分享 API 配置分享功能');
  }

  // 分享到微博
  function shareToWeibo() {
    window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(window.location.href));
  }

  // 分享到QQ
  function shareToQQ() {
    // 使用QQ分享 API，需要根据QQ开放平台的文档进行配置
    alert('请使用QQ分享 API 配置分享功能');
  }

  // 分享到Telegram
  function shareToTelegram() {
    window.open('https://t.me/share/url?url=' + encodeURIComponent(window.location.href));
  }

