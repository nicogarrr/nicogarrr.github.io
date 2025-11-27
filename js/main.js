// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.innerHTML = navLinks.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Project Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.project-tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and categories
      document.querySelectorAll('.project-tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.project-category').forEach(cat => cat.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding category
      const category = button.getAttribute('data-category');
      document.getElementById(`${category}-projects`).classList.add('active');
    });
  });
});

// experience section toggling
document.addEventListener('DOMContentLoaded', function () {
  const timelineContents = document.querySelectorAll('.timeline-content');

  timelineContents.forEach(content => {
    content.addEventListener('click', function () {
      // Close all others
      timelineContents.forEach(item => {
        if (item !== this) item.classList.remove('active');
      });

      // Toggle this one
      this.classList.toggle('active');
    });
  });
});



// Unified Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const windowHeight = window.innerHeight;
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;

    // Using a slightly stricter trigger point similar to both versions
    if (elementPosition < windowHeight - 100) {
      element.classList.add('animated');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
// Initial check in case elements are already in view
animateOnScroll();
