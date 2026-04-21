/**
 * STUDENT DIGITAL PORTFOLIO - SCRIPT.JS
 * Handles: Mobile menu, Dark/Light mode, Typing animation,
 * Gallery lightbox, Progress bars animation, smooth scroll, contact form
 */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // ======================= 1. MOBILE MENU TOGGLE =======================
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navbar = document.getElementById('navbar');
  
  if (mobileBtn && navbar) {
    mobileBtn.addEventListener('click', () => {
      navbar.classList.toggle('active');
      // Change icon when menu open/close
      const icon = mobileBtn.querySelector('i');
      if (navbar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }
  
  // ======================= 2. DARK / LIGHT MODE TOGGLE =======================
  const themeToggle = document.getElementById('themeToggleBtn');
  // Check for saved preference in localStorage
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    updateThemeIcon(true);
  } else if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark');
    updateThemeIcon(false);
  } else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
      updateThemeIcon(true);
    }
  }
  
  function updateThemeIcon(isDark) {
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }
  
  // ======================= 3. TYPING ANIMATION (Homepage) =======================
  const typingElement = document.getElementById('typingElement');
  if (typingElement) {
    const phrases = [
      "CS Student | AI Enthusiast",
      "Full-Stack Developer in progress",
      "Problem Solver & Innovator",
      "✨ Building the future ✨"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function typeEffect() {
      const fullText = phrases[phraseIndex];
      if (isDeleting) {
        currentText = fullText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = fullText.substring(0, charIndex + 1);
        charIndex++;
      }
      typingElement.textContent = currentText;
      
      if (!isDeleting && charIndex === fullText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 300);
        return;
      }
      const speed = isDeleting ? 50 : 120;
      setTimeout(typeEffect, speed);
    }
    typeEffect();
  }
  
  // ======================= 4. SMOOTH SCROLLING for anchor links =======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || targetId === "") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Update URL without jumping (optional)
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // ======================= 5. PROGRESS BARS ANIMATION ON VIEW =======================
  const progressBars = document.querySelectorAll('.progress');
  const skillsSection = document.querySelector('#about');
  
  function animateProgressBars() {
    progressBars.forEach(bar => {
      const width = bar.style.width;
      if (width && !bar.dataset.animated) {
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
        bar.dataset.animated = 'true';
      } else if (!bar.dataset.animated) {
        const targetWidth = bar.style.width;
        if (targetWidth) {
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 150);
          bar.dataset.animated = 'true';
        }
      }
    });
  }
  
  // Intersection Observer for progress bars
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgressBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  if (skillsSection) {
    observer.observe(skillsSection);
  } else {
    // fallback: just run once after a short delay
    setTimeout(animateProgressBars, 500);
  }
  
  // ======================= 6. GALLERY & LIGHTBOX (with placeholder images) =======================
  const galleryGrid = document.getElementById('galleryGrid');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeLightbox = document.querySelector('.close-lightbox');
  
  // Sample gallery images (certificates + event photos - replace later)
  const galleryImages = [
    { src: "https://placehold.co/600x400/3b82f6/white?text=Hackathon+2024", alt: "Hackathon Award Ceremony" },
    { src: "https://placehold.co/600x400/10b981/white?text=AI+Conference", alt: "AI Conference 2024" },
    { src: "https://placehold.co/600x400/ef4444/white?text=Certificate+of+Excellence", alt: "Certificate of Excellence" },
    { src: "https://placehold.co/600x400/f59e0b/white?text=Workshop+Event", alt: "Tech Workshop" },
    { src: "https://placehold.co/600x400/8b5cf6/white?text=Project+Showcase", alt: "Project Showcase" },
    { src: "https://placehold.co/600x400/ec4899/white?text=Networking+Event", alt: "Networking Session" },
    { src: "https://placehold.co/600x400/06b6d4/white?text=Certification+Day", alt: "Certification Day" },
    { src: "https://placehold.co/600x400/84cc16/white?text=Team+Photo", alt: "Team Collaboration" }
  ];
  
  function buildGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    galleryImages.forEach(img => {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      const image = document.createElement('img');
      image.src = img.src;
      image.alt = img.alt;
      image.loading = 'lazy';
      div.appendChild(image);
      div.addEventListener('click', () => {
        if (lightboxModal && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightboxModal.style.display = 'flex';
        }
      });
      galleryGrid.appendChild(div);
    });
  }
  buildGallery();
  
  // Close lightbox
  if (closeLightbox && lightboxModal) {
    closeLightbox.addEventListener('click', () => {
      lightboxModal.style.display = 'none';
    });
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.style.display = 'none';
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.style.display === 'flex') {
        lightboxModal.style.display = 'none';
      }
    });
  }
  
  // ======================= 7. CONTACT FORM (simulate submission) =======================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = contactForm.querySelector('input[placeholder="Your Name"]');
      const emailInput = contactForm.querySelector('input[placeholder="Your Email"]');
      const messageTA = contactForm.querySelector('textarea');
      
      if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageTA.value.trim() === '') {
        if (formFeedback) {
          formFeedback.textContent = '⚠️ Please fill all fields.';
          formFeedback.style.color = '#ef4444';
        }
        return;
      }
      if (!emailInput.value.includes('@')) {
        if (formFeedback) {
          formFeedback.textContent = '⚠️ Enter a valid email address.';
          formFeedback.style.color = '#ef4444';
        }
        return;
      }
      // Success simulation
      if (formFeedback) {
        formFeedback.textContent = '✅ Message sent! (Demo) I will get back to you soon.';
        formFeedback.style.color = '#10b981';
      }
      contactForm.reset();
      setTimeout(() => {
        if (formFeedback) formFeedback.textContent = '';
      }, 4000);
    });
  }
  
  // ======================= 8. ADDITIONAL: Button "View Portfolio" smooth scroll =======================
  const viewPortfolioBtn = document.getElementById('viewPortfolioBtn');
  if (viewPortfolioBtn) {
    viewPortfolioBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // ======================= 9. ANIMATE SKILL BARS ON WINDOW LOAD if already visible =======================
  // If the about section is already in viewport on load, trigger bars
  if (skillsSection) {
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      animateProgressBars();
    }
  }
  
  // ======================= 10. Simple fade-in on scroll (extra polish) =======================
  const fadeElements = document.querySelectorAll('.achievement-card, .project-card, .cert-card, .gallery-item');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.5s ease';
    fadeObserver.observe(el);
  });
  
  // ensure that dynamic gallery items also get fade effect
  const observerGallery = new MutationObserver(() => {
    const newItems = document.querySelectorAll('.gallery-item:not([data-fade])');
    newItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.5s ease';
      fadeObserver.observe(item);
      item.setAttribute('data-fade', 'true');
    });
  });
  if (galleryGrid) observerGallery.observe(galleryGrid, { childList: true, subtree: false });
});
