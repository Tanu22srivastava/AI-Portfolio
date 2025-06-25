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

// Neural network background generation (optimized for mobile)
function createNeuralNetwork() {
    const neuralBg = document.getElementById('neuralBg');
    if (!neuralBg || window.innerWidth <= 767) return; // Skip on mobile
    
    const nodeCount = window.innerWidth > 1024 ? 50 : 30;
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

    // Create connections (fewer on smaller screens)
    const maxConnections = window.innerWidth > 1024 ? 25 : 15;
    nodes.forEach((node, index) => {
        const nearbyNodes = nodes.filter((otherNode, otherIndex) => {
            if (index === otherIndex) return false;

            const dx = Math.abs(node.x - otherNode.x);
            const dy = Math.abs(node.y - otherNode.y);
            const distance = Math.sqrt(dx * dx + dy * dy);

            return distance < maxConnections;
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

// Mobile Navigation Functionality
function initResponsiveNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-item a');

    function toggleMobileMenu() {
        if (hamburger && navMenu) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('nav-open');
            
            const isOpen = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            navMenu.setAttribute('aria-hidden', !isOpen);
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    if (navMenu) {
        navMenu.addEventListener('click', (e) => {
            if (e.target === navMenu) {
                toggleMobileMenu();
            }
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
}

// Skill point interactions (works on all devices now)
document.querySelectorAll('.skill-point').forEach(point => {
    // For touch devices, use touch events
    if ('ontouchstart' in window) {
        point.addEventListener('touchstart', function(e) {
            e.preventDefault();
            showSkillTooltip(this, e.touches[0]);
        });
        
        point.addEventListener('touchend', function(e) {
            e.preventDefault();
            hideSkillTooltip();
        });
    } else {
        // For desktop, use mouse events
        point.addEventListener('mouseenter', function() {
            showSkillTooltip(this);
        });
        
        point.addEventListener('mouseleave', function() {
            hideSkillTooltip();
        });
    }
});

let currentTooltip = null;

function showSkillTooltip(element, touch = null) {
    const skill = element.getAttribute('data-skill');
    const level = element.getAttribute('data-level');

    // Remove existing tooltip
    hideSkillTooltip();

    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(0, 0, 0, 0.95);
        color: #00ffff;
        padding: 12px 16px;
        border-radius: 12px;
        font-size: ${window.innerWidth <= 768 ? '16px' : '14px'};
        font-weight: 600;
        pointer-events: none;
        z-index: 1000;
        border: 1px solid rgba(0, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 25px rgba(0, 255, 255, 0.2);
        text-align: center;
        white-space: nowrap;
    `;
    tooltip.textContent = `${skill}: ${level}%`;
    document.body.appendChild(tooltip);
    currentTooltip = tooltip;

    if (touch) {
        // Position for touch devices
        tooltip.style.left = touch.clientX - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = touch.clientY - tooltip.offsetHeight - 20 + 'px';
    } else {
        // Position for mouse devices
        const updateTooltipPosition = (e) => {
            if (currentTooltip) {
                currentTooltip.style.left = e.clientX - currentTooltip.offsetWidth / 2 + 'px';
                currentTooltip.style.top = e.clientY - currentTooltip.offsetHeight - 15 + 'px';
            }
        };

        document.addEventListener('mousemove', updateTooltipPosition);
        
        element.addEventListener('mouseleave', function() {
            document.removeEventListener('mousemove', updateTooltipPosition);
        }, { once: true });
    }
}

function hideSkillTooltip() {
    if (currentTooltip && currentTooltip.parentNode) {
        currentTooltip.parentNode.removeChild(currentTooltip);
        currentTooltip = null;
    }
}

// Hover effects for cursor (desktop only)
if (window.innerWidth > 1023) {
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
}

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

// Observe elements for animations
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

// Add keyframe animations
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

// Interactive radar chart (works on all devices)
const radarChart = document.querySelector('.radar-chart');
if (radarChart) {
    if (window.innerWidth > 768) {
        // Desktop mouse interaction
        radarChart.addEventListener('mousemove', (e) => {
            const rect = radarChart.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotationX = (mouseY / rect.height) * 8;
            const rotationY = (mouseX / rect.width) * 8;

            radarChart.style.transform = `perspective(1000px) rotateX(${-rotationX}deg) rotateY(${rotationY}deg)`;
        });

        radarChart.addEventListener('mouseleave', () => {
            radarChart.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    } else {
        // Mobile touch interaction - subtle pulsing animation
        radarChart.style.animation = 'radarPulse 4s ease-in-out infinite';
        
        // Add pulsing animation for mobile
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes radarPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
        `;
        document.head.appendChild(pulseStyle);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createNeuralNetwork();
    initResponsiveNavigation();
});

// Handle window resize for neural network and radar chart
window.addEventListener('resize', () => {
    const neuralBg = document.getElementById('neuralBg');
    if (neuralBg && window.innerWidth <= 767) {
        neuralBg.innerHTML = ''; // Clear neural network on mobile for performance
    } else if (neuralBg && window.innerWidth > 767 && !neuralBg.children.length) {
        createNeuralNetwork(); // Recreate on desktop
    }
    
    // Re-initialize radar chart interactions on resize
    const radarChart = document.querySelector('.radar-chart');
    if (radarChart) {
        // Remove existing styles
        radarChart.style.transform = '';
        radarChart.style.animation = '';
        
        // Re-apply appropriate interaction based on screen size
        if (window.innerWidth <= 768) {
            radarChart.style.animation = 'radarPulse 4s ease-in-out infinite';
        }
    }
});