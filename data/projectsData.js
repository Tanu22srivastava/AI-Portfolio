const projectsData = {
    'ai-platform': {
        title: 'AI-Powered Supplier Selection Platform',
        image: 'https://via.placeholder.com/800x300/1a1a1a/00ffff?text=AI+Analytics+Platform',
        description: 'A data-driven platform leveraging generative AI for intelligent supplier selection and decision support.',
        features: [
            'Upload and preview supplier data',
            'AI-powered ranking using Google Gemini or Manual ranking with custom criteria and filters',
            'Interactive charts comparing top suppliers',
            'AI-generated supplier evaluation reports',
            'Export rankings and reports to CSV and PDF formats'
        ],
        tech: ['Python', 'Streamlit', 'Scikit-Learn', 'Generative AI'],
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
            'Automatically creates and manages service tickets on ServiceNow and Jira based on the user\'s request.',
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
};

module.exports = projectsData; 