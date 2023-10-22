var spawnDelay = 2;
const password = [1,2,3,4,5];
const numberBubbles = [
    "./resources/images/numbers/0.png",
    "./resources/images/numbers/1.png",
    "./resources/images/numbers/2.png",
    "./resources/images/numbers/3.png",
    "./resources/images/numbers/4.png",
    "./resources/images/numbers/5.png",
    "./resources/images/numbers/6.png",
    "./resources/images/numbers/7.png",
    "./resources/images/numbers/8.png",
    "./resources/images/numbers/9.png"
];
const spawnOrder = [7,1,2,5,3,8,4,0,9,5];
const spawnContainer = document.getElementById("spawn-container");
const collectedNumbers = [];
const collectedNumbersList = document.getElementById("collected-numbers");
const passwordBoxes = document.querySelectorAll("#password-container > div");
let passwordIndex = 0; // Index for the password boxes
const basket = document.getElementById('basket');
let velocity = 0;
const acceleration = 1;




function spawnNumberBubble(number) {
    const randomX = Math.random() * (spawnContainer.clientWidth - 100); // Adjust 100 as needed
    const bubble = document.createElement("img");
    bubble.src = numberBubbles[number];
    bubble.style.position = "absolute";
    bubble.style.left = randomX + "px";
    bubble.style.top = "10px"; // Adjust the Y position as needed
    bubble.style.width = "50px"; // Set the width as needed
    bubble.style.height = "50px"; // Set the height as needed
    spawnContainer.appendChild(bubble);

    // Animate the bubble's vertical position
    setTimeout(() => {
        bubble.style.transition = "top 5s linear"; // Adjust the duration as needed
        bubble.style.top = (window.innerHeight - 100) + "px"; // Adjust the final Y position
    }, 100); // Adjust the delay as needed

    // Remove the bubble after 2 seconds
    setTimeout(() => {
        spawnContainer.removeChild(bubble);
    }, 3100); // Adjust the time before removal as needed

     // Detect collision with the basket
    setInterval(() => {
        if (!spawnContainer.contains(bubble)) {
            return; // The bubble has already been removed
        }
        const bubbleRect = bubble.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        if (
            bubbleRect.left + bubbleRect.width > basketRect.left &&
            bubbleRect.left < basketRect.left + basketRect.width &&
            bubbleRect.top + bubbleRect.height > basketRect.top &&
            bubbleRect.top < basketRect.top + basketRect.height
        ) {
            // Collision detected, add the number to the collected list
            collectedNumbers.push(number);
            console.log(number);

            // Update the password box with '*'
            if (passwordIndex < passwordBoxes.length) {
                passwordBoxes[passwordIndex].textContent = '*';
                passwordIndex++;
            }

            if (passwordIndex === passwordBoxes.length) {
                // All password boxes are filled; check if the collected numbers match the password
                if (JSON.stringify(collectedNumbers) === JSON.stringify(password)) {
                    alert("Password is correct!");
                } else {
                    alert("Password is incorrect!");
                }
            }

            if (spawnContainer.contains(bubble)) {
                spawnContainer.removeChild(bubble);
            }
        }
    }, 100); // Adjust the interval as needed
}

function spawnNumbersInOrder() {
    let index = 0;
    const interval = setInterval(() => {
        if (index < spawnOrder.length) {
            spawnNumberBubble(spawnOrder[index]);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 1000); // Adjust the interval as needed
}

window.addEventListener('deviceorientation', (event) => {
    if (event.alpha === null) {
        return;  // no support
    }

    // Use the gamma value from the gyroscope for acceleration
    const accelerationValue = event.gamma / 90 * acceleration;

    velocity += accelerationValue;

    // Limit the basket within the window's boundaries
    const currentLeft = parseInt(basket.style.left) || 0;
    const newLeft = currentLeft + velocity;
    
    if (newLeft < 0) {
        basket.style.left = '0px';
        velocity = 0;
    } else if (newLeft + basket.clientWidth > window.innerWidth) {
        basket.style.left = (window.innerWidth - basket.clientWidth) + 'px';
        velocity = 0;
    } else {
        basket.style.left = newLeft + 'px';
    }
});

function updatebasketPosition() {
    requestAnimationFrame(updatebasketPosition);
}

spawnNumbersInOrder();
updatebasketPosition();