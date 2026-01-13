/* MKS AUTOMOBILE - Moto Kinetic Solution
   Custom JavaScript
   ================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Auto-close mobile menu when clicking nav links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => {
        navLink.addEventListener('click', function () {
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');

            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .review-card, .contact-card').forEach(el => {
        observer.observe(el);
    });

    // Form Submission - WhatsApp Redirect
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const bikeModel = document.getElementById('bikeModel').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Create WhatsApp message
            const whatsappMessage = encodeURIComponent(
                `Hello MKS Automobile,\n\n` +
                `I would like to inquire about spare parts.\n\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Bike Model: ${bikeModel}\n` +
                `Inquiry Type: ${service}\n` +
                `Details: ${message || 'None'}\n\n` +
                `Please provide availability and pricing.`
            );

            const whatsappURL = `https://wa.me/918962489237?text=${whatsappMessage}`;
            window.open(whatsappURL, '_blank');

            // Show success message and reset form
            alert('Redirecting to WhatsApp. Please complete your inquiry there.');
            this.reset();
        });
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-md)';
        }
    });

    // Active navigation link highlight
    window.addEventListener('scroll', function () {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
                link.style.color = 'var(--gold-accent)';
            } else {
                link.style.color = 'rgba(255, 255, 255, 0.85)';
            }
        });
    });

});
