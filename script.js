document.addEventListener('DOMContentLoaded', () => {
    const rabbit = document.getElementById('rabbit');
    const clickMeBubble = document.getElementById('clickMeBubble');
    const proposalText = document.getElementById('proposalText');
    const decisionButtons = document.getElementById('decisionButtons');
    const finalResult = document.getElementById('finalResult');
    const acceptBtn = document.getElementById('acceptBtn');
    const rejectBtn = document.getElementById('rejectBtn');

    // Text sequence
    const sequence = [
        "Do you know?",
        "Who is the most beautiful person to me?",
        "It's You!",
        "And I love you."
    ];

    let sequenceIndex = 0;
    const displayDuration = 3000; // 3 seconds display time for each text

    // --- Step 1: Rabbit Walk-in (5 seconds) ---
    rabbit.classList.add('walking');

    setTimeout(() => {
        // হাঁটা শেষ হওয়ার পর:
        rabbit.classList.remove('walking'); // খরগোশকে স্থির রাখবে
        
        clickMeBubble.classList.remove('hidden'); // "Click Me" bubble দেখাবে
        
        // Bubble-এর ওপর ক্লিক ইভেন্ট যুক্ত করা হলো
        clickMeBubble.addEventListener('click', startProposalSequence, { once: true });
        
    }, 5000); 

    // --- Step 2 & 3: Proposal Sequence and Timed Display ---
    function startProposalSequence() {
        // ক্লিক করার পর Bubble হাইড হবে
        clickMeBubble.classList.add('hidden'); 
        
        displayNextText();
    }

    function displayNextText() {
        if (sequenceIndex < sequence.length) {
            // Show the text
            proposalText.textContent = sequence[sequenceIndex];
            proposalText.classList.remove('fade-out');
            proposalText.classList.add('fade-in');

            setTimeout(() => {
                // Hide the text after 3 seconds
                proposalText.classList.remove('fade-in');
                proposalText.classList.add('fade-out');
                
                sequenceIndex++;

                // Wait 1 second for the fade-out to complete before showing the next text
                setTimeout(() => {
                    displayNextText();
                }, 1000); 
                
            }, displayDuration); 
            
        } else {
            // Sequence finished, show buttons
            showDecisionButtons();
        }
    }

    // --- Step 4: Show Buttons ---
    function showDecisionButtons() {
        proposalText.classList.add('hidden');
        decisionButtons.classList.remove('hidden');
        decisionButtons.classList.add('fade-in');
    }

    // --- Step 5: Handle Button Clicks and Final Result ---
    acceptBtn.addEventListener('click', () => {
        handleFinalResult('CONGRATULATIONS! 🎉', '#4CAF50'); 
    });

    rejectBtn.addEventListener('click', () => {
        handleFinalResult('Thanks! 💔', '#f44336'); 
    });

    function handleFinalResult(message, color) {
        // Hide buttons
        decisionButtons.classList.add('hidden');
        
        // Set and show final text with effect
        finalResult.textContent = message;
        finalResult.style.color = color;
        
        finalResult.style.transform = 'translate(-50%, -50%) scale(0.1)';
        finalResult.classList.remove('hidden');

        setTimeout(() => {
             // Springy effect for congrats
             finalResult.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)'; 
             finalResult.style.transform = 'translate(-50%, -50%) scale(1)';
             finalResult.classList.add('fade-in');
        }, 50);
    }
});
