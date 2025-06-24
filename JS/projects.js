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

// Filter functionality
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');

        // Update active tab
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal functionality
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');

function openModal(projectId) {
    const projectData = getProjectData(projectId);
    modalContent.innerHTML = `
                <h2 style="font-size: 2.5rem; margin-bottom: 20px; background: linear-gradient(135deg, #00ffff, #ff00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${projectData.title}</h2>
                <p style="font-size: 1.1rem; line-height: 1.8; color: rgba(255, 255, 255, 0.8); margin-bottom: 30px;">${projectData.description}</p>
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #00ffff; margin-bottom: 15px;">Key Features</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${projectData.features.map(feature => `<li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                            <span style="position: absolute; left: 0; color: #ff00ff;">→</span> ${feature}
                        </li>`).join('')}
                    </ul>
                </div>
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #00ffff; margin-bottom: 15px;">Technologies Used</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${projectData.tech.map(tech => `<span style="padding: 8px 15px; background: rgba(0, 255, 255, 0.1); border: 1px solid rgba(0, 255, 255, 0.3); border-radius: 15px; font-size: 14px;">${tech}</span>`).join('')}
                    </div>
                </div>
                <div style="display: flex; gap: 20px; margin-top: 30px;">
                    <a href="${projectData.githubUrl}" style="padding: 15px 30px; background: transparent; color: #fff; text-decoration: none; border-radius: 25px; font-weight: 600; border: 1px solid rgba(255, 255, 255, 0.3);">GitHub</a>
                </div>
            `;
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

function getProjectData(projectId) {
    const projects = {
        'ai-platform': {
            title: 'AI-Powered Supplier Selection Platform',
            image: 'https://via.placeholder.com/800x300/1a1a1a/00ffff?text=AI+Analytics+Platform',
            description: 'A data-driven platform leveraging generative AI for intelligent supplier selection and decision support.',
            features: [
                'Upload and preview supplier data',
                'Choose between: AI-powered ranking using Google Gemini or Manual ranking with custom criteria and filters',
                'Interactive charts comparing top suppliers',
                'AI-generated supplier evaluation reports',
                'Export rankings and reports to CSV and PDF formats'
            ],
            tech: ['Python', 'Streamlit', 'Scukit-Learn', 'Generative AI'],
            githubUrl: 'https://github.com/Tanu22srivastava/Supplier-Selection-using-Generative-AI'
        },
        'smartdoc': {
            title: 'Smart Document Management Platform',
            image: 'images/Screenshot 2025-06-24 144538.png',
            description: 'A platform that provides users with the ability to register and sign in to manage their records required by their organization and more. Users can update their password, update their profile picture, upload and categorize documents, and download them as needed.',
            features: [
                'User authentication and authorization',
                'Users can update their password and use the forgot password functionality on the login page if needed.',
                'Users can update their profile picture to personalize their account.',
                'Users can upload documents and categorize them for easy organization and retrieval.',
                'Users can download the uploaded documents as required.',
                'The admin has access to a dashboard with additional functionalities.',
                'The admin can view and download information for all users.',
                'The admin can access and manage faculty data, including major details.',
                'The admin can search for users by email or faculty department.',
                'The admin can export user information as a CSV file for further analysis.',
                'The admin can click on a specific user to view their detailed profile information.'
            ],
            tech: ['Java', 'SpringBoot', 'MySQL', 'Thymeleaf'],
            githubUrl: 'https://github.com/Tanu22srivastava/SmartDoc'
        },
        'ai': {
            title: 'AI Resume Analyzer',
            image: 'images/Screenshot 2025-06-24 151721.png',
            description: 'AI-powered resume analysing tool using gemini models for analysing resume, gives you feedback according to the job description and tells you if you are a good fit or not.',
            features: [
                'Allows users to input job descriptions and resumes either via file upload (PDF, DOCX, TXT) or text paste.',
                'Analyzes resumes against job descriptions, providing a match score, key strengths, missing skills, and areas for improvement.',
                'Offers a customizable interface with theme-switching for better user experience.',
                'Provides a feedback system for users to suggest improvements and share their thoughts.',
                'Previews the first 2000 characters of the uploaded resume for quick content checks before analysis.'
            ],
            tech: ['Streamlit', 'Python', 'Gemini API'],
            githubUrl: 'https://github.com/Tanu22srivastava/Resume-Analyser-using-GenerativeAI'
        },
        'chat': {
            title: 'AI IT Chatbot',
            image: 'images/Screenshot 2025-06-24 151721.png',
            description: 'The IT Chatbot is a versatile, AI-powered assistant designed to handle IT-related queries efficiently. It leverages advanced natural language processing (NLP) models like BERT and Gemini API to detect user intents and provide quick responses. Not only can it create service tickets on platforms like ServiceNow and Jira, but it also allows for seamless application management, including installation, uninstallation, and updates, all through simple user prompts.',
            features: [
                'Uses AI models like BERT to accurately detect user intent and classify IT queries.',
                'Automatically creates and manages service tickets on ServiceNow and Jira based on the user’s request.',
                'Installs, uninstalls, and updates applications through text-based commands, making system management more efficient.',
                'Provides immediate responses to IT-related queries, reducing downtime and enhancing productivity.',
                'Seamlessly integrates with ServiceNow and Jira, automating ticketing workflows and improving issue resolution speed.'
            ],
            tech: ['Streamlit', 'Python', 'Gemini API', 'Machhine Learning', 'BERT Model', 'Scikit-Learn'],
            githubUrl: 'https://github.com/Tanu22srivastava/AI-IT-CHATBOT'
        },
        'pizza': {
            title: 'Real Time Pizza Delivery Application',
            image: 'images/Screenshot 2025-06-24 151721.png',
            description: 'The application allows users to register, login, and place pizza orders. Users can make payments using cash on delivery or online banking. The application provides real-time order tracking for users and a separate admin interface to manage customer data and track orders.',
            features: [
                'Users can register themselves to create an account.',
                'Registered users can log in to their accounts.',
                'Users can browse the menu and place pizza orders.',
                'Users can choose between cash on delivery or online banking for payment.',
                'Users can track the status of their orders in real time.',
                'Admins have access to a separate interface to manage customer data and track orders.'
            ],
            tech: ['Node.js', 'Express', 'JavaScript', 'MongoDB', 'Socket.IO', 'HTML/CSS'],
            githubUrl: 'https://github.com/Tanu22srivastava/pizza-real-time'
        }
        // Add more project data as needed
    };

    return projects[projectId] || projects['ai-platform'];
}

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Hover effects for cursor
document.querySelectorAll('a, button, .project-card, .filter-tab').forEach(el => {
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

projectCards.forEach(card => {
    observer.observe(card);
});