/* ==========================================
   MAIN JAVASCRIPT - Al-Jawahri Real Estate
   ========================================== */

// ===== 1. SMOOTH SCROLLING =====
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu if open
        const navToggle = document.getElementById('navToggle');
        if (navToggle && navToggle.checked) {
          navToggle.checked = false;
          document.body.style.overflow = 'auto';
        }
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const ctaButton = document.querySelector('.cta-button');

  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      const targetSelector = ctaButton.getAttribute('data-scroll-target');
      if (targetSelector) {
        const target = document.querySelector(targetSelector);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
});

// ===== 2. HAMBURGER MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  
  if (navToggle) {
    navToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // Close menu on link click
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navToggle) {
        navToggle.checked = false;
        document.body.style.overflow = 'auto';
      }
    });
  });
});

// ===== 3. INTERSECTION OBSERVER - FADE-IN REVEAL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Don't unobserve — keep it visible once revealed
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => observer.observe(el));
});

// ===== 4. COUNTER ANIMATION =====
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

function animateCounters() {
  const counters = document.querySelectorAll('.counter-number');
  const duration = 1500; // 1.5 seconds
  const startTime = performance.now();
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      
      counter.textContent = current + (counter.dataset.suffix || '');
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) {
    counterObserver.observe(statsStrip);
  }
});

// ===== 5. LIGHTBOX FOR BLUEPRINTS =====
let currentLightboxIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  const blueprintThumbs = document.querySelectorAll('.blueprint-thumb');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  
  if (!lightbox || !blueprintThumbs.length) return;
  
  blueprintThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      currentLightboxIndex = index;
      const imageSrc = thumb.getAttribute('data-lightbox');
      lightboxImage.src = imageSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', closeLightbox);
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});

// ===== 6. ACTIVE NAV LINK HIGHLIGHTING =====
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
});

// ===== 7. FORM VALIDATION (OPTIONAL) =====
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // Prevent default if no backend
      // You can replace this with actual form submission logic
      e.preventDefault();
      
      // Optional: Show success message
      alert('شكراً لك! سنتواصل معك قريباً');
      contactForm.reset();
    });
  }
});

// ===== 8. PARALLAX / KEN-BURNS EFFECT =====
document.addEventListener('DOMContentLoaded', () => {
  const heroImage = document.querySelector('.hero-image');
  
  if (heroImage) {
    // Animation is handled via CSS @keyframes
    // This is just a placeholder for potential JS interactions
  }
});

// ===== 9. LIVE CALCULATOR =====
document.addEventListener('DOMContentLoaded', () => {
  const calculatorInputs = document.querySelectorAll('.pricing-calculator input[type="number"]');
  const resultValues = document.querySelectorAll('.pricing-calculator .result-value');

  if (calculatorInputs.length < 3 || resultValues.length < 2) return;

  const [priceInput, downPaymentInput, installmentsInput] = calculatorInputs;
  const [downPaymentResult, monthlyInstallmentResult] = resultValues;

  const formatAmount = (amount) => {
    const value = Number.isFinite(amount) ? amount : 0;
    return value.toLocaleString('ar-IQ') + ' د.ع';
  };

  function calculatePayments() {
    const price = parseFloat(priceInput.value) || 0;
    const downPct = parseFloat(downPaymentInput.value) || 0;
    const months = parseFloat(installmentsInput.value) || 0;

    if (price === 0) {
      downPaymentResult.textContent = '—';
      monthlyInstallmentResult.textContent = '—';
      return;
    }

    const downPayment = price * (downPct / 100);
    const monthlyInstallment = months > 0 ? (price - downPayment) / months : null;

    downPaymentResult.textContent = formatAmount(downPayment);
    monthlyInstallmentResult.textContent = months > 0 ? formatAmount(monthlyInstallment) : '—';
  }

  calculatorInputs.forEach(input => input.addEventListener('input', calculatePayments));
  calculatePayments();
});
