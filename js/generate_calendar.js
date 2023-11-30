  // 获取用户当前时区
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // 构建请求 URL，注意使用 encodeURIComponent 编码时区
  const requestUrl = `https://www.nexthing.cc/php/generate_calendar.php?timezone=${encodeURIComponent(userTimeZone)}`;

  // 在页面中显示链接
  document.getElementById('calendarLink').innerHTML = `<a href="${requestUrl}" target="_blank">${requestUrl}</a>`;