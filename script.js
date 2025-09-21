// Global variables
let currentQuestion = 1;
let quizAnswers = {};
let currentPage = 'home';

// Sample job data
const jobsData = [
    {
        id: 1,
        title: "Junior Web Developer",
        company: "Tech Solutions Ltd",
        location: "Nairobi, Kenya",
        type: "entry-level",
        category: "technology",
        description: "Join our team as a junior web developer and work on exciting projects using modern technologies.",
        requirements: ["HTML, CSS, JavaScript", "Basic React knowledge", "Problem-solving skills"]
    },
    {
        id: 2,
        title: "Marketing Intern",
        company: "Creative Agency",
        location: "Nairobi, Kenya",
        type: "internship",
        category: "creative",
        description: "Learn digital marketing strategies and help create engaging content for our clients.",
        requirements: ["Social media knowledge", "Creative thinking", "Basic design skills"]
    },
    {
        id: 3,
        title: "Customer Service Representative",
        company: "Service Excellence Co",
        location: "Nairobi, Kenya",
        type: "entry-level",
        category: "business",
        description: "Provide excellent customer support and help resolve client inquiries.",
        requirements: ["Communication skills", "Patience", "Problem-solving"]
    },
    {
        id: 4,
        title: "Healthcare Assistant",
        company: "Nairobi Medical Center",
        location: "Nairobi, Kenya",
        type: "part-time",
        category: "healthcare",
        description: "Support medical staff and assist in patient care activities.",
        requirements: ["Healthcare certification", "Compassion", "Attention to detail"]
    },
    {
        id: 5,
        title: "Data Entry Clerk",
        company: "DataCorp Kenya",
        location: "Nairobi, Kenya",
        type: "entry-level",
        category: "technology",
        description: "Accurate data entry and database management for various client projects.",
        requirements: ["Typing speed 40+ WPM", "Attention to detail", "Basic Excel knowledge"]
    },
    {
        id: 6,
        title: "Graphic Design Intern",
        company: "Design Studio Pro",
        location: "Nairobi, Kenya",
        type: "internship",
        category: "creative",
        description: "Create visual designs for print and digital media under senior designer guidance.",
        requirements: ["Adobe Creative Suite", "Portfolio", "Creative mindset"]
    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    setupNavigation();
    setupMobileMenu();
    setupQuiz();
    setupJobFilters();
    setupContactForm();
    loadJobs();
    
    // Show home page by default
    showPage('home');
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const footerLinks = document.querySelectorAll('.footer-section a[data-page]');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
    
    // Add click event listeners to footer links
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

// Navigate to specific page
function navigateToPage(pageName) {
    showPage(pageName);
    updateActiveNavLink(pageName);
    currentPage = pageName;
    
    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    navMenu.classList.remove('active');
    mobileMenu.classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Show specific page
function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// Update active navigation link
function updateActiveNavLink(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// Quiz functionality
function setupQuiz() {
    const quizButtons = document.querySelectorAll('.quiz-btn');
    const nextButton = document.getElementById('next-question');
    
    quizButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleQuizAnswer(this);
        });
    });
    
    nextButton.addEventListener('click', function() {
        nextQuestion();
    });
}

function handleQuizAnswer(button) {
    const question = button.closest('.question');
    const questionId = question.id;
    const answer = button.getAttribute('data-answer');
    
    // Remove previous selections
    question.querySelectorAll('.quiz-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Mark current selection
    button.classList.add('selected');
    
    // Store answer
    quizAnswers[questionId] = answer;
    
    // Show next button
    document.getElementById('next-question').style.display = 'block';
}

function nextQuestion() {
    const currentQuestionEl = document.getElementById(`question-${currentQuestion}`);
    const nextQuestionEl = document.getElementById(`question-${currentQuestion + 1}`);
    
    if (nextQuestionEl) {
        currentQuestionEl.classList.remove('active');
        nextQuestionEl.classList.add('active');
        currentQuestion++;
        document.getElementById('next-question').style.display = 'none';
    } else {
        // Show result
        showQuizResult();
    }
}

function showQuizResult() {
    document.getElementById(`question-${currentQuestion}`).classList.remove('active');
    document.getElementById('next-question').style.display = 'none';
    
    const result = calculateQuizResult();
    document.getElementById('result-text').textContent = result;
    document.getElementById('quiz-result').style.display = 'block';
}

function calculateQuizResult() {
    const answers = Object.values(quizAnswers);
    const answerCounts = {};
    
    answers.forEach(answer => {
        answerCounts[answer] = (answerCounts[answer] || 0) + 1;
    });
    
    const topAnswer = Object.keys(answerCounts).reduce((a, b) => 
        answerCounts[a] > answerCounts[b] ? a : b
    );
    
    const careerSuggestions = {
        'tech': 'Based on your answers, you might enjoy careers in Technology such as Web Development, Data Analysis, or Software Engineering. These fields offer great growth opportunities and match your problem-solving interests.',
        'people': 'You seem to enjoy working with people! Consider careers in Human Resources, Teaching, Social Work, or Customer Relations. These roles focus on helping and interacting with others.',
        'creative': 'Your creative side is strong! Look into careers in Graphic Design, Marketing, Content Creation, or Arts. These fields allow you to express creativity while building valuable skills.',
        'analyze': 'You have an analytical mindset! Consider careers in Data Science, Business Analysis, Finance, or Research. These roles involve working with data and finding insights.',
        'office': 'You prefer structured environments. Consider careers in Administration, Project Management, or Business Operations.',
        'outdoor': 'You enjoy outdoor work! Look into Environmental Science, Agriculture, or Field Services.',
        'remote': 'Remote work appeals to you. Consider freelancing, digital marketing, or online consulting.',
        'impact': 'Making a difference motivates you! Consider Non-profit work, Healthcare, Education, or Social Services.',
        'money': 'Financial success drives you! Look into Sales, Finance, Entrepreneurship, or Business Development.',
        'recognition': 'You value achievement! Consider careers in Leadership, Sales, or Performance-based roles.',
        'learning': 'Continuous learning excites you! Consider Research, Teaching, or Technology careers.'
    };
    
    return careerSuggestions[topAnswer] || 'Based on your answers, we recommend exploring various career options that match your interests. Consider speaking with a career counselor for personalized guidance.';
}

// Job filtering and display
function setupJobFilters() {
    const categoryFilter = document.getElementById('job-category');
    const typeFilter = document.getElementById('job-type');
    
    if (categoryFilter && typeFilter) {
        categoryFilter.addEventListener('change', filterJobs);
        typeFilter.addEventListener('change', filterJobs);
    }
}

function loadJobs() {
    displayJobs(jobsData);
}

function displayJobs(jobs) {
    const jobsContainer = document.getElementById('jobs-container');
    if (!jobsContainer) return;
    
    if (jobs.length === 0) {
        jobsContainer.innerHTML = '<p class="no-jobs">No jobs found matching your criteria.</p>';
        return;
    }
    
    jobsContainer.innerHTML = jobs.map(job => `
        <div class="job-card" data-category="${job.category}" data-type="${job.type}">
            <h3 class="job-title">${job.title}</h3>
            <p class="job-company">${job.company} - ${job.location}</p>
            <span class="job-type">${job.type.replace('-', ' ').toUpperCase()}</span>
            <p class="job-description">${job.description}</p>
            <div class="job-requirements">
                <strong>Requirements:</strong>
                <ul>
                    ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function filterJobs() {
    const categoryFilter = document.getElementById('job-category');
    const typeFilter = document.getElementById('job-type');
    
    const selectedCategory = categoryFilter.value;
    const selectedType = typeFilter.value;
    
    let filteredJobs = jobsData;
    
    if (selectedCategory !== 'all') {
        filteredJobs = filteredJobs.filter(job => job.category === selectedCategory);
    }
    
    if (selectedType !== 'all') {
        filteredJobs = filteredJobs.filter(job => job.type === selectedType);
    }
    
    displayJobs(filteredJobs);
}

// Contact form functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = {};
    
    // Convert form data to object
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Validate form
    if (validateContactForm(formObject)) {
        showMessage('form-success');
        e.target.reset();
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', formObject);
    } else {
        showMessage('form-error');
    }
}

function validateContactForm(data) {
    const required = ['name', 'email', 'subject', 'message'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    return true;
}

function showMessage(messageId) {
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    
    // Hide both messages first
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    
    // Show the appropriate message
    const messageEl = document.getElementById(messageId);
    if (messageEl) {
        messageEl.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation when switching pages
function addLoadingEffect() {
    document.body.style.opacity = '0.7';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300);
}

// Intersection Observer for animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observe feature cards and other animated elements
    document.querySelectorAll('.feature-card, .category-card, .job-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Initialize animations when page loads
window.addEventListener('load', observeElements);

// Export functions for global access
window.navigateToPage = navigateToPage;