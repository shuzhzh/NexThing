function updateClock() {  
    const now = new Date();  
    const second = now.getSeconds();  
    const minute = now.getMinutes();  
    const hour = now.getHours();  
    const secondDeg = ((second / 60) * 360) + 90; // 秒针的角度，加90度是因为起点在下方而不是上方  
    const minuteDeg = ((minute / 60) * 360) + ((second/60)*6) + 90; // 分针的角度，加秒针与分针夹角的度数，再加90度  
    const hourDeg = ((hour / 12) * 360) + ((minute/60)*30) + 90; // 时针的角度，加分钟与小时夹角的度数，再加90度  
    rotateHand('second-hand', secondDeg);  
    rotateHand('minute-hand', minuteDeg);  
    rotateHand('hour-hand', hourDeg);  
}  
  
function rotateHand(handId, deg) {  
    const hand = document.getElementById(handId);  
    hand.style.transform = `rotate(${deg}deg)`; // 设置旋转角度  
}  
  
setInterval(updateClock, 1000); // 每秒更新一次时钟显示的时间。这样秒针就能动起来了。你也可以调整这个值，比如改成100毫秒，就能让时钟看起来更流畅。但是这样会更消耗CPU资源。因此，需要在性能和视觉效果之间做出权衡。另外注意，这个值不能低于16.7毫秒，否则就超过了浏览器的刷新频率，肉眼就看不出变化了。同时，因为我们的updateClock函数本身也需要一定的执行时间，所以实际上设置的间隔时间应稍大于你期望的间隔时间。例如，如果你希望每秒更新一次，那么实际上应该设置成1020毫秒