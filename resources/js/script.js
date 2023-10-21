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