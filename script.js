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
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('notification');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, subject });
        
        // Show notification
        notification.textContent = 'Thank you for your message! We will contact you soon.';
        notification.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Hide notification after 5 seconds
        setTimeout(function() {
            notification.classList.remove('show');
        }, 5000);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            }
        });
    });
    
    // Initialize with mobile menu hidden on small screens
    if (window.innerWidth <= 768) {
        nav.style.display = 'none';
    }
});
