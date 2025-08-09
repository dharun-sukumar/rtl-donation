// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Hero Slider (for index2.html)
    const slides = document.querySelectorAll('.slide');
    const sliderBtns = document.querySelectorAll('.slider-btn');
    let currentSlide = 0;
    
    if (slides.length > 0 && sliderBtns.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            sliderBtns.forEach(btn => btn.classList.remove('active'));
            
            slides[index].classList.add('active');
            sliderBtns[index].classList.add('active');
        }
        
        sliderBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 20);
    }
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate counters when they come into view
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .stats, .counter-item').forEach(el => {
        observer.observe(el);
    });
    
    // Donation Form Functionality
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        const amountBtns = document.querySelectorAll('.amount-btn');
        const customAmountInput = document.getElementById('customAmount');
        const paymentMethods = document.querySelectorAll('.payment-method');
        const cardInfo = document.getElementById('cardInfo');
        
        // Amount button selection
        amountBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                amountBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                customAmountInput.value = btn.getAttribute('data-amount');
            });
        });
        
        // Custom amount input
        customAmountInput?.addEventListener('input', () => {
            amountBtns.forEach(btn => btn.classList.remove('active'));
        });
        
        // Payment method selection
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');
                
                const radio = method.querySelector('input[type="radio"]');
                radio.checked = true;
                
                // Show/hide card info based on payment method
                if (cardInfo) {
                    cardInfo.style.display = radio.value === 'card' ? 'block' : 'none';
                }
            });
        });
        
        // Form submission
        donationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(donationForm);
            const amount = customAmountInput.value || document.querySelector('.amount-btn.active')?.getAttribute('data-amount');
            
            if (!amount || amount < 5) {
                alert('Please enter a donation amount of at least $5.');
                return;
            }
            
            // Simulate donation processing
            const submitBtn = donationForm.querySelector('.donate-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you for your donation of $${amount}! Your contribution will make a real difference.`);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                donationForm.reset();
                amountBtns.forEach(btn => btn.classList.remove('active'));
            }, 2000);
        });
    }
    
    // Contact Form Functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Login Form Functionality
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                alert('Please fill in all fields.');
                return;
            }
            
            const submitBtn = loginForm.querySelector('.login-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Simulate login check
                if (email === 'admin@hopefoundation.org') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'user-dashboard.html';
                }
            }, 1500);
        });
    }
    
    // Registration Form Functionality
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            const submitBtn = registerForm.querySelector('.register-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Account created successfully! Please check your email for verification.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                registerForm.reset();
            }, 2000);
        });
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
    
    // Form validation helpers
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^\+?[\d\s\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
    
    // Add input formatting for card number
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Add input formatting for expiry date
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Add input formatting for CVV
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }
    
    // Dashboard functionality
    if (document.querySelector('.dashboard')) {
        // Sample chart initialization (you can replace with actual chart library)
        const chartElements = document.querySelectorAll('.chart-placeholder');
        chartElements.forEach(chart => {
            chart.innerHTML = '<div style="width: 100%; height: 200px; background: linear-gradient(45deg, #10B981, #3B82F6); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">Chart Visualization</div>';
        });
    }
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: var(--shadow-lg);
        transition: var(--transition);
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hero Scroll Indicator
    const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (heroScrollIndicator) {
        heroScrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.stats') || document.querySelector('main > section:nth-child(2)');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Add parallax effect to hero shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.hero-shapes .shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
});