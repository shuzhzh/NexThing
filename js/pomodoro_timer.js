let timer;
let totalSeconds;
let records = [];
let currentTimerType = 'work'; // 'work' for 25 minutes, 'rest' for 5 minutes
const maxProgressBarWidth = 100; // Set the maximum width for the progress bar

function startTimer() {
    if (!timer) {
        timer = setInterval(updateTimer, 1000);
        document.getElementById('startBtn').disabled = true;
        document.getElementById('addTimeBtn').disabled = true;
        document.getElementById('restBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('addTimeBtn').disabled = false;
    document.getElementById('restBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;

    if (currentTimerType === 'work' && totalSeconds === 0) {
        // Create a record and add it to the list
        const startTime = new Date().toLocaleTimeString();
        const endTime = new Date().toLocaleTimeString();
        records.push({ startTime, endTime });
        addRecordToDOM(startTime, endTime);
    }

    resetTimer();
}

function updateTimer() {
    if (totalSeconds === 0) {
        clearInterval(timer);
        alert('计时结束！');
        stopTimer();

        // Automatically start a new timer if the current timer type is 'work'
        if (currentTimerType === 'work') {
            startNewTimer();
        }
    } else {
        totalSeconds--;
        updateProgressBar();
        displayTime();
    }
}

function startNewTimer() {
    // Automatically start a new timer (5 minutes rest) after 25 minutes work
    if (currentTimerType === 'work') {
        totalSeconds = 5 * 60;
        currentTimerType = 'rest';
        startTimer();
    }
}

function resetTimer() {
    clearInterval(timer);
    totalSeconds = localStorage.getItem('totalSeconds') || 25 * 60;
    displayTime();
    resetProgressBar();
    document.getElementById('startBtn').disabled = false;
    document.getElementById('addTimeBtn').disabled = false;
    document.getElementById('restBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
}

function addTime() {
    const additionalSeconds = 5 * 60;
    totalSeconds = Math.min(totalSeconds + additionalSeconds, maxProgressBarWidth * 60);
    displayTime();
    updateProgressBar();
}

function restTime() {
    clearInterval(timer);
    totalSeconds = 5 * 60;
    currentTimerType = 'rest';
    displayTime();
    resetProgressBar();
    document.getElementById('startBtn').disabled = false;
    document.getElementById('addTimeBtn').disabled = false;
    document.getElementById('restBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
}

function displayTime() {
    const formattedMinutes = Math.floor(totalSeconds / 60);
    const formattedSeconds = totalSeconds % 60;
    document.getElementById('timer').innerText = `${formattedMinutes}:${formattedSeconds < 10 ? '0' + formattedSeconds : formattedSeconds}`;
    localStorage.setItem('totalSeconds', totalSeconds);
}

function updateProgressBar() {
    const progressWidth = Math.max(((totalSeconds / (25 * 60)) * 100), 0);
    document.getElementById('progress').style.width = progressWidth + '%';
}

function resetProgressBar() {
    document.getElementById('progress').style.width = '100%';
}

function addRecordToDOM(startTime, endTime) {
    const recordContainer = document.getElementById('recordsContainer');
    const recordDiv = document.createElement('div');
    recordDiv.style.backgroundColor = '#DC3445';
    recordDiv.style.color = 'white';
    recordDiv.style.padding = '10px';
    recordDiv.style.marginTop = '10px';
    recordDiv.innerHTML = `<strong>开始时间:</strong> ${startTime} - <strong>结束时间:</strong> ${endTime}`;
    recordContainer.appendChild(recordDiv);
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', function () {
    totalSeconds = localStorage.getItem('totalSeconds') || 25 * 60;
    displayTime();
    resetProgressBar();
    resetTimer();
});

// Start the timer when the user clicks the start button
document.getElementById('startBtn').addEventListener('click', startTimer);
