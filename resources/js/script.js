var spawnDelay = 2;
var password = 1234;
const numberBubbles = [
    "./resources/images/numbers/1.png",
    "./resources/images/numbers/2.png",
    "./resources/images/numbers/3.png",
    "./resources/images/numbers/4.png",
    "./resources/images/numbers/5.png",
    "./resources/images/numbers/6.png",
    "./resources/images/numbers/7.png",
    "./resources/images/numbers/8.png",
    "./resources/images/numbers/9.png",
    "./resources/images/numbers/0.png"
];
const spawnOrder = [7,1,2,5,3,8,4,0,9];
const spawnContainer = document.getElementById("spawn-container");



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

spawnNumbersInOrder();

const basket = document.getElementById('basket');
        let velocity = 0;
        const acceleration = 1;

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

        updatebasketPosition();