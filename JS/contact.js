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

// Create stars background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Form handling
const contactForm = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('.submit-button');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Add loading state
    submitButton.classList.add('loading');
    submitButton.textContent = 'Sending...';

    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success message
    successMessage.classList.add('show');

    // Reset form
    contactForm.reset();

    // Reset button
    submitButton.classList.remove('loading');
    submitButton.textContent = 'Send Message';

    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
});

// Form validation and real-time feedback
const formInputs = document.querySelectorAll('.form-input, .form-textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearErrors);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();

    // Remove existing error styling
    field.classList.remove('error');

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }

    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    field.parentNode.appendChild(errorDiv);
}

function clearErrors(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Add error styling to CSS
const style = document.createElement('style');
style.textContent = `
            .form-input.error,
            .form-textarea.error {
                border-color: #ff4444 !important;
                box-shadow: 0 0 10px rgba(255, 68, 68, 0.3) !important;
            }
        `;
document.head.appendChild(style);

// Auto-resize textarea
const messageTextarea = document.getElementById('message');
messageTextarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.max(this.scrollHeight, 120) + 'px';
});

// Hover effects for cursor
document.querySelectorAll('a, button, .form-input, .form-textarea, .contact-method, .social-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        follower.style.transform += ' scale(0.8)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        follower.style.transform = follower.style.transform.replace(' scale(0.8)', '');
    });
});

// Contact method click animations
document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'rgba(0, 255, 255, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(rippleStyle);

// Form field focus animations
formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentNode.style.transform = 'scale(1.02)';
        this.parentNode.style.transition = 'transform 0.2s ease';
    });

    input.addEventListener('blur', function () {
        this.parentNode.style.transform = 'scale(1)';
    });
});

// Parallax effect for background
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX / window.innerWidth) * 20;
    const moveY = (e.clientY / window.innerHeight) * 20;

    document.querySelector('.cosmic-bg').style.transform =
        `translate(${moveX}px, ${moveY}px)`;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createStars();

    // Add entrance animations
    const elements = document.querySelectorAll('.contact-method, .social-link');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
    });
});

// Add fadeInUp animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
document.head.appendChild(fadeInStyle);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) return;

    switch (e.key) {
        case 'Escape':
            // Clear form focus
            document.activeElement.blur();
            break;
        case 'Enter':
            if (e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
                // Focus on first form field
                document.getElementById('firstName').focus();
            }
            break;
    }
});

// Add some interactive feedback
submitButton.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-2px) scale(1.02)';
});

submitButton.addEventListener('mouseleave', function () {
    if (!this.classList.contains('loading')) {
        this.style.transform = 'translateY(0) scale(1)';
    }
});

// Copy email to clipboard functionality
const emailMethod = document.querySelector('a[href^="mailto:"]');
emailMethod.addEventListener('click', function (e) {
    e.preventDefault();
    const email = this.href.replace('mailto:', '');

    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            showTooltip(this, 'Email copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showTooltip(this, 'Email copied to clipboard!');
    }
});

function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.position = 'absolute';
    tooltip.style.background = '#00ffff';
    tooltip.style.color = '#000';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '14px';
    tooltip.style.fontWeight = '500';
    tooltip.style.zIndex = '10000';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.left = '50%';
    tooltip.style.bottom = '120%';

    element.style.position = 'relative';
    element.appendChild(tooltip);

    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 2000);
}

// Social links hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) rotate(5deg)';
    });

    link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Add loading states and better UX
window.addEventListener('beforeunload', (e) => {
    const formData = new FormData(contactForm);
    let hasData = false;

    for (let [key, value] of formData.entries()) {
        if (value.trim()) {
            hasData = true;
            break;
        }
    }

    if (hasData && !successMessage.classList.contains('show')) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
    }
});