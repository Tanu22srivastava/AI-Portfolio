const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
    follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        follower.style.transform += ' scale(0.8)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        follower.style.transform = follower.style.transform.replace(' scale(0.8)', '');
    });
});

// Create floating elements
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    const elementsCount = 20;

    for (let i = 0; i < elementsCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 8 + 's';
        element.style.animationDuration = (Math.random() * 4 + 8) + 's';
        container.appendChild(element);
    }
}

// Page navigation with transition
function navigateTo(page) {
    const transition = document.querySelector('.page-transition');
    transition.classList.add('active');

    setTimeout(() => {
        alert(`Navigating to ${page} page...`);
        transition.classList.remove('active');
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();

    const orbs = document.querySelectorAll('.orb');
    orbs.forEach(orb => {
        orb.addEventListener('mousemove', (e) => {
            const rect = orb.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            orb.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.grid');
    const speed = scrolled * 0.5;
    parallax.style.transform = `rotateX(60deg) translateZ(-100px) translateY(${speed}px)`;
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const keyActions = {
        '1': () => navigateTo('about'),
        '2': () => navigateTo('projects'),
        '3': () => navigateTo('skills'),
        '4': () => navigateTo('ai-chat'),
        '5': () => navigateTo('contact')
    };

    if (keyActions[e.key]) {
        keyActions[e.key]();
    }
});