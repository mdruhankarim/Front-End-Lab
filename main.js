// ===== MAIN.JS - TRAVEL PARADISE WEBSITE =====
// This file contains all framework initializations and interactive features

// ===== GLOBAL VARIABLES =====
let currentPage = window.location.pathname.split('/').pop() || 'index.html';
let isScrolling = false;
let scrollTimeout;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Travel Paradise - Main.js loaded');
    
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeSwiper();
    initializeScrollAnimations();
    initializeFormValidation();
    initializeInteractiveFeatures();
    initializeAccessibility();
    
    // Initialize page-specific features
    if (currentPage === 'index.html' || currentPage === '') {
        initializeHomePage();
    } else if (currentPage === 'attractions.html') {
        initializeAttractionsPage();
    } else if (currentPage === 'register.html') {
        initializeRegistrationPage();
    }
    
    console.log('All components initialized successfully');
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.getElementById('header');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== GSAP ANIMATIONS =====
function initializeAnimations() {
    // GSAP Brand Animation
    if (typeof gsap !== 'undefined') {
        // Logo animation
        gsap.from('.brand', {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2
        });
        
        // Brand text animation
        gsap.from('.brand-text', {
            x: -20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.4
        });
        
        // Navigation items animation
        gsap.from('.nav__item', {
            y: -20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            delay: 0.6
        });
        
    }
}

// ===== SWIPER SLIDER INITIALIZATION =====
function initializeSwiper() {
    if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
        const swiper = new Swiper('.mySwiper', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 40
                }
            },
            on: {
                init: function() {
                    console.log('Swiper initialized successfully');
                }
            }
        });
    }
}

// ===== SCROLL ANIMATIONS (AOS & SCROLLREVEAL) =====
function initializeScrollAnimations() {
    // AOS (Animate On Scroll) Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-out-cubic',
            offset: 50,
            delay: 0,
            anchorPlacement: 'top-bottom',
            disable: false, // Enable on all screen sizes
            startEvent: 'DOMContentLoaded',
            mirror: false
        });
        
        // Refresh AOS to catch any dynamically loaded content
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
    
    // ScrollReveal Initialization
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '30px',
            duration: 800,
            easing: 'ease-out',
            origin: 'bottom',
            reset: false,
            mobile: false
        });
        
        // Reveal elements with different animations
        sr.reveal('.attraction-card', {
            interval: 100,
            scale: 0.9
        });
        
        sr.reveal('.feature-card', {
            interval: 150,
            origin: 'left'
        });
        
        sr.reveal('.benefit-item', {
            interval: 100,
            origin: 'right'
        });
        
        sr.reveal('.form-group', {
            interval: 50,
            origin: 'left'
        });
    }
}

// ===== FORM VALIDATION =====
function initializeFormValidation() {
    // Newsletter form validation
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Registration form validation
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
        setupRealTimeValidation();
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email');
    const message = document.getElementById('newsletter-message');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Validate email
    if (!isValidEmail(email.value)) {
        showMessage(message, 'Please enter a valid email address.', 'error');
        email.focus();
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    
    // Simulate API call
    setTimeout(() => {
        showMessage(message, 'Thank you for subscribing! You\'ll receive our latest updates.', 'success');
        email.value = '';
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Subscribe';
    }, 2000);
}

function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const message = document.getElementById('form-message');
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Validate all fields
    if (!validateRegistrationForm(form)) {
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    
    // Simulate API call
    setTimeout(() => {
        showMessage(message, 'Account created successfully! Welcome to Travel Paradise!', 'success');
        form.reset();
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        
        // Reset password strength indicator
        const strengthFill = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        if (strengthFill && strengthText) {
            strengthFill.style.width = '0%';
            strengthText.textContent = 'Password strength';
        }
    }, 3000);
}

function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('#registration-form input, #registration-form select');
    
    inputs.forEach(input => {
        // Real-time validation on input
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        // Validation on blur
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', updatePasswordStrength);
    }
    
    // Password confirmation validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            
            if (confirmPassword && password !== confirmPassword) {
                showFieldError(this, 'Passwords do not match');
            } else if (confirmPassword && password === confirmPassword) {
                showFieldSuccess(this, 'Passwords match');
            } else {
                clearFieldFeedback(this);
            }
        });
    }
    
    // Password toggle functionality
    const passwordToggle = document.getElementById('password-toggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
}

function validateRegistrationForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // Check terms agreement
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox && !termsCheckbox.checked) {
        showFieldError(termsCheckbox, 'You must agree to the terms and conditions');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${getFieldLabel(fieldName)} is required`;
        isValid = false;
    }
    
    // Specific field validations
    if (value && fieldName === 'email' && !isValidEmail(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
    }
    
    if (value && fieldName === 'phone' && !isValidPhone(value)) {
        errorMessage = 'Please enter a valid phone number';
        isValid = false;
    }
    
    if (value && fieldName === 'password' && value.length < 8) {
        errorMessage = 'Password must be at least 8 characters long';
        isValid = false;
    }
    
    if (value && fieldName === 'birthDate' && !isValidDate(value)) {
        errorMessage = 'Please enter a valid date';
        isValid = false;
    }
    
    // Show feedback
    if (isValid && value) {
        showFieldSuccess(field, '');
    } else if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldFeedback(field);
    }
    
    return isValid;
}

function updatePasswordStrength(e) {
    // Support being called as an event handler (preferred) or directly with input element
    const password = e && e.target ? e.target.value : (typeof e === 'string' ? e : document.getElementById('password')?.value || '');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthFill || !strengthText) return;
    
    const strength = calculatePasswordStrength(password);
    
    strengthFill.className = 'strength-fill';
    strengthFill.style.width = strength.percentage + '%';
    
    if (strength.score > 0) {
        strengthFill.classList.add(strength.class);
        strengthText.textContent = strength.text;
    } else {
        strengthText.textContent = 'Password strength';
    }
}

function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) score += 1;
    else feedback.push('at least 8 characters');
    
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('lowercase letter');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('uppercase letter');
    
    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('number');
    
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('special character');
    
    if (score <= 2) {
        return {
            score: score,
            percentage: 33,
            class: 'weak',
            text: 'Weak password'
        };
    } else if (score <= 3) {
        return {
            score: score,
            percentage: 66,
            class: 'medium',
            text: 'Medium strength'
        };
    } else {
        return {
            score: score,
            percentage: 100,
            class: 'strong',
            text: 'Strong password'
        };
    }
}

function showFieldError(field, message) {
    const feedback = field.parentNode.querySelector('.input-feedback');
    if (feedback) {
        feedback.textContent = message;
        feedback.className = 'input-feedback error';
    }
    field.classList.add('error');
}

function showFieldSuccess(field, message) {
    const feedback = field.parentNode.querySelector('.input-feedback');
    if (feedback) {
        feedback.textContent = message;
        feedback.className = 'input-feedback success';
    }
    field.classList.remove('error');
    field.classList.add('success');
}

function clearFieldFeedback(field) {
    const feedback = field.parentNode.querySelector('.input-feedback');
    if (feedback) {
        feedback.textContent = '';
        feedback.className = 'input-feedback';
    }
    field.classList.remove('error', 'success');
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// ===== INTERACTIVE FEATURES =====
function initializeInteractiveFeatures() {
    // Ripple effect for buttons
    initializeRippleEffect();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Lazy loading for images
    initializeLazyLoading();
    
    // Collapsible sections
    initializeCollapsibleSections();
}

function initializeRippleEffect() {
    document.querySelectorAll('.btn--ripple').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const span = document.createElement('span');
            span.className = 'ripple';
            span.style.width = span.style.height = `${size}px`;
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;
            
            // Remove existing ripple
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            this.appendChild(span);
            
            setTimeout(() => {
                span.remove();
            }, 600);
        });
    });
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function initializeCollapsibleSections() {
    // Add collapsible functionality to any element with data-collapsible attribute
    document.querySelectorAll('[data-collapsible]').forEach(element => {
        const trigger = element.querySelector('[data-collapsible-trigger]');
        const content = element.querySelector('[data-collapsible-content]');
        
        if (trigger && content) {
            trigger.addEventListener('click', function() {
                const isOpen = content.style.display === 'block';
                content.style.display = isOpen ? 'none' : 'block';
                trigger.setAttribute('aria-expanded', !isOpen);
                
                // Add animation
                if (!isOpen) {
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 10);
                }
            });
        }
    });
}

// ===== PAGE-SPECIFIC INITIALIZATIONS =====
function initializeHomePage() {
    console.log('Initializing home page features');
    
    // Add any home page specific functionality here
    const startJourneyBtn = document.querySelector('.hero .btn--primary');
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', function() {
            // Scroll to attractions section or navigate to attractions page
            const attractionsSection = document.querySelector('.slider-section');
            if (attractionsSection) {
                attractionsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function initializeAttractionsPage() {
    console.log('Initializing attractions page features');
    
    // Modal functionality
    initializeModal();
    
    // Filter functionality
    initializeFilter();
    
    // Attraction buttons
    initializeAttractionButtons();
}

function initializeModal() {
    const modal = document.getElementById('attraction-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function openModal(title, content) {
    const modal = document.getElementById('attraction-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (modal && modalTitle && modalContent) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('attraction-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function initializeFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const attractionCards = document.querySelectorAll('.attraction-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            attractionCards.forEach(card => {
                const cardType = card.getAttribute('data-type') || 'all';
                
                if (filter === 'all' || cardType === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initializeAttractionButtons() {
    const attractionButtons = document.querySelectorAll('.attraction-btn');
    
    attractionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const attraction = this.getAttribute('data-attraction');
            const attractionData = getAttractionData(attraction);
            
            if (attractionData) {
                openModal(attractionData.title, attractionData.content);
            }
        });
    });
}

function getAttractionData(attraction) {
    const attractionData = {
        temple: {
            title: 'Ancient Temple',
            content: `
                <div class="modal-attraction-content">
                    <img src="assets/images/attraction-1.jpg" alt="Ancient Temple" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p><strong>Location:</strong> Sacred Valley, Peru</p>
                    <p><strong>Best Time to Visit:</strong> May to September</p>
                    <p><strong>Duration:</strong> 2-3 hours</p>
                    <p><strong>Difficulty:</strong> Easy to Moderate</p>
                    <p>Experience the mystical beauty of ancient temples with rich historical significance. This sacred site offers breathtaking views and a deep connection to ancient civilizations.</p>
                    <div style="margin-top: 1rem;">
                        <button class="btn btn--primary" onclick="closeModal()">Close</button>
                    </div>
                </div>
            `
        },
        mountain: {
            title: 'Mountain Peak',
            content: `
                <div class="modal-attraction-content">
                    <img src="assets/images/attraction-2.jpg" alt="Mountain Peak" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p><strong>Location:</strong> Swiss Alps, Switzerland</p>
                    <p><strong>Best Time to Visit:</strong> June to September</p>
                    <p><strong>Duration:</strong> 4-6 hours</p>
                    <p><strong>Difficulty:</strong> Moderate to Challenging</p>
                    <p>Conquer breathtaking mountain peaks and enjoy panoramic views from the summit. This adventure offers an unforgettable experience for nature lovers and adventure seekers.</p>
                    <div style="margin-top: 1rem;">
                        <button class="btn btn--primary" onclick="closeModal()">Close</button>
                    </div>
                </div>
            `
        },
        island: {
            title: 'Tropical Island',
            content: `
                <div class="modal-attraction-content">
                    <img src="assets/images/attraction-3.jpg" alt="Tropical Island" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p><strong>Location:</strong> Maldives</p>
                    <p><strong>Best Time to Visit:</strong> November to April</p>
                    <p><strong>Duration:</strong> Full day</p>
                    <p><strong>Difficulty:</strong> Easy</p>
                    <p>Relax on pristine tropical islands with crystal clear waters and white sand beaches. Perfect for a romantic getaway or family vacation.</p>
                    <div style="margin-top: 1rem;">
                        <button class="btn btn--primary" onclick="closeModal()">Close</button>
                    </div>
                </div>
            `
        },
        oasis: {
            title: 'Desert Oasis',
            content: `
                <div class="modal-attraction-content">
                    <img src="assets/images/attraction-4.jpg" alt="Desert Oasis" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p><strong>Location:</strong> Sahara Desert, Morocco</p>
                    <p><strong>Best Time to Visit:</strong> October to April</p>
                    <p><strong>Duration:</strong> 2-3 days</p>
                    <p><strong>Difficulty:</strong> Moderate</p>
                    <p>Discover hidden oases in the desert with lush vegetation and refreshing waters. Experience the magic of desert life and traditional Berber culture.</p>
                    <div style="margin-top: 1rem;">
                        <button class="btn btn--primary" onclick="closeModal()">Close</button>
                    </div>
                </div>
            `
        },
        forest: {
            title: 'Forest Trail',
            content: `
                <div class="modal-attraction-content">
                    <img src="assets/images/attraction-5.jpg" alt="Forest Trail" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p><strong>Location:</strong> Amazon Rainforest, Brazil</p>
                    <p><strong>Best Time to Visit:</strong> May to October</p>
                    <p><strong>Duration:</strong> 3-5 hours</p>
                    <p><strong>Difficulty:</strong> Moderate</p>
                    <p>Hike through enchanting forest trails surrounded by ancient trees and wildlife. Connect with nature in one of the world's most biodiverse ecosystems.</p>
                    <div style="margin-top: 1rem;">
                        <button class="btn btn--primary" onclick="closeModal()">Close</button>
                    </div>
                </div>
            `
        },
        waterfall: {
            title: 'Majestic Waterfall',
            content: `
                <div class="modal-attraction-content">
                    <img src="assets/images/attraction-6.jpg" alt="Waterfall" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p><strong>Location:</strong> Iguazu Falls, Argentina/Brazil</p>
                    <p><strong>Best Time to Visit:</strong> March to May, September to November</p>
                    <p><strong>Duration:</strong> 2-4 hours</p>
                    <p><strong>Difficulty:</strong> Easy to Moderate</p>
                    <p>Witness the power and beauty of cascading waterfalls in pristine natural settings. One of the most spectacular natural wonders of the world.</p>
                    <div style="margin-top: 1rem;">
                        <button class="btn btn--primary" onclick="closeModal()">Close</button>
                    </div>
                </div>
            `
        }
    };
    
    return attractionData[attraction] || null;
}

function initializeRegistrationPage() {
    console.log('Initializing registration page features');
    
    // Add any registration page specific functionality here
}

// ===== ACCESSIBILITY FEATURES =====
function initializeAccessibility() {
    // Skip to main content link
    addSkipLink();
    
    // Keyboard navigation
    initializeKeyboardNavigation();
    
    // ARIA labels and roles
    initializeARIA();
    
    // High contrast mode detection
    initializeHighContrast();
}

function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

function initializeKeyboardNavigation() {
    // Tab navigation enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

function initializeARIA() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach(button => {
        if (!button.textContent.trim()) {
            button.setAttribute('aria-label', 'Button');
        }
    });
    
    // Add ARIA expanded to collapsible elements
    const collapsibleTriggers = document.querySelectorAll('[data-collapsible-trigger]');
    collapsibleTriggers.forEach(trigger => {
        trigger.setAttribute('aria-expanded', 'false');
    });
}

function initializeHighContrast() {
    // Check for high contrast mode preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
}

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

function getFieldLabel(fieldName) {
    const labels = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone Number',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        birthDate: 'Date of Birth',
        country: 'Country',
        terms: 'Terms and Conditions'
    };
    return labels[fieldName] || fieldName;
}

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In a production environment, you might want to send this to an error tracking service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // In a production environment, you might want to send this to an error tracking service
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.TravelParadise = {
    openModal,
    closeModal,
    showMessage,
    validateField,
    isValidEmail,
    isValidPhone,
    isValidDate
};

console.log('Travel Paradise - Main.js loaded successfully!');
