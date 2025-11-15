const rabbitContainer = document.getElementById('rabbitContainer');
const clickMeText = document.getElementById('clickMeText');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const actionButtons = document.getElementById('actionButtons');
const finalMessage = document.getElementById('finalMessage');
const messages = [
    "Do you know?",
    "Who is the most beautiful person to me?",
    "It's You!",
    "And I love you."
];
const displayDuration = 3000; // 3 seconds in milliseconds

// Step 1: Rabbit walks onto the screen
function startWalkAnimation() {
    setTimeout(() => {
        // খরগোশকে স্ক্রিনের মাঝখানে নিয়ে আসার জন্য ট্রানজিশন সেট করা
        rabbitContainer.style.transition = 'left 5s linear, transform 5s linear'; 
        rabbitContainer.style.left = '50%';
        rabbitContainer.style.transform = 'translateX(-50%)';
        
        // 5 সেকেন্ড পর হাঁটা শেষ হলে 
        setTimeout(() => {
            rabbitContainer.classList.remove('center');
            rabbitContainer.style.transition = ''; // Reset transition for click effect
            rabbitContainer.classList.add('show-rose'); // Show the rose
            clickMeText.style.opacity = '1'; // Show "Click Me!"
            rabbitContainer.onclick = startMessageSequence; // Enable click
        }, 5000); 
    }, 100);
}

// Step 2: Start the message sequence
function startMessageSequence() {
    rabbitContainer.onclick = null; // Disable further clicks
    clickMeText.style.opacity = '0'; // Hide "Click Me!"
    rabbitContainer.querySelector('.rabbit').style.animation = 'none'; // Stop hopping
    let messageIndex = 0;
    
    function showNextMessage() {
        if (messageIndex < messages.length) {
            messageText.textContent = messages[messageIndex];
            messageBox.classList.add('show');
            
            setTimeout(() => {
                messageBox.classList.remove('show');
                messageIndex++;
                
                setTimeout(showNextMessage, 500); // Delay between hiding and showing next message
            }, displayDuration);
        } else {
            // Step 3: Show the final buttons
            setTimeout(() => {
                messageText.textContent = "Will you be my Valentine?";
                messageBox.classList.add('show');
                actionButtons.classList.add('show');
            }, 500);
        }
    }
    
    showNextMessage();
}

// Step 4: Handle Accept/Reject (Global function for buttons)
window.handleResponse = function(response) {
    messageBox.classList.remove('show');
    actionButtons.classList.remove('show');
    
    setTimeout(() => {
        if (response === 'yes') {
            finalMessage.textContent = "CONGRATULATIONS!Now you are mine ☺️❤️";
            finalMessage.style.color = '#ff4081';
        } else {
            finalMessage.textContent = "Thanks!No problem,I appreciate your decision 💔";
            finalMessage.style.color = '#757575';
        }
        
        finalMessage.classList.add('show');
    }, 500);
}

// Initialize the animation when the page loads
window.onload = startWalkAnimation;
