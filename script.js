// Script untuk toggle menu mobile
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Smooth scroll untuk semua link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Script untuk efek scroll
window.addEventListener('scroll', () => {
const nav = document.querySelector('.navbar');
const scrollY = window.scrollY;

if(scrollY > 100) {
    nav.classList.add('scrolled');
    setTimeout(() => nav.classList.add('scrolled-active'), 50);
} else {
    nav.classList.remove('scrolled', 'scrolled-active');
}
});

// Script untuk animasi menu mobile
function toggleMenu() {
const navLinks = document.querySelector('.nav-links');
const toggle = document.querySelector('.menu-toggle');
navLinks.classList.toggle('active');
toggle.classList.toggle('active');
}

// Lazy loading implementation
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
                    lazyImage.classList.add("lazy-loaded");
                    lazyImage.parentElement.classList.add("loaded");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback untuk browser lama
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
        });
    }
});

// Contact implementation
const form = document.getElementById('contact-form');
const status = document.querySelector('.form-status');
const btnText = document.querySelector('.btn-text');
const loading = document.querySelector('.loading-dots');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    btnText.style.opacity = '0';
    loading.style.display = 'block';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            form.reset();
            showStatus('Message sent successfully!', 'success');
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Failed to send message');
        }
    } catch (error) {
        showStatus(error.message || 'Something went wrong!', 'error');
    } finally {
        btnText.style.opacity = '1';
        loading.style.display = 'none';
    }
});

function showStatus(message, type) {
    status.textContent = message;
    status.style.color = type === 'success' ? '#4CAF50' : '#f44336';
    status.style.display = 'block';
    
    setTimeout(() => {
        status.style.display = 'none';
    }, 5000);
}
