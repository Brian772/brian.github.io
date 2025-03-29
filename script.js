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

// Fungsi callback dari reCAPTCHA
function enableSubmitBtn() {
    document.getElementById('submit-btn').disabled = false;
}

function disableSubmitBtn() {
    document.getElementById('submit-btn').disabled = true;
}

// Validasi sebelum submit
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const response = grecaptcha.getResponse();
    if(response.length === 0) {
        alert("Silakan verifikasi reCAPTCHA terlebih dahulu!");
        return;
    }
    
    // Lanjutkan proses pengiriman form
    submitForm(response);
});

// Fungsi pengiriman form
async function submitForm(captchaResponse) {
    const formData = new FormData(document.getElementById('contact-form'));
    formData.append('g-recaptcha-response', captchaResponse);
    
    try {
        const response = await fetch('https://formspree.io/f/xwplnkow', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if(response.ok) {
            alert('Pesan terkirim!');
            grecaptcha.reset(); // Reset reCAPTCHA
            document.getElementById('contact-form').reset();
        } else {
            throw new Error('Gagal mengirim pesan');
        }
    } catch(error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan, silakan coba lagi.');
    } finally {
        disableSubmitBtn();
    }
}

// Fungsi untuk menampilkan popup
function showCvPopup() {
    const popup = document.getElementById('cvPopup');
    popup.style.display = 'flex';
    
    // Tambahkan event listener untuk close
    popup.querySelector('.close-btn').onclick = () => hideCvPopup();
    popup.onclick = (e) => {
        if(e.target === popup) hideCvPopup();
    }

    // Background click handler
    popup.addEventListener('click', (e) => {
        if(e.target === popup) hideCvPopup();
    });
    
    // Tambahkan keyboard handler
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') hideCvPopup();
    });
}

// Fungsi untuk menyembunyikan popup
function hideCvPopup() {
    const popup = document.getElementById('cvPopup');
    popup.style.display = 'none';
    
    // Hapus event listeners
    document.removeEventListener('keydown', hideCvPopup);
}

// Update tombol download CV
document.querySelector('.download-cv').addEventListener('click', (e) => {
    e.preventDefault();
    showCvPopup();
});

document.body.addEventListener('click', (e) => {
    if(e.target.classList.contains('close-btn')) {
        hideCvPopup();
    }
});
