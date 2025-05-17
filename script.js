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
    
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });
    
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 8000);

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

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            this.innerHTML = `
                <div class="success-message">
                    <div class="icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Thank You, ${name}!</h3>
                    <p>Your message has been sent successfully. We'll get back to you soon.</p>
                    <button class="btn btn-primary" onclick="location.reload()">Send Another Message</button>
                </div>
            `;
        });
    }

    // Add smooth hover effect to all buttons
    const allButtons = document.querySelectorAll('.btn, .filter-btn, .nav-menu a');
    
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add styles for scroll-top button
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
        
        .success-message {
            text-align: center;
            padding: 2rem;
        }
        
        .success-message .icon {
            font-size: 3rem;
            color: var(--secondary-1);
            margin-bottom: 1rem;
        }
    `;
    document.head.appendChild(style);
});