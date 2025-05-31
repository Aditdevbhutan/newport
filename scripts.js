// Navigation Functions
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.querySelector(".content-wrapper").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelector(".content-wrapper").style.marginLeft = "0";
}

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    // Update icon
    if (document.body.classList.contains('light-theme')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// Typing Animation
const typingElement = document.querySelector('.typing');
if (typingElement) {
    const skills = ['HTML', 'CSS', 'JavaScript', 'Python'];
    let currentSkillIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeSkill() {
        const currentSkill = skills[currentSkillIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentSkill.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentSkill.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentSkill.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentSkillIndex = (currentSkillIndex + 1) % skills.length;
            typingSpeed = 300; // Pause before typing next word
        }
        
        setTimeout(typeSkill, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(typeSkill, 1000);
}

// Scroll Animation for Sections
const sections = document.querySelectorAll('.section');
const skillBars = document.querySelectorAll('.skill-progress');

function checkVisibility() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
    
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight - 50) {
            const width = bar.getAttribute('style').split('width:')[1];
            bar.style.width = width;
        }
    });
}

// Initial check
window.addEventListener('load', () => {
    checkVisibility();
    
    // Add animation to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// Check on scroll
window.addEventListener('scroll', checkVisibility);

// Add smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Initialize animations for skill bars on about page
if (document.querySelector('.skill-progress')) {
    setTimeout(() => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }, 500);
}