// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.nav-links');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.nav-links');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ==========================================
// TERMINAL TYPING ANIMATION
// ==========================================

const terminalText = document.getElementById('terminal-text');
const terminalOutput = document.getElementById('terminal-output');

const commands = [
    { 
        cmd: 'nmap -sV target.com', 
        output: 'Starting Nmap scan...\nPORT     STATE SERVICE\n443/tcp  open  https\n80/tcp   open  http\n\nScan complete. 2 critical issues found.'
    }
];

let commandIndex = 0;
let charIndex = 0;
let isTyping = true;

function typeCommand() {
    if (commandIndex < commands.length) {
        const currentCommand = commands[commandIndex].cmd;
        
        if (charIndex < currentCommand.length) {
            terminalText.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeCommand, 80);
        } else {
            setTimeout(() => {
                terminalOutput.textContent = commands[commandIndex].output;
                isTyping = false;
            }, 500);
        }
    }
}

// Start typing animation after page loads
window.addEventListener('load', () => {
    setTimeout(typeCommand, 1000);
});

// ==========================================
// STATISTICS COUNTER ANIMATION
// ==========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statBox = entry.target;
            const statNumber = statBox.querySelector('.stat-number');
            const target = parseInt(statBox.getAttribute('data-target'));
            
            if (!isNaN(target) && target > 0) {
                animateCounter(statNumber, target);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .credential-card, .process-step, .why-me-card, .tool-screenshot, .testimonial-card, .faq-item, .document-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHT
// ==========================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// FORM FIELD ANIMATIONS
// ==========================================

const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// ==========================================
// PARALLAX EFFECT FOR HERO BACKGROUND
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.grid-pattern, .gradient-overlay');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================
// PREVENT FORM RESUBMISSION ON PAGE REFRESH
// ==========================================

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ==========================================
// COPY EMAIL FUNCTIONALITY
// ==========================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const notification = document.createElement('div');
        notification.textContent = 'Copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: var(--accent-primary);
            color: var(--bg-primary);
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    });
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c🔐 RootScope Security', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cInterested in security? Check out our services!', 'color: #00d9ff; font-size: 14px;');
console.log('%c⚠️ Warning: Unauthorized security testing is illegal. Always get written authorization.', 'color: #ffa502; font-size: 12px;');

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('RootScope Security website loaded successfully');
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ==========================================
// ERROR HANDLING
// ==========================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ==========================================
// TOOLS SHOWCASE IMAGE LOADING
// ==========================================

document.querySelectorAll('.tool-screenshot img').forEach(img => {
    img.addEventListener('load', function() {
        this.parentElement.classList.add('loaded');
    });
    
    img.addEventListener('error', function() {
        console.error('Failed to load image:', this.src);
        this.parentElement.classList.add('error');
    });
});

// ==========================================
// FAQ ACCORDION FUNCTIONALITY
// ==========================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.style.cursor = 'pointer';
        
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('open');
            
            item.classList.toggle('open');
        });
    }
});

// ==========================================
// FORM SUBMISSION HANDLER - FIX REDIRECT
// ==========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Show loading state
        const originalHTML = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span>';
        
        try {
            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success! Redirect to thank you page
                window.location.href = 'thank-you.html';
            } else {
                // If error, still redirect after delay
                setTimeout(() => {
                    window.location.href = 'thank-you.html';
                }, 1500);
            }
        } catch (error) {
            console.error('Form error:', error);
            // Even on error, redirect to thank you
            setTimeout(() => {
                window.location.href = 'thank-you.html';
            }, 1500);
        }
    });
}

// ==========================================
// EXPORT FOR TESTING
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateCounter,
        copyToClipboard
    };
}
