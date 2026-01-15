document.addEventListener('DOMContentLoaded', function () {
  lucide.createIcons(); // Initialize Lucide Icons

  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.getElementById('progress-circle-bar');

  // New Hero Elements
  const heroContainer = document.getElementById('hero-container');
  const heroTop = document.getElementById('hero-top');
  const heroDivider = document.getElementById('hero-divider');

  let circumference = 0;
  if (progressCircle) {
    const radius = progressCircle.r.baseVal.value;
    circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
  }

  // 1. Navbar Scroll Effect & Scroll Progress
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = scrollTop / docHeight;

    // Navbar animation
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-lg', 'border-white/20');
    } else {
      navbar.classList.remove('shadow-lg', 'border-white/20');
    }

    // Back to Top Button visibility
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('opacity-0', 'invisible');
    } else {
      backToTopBtn.classList.add('opacity-0', 'invisible');
    }

    // Scroll Progress animation
    if (docHeight > 0 && progressCircle) {
      const scrollPercent = scrollTop / docHeight;
      const offset = circumference - scrollPercent * circumference;
      progressCircle.style.strokeDashoffset = offset;
    } else if (progressCircle) {
      progressCircle.style.strokeDashoffset = circumference; // Reset if not scrollable
    }
  });

  // 2. Hamburger Menu Toggle
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden'); // Prevent scrolling when menu is open
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('#mobile-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    });
  });

  // 3. Back to Top Button Click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // 4. Initialize Swiper Carousels
  const productSwiper = new Swiper('.product-swiper', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  const testimonialSwiper = new Swiper('.testimonial-swiper', {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 30,
  });

  // 5. Scroll-reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  ); // Trigger when 10% of the element is visible

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // 6. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href').length > 1) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
          });
        }
      }
    });
  });

  // 7. Interactive Hero Clip-Path Effect
  if (heroContainer && heroTop && heroDivider) {
    // Function to update position
    const updateClipPath = (x) => {
      const rect = heroContainer.getBoundingClientRect();
      // Get x position from 0 to 1
      let xPercent = (x - rect.left) / rect.width;

      // Clamp value between 0 and 1 (for safety)
      xPercent = Math.max(0, Math.min(1, xPercent)) * 100;

      // Update the clip-path of the top layer
      heroTop.style.clipPath = `polygon(0 0, ${xPercent}% 0, ${xPercent}% 100%, 0 100%)`;

      // Update the position of the divider line
      heroDivider.style.left = `${xPercent}%`;
    };

    // Mousemove for desktop
    heroContainer.addEventListener('mousemove', (e) => {
      updateClipPath(e.clientX);
    });

    // Touchmove for mobile
    heroContainer.addEventListener(
      'touchmove',
      (e) => {
        if (e.touches.length > 0) {
          updateClipPath(e.touches[0].clientX);
        }
      },
      { passive: true }
    ); // Add passive for scroll performance

    // Set initial state
    heroTop.style.clipPath = 'polygon(0 0, 70% 0, 70% 100%, 0 100%)';
    heroDivider.style.left = '70%';
  }
});