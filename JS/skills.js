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

// Neural network background generation
function createNeuralNetwork() {
    const neuralBg = document.getElementById('neuralBg');
    const nodeCount = 50;
    const nodes = [];

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 3 + 's';
        neuralBg.appendChild(node);
        nodes.push({
            element: node,
            x: parseFloat(node.style.left),
            y: parseFloat(node.style.top)
        });
    }

    // Create connections
    nodes.forEach((node, index) => {
        const nearbyNodes = nodes.filter((otherNode, otherIndex) => {
            if (index === otherIndex) return false;

            const dx = Math.abs(node.x - otherNode.x);
            const dy = Math.abs(node.y - otherNode.y);
            const distance = Math.sqrt(dx * dx + dy * dy);

            return distance < 25; // Connect nodes within 25% distance
        });

        nearbyNodes.forEach(nearbyNode => {
            const connection = document.createElement('div');
            connection.className = 'neural-connection';

            const dx = nearbyNode.x - node.x;
            const dy = nearbyNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            connection.style.left = node.x + '%';
            connection.style.top = node.y + '%';
            connection.style.width = distance + 'vw';
            connection.style.transform = `rotate(${angle}deg)`;
            connection.style.animationDelay = Math.random() * 4 + 's';

            neuralBg.appendChild(connection);
        });
    });
}

// Skill point interactions
document.querySelectorAll('.skill-point').forEach(point => {
    point.addEventListener('mouseenter', function () {
        const skill = this.getAttribute('data-skill');
        const level = this.getAttribute('data-level');

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'rgba(0, 0, 0, 0.9)';
        tooltip.style.color = '#00ffff';
        tooltip.style.padding = '10px 15px';
        tooltip.style.borderRadius = '10px';
        tooltip.style.fontSize = '14px';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.zIndex = '1000';
        tooltip.style.border = '1px solid rgba(0, 255, 255, 0.3)';
        tooltip.textContent = `${skill}: ${level}%`;

        document.body.appendChild(tooltip);

        const updateTooltipPosition = (e) => {
            tooltip.style.left = e.clientX + 15 + 'px';
            tooltip.style.top = e.clientY - 35 + 'px';
        };

        document.addEventListener('mousemove', updateTooltipPosition);

        this.addEventListener('mouseleave', function () {
            document.removeEventListener('mousemove', updateTooltipPosition);
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, { once: true });
    });
});

// Hover effects for cursor
document.querySelectorAll('a, button, .skill-point, .skill-item, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        follower.style.transform += ' scale(0.8)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        follower.style.transform = follower.style.transform.replace(' scale(0.8)', '');
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe skill categories and timeline items
document.querySelectorAll('.skill-category, .timeline-item, .cert-card').forEach(el => {
    observer.observe(el);
});

// Animate skill dots on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillDots = entry.target.querySelectorAll('.skill-dot.active');
            skillDots.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.animation = 'skillDotPop 0.3s ease forwards';
                }, index * 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// Add keyframe animation for skill dots
const style = document.createElement('style');
style.textContent = `
            @keyframes skillDotPop {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.3); }
                100% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
document.head.appendChild(style);

// Initialize neural network
document.addEventListener('DOMContentLoaded', () => {
    createNeuralNetwork();
});

// Interactive radar chart
const radarChart = document.querySelector('.radar-chart');
radarChart.addEventListener('mousemove', (e) => {
    const rect = radarChart.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Subtle rotation based on mouse position
    const rotationX = (mouseY / rect.height) * 10;
    const rotationY = (mouseX / rect.width) * 10;

    radarChart.style.transform = `perspective(1000px) rotateX(${-rotationX}deg) rotateY(${rotationY}deg)`;
});

radarChart.addEventListener('mouseleave', () => {
    radarChart.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
});

// Keyboard shortcuts for navigation
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) return;

    switch (e.key) {
        case '1':
            window.location.href = 'index.html';
            break;
        case '2':
            window.location.href = 'about.html';
            break;
        case '3':
            window.location.href = 'projects.html';
            break;
        case '4':
            // Already on skills page
            break;
        case '5':
            window.location.href = 'ai-chat.html';
            break;
        case '6':
            window.location.href = 'contact.html';
            break;
    }
});