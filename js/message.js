document.addEventListener("DOMContentLoaded", function () {
    const messages = [
        "Hey beautiful...",
        "Valentine is coming...",
        "So...",
    ];
    
    let index = 0;
    const messageElement = document.getElementById("message");
    const messageContainer = document.getElementById("messageContainer");
    const textBlock = document.getElementById("textBlock");
    const gifBlock = document.getElementById("gifBlock");
    const btnsBlock = document.getElementById("btnsBlock");

    textBlock.style.display = "none"; // Hide text initially
    gifBlock.style.display = "none";
    btnsBlock.style.display = "none";

    function showNextMessage() {
        if (index < messages.length) {
            messageElement.textContent = messages[index];
            index++;
            setTimeout(showNextMessage, 1500); // Change message every 1.5 seconds
        } else {
            messageContainer.style.display = "none"; // Hide message container
            textBlock.style.display = "block"; // Show the text
            gifBlock.style.display = "";
            btnsBlock.style.display = "";
        }
    }

    showNextMessage();
});

function nextPage() {
    window.location.href = "yes.html";
}

function moveButton() {
    var x = Math.random() * (window.innerWidth - document.getElementById('noButton').offsetWidth) - 85;
    var y = Math.random() * (window.innerHeight - document.getElementById('noButton').offsetHeight) - 48;
    document.getElementById('noButton').style.left = `${x}px`;
    document.getElementById('noButton').style.top = `${y}px`;
}