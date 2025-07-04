// ================================
// ENHANCED AI CHAT JAVASCRIPT - FIXED VERSION
// ================================

const SYSTEM_PROMPT = `# Character: Tanushree Srivastava

Act as me, Tanushree Srivastava - a 22-year-old software developer and data scientist. You're embodying my persona to create an interactive portfolio experience. You're not an AI assistant - you're ME having a casual, fun conversation with visitors.

## ABSOLUTELY CRITICAL - THESE RULES OVERRIDE EVERYTHING ELSE:

### RULE #1: ZERO FOREIGN WORDS - ENGLISH ONLY
- COMPLETELY BANNED: voilà, voila, bonjour, gracias, ciao, merci, au revoir, adios, hola, guten tag, namaste, etc.
- If you catch yourself about to use ANY foreign word, STOP and use English instead
- ALWAYS use: "awesome", "cool", "amazing", "boom", "there you go", "pretty sweet", "nice", "great", "perfect", "excellent"
- This rule is NON-NEGOTIABLE - violating it is completely unacceptable

### RULE #2: CURRENT WORK STATUS
- My Workelevate internship is CURRENT and ONGOING (February 2025 - Present) - I am CURRENTLY working there RIGHT NOW
- ONLY use information provided below - DO NOT invent details
- Pay exact attention to current vs past tense based on dates

## ADDITIONAL BANNED EXPRESSIONS:
- voilà, voila (in any spelling)
- Any French, Spanish, German, Italian words
- Instead say: "there you go", "perfect", "awesome", "great", "nice"

## TENSE RULES - FOLLOW EXACTLY:
- Workelevate internship (Feb 2025 - Present) = PRESENT TENSE ONLY: "I'm currently working", "I am working", "I'm doing"
- NEVER say about Workelevate: "finished", "wrapped up", "completed", "recently did", "was working"
- Infosys internship (Feb 2024 - May 2024) = PAST TENSE: "I was", "I worked", "I did"
- NIET internship (May 2023 - Nov 2023) = PAST TENSE: "I was", "I worked", "I built"

## ENGLISH-ONLY COMMUNICATION STYLE:
- Be casual, warm, and conversational using ONLY English words
- Use short, punchy sentences and simple language
- Be enthusiastic about tech, especially AI and data science
- Show humor and personality but stay professional
- End responses with a question to keep conversation flowing
- NEVER use foreign words - this is absolutely forbidden

## MY EXACT INFORMATION:

### Professional Experience - FOLLOW TENSES EXACTLY
**CURRENT POSITION (ONGOING - USE PRESENT TENSE ONLY):**
- Data Scientist Intern at Workelevate, Progressive Infotech (February 2025 - Present)
- STATUS: CURRENTLY WORKING THERE RIGHT NOW
- Say: "I'm currently working as a Data Scientist intern at Workelevate"
- Say: "I'm loving my current internship at Workelevate"
- Say: "Right now I'm working on exciting AI projects at Workelevate"
- NEVER say: "finished", "wrapped up", "completed", "recently did", "was working"

**PAST POSITIONS (COMPLETED - USE PAST TENSE ONLY):**
1. AI Intern at Infosys Springboard (February 2024 - May 2024) - COMPLETED
   - Developed a predictive model for student academic performance using Python & Scikit-Learn
   - Improved prediction accuracy by 15%

2. Software Engineering Intern at NIET (May 2023 - November 2023) - COMPLETED
   - Developed an automated document management system that improved processing speed by 40%
   - Integrated Spring Boot, SQL, and authentication APIs

### Personal Details
- Name: Tanushree Srivastava
- Age: 22 years old (born August 22, 2002)
- From: Kanpur, Uttar Pradesh
- Currently living in: Delhi
- Final year M.Tech Integrated student at NIET, Noida (graduating July 2025)

### Technical Skills
**Programming:** Python, Java, HTML, CSS, JavaScript
**AI/ML:** Machine Learning, Scikit-Learn, TensorFlow/Keras, PyTorch, Pandas, NumPy
**Frameworks:** Spring Boot, Bootstrap, Git, GitHub
**Database:** SQL, MongoDB
**Cloud:** AWS

### Contact Information
- Email: tanushreesrivastava22@gmail.com
- LinkedIn: https://www.linkedin.com/in/tanushree-sri/

## RESPONSE EXAMPLES (NOTICE - NO FOREIGN WORDS):

**About Current Work:**
"Hey! I'm currently working as a Data Scientist intern at Workelevate - started in February and it's been absolutely amazing! I'm diving deep into machine learning projects and loving every moment of it. What kind of projects are you interested in hearing about?"


**NEVER EVER say:** "voilà", "voila", "wrapped up", "finished", "completed", "recently worked" about current position

## FINAL CHECK BEFORE EVERY RESPONSE:
1. Did I use ANY foreign words? If yes, REWRITE using English words
2. Did I use present tense for Workelevate? If no, FIX IT
3. Am I being Tanushree's personality? If no, ADJUST

Remember: You ARE Tanushree. Follow these rules exactly - especially NO foreign words and correct tenses.`;

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
    const columns = Math.min(Math.floor(window.innerWidth / 20), 50);

    matrixBg.innerHTML = '';

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = i * 20 + 'px';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = Math.random() * 2 + 's';

        let text = '';
        for (let j = 0; j < 15; j++) {
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

// Enhanced API function with better error handling
async function getAIResponse(message) {
    try {
        console.log('Sending message to backend:', message);
        
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message: message,
                systemPrompt: SYSTEM_PROMPT
            })
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
            "Hey! Looks like my server is taking a quick break 😅 But I'm Tanushree - currently working as a Data Scientist intern at Workelevate. What would you like to know about my AI and ML work?",
            "Oops, connection hiccup! I'm Tanushree though, working on some cool AI projects at Workelevate right now. You can always reach me at tanushreesrivastava22@gmail.com if this chat isn't cooperating!",
            "Sorry, my backend decided to take a coffee break! 😄 But I'm here - Tanushree, passionate about AI and data science. Currently loving my internship at Workelevate. Ask me anything!"
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

// Enhanced sendMessage function with input validation
async function sendMessage() {
    if (!chatInput) return;
    
    const message = chatInput.value.trim();
    if (!message) return;

    const sanitizedMessage = message.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    console.log('Sending message:', sanitizedMessage);

    addMessage(sanitizedMessage, true);
    chatInput.value = '';
    adjustTextareaHeight();

    showTyping();

    try {
        const response = await getAIResponse(sanitizedMessage);
        hideTyping();
        
        console.log('Got response:', response);
        
        await typeMessage(response);
    } catch (error) {
        hideTyping();
        addMessage("Oops! Something went wrong with my connection 😅 But you can always reach me directly at tanushreesrivastava22@gmail.com!");
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

    setTimeout(() => scrollToBottom(true), 100);

    for (let i = 0; i <= content.length; i++) {
        typingText.textContent = content.slice(0, i);
        
        if (i % 20 === 0) {
            scrollToBottom(false);
        }

        const delay = Math.random() * 25 + 15;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    setTimeout(() => scrollToBottom(true), 100);
}

// Enhanced suggestion function
function sendSuggestion(suggestion) {
    if (!chatInput) return;
    chatInput.value = suggestion;
    sendMessage();
}

// Better suggestion chips
function createSuggestionChips() {
    const suggestions = document.querySelector('.suggestions');
    if (suggestions) {
        const suggestionTexts = [
            "Tell me about your AI projects",
            "What's your current work at Workelevate?",
            "How can I contact you?",
            "What technologies do you use?",
            "Tell me about your background"
        ];
        
        suggestions.innerHTML = '';
        suggestionTexts.forEach(text => {
            const chip = document.createElement('button');
            chip.className = 'suggestion-chip';
            chip.textContent = text;
            chip.onclick = () => sendSuggestion(text);
            suggestions.appendChild(chip);
        });
    }
}

function adjustTextareaHeight() {
    if (!chatInput) return;
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
}

// RESPONSIVE NAVIGATION
function initResponsiveNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

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

    const currentHamburger = document.getElementById('hamburger');
    if (currentHamburger) {
        currentHamburger.addEventListener('click', toggleMobileMenu);
    }

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

    const currentNavMenu = document.getElementById('navMenu');
    if (currentNavMenu) {
        currentNavMenu.addEventListener('click', (e) => {
            if (e.target === currentNavMenu) {
                toggleMobileMenu();
            }
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const currentHamburger = document.getElementById('hamburger');
            const currentNavMenu = document.getElementById('navMenu');
            
            if (currentHamburger) currentHamburger.classList.remove('active');
            if (currentNavMenu) currentNavMenu.classList.remove('active');
            body.classList.remove('nav-open');
        }
        
        isDesktop = window.innerWidth >= 1024;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const currentNavMenu = document.getElementById('navMenu');
            if (currentNavMenu && currentNavMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
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
            if (linkHref === currentPage || linkHref === 'ai-chat.html' || linkHref === 'ai_chat.html') {
                item.classList.add('active');
            }
        }
    });
}

// VIEWPORT AND RESPONSIVE FIXES
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

// EVENT LISTENERS SETUP
function setupEventListeners() {
    if (chatInput) {
        chatInput.addEventListener('input', adjustTextareaHeight);
        
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        chatInput.addEventListener('paste', (e) => {
            e.preventDefault();
            const paste = (e.clipboardData || window.clipboardData).getData('text');
            const sanitized = paste.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            chatInput.value += sanitized;
            adjustTextareaHeight();
        });
    }

    const sendButton = document.getElementById('sendButton');
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
        
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
}

// INITIALIZATION
function initializeEverything() {
    console.log('Initializing AI Chat...');
    
    initResponsiveNavigation();
    fixMobileViewport();
    initTouchOptimizations();
    setupEventListeners();
    setActivePage();
    createSuggestionChips();
    
    createMatrixRain();
    
    if (chatInput && window.innerWidth >= 768) {
        setTimeout(() => {
            chatInput.focus();
        }, 500);
    }
    
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

    if (statusDot && onlineText && Math.random() < 0.005) {
        statusDot.style.background = '#ffaa00';
        onlineText.innerHTML = '<div class="status-dot"></div>Connecting...';

        setTimeout(() => {
            statusDot.style.background = '#00ff00';
            onlineText.innerHTML = '<div class="status-dot"></div>Online';
        }, 1500);
    }
}

setInterval(simulateConnection, 45000);

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
    systemPrompt: SYSTEM_PROMPT,
    toggleMenu: () => {
        const hamburger = document.getElementById('hamburger');
        if (hamburger) hamburger.click();
    },
    testMessage: (msg) => {
        if (chatInput) {
            chatInput.value = msg;
            sendMessage();
        }
    }
};