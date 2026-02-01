// Restaurant Nusantara - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Menu Category Filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide menu cards based on category
            menuCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || category === cardCategory) {
                    card.style.display = 'block';
                    // Add fade in animation
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Order Button Functionality
    const orderButtons = document.querySelectorAll('.btn-order');
    const orderModal = document.getElementById('orderModal');
    const orderItemName = document.getElementById('orderItemName');
    const confirmOrderBtn = document.getElementById('confirmOrder');
    const modalClose = document.querySelector('.modal-close');
    const modalCancel = document.querySelector('.modal-cancel');
    
    let currentMenuItem = '';
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentMenuItem = this.getAttribute('data-item');
            orderItemName.textContent = currentMenuItem;
            orderModal.classList.add('active');
            
            // Set WhatsApp link with the order item
            const whatsappText = `Halo Restaurant Nusantara, saya ingin memesan ${currentMenuItem}`;
            const encodedText = encodeURIComponent(whatsappText);
            confirmOrderBtn.href = `https://wa.me/6285824390625?text=${encodedText}`;
        });
    });
    
    // Close modal functions
    modalClose.addEventListener('click', () => {
        orderModal.classList.remove('active');
    });
    
    modalCancel.addEventListener('click', () => {
        orderModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.classList.remove('active');
        }
    });
    
    // Sticky Navigation Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a WhatsApp link or external link
            if (href.includes('wa.me') || href.includes('http')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add CSS for fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize with fade in effect for menu items
    menuCards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s both`;
    });
    
    // Feature cards animation on scroll
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
    
    // Observe feature cards, testimonials, etc.
    document.querySelectorAll('.feature-card, .testimonial-card, .info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Auto-hide WhatsApp button on scroll down, show on scroll up
    let lastScrollTop = 0;
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            whatsappBtn.style.transform = 'translateY(100px)';
        } else {
            // Scrolling up
            whatsappBtn.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add hover effect for menu cards on touch devices
    if ('ontouchstart' in window) {
        document.querySelectorAll('.menu-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('hover');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('hover');
                }, 300);
            });
        });
    }
    
    // Form validation for future reservation form
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    // Utility function to format phone number
    const formatPhoneNumber = (phone) => {
        return phone.replace(/\D/g, '');
    };
    
    // Log page view for analytics (demo purposes)
    console.log('Restaurant Nusantara website loaded successfully');
    console.log('Features: Mobile-first design, WhatsApp integration, Menu filtering');
});