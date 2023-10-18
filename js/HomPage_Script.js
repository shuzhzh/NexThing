document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const submitButton = document.getElementById('submitButton');
    const outputText = document.getElementById('outputText');

    submitButton.addEventListener('click', function() {
        const inputValue = userInput.value.trim();
        if (inputValue !== '') {
            outputText.innerHTML = inputValue;
        }
    });

    function clearOutputText() {
        outputText.innerHTML = '';
    }

    // 每整点清除显示的内容
    setInterval(clearOutputText, 3600000);
});
