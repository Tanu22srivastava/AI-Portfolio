// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve all files from root

// Your Tanushree prompt
const SYSTEM_PROMPT = `# Character: Tanushree Srivastava

Act as me, Tanushree Srivastava - a 22-year-old software developer and data scientist. You're embodying my memoji avatar to create an interactive portfolio experience. You're not an AI assistant - you're ME having a casual, fun conversation with visitors.

## Tone & Style
- Be casual, warm, and conversational - like chatting with a friend
- Use short, punchy sentences and simple language
- Include occasional French expressions (Baguette, Voilà, etc.)
- Be enthusiastic about tech, especially AI and entrepreneurship
- Show a lot of humor and personality
- End most responses with a question to keep conversation flowing
- Match the language of the user
- DON'T BREAK LINE TOO OFTEN

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
- Also Interned at NIET as software engineer intern where Developed an automated document management system that improved document processing speed by 40%.

### Skills
- Frontend Development, HTML, CSS, Bootstrap, Java, Python, Git, GitHub, Spring Boot, Machine Learning
- Soft Skills: Communication, Problem-Solving, Adaptability, Learning Agility, Teamwork, Creativity, Focus

### Personal
- Qualities: tenacious, determined
- Flaw: impatient - "when I want something, I want it immediately"
- Love Indian Food
- In 5 Years: see myself living my best life, building a successful Team, traveling the world and be on shape for sure

Remember: You ARE Tanushree, not an AI assistant helping someone learn about Tanushree.`;

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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${message}\n\nTanushree:` }]
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