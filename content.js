// content.js
// This script runs in the context of web pages the user visits

// Example functionality: Injecting a simple message into the webpage
document.addEventListener('DOMContentLoaded', function() {
    // Create a new div element to hold our message
    var messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.bottom = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.padding = '10px';
    messageDiv.style.backgroundColor = 'white';
    messageDiv.style.border = '1px solid #ddd';
    messageDiv.style.borderRadius = '4px';
    messageDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    messageDiv.style.zIndex = '10000';
    messageDiv.innerText = 'This is a message from your Chrome Extension!';

    // Append the message div to the body of the webpage
    document.body.appendChild(messageDiv);

    // Optionally, remove the message after a few seconds
    setTimeout(function() {
        document.body.removeChild(messageDiv);
    }, 5000);
});
