
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

// Cursor animation - improved visibility
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Always show custom cursor when mouse moves
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
});

// Hide custom cursor when mouse leaves window
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

// Matrix background
function createMatrixRain() {
    const matrixBg = document.getElementById('matrixBg');
    const characters = '01010101010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = i * 20 + 'px';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = Math.random() * 2 + 's';

        let text = '';
        for (let j = 0; j < 20; j++) {
            text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = text;

        matrixBg.appendChild(column);
    }
}

// Chat functionality
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const typingIndicator = document.getElementById('typingIndicator');

// Function to call Gemini API
// JS/ai-chat.js - Remove the old API key and update this function:

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

// IMPORTANT: Remove these lines from your JS file:
// const GEMINI_API_KEY = '...';
// const GEMINI_API_URL = '...';

function addMessage(content, isUser = false) {
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
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    typingIndicator.classList.add('active');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
    typingIndicator.classList.remove('active');
}

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, true);
    chatInput.value = '';
    adjustTextareaHeight();

    // Show typing indicator
    showTyping();

    try {
        // Get AI response from Gemini
        const response = await getAIResponse(message);
        hideTyping();

        // Simulate typing effect for more natural feel
        await typeMessage(response);
    } catch (error) {
        hideTyping();
        addMessage("Oops! Something went wrong with my connection 😅 Try asking me again!");
        console.error('Error getting response:', error);
    }
}

// Typing animation for more realistic chat feel
async function typeMessage(content) {
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

    // Type out the message character by character
    for (let i = 0; i <= content.length; i++) {
        typingText.textContent = content.slice(0, i);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Variable typing speed for more natural feel
        const delay = Math.random() * 30 + 20;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

function sendSuggestion(suggestion) {
    chatInput.value = suggestion;
    sendMessage();
}

function adjustTextareaHeight() {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
}

// Event listeners
chatInput.addEventListener('input', adjustTextareaHeight);

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

document.getElementById('sendButton').addEventListener('click', sendMessage);

// Hover effects for cursor - improved
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();

    // Auto-focus on input
    setTimeout(() => {
        chatInput.focus();
    }, 500);
});

// Handle window resize for matrix background
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const matrixBg = document.getElementById('matrixBg');
        matrixBg.innerHTML = '';
        createMatrixRain();
    }, 250);
});

// Add some easter eggs
const easterEggs = {
    'hello': 'Hello there! Great to meet you! 👋',
    'hi': 'Hi! How can I help you learn more about me today?',
    'thanks': 'You\'re very welcome! Feel free to ask me anything else about my work.',
    'thank you': 'My pleasure! Is there anything specific about my projects you\'d like to know more about?',
    'awesome': 'Glad you think so! I put a lot of effort into creating amazing projects.',
    'cool': 'Thanks! I love working with cutting-edge technologies.',
    'wow': 'I know right? My work is pretty impressive! What caught your attention the most?'
};

// Add some visual feedback for send button
document.getElementById('sendButton').addEventListener('mousedown', function () {
    this.style.transform = 'scale(0.9)';
});

document.getElementById('sendButton').addEventListener('mouseup', function () {
    this.style.transform = 'scale(1.1)';
});

document.getElementById('sendButton').addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
});

// Auto-resize suggestions on mobile
function adjustSuggestions() {
    const suggestions = document.querySelector('.suggestions');
    if (window.innerWidth <= 768) {
        suggestions.style.justifyContent = 'center';
    } else {
        suggestions.style.justifyContent = 'flex-start';
    }
}

window.addEventListener('resize', adjustSuggestions);
adjustSuggestions();

// Add connection status simulation
function simulateConnection() {
    const statusDot = document.querySelector('.status-dot');
    const onlineText = document.querySelector('.ai-online');

    // Occasionally simulate connection issues (very rarely)
    if (Math.random() < 0.01) {
        statusDot.style.background = '#ffaa00';
        onlineText.innerHTML = '<div class="status-dot"></div>Connecting...';

        setTimeout(() => {
            statusDot.style.background = '#00ff00';
            onlineText.innerHTML = '<div class="status-dot"></div>Online';
        }, 2000);
    }
}

setInterval(simulateConnection, 30000); // Check every 30 seconds

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) return;

    switch (e.key) {
        case 'Escape':
            chatInput.blur();
            break;
        case '/':
            if (document.activeElement !== chatInput) {
                e.preventDefault();
                chatInput.focus();
            }
            break;
    }
});