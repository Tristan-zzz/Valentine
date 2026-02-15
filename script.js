// Configuration Constants
const CONFIG = {
    COLORS: {
        FIREWORKS: ['#7ED8A8', '#B8E9D0', '#FFE5A0', '#FFD96B'],
        CONFETTI: ['#7ED8A8', '#B8E9D0', '#FFE5A0'],
        PARTICLES: ['#7ED8A8', '#FFE5A0', '#FFD96B']
    },
    ANIMATION_COUNTS: {
        FIREWORKS: 5,
        FIREWORK_PARTICLES: 30,
        FLOATING_HEARTS: 40,
        CONFETTI: 100,
        RIPPLES: 5,
        PARTICLE_BURST: 60
    },
    NO_BUTTON: {
        MAX_MOVE_X: 150,
        MAX_MOVE_Y: 100,
        MIN_OPACITY: 0.3,
        OPACITY_DECREASE: 0.1,
        YES_SCALE_INCREASE: 0.15,
        HINT_THRESHOLD: 3
    },
    TIMEOUTS: {
        FIREWORK_DELAY: 400,
        FIREWORK_REMOVE: 1000,
        HEART_DELAY: 100,
        HEART_REMOVE: 7000,
        CONFETTI_DELAY: 30,
        CONFETTI_REMOVE: 3500,
        RIPPLE_DELAY: 300,
        RIPPLE_REMOVE: 2000,
        PARTICLE_REMOVE: 1500
    }
};

const NO_MESSAGES = [
    "Will you be my Valentine?",
    "Are you sure though? 🤔",
    "Hmm I think you misclicked 💭",
    "Okay but hear me out… 💚",
    "You are too cute to say no 🌸",
    "Pretty please? 🥺",
    "Last chance… maybe? ✨",
    "I'll take that as a maybe! 💛"
];

// Cache DOM elements
const elements = {
    mainTitle: document.getElementById('mainTitle'),
    yesButton: document.getElementById('yesButton'),
    noButton: document.getElementById('noButton'),
    hintText: document.getElementById('hintText'),
    mainScreen: document.getElementById('mainScreen'),
    celebrationScreen: document.getElementById('celebrationScreen')
};

// State
let noCount = 0;

// Helper Functions
function getRandomColor(colorArray) {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function getRandomPosition(max) {
    return (Math.random() - 0.5) * max;
}

function createElement(className, styles = {}) {
    const element = document.createElement('div');
    element.className = className;
    Object.entries(styles).forEach(([key, value]) => {
        element.style[key] = value;
    });
    return element;
}

function setCustomProperty(element, property, value) {
    element.style.setProperty(property, value);
}

function removeAfterDelay(element, delay) {
    setTimeout(() => element.remove(), delay);
}

// No Button Handler
elements.noButton.addEventListener('click', function() {
    noCount++;
    
    // Update message
    const messageIndex = Math.min(noCount, NO_MESSAGES.length - 1);
    elements.mainTitle.textContent = NO_MESSAGES[messageIndex];
    
    // Move button randomly
    const randomX = getRandomPosition(CONFIG.NO_BUTTON.MAX_MOVE_X);
    const randomY = getRandomPosition(CONFIG.NO_BUTTON.MAX_MOVE_Y);
    elements.noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Fade button
    const opacity = Math.max(CONFIG.NO_BUTTON.MIN_OPACITY, 1 - (noCount * CONFIG.NO_BUTTON.OPACITY_DECREASE));
    elements.noButton.style.opacity = opacity;
    
    // Scale up Yes button
    const scale = 1 + (noCount * CONFIG.NO_BUTTON.YES_SCALE_INCREASE);
    elements.yesButton.style.transform = `scale(${scale})`;
    
    // Show hint after threshold
    if (noCount > CONFIG.NO_BUTTON.HINT_THRESHOLD) {
        elements.hintText.textContent = "The Yes button looks pretty good, doesn't it? 👀";
        elements.hintText.style.opacity = '1';
    }
});

// Yes Button Handler
elements.yesButton.addEventListener('click', function() {
    elements.mainScreen.classList.add('hidden');
    elements.celebrationScreen.classList.add('active');
    
    // Create satisfying celebration effects
    createFireworks();
    createFloatingHearts();
    createConfetti();
    createRipples();
    createParticleBurst();
});

// Celebration Effects
function createFireworks() {
    for (let i = 0; i < CONFIG.ANIMATION_COUNTS.FIREWORKS; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.5;
            
            for (let j = 0; j < CONFIG.ANIMATION_COUNTS.FIREWORK_PARTICLES; j++) {
                const firework = createElement('firework', {
                    left: `${x}px`,
                    top: `${y}px`,
                    backgroundColor: getRandomColor(CONFIG.COLORS.FIREWORKS)
                });
                
                const angle = (Math.PI * 2 * j) / CONFIG.ANIMATION_COUNTS.FIREWORK_PARTICLES;
                const velocity = 100 + Math.random() * 100;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;
                
                setCustomProperty(firework, '--tx', `${tx}px`);
                setCustomProperty(firework, '--ty', `${ty}px`);
                
                elements.celebrationScreen.appendChild(firework);
                removeAfterDelay(firework, CONFIG.TIMEOUTS.FIREWORK_REMOVE);
            }
        }, i * CONFIG.TIMEOUTS.FIREWORK_DELAY);
    }
}

function createFloatingHearts() {
    for (let i = 0; i < CONFIG.ANIMATION_COUNTS.FLOATING_HEARTS; i++) {
        setTimeout(() => {
            const heart = createElement('floating-heart', {
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 2}s`
            });
            heart.textContent = '💚';
            setCustomProperty(heart, '--drift', `${(Math.random() - 0.5) * 200}px`);
            
            elements.celebrationScreen.appendChild(heart);
            removeAfterDelay(heart, CONFIG.TIMEOUTS.HEART_REMOVE);
        }, i * CONFIG.TIMEOUTS.HEART_DELAY);
    }
}

function createConfetti() {
    for (let i = 0; i < CONFIG.ANIMATION_COUNTS.CONFETTI; i++) {
        setTimeout(() => {
            const confetti = createElement('confetti', {
                left: `${Math.random() * 100}%`,
                backgroundColor: getRandomColor(CONFIG.COLORS.CONFETTI),
                animationDelay: `${Math.random() * 0.5}s`
            });
            
            setCustomProperty(confetti, '--drift', `${(Math.random() - 0.5) * 200}px`);
            setCustomProperty(confetti, '--rotation', `${Math.random() * 720}deg`);
            
            elements.celebrationScreen.appendChild(confetti);
            removeAfterDelay(confetti, CONFIG.TIMEOUTS.CONFETTI_REMOVE);
        }, i * CONFIG.TIMEOUTS.CONFETTI_DELAY);
    }
}

function createRipples() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < CONFIG.ANIMATION_COUNTS.RIPPLES; i++) {
        setTimeout(() => {
            const ripple = createElement('ripple', {
                left: `${centerX - 250}px`,
                top: `${centerY - 250}px`
            });
            
            elements.celebrationScreen.appendChild(ripple);
            removeAfterDelay(ripple, CONFIG.TIMEOUTS.RIPPLE_REMOVE);
        }, i * CONFIG.TIMEOUTS.RIPPLE_DELAY);
    }
}

function createParticleBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < CONFIG.ANIMATION_COUNTS.PARTICLE_BURST; i++) {
        const particle = createElement('particle', {
            left: `${centerX}px`,
            top: `${centerY}px`,
            backgroundColor: getRandomColor(CONFIG.COLORS.PARTICLES)
        });
        
        const angle = (Math.PI * 2 * i) / CONFIG.ANIMATION_COUNTS.PARTICLE_BURST;
        const velocity = 150 + Math.random() * 150;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        setCustomProperty(particle, '--tx', `${tx}px`);
        setCustomProperty(particle, '--ty', `${ty}px`);
        
        elements.celebrationScreen.appendChild(particle);
        removeAfterDelay(particle, CONFIG.TIMEOUTS.PARTICLE_REMOVE);
    }
}
