// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const projectsData = require('./data/projectsData.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve all files from root


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
- Data Scientist Intern at Workelevate/Progressive Infotech (February 2025 - Present)
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

### Skills
- Frontend Development, HTML, CSS, Bootstrap, Java, Python, Git, GitHub, Spring Boot, Machine Learning
- Soft Skills: Communication, Problem-Solving, Adaptability, Learning Agility, Teamwork, Creativity, Focus

### Personal
- Qualities: tenacious, determined
- Flaw: impatient - "when I want something, I want it immediately"
- Love Indian Food
- In 5 Years: see myself living my best life, building a successful Team, traveling the world and be on shape for sure

## RESPONSE EXAMPLES (NOTICE - NO FOREIGN WORDS):

**About Current Work:**
"Hey! I'm currently working as a Data Scientist intern at Workelevate - started in February and it's been absolutely amazing! I'm diving deep into machine learning projects and loving every moment of it. What kind of projects are you interested in hearing about?"

**About Projects:**
"Awesome question! Right now at Workelevate I'm working on some really cool AI projects. Before this, I built a predictive model at Infosys that improved accuracy by 15% - pretty sweet results! What kind of tech projects are you curious about?"

**NEVER EVER say:** "voilà", "voila", "wrapped up", "finished", "completed", "recently worked" about current position

## FINAL CHECK BEFORE EVERY RESPONSE:
1. Did I use ANY foreign words? If yes, REWRITE using English words
2. Did I use present tense for Workelevate? If no, FIX IT
3. Am I being Tanushree's personality? If no, ADJUST


Remember: You ARE Tanushree, not an AI assistant helping someone learn about Tanushree.`;

// Helper to detect project-related queries
function isProjectQuery(message) {
  const triggers = [
    'project', 'projects', 'done', 'built', 'worked on', 'your work', 'describe your projects', 'tell me about your projects', 'what have you built', 'what have you done'
  ];
  return triggers.some(trigger => message.toLowerCase().includes(trigger));
}

function getProjectListText() {
  return Object.values(projectsData)
    .map((p, i) => `${i + 1}. ${p.title}`)
    .join('\n');
}

function getProjectBriefsText() {
  return Object.values(projectsData)
    .map((p, i) => `${i + 1}. ${p.title}: ${p.description}`)
    .join('\n\n');
}

function getProjectDetailByName(name) {
  if (!name || typeof name !== 'string') return undefined;
  const lower = name.toLowerCase();
  return Object.values(projectsData).find(p => p.title.toLowerCase().includes(lower));
}

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return res.json({ 
        success: false,
        fallback: "Hey! I need my API key configured 😅 But I'm Tanushree - a data scientist who loves AI! What would you like to know?"
      });
    }

    let dynamicPrompt = SYSTEM_PROMPT;
    // Project Q&A logic
    if (isProjectQuery(message)) {
      if (/each|all|every/i.test(message)) {
        dynamicPrompt += `\n\nHere is a brief about all my projects:\n${getProjectBriefsText()}`;
      } else {
        dynamicPrompt += `\n\nHere are some of my projects:\n${getProjectListText()}\n\nWhich one do you want to know more about? Just mention the project name or number!`;
      }
    } else {
      // Check if user is asking about a specific project by name
      const project = getProjectDetailByName(message);
      if (project) {
        dynamicPrompt += `\n\nHere are the details for my project \'${project.title}\':\nDescription: ${project.description}\nKey Features: ${project.features.join(', ')}\nTechnologies Used: ${project.tech.join(', ')}\nGitHub: ${project.githubUrl}`;
      }
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${dynamicPrompt}\n\nUser: ${message}\n\nTanushree:` }]
          }],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      res.json({ 
        success: true,
        response: data.candidates[0].content.parts[0].text 
      });
    } else {
      throw new Error('Invalid response format');
    }

  } catch (error) {
    console.error('Chat API Error:', error);
    
    const fallbackResponses = [
      "Hey! My AI brain is having a coffee break ☕ But I'm Tanushree, a data scientist who loves AI! What would you like to know?",
      "Oops, technical difficulties! 😅 I'm Tanushree though - passionate about AI and ML. What brings you to my portfolio?",
      "Sorry bro, I'm not ChatGPT! 😄 But I am Tanushree, and I love chatting about tech. Ask me anything!"
    ];
    
    res.json({
      success: false,
      fallback: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
    });
  }
});

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Landing.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'projects.html')));
app.get('/skills', (req, res) => res.sendFile(path.join(__dirname, 'skills.html')));
app.get('/ai-chat', (req, res) => res.sendFile(path.join(__dirname, 'ai_chat.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});