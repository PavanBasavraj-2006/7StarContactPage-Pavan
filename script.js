document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Handle window resize to ensure proper menu display
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });
    
    // Form validation functions
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[\d\s-+()]*$/.test(phone);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        input.classList.add('error');
        input.classList.remove('valid');
        errorElement.style.display = 'block';
        errorElement.textContent = message;
    }

    function showSuccess(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        input.classList.remove('error');
        input.classList.add('valid');
        errorElement.style.display = 'none';
    }

    function showNotification(message, type) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Enhanced form submission with loading spinner
    const contactForm = document.getElementById('contactForm');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            showSuccess(name);
        }
        
        // Validate email
        const email = document.getElementById('email');
        if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(email);
        }
        
        // Validate phone (optional)
        const phone = document.getElementById('phone');
        if (phone.value && !validatePhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else if (phone.value) {
            showSuccess(phone);
        }
        
        if (isValid) {
            loadingSpinner.classList.add('show');
            
            // Simulate form submission delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            loadingSpinner.classList.remove('show');
            showNotification('Thank you for your message! We will contact you soon.', 'success');
            contactForm.reset();
            
            // Reset validation styles
            document.querySelectorAll('input, textarea').forEach(input => {
                input.classList.remove('valid', 'error');
            });
        } else {
            showNotification('Please correct the errors in the form.', 'error');
        }
    });

    // Real-time validation
    document.querySelectorAll('input[data-validate="true"]').forEach(input => {
        input.addEventListener('blur', function() {
            switch(this.type) {
                case 'email':
                    if (!validateEmail(this.value)) {
                        showError(this, 'Please enter a valid email address');
                    } else {
                        showSuccess(this);
                    }
                    break;
                case 'tel':
                    if (this.value && !validatePhone(this.value)) {
                        showError(this, 'Please enter a valid phone number');
                    } else {
                        showSuccess(this);
                    }
                    break;
                default:
                    if (this.value.trim() === '') {
                        showError(this, `${this.name.charAt(0).toUpperCase() + this.name.slice(1)} is required`);
                    } else {
                        showSuccess(this);
                    }
            }
        });
    });

    // Add smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize info box animations
    document.querySelectorAll('.info-box').forEach((box, index) => {
        box.style.animationDelay = `${index * 0.2}s`;
    });

    // Initialize with mobile menu hidden on small screens
    if (window.innerWidth <= 768) {
        nav.style.display = 'none';
    }
});
