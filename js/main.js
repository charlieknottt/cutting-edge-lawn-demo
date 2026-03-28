// Cutting Edge Lawn Service - Advanced Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initScrollProgress();
    initNavigation();
    initParticles();
    initScrollEffects();
    initCounterAnimation();
    initFormHandling();
    initVideoModal();
    initTestimonialSlider();
    initParallaxEffects();
    initMagneticButtons();
    initSmoothScroll();
});

// ==================== PRELOADER ====================
function initPreloader() {
    const preloader = document.querySelector('.preloader');

    // Add preloader to body if not exists
    if (!preloader) {
        // Detect if we're in a subdirectory (pages folder)
        const isSubPage = window.location.pathname.includes('/pages/');
        const logoPath = isSubPage ? '../images/logo.png' : 'images/logo.png';

        const preloaderHTML = `
            <div class="preloader">
                <img src="${logoPath}" alt="Loading..." class="preloader-logo">
                <div class="preloader-bar"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
    }

    window.addEventListener('load', () => {
        const loader = document.querySelector('.preloader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 500);
        }
    });
}

// ==================== SCROLL PROGRESS ====================
function initScrollProgress() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navDropdowns = document.querySelectorAll('.nav-dropdown');

    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Mobile dropdown handling
    navDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ==================== PARTICLES ====================
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal();

    // Add reveal classes to elements
    const servicecards = document.querySelectorAll('.service-card');
    servicecards.forEach((card, index) => {
        card.classList.add('reveal');
        card.classList.add('stagger-' + ((index % 5) + 1));
    });

    const aircraftCards = document.querySelectorAll('.aircraft-card');
    aircraftCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.classList.add('stagger-' + ((index % 3) + 1));
    });

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.classList.add('stagger-' + ((index % 3) + 1));
    });
}

// ==================== COUNTER ANIMATION ====================
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateCounters() {
        if (animated) return;

        stats.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animated = true;
                const target = parseInt(stat.getAttribute('data-target')) || parseInt(stat.textContent) || 0;
                const suffix = stat.getAttribute('data-suffix') || '';
                const duration = 2500;
                const start = 0;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(easeOutQuart * target);

                    stat.textContent = current.toLocaleString() + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target.toLocaleString() + suffix;
                    }
                }

                requestAnimationFrame(updateCounter);
            }
        });
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();
}

// ==================== FORM HANDLING ====================
function initFormHandling() {
    const quoteForm = document.getElementById('quote-form');

    if (quoteForm) {
        // Animated form fields
        const formInputs = quoteForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });

        // Trip type change handler
        const tripType = document.getElementById('trip-type');
        const returnDateGroup = document.getElementById('return-date-group');

        if (tripType && returnDateGroup) {
            tripType.addEventListener('change', function() {
                if (this.value === 'one-way') {
                    returnDateGroup.style.opacity = '0.5';
                    returnDateGroup.querySelector('input').required = false;
                } else {
                    returnDateGroup.style.opacity = '1';
                    returnDateGroup.querySelector('input').required = true;
                }
            });
        }

        // Set minimum date to today
        const dateInputs = document.querySelectorAll('input[type="date"]');
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => input.setAttribute('min', today));

        // Form submission
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!validateForm(this)) return;

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Animated loading state
            submitBtn.innerHTML = `
                <svg class="spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
                </svg>
                Processing...
            `;
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Add spinning animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .spin { animation: spin 1s linear infinite; }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                showNotification('Thank you! Your quote request has been submitted. We\'ll contact you within 24 hours.', 'success');
                quoteForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                console.log('Quote Request Data:', data);
            }, 2000);
        });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!validateForm(this)) return;

            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'This field is required');
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            showFieldError(field, 'Please enter a valid email');
        }
    });

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#e74c3c';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.5rem;';
    field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            ${type === 'success' ? '✓' : 'ℹ'}
        </div>
        <span>${message}</span>
        <button class="notification-close">×</button>
    `;

    const bgColor = type === 'success' ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : 'linear-gradient(135deg, #3498db, #2980b9)';

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1.25rem 1.5rem;
        background: ${bgColor};
        color: white;
        border-radius: 12px;
        box-shadow: 0 15px 50px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(120%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(120%); opacity: 0; }
        }
        .notification-close {
            background: rgba(255,255,255,0.2);
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s;
        }
        .notification-close:hover { background: rgba(255,255,255,0.3); }
        .notification-icon {
            width: 30px;
            height: 30px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);

    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ==================== VIDEO MODAL ====================
function initVideoModal() {
    // Add click handlers to play buttons
    document.addEventListener('click', function(e) {
        const playBtn = e.target.closest('.aircraft-play');
        if (playBtn) {
            const videoSrc = playBtn.getAttribute('data-video') || 'images/demo-video.mp4';
            openVideoModal(videoSrc);
        }
    });
}

function openVideoModal(videoSrc) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <button class="video-modal-close">×</button>
            <video controls autoplay>
                <source src="${videoSrc}" type="video/mp4">
                Your browser does not support video playback.
            </video>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.video-modal-close');
    closeBtn.addEventListener('click', closeVideoModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeVideoModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeVideoModal();
    });
}

function closeVideoModal() {
    const modal = document.querySelector('.video-modal');
    if (modal) {
        modal.style.animation = 'modal-out 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// ==================== TESTIMONIAL SLIDER ====================
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    const testimonials = slider.querySelectorAll('.testimonial');
    if (testimonials.length <= 1) return;

    let currentIndex = 0;

    // Create navigation dots
    const nav = document.createElement('div');
    nav.className = 'testimonial-nav';
    testimonials.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => showTestimonial(i));
        nav.appendChild(dot);
    });
    slider.appendChild(nav);

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.style.display = i === index ? 'block' : 'none';
            t.style.animation = i === index ? 'fadeIn 0.6s ease' : '';
        });

        nav.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    // Auto-rotate
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 6000);

    // Add fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// ==================== PARALLAX EFFECTS ====================
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroContent = hero.querySelector('.hero-content');
    const floatingElements = hero.querySelectorAll('.hero-float');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            // Parallax on hero content
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
                heroContent.style.opacity = 1 - (scrolled / 600);
            }

            // Parallax on floating elements
            floatingElements.forEach((el, i) => {
                const speed = 0.1 + (i * 0.05);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });

    // Mouse parallax on hero
    hero.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        floatingElements.forEach((el, i) => {
            const depth = 1 + (i * 0.5);
            el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        });
    });
}

// ==================== MAGNETIC BUTTONS ====================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==================== UTILITY: Throttle ====================
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

// ==================== LAZY LOAD IMAGES ====================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);
