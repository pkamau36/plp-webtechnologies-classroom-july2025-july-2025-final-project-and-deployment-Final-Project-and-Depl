

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add smooth scrolling to navigation links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Job Search Function
function searchJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const jobCards = document.querySelectorAll('.job-card');
    
    jobCards.forEach(card => {
        const jobTitle = card.querySelector('h3').textContent.toLowerCase();
        const company = card.querySelector('p').textContent.toLowerCase();
        
        if (jobTitle.includes(searchTerm) || company.includes(searchTerm) || searchTerm === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    if (searchTerm) {
        showModal(`Searching for: "${searchTerm}"`);
    }
}

// Job Application Function
function applyJob(jobTitle) {
    showModal(`Application submitted for: ${jobTitle}. We'll contact you soon!`);
}

// Contact Form Submission
function submitForm(event) {
    event.preventDefault();
    
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;
    
    // Simple validation
    if (name && email && message) {
        showModal(`Thank you ${name}! Your message has been sent. We'll get back to you soon.`);
        event.target.reset(); // Clear the form
    } else {
        showModal('Please fill in all fields.');
    }
}

// Modal Functions
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    
    modalText.textContent = message;
    modal.style.display = 'block';
    
    // Auto close after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Add Enter key functionality to search
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchJobs();
    }
});

// Simple animation on scroll (optional)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#fff';
    }
});

console.log('YouthPath website loaded successfully!');