// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Modal Functionality
    const modal = document.getElementById('inquiryModal');
    const closeModal = document.querySelector('.close-modal');
    const inquiryButtons = document.querySelectorAll('.inquiry-btn');
    const productNameInput = document.getElementById('product-name');
    
    if (inquiryButtons.length > 0) {
        inquiryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.getAttribute('data-product');
                if (productNameInput) {
                    productNameInput.value = productName;
                }
                modal.style.display = 'block';
            });
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    const inquiryForm = document.getElementById('inquiry-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                date: new Date().toISOString().split('T')[0],
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                productInterest: this.querySelector('select').value,
                message: this.querySelector('textarea').value,
                status: 'New'
            };
            
            // Store in localStorage
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            showNotification('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                date: new Date().toISOString().split('T')[0],
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                product: document.getElementById('product-name').value,
                requirements: this.querySelector('textarea').value,
                status: 'New'
            };
            
            // Store in localStorage
            const inquiries = JSON.parse(localStorage.getItem('productInquiries') || '[]');
            inquiries.push(formData);
            localStorage.setItem('productInquiries', JSON.stringify(inquiries));
            
            showNotification('Thank you for your inquiry! Our team will contact you shortly.');
            this.reset();
            modal.style.display = 'none';
        });
    }

    // Product Catalog Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                productCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Pagination for Product Catalog
    const pageButtons = document.querySelectorAll('.page-btn');
    
    if (pageButtons.length > 0) {
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                pageButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                // Here you would typically load the corresponding page of products
                // For demo purposes, we're just changing the active state
            });
        });
    }

    // Review Form Submission
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('reviewer-name').value;
            const title = document.getElementById('reviewer-title').value;
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const review = document.getElementById('review-text').value;
            
            // Store review data
            const reviewData = {
                date: new Date().toISOString().split('T')[0],
                name: name,
                title: title,
                rating: rating,
                review: review,
                status: 'Pending'
            };
            
            // Store in localStorage
            const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
            reviews.push(reviewData);
            localStorage.setItem('customerReviews', JSON.stringify(reviews));
            
            // Create new testimonial element
            const testimonial = document.createElement('div');
            testimonial.className = 'testimonial';
            testimonial.setAttribute('data-aos', 'fade-up');
            
            // Create testimonial content
            testimonial.innerHTML = `
                <div class="testimonial-content">
                    <p>"${review}"</p>
                    <div class="client-info">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjI1IiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+${name.charAt(0)}${name.split(' ')[1] ? name.split(' ')[1].charAt(0) : ''}</text></svg>">
                        <div>
                            <h4>${name}</h4>
                            <p>${title}</p>
                            <div class="rating-display">
                                ${'<i class="fas fa-star"></i>'.repeat(rating)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add new testimonial to the slider
            const testimonialSlider = document.querySelector('.testimonial-slider');
            testimonialSlider.insertBefore(testimonial, testimonialSlider.firstChild);
            
            // Show success message
            showNotification('Thank you for your review! It will be visible after approval.');
            
            // Reset form
            reviewForm.reset();
            
            // Reinitialize AOS for the new element
            AOS.refresh();
        });
    }

    // Create floating elements
    // createFloatingElements();
});

// Notification System
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification styles if not already in CSS
if (!document.querySelector('style#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            background: #2ecc71;
            color: white;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 9999;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.error {
            background: #e74c3c;
        }
        
        .notification.warning {
            background: #f39c12;
        }
    `;
    document.head.appendChild(style);
}

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
        
        if (isVisible) {
            element.classList.add('aos-animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Video Background Optimization
const video = document.querySelector('.video-container video');
if (video) {
    // Pause video on mobile devices to save bandwidth
    if (window.innerWidth <= 768) {
        video.pause();
    }

    // Optimize video playback
    video.addEventListener('loadedmetadata', () => {
        video.playbackRate = 0.75; // Slightly slower playback for better performance
    });
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Add floating leaves animation
function createFloatingLeaves() {
    const leaves = ['🌱', '🌿', '🍃', '🌾'];
    const container = document.body;
    
    for (let i = 0; i < 10; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'floating-leaf';
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = (Math.random() * 3 + 2) + 's';
        leaf.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(leaf);
    }
}

// Add growing animation to product cards
function addGrowingAnimation() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// Add loading animation to forms
function addFormLoadingAnimation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                }, 2000);
            }
        });
    });
}

// Add parallax effect to hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}

// Add smooth reveal animation for sections
function addRevealAnimation() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    createFloatingLeaves();
    addGrowingAnimation();
    addFormLoadingAnimation();
    addParallaxEffect();
    addRevealAnimation();
}); 