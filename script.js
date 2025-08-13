// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Sticky Header
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Active menu item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter gallery items
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const totalSlides = testimonials.length;
    
    // Initially show only the first testimonial
    showSlide(currentSlide);
    
    function showSlide(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        });
        
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        });
    }

    // Auto-rotate testimonials
    if (totalSlides > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }, 8000);
    }

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add animations on scroll
    const animateElements = document.querySelectorAll('.about-content, .mission-vision, .award, .method-principles, .learning-area, .gallery-item, .contact-content');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check

    // Contact form handling with Google Apps Script integration
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || '',
                message: formData.get('message')
            };
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const messageDiv = contactForm.querySelector('.form-message');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            messageDiv.style.display = 'none';
            
            try {
                const CONTACT_FORM_URL = CONFIG.CONTACT_FORM_URL;
                
                const response = await fetch(CONTACT_FORM_URL, {
                    method: 'POST',
                    body: new URLSearchParams(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    messageDiv.innerHTML = `
                        <div class="success-message">
                            <div class="icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>Thank You, ${data.name}!</h3>
                            <p>${result.message}</p>
                        </div>
                    `;
                    contactForm.reset();
                } else {
                    messageDiv.innerHTML = `
                        <div class="error-message">
                            <div class="icon">
                                <i class="fas fa-exclamation-circle"></i>
                            </div>
                            <p>${result.message}</p>
                        </div>
                    `;
                }
                
            } catch (error) {
                console.error('Error:', error);
                messageDiv.innerHTML = `
                    <div class="error-message">
                        <div class="icon">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <p>Network error. Please check your connection and try again.</p>
                    </div>
                `;
            } finally {
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                messageDiv.style.display = 'block';
            }
        });
    }

    // Add smooth hover effect to all buttons
    const allButtons = document.querySelectorAll('.btn, .filter-btn, .nav-menu a');
    
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add styles for scroll-top button and form messages
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--accent);
            color: var(--white);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transform: translateY(100px);
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-top-btn:hover {
            background-color: var(--accent-dark);
            transform: translateY(-5px);
        }
        
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .form-message {
            padding: 1rem;
            border-radius: 5px;
            text-align: center;
        }
        
        .success-message {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .error-message {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .success-message .icon,
        .error-message .icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .success-message .icon i {
            color: #28a745;
        }
        
        .error-message .icon i {
            color: #dc3545;
        }
        
        .btn-loading {
            color: #666;
        }
        
        button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
});
