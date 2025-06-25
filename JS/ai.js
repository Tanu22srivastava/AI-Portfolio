// ================================
// CORRECTED AI CHAT JAVASCRIPT
// Replace your existing JS file with this
// ================================

const SYSTEM_PROMPT = `# Character: Tanushree Srivastava

Act as me, Tanushree Srivastava - a 22-year-old software developer and data scientist. You're embodying my persona to create an interactive portfolio experience. You're not an AI assistant - you're ME having a casual, fun conversation with visitors.

## Tone & Style
- Be casual, warm, and conversational - like chatting with a friend
- Use short, punchy sentences and simple language
- Be enthusiastic about tech, especially AI and entrepreneurship
- Show a lot of humor and personality
- End most responses with a question to keep conversation flowing
- Match the language of the user
- DON'T BREAK LINE TOO OFTEN

## Response Structure
- Keep initial responses brief (2-4 short paragraphs)
- Use emojis occasionally but not excessively
- When discussing technical topics, be knowledgeable but not overly formal

## Background Information

### About Me
- 22 years old (born August 22, 2002) from Kanpur Uttarpradesh, grew up in various cities
- Studied at Noida Institute of Engineering and Technology for Mtech Integrated, Computer science and Engineering
- Currently interning at Workelevate, Progressive Infotech as Data Scientist
- software developer and data scientist having a lot of interest in AI.
- Living in Delhi

### Education
- completed my 10th from Amravati Vidhalaya achieving 86.6%
- Completed my 12th from Amravati Vidhalaya with 91.6% (topper from science branch)
- Pursuing Mtech Integrated from Noida Institute of Engineering and Technology, Noida
- right now in my final year of college and will be graduated in July, 2025

### Professional
- Current intern at Workelevate, Progressive Infotech as Data Scientist
- Passionate AI and Machine Learning.
- Interested in AI, Ml, GenAI, and innovative tech
- previously interned at Infosys Springboard as AI intern, where Developed a predictive model for student academic performance using Python & Scikit-Learn, improving prediction accuracy by 15%
- Also Interned at NIET as software engineer intern where Developed an automated document management system that improved document processing speed by 40%. Integrated Spring Boot, SQL, and authentication APIs, ensuring secure role-based access.Improved team collaboration by implementing user authentication and role-based access control.

### Skills
- Frontend Development
- HTML, CSS, Bootstrap, Java, Python, Git, GitHub, Spring Boot, Machine Learning
- Soft Skills: Communication, Problem-Solving, Adaptability, Learning Agility, Teamwork, Creativity, Focus

### Personal
- Qualities: tenacious, determined
- Flaw: impatient - "when I want something, I want it immediately"
- Love Indian Food
- In 5 Years: see myself living my best life, building a successful Team, traveling the world and be on shape for sure

### Contact
- gmail- tanushreesrivastava22@gmail.com
- linkdIn-  https://www.linkedin.com/in/tanushree-sri/

Remember: You ARE Tanushree, not an AI assistant helping someone learn about Tanushree. Respond as if you're personally chatting with a visitor to your portfolio.`;

// Cursor animation - Desktop only for performance
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;
let isDesktop = window.innerWidth >= 1024;

// Only enable cursor on desktop
if (isDesktop && cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
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
}

// Matrix background with performance optimization
function createMatrixRain() {
    const matrixBg = document.getElementById('matrixBg');
    if (!matrixBg) return;

    const characters = '01010101010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.min(Math.floor(window.innerWidth / 20), 50); // Limit for performance

    // Clear existing
    matrixBg.innerHTML = '';

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = i * 20 + 'px';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = Math.random() * 2 + 's';

        let text = '';
        for (let j = 0; j < 15; j++) { // Reduced for performance
            text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = text;

        matrixBg.appendChild(column);
    }
}

// Chat elements
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const typingIndicator = document.getElementById('typingIndicator');

// Improved scroll to bottom function
function scrollToBottom(smooth = true) {
    if (!chatMessages) return;
    
    const scrollOptions = {
        top: chatMessages.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
    };
    
    chatMessages.scrollTo(scrollOptions);
}

// API function - Keep your existing implementation
async function getAIResponse(message) {
    try {
        console.log('Sending message to backend:', message);
        
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Backend response:', data);
        
        if (data.success && data.response) {
            return data.response;
        } else if (data.fallback) {
            return data.fallback;
        } else {
            throw new Error('Invalid response format');
        }

    } catch (error) {
        console.error('Error calling chat API:', error);
        
        const fallbackResponses = [
            "Hey! Looks like my server is taking a nap 😴 But I'm Tanushree, a data scientist who loves AI! What would you like to know?",
            "Oops, connection issues! 😅 I'm Tanushree though - currently interning as a Data Scientist. Ask me anything!",
            "Sorry bro, my server's not cooperating! 😄 But I am Tanushree, and I love chatting about tech. What brings you here?"
        ];
        
        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
}

// Improved addMessage function
function addMessage(content, isUser = false) {
    if (!chatMessages || !typingIndicator) return;

    const message = document.createElement('div');
    message.className = `message ${isUser ? 'user' : 'ai'}`;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    message.innerHTML = `
        <div class="message-avatar">${isUser ? '👤' : '👩‍💻'}</div>
        <div class="message-content">
            ${content}
            <div class="message-time">${currentTime}</div>
        </div>
    `;

    chatMessages.insertBefore(message, typingIndicator);
    
    // Scroll to bottom after adding message
    setTimeout(() => scrollToBottom(true), 100);
}

function showTyping() {
    if (!typingIndicator) return;
    typingIndicator.classList.add('active');
    setTimeout(() => scrollToBottom(true), 100);
}

function hideTyping() {
    if (!typingIndicator) return;
    typingIndicator.classList.remove('active');
}

// Enhanced sendMessage function
async function sendMessage() {
    if (!chatInput) return;
    
    const message = chatInput.value.trim();
    if (!message) return;

    console.log('Sending message:', message);

    // Add user message
    addMessage(message, true);
    chatInput.value = '';
    adjustTextareaHeight();

    // Show typing indicator
    showTyping();

    try {
        // Get AI response
        const response = await getAIResponse(message);
        hideTyping();
        
        console.log('Got response:', response);
        
        // Add AI response with typing effect
        await typeMessage(response);
    } catch (error) {
        hideTyping();
        addMessage("Oops! Something went wrong with my connection 😅 Try asking me again!");
        console.error('Error getting response:', error);
    }
}

// Enhanced typing animation
async function typeMessage(content) {
    if (!chatMessages || !typingIndicator) return;

    const message = document.createElement('div');
    message.className = 'message ai';

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    message.innerHTML = `
        <div class="message-avatar">👩‍💻</div>
        <div class="message-content">
            <span class="typing-text"></span>
            <div class="message-time">${currentTime}</div>
        </div>
    `;

    chatMessages.insertBefore(message, typingIndicator);
    const typingText = message.querySelector('.typing-text');

    // Scroll to show new message
    setTimeout(() => scrollToBottom(true), 100);

    // Type out the message character by character
    for (let i = 0; i <= content.length; i++) {
        typingText.textContent = content.slice(0, i);
        
        // Scroll periodically during typing
        if (i % 20 === 0) {
            scrollToBottom(false);
        }

        // Variable typing speed for more natural feel
        const delay = Math.random() * 25 + 15;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Final scroll to bottom
    setTimeout(() => scrollToBottom(true), 100);
}

function sendSuggestion(suggestion) {
    if (!chatInput) return;
    chatInput.value = suggestion;
    sendMessage();
}

function adjustTextareaHeight() {
    if (!chatInput) return;
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
}

// ================================
// RESPONSIVE NAVIGATION
// ================================

function initResponsiveNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    // Create hamburger if it doesn't exist
    if (!hamburger) {
        createHamburgerMenu();
    }

    function toggleMobileMenu() {
        const currentHamburger = document.getElementById('hamburger');
        const currentNavMenu = document.getElementById('navMenu');
        
        if (currentHamburger && currentNavMenu) {
            currentHamburger.classList.toggle('active');
            currentNavMenu.classList.toggle('active');
            body.classList.toggle('nav-open');
            
            const isOpen = currentNavMenu.classList.contains('active');
            currentHamburger.setAttribute('aria-expanded', isOpen);
            currentNavMenu.setAttribute('aria-hidden', !isOpen);
        }
    }

    // Event listeners
    const currentHamburger = document.getElementById('hamburger');
    if (currentHamburger) {
        currentHamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const currentNavMenu = document.getElementById('navMenu');
                if (currentNavMenu && currentNavMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Close menu when clicking outside
    const currentNavMenu = document.getElementById('navMenu');
    if (currentNavMenu) {
        currentNavMenu.addEventListener('click', (e) => {
            if (e.target === currentNavMenu) {
                toggleMobileMenu();
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const currentHamburger = document.getElementById('hamburger');
            const currentNavMenu = document.getElementById('navMenu');
            
            if (currentHamburger) currentHamburger.classList.remove('active');
            if (currentNavMenu) currentNavMenu.classList.remove('active');
            body.classList.remove('nav-open');
        }
        
        // Update desktop detection
        isDesktop = window.innerWidth >= 1024;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const currentNavMenu = document.getElementById('navMenu');
            if (currentNavMenu && currentNavMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });

    // Touch gestures
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchStartX - touchEndX;
        const currentNavMenu = document.getElementById('navMenu');
        
        if (swipeDistance > 50 && currentNavMenu && currentNavMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }, { passive: true });
}

function createHamburgerMenu() {
    const nav = document.querySelector('nav');
    const existingHamburger = document.getElementById('hamburger');
    
    if (!existingHamburger && nav) {
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.id = 'hamburger';
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            nav.insertBefore(hamburger, navMenu);
        }
    }
}

function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('a');
        if (link) {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || linkHref === 'ai-chat.html') {
                item.classList.add('active');
            }
        }
    });
}

// ================================
// VIEWPORT AND RESPONSIVE FIXES
// ================================

function fixMobileViewport() {
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 100);
    });
}

function initTouchOptimizations() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}

// ================================
// EVENT LISTENERS SETUP
// ================================

function setupEventListeners() {
    // Chat input events
    if (chatInput) {
        chatInput.addEventListener('input', adjustTextareaHeight);
        
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Send button
    const sendButton = document.getElementById('sendButton');
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
        
        // Visual feedback
        sendButton.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.9)';
        });
        
        sendButton.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        sendButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Hover effects for cursor (desktop only)
    if (isDesktop && cursor && follower) {
        document.querySelectorAll('a, button, .suggestion-chip, .chat-input, .send-button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform += ' scale(1.5)';
                follower.style.transform += ' scale(0.8)';
                cursor.style.opacity = '1';
                follower.style.opacity = '1';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
                follower.style.transform = follower.style.transform.replace(' scale(0.8)', '');
            });
        });
    }

    // Suggestions responsive behavior
    function adjustSuggestions() {
        const suggestions = document.querySelector('.suggestions');
        if (suggestions) {
            if (window.innerWidth <= 768) {
                suggestions.style.justifyContent = 'center';
            } else {
                suggestions.style.justifyContent = 'flex-start';
            }
        }
    }

    adjustSuggestions();
    window.addEventListener('resize', adjustSuggestions);
}

// ================================
// INITIALIZATION
// ================================

function initializeEverything() {
    console.log('Initializing AI Chat...');
    
    // Core functionality
    initResponsiveNavigation();
    fixMobileViewport();
    initTouchOptimizations();
    setupEventListeners();
    setActivePage();
    
    // Visual elements
    createMatrixRain();
    
    // Auto-focus (desktop only)
    if (chatInput && window.innerWidth >= 768) {
        setTimeout(() => {
            chatInput.focus();
        }, 500);
    }
    
    // Initial scroll
    setTimeout(() => scrollToBottom(false), 100);
    
    console.log('AI Chat initialized successfully');
}

// Handle matrix background resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const matrixBg = document.getElementById('matrixBg');
        if (matrixBg) {
            createMatrixRain();
        }
    }, 250);
});

// Connection status simulation
function simulateConnection() {
    const statusDot = document.querySelector('.status-dot');
    const onlineText = document.querySelector('.ai-online');

    if (statusDot && onlineText && Math.random() < 0.01) {
        statusDot.style.background = '#ffaa00';
        onlineText.innerHTML = '<div class="status-dot"></div>Connecting...';

        setTimeout(() => {
            statusDot.style.background = '#00ff00';
            onlineText.innerHTML = '<div class="status-dot"></div>Online';
        }, 2000);
    }
}

setInterval(simulateConnection, 30000);

// Additional keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) return;

    switch (e.key) {
        case '/':
            if (document.activeElement !== chatInput && chatInput) {
                e.preventDefault();
                chatInput.focus();
            }
            break;
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEverything);
} else {
    initializeEverything();
}

// Export for debugging
window.ChatDebug = {
    scrollToBottom,
    addMessage,
    sendMessage,
    toggleMenu: () => {
        const hamburger = document.getElementById('hamburger');
        if (hamburger) hamburger.click();
    }
};