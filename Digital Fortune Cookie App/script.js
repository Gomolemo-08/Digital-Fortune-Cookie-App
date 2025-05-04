// Database of fortunes
const fortunes = {
    quote: [
        "The expert in anything was once a beginner.",
        "Code is like humor. When you have to explain it, it's bad.",
        "First, solve the problem. Then, write the code.",
        "The only way to learn a new programming language is by writing programs in it.",
        "Make it work, make it right, make it fast."
    ],
    motivation: [
        "You've got 100% success rate so far!",
        "Every bug you fix makes you a better developer.",
        "Your code might have bugs, but your determination doesn't!",
        "The computer is always right... except when it's not.",
        "Today's struggle is tomorrow's solution."
    ],
    joke: [
        "Why do programmers prefer dark mode? Because light attracts bugs.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "Why do Java developers wear glasses? Because they can't C#.",
        "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
        "Why don't programmers like nature? It has too many bugs."
    ]
};

// DOM Elements
const cookie = document.getElementById('cookie');
const fortunePaper = document.getElementById('fortune');
const messageElement = document.getElementById('message');
const newFortuneBtn = document.getElementById('new-fortune');
const contentTypeSelect = document.getElementById('content-type');
const shareBtn = document.getElementById('share-btn');
const greetingElement = document.getElementById('greeting');

// Set greeting based on time of day
function setGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "Good morning!";
    } else if (hour < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }
    
    greetingElement.textContent = greeting;
}

// Get random fortune based on selected type
function getRandomFortune() {
    const type = contentTypeSelect.value;
    let possibleFortunes = [];
    
    if (type === 'all') {
        // Combine all fortune types
        possibleFortunes = [...fortunes.quote, ...fortunes.motivation, ...fortunes.joke];
    } else {
        possibleFortunes = fortunes[type];
    }
    
    const randomIndex = Math.floor(Math.random() * possibleFortunes.length);
    return possibleFortunes[randomIndex];
}

// Open cookie animation
function openCookie() {
    cookie.classList.add('open');
    const fortune = getRandomFortune();
    messageElement.textContent = fortune;
    
    // Store today's fortune in localStorage
    const today = new Date().toDateString();
    localStorage.setItem('lastFortuneDate', today);
    localStorage.setItem('lastFortune', fortune);
}

// Close cookie animation
function closeCookie() {
    cookie.classList.remove('open');
}

// Check if user already got today's fortune
function checkDailyFortune() {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('lastFortuneDate');
    
    if (lastDate === today) {
        // Show yesterday's fortune
        const lastFortune = localStorage.getItem('lastFortune');
        if (lastFortune) {
            messageElement.textContent = lastFortune;
            cookie.classList.add('open');
        }
        return false;
    }
    return true;
}

// Share functionality
function shareFortune() {
    if (!navigator.share) {
        alert('Web Share API not supported in your browser');
        return;
    }
    
    navigator.share({
        title: 'My Digital Fortune Cookie',
        text: messageElement.textContent,
        url: window.location.href
    }).catch(err => {
        console.log('Error sharing:', err);
    });
}

// Event Listeners
cookie.addEventListener('click', () => {
    if (!cookie.classList.contains('open')) {
        openCookie();
    } else {
        closeCookie();
    }
});

newFortuneBtn.addEventListener('click', () => {
    closeCookie();
    setTimeout(openCookie, 500);
});

shareBtn.addEventListener('click', shareFortune);

// Initialize
setGreeting();
checkDailyFortune();

// Add floating particles animation
const background = document.querySelector('.background-animation');
for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.width = `${Math.random() * 10 + 5}px`;
    particle.style.height = particle.style.width;
    particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    background.appendChild(particle);
}

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        animation: floatParticle linear infinite;
    }
    
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
        }
        50% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0.5;
        }
        100% {
            transform: translateY(0) translateX(100px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);