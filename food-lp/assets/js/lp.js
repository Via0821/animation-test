// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamBtn = document.querySelector('.ham-btn');
  const hamCloseBtn = document.querySelector('.ham-close-btn');
  const hamListBox = document.querySelector('.ham-list-box');
  const hamOverlay = document.querySelector('.ham-overlay');
  const body = document.body;

  // Function to open menu
  function openMenu() {
    hamListBox.classList.add('is-open');
    if (hamOverlay) {
      hamOverlay.classList.add('is-open');
    }
    body.style.overflow = 'hidden';
    hamListBox.setAttribute('aria-hidden', 'false');
  }

  // Function to close menu
  function closeMenu() {
    hamListBox.classList.remove('is-open');
    if (hamOverlay) {
      hamOverlay.classList.remove('is-open');
    }
    body.style.overflow = '';
    hamListBox.setAttribute('aria-hidden', 'true');
  }

  // Open menu when hamburger button is clicked
  if (hamBtn) {
    hamBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openMenu();
    });
  }

  // Close menu when close button is clicked
  if (hamCloseBtn) {
    hamCloseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeMenu();
    });
  }

  // Close menu when clicking on overlay
  if (hamOverlay) {
    hamOverlay.addEventListener('click', function(e) {
      e.preventDefault();
      closeMenu();
    });
  }

  // Close menu on Escape key press
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && hamListBox.classList.contains('is-open')) {
      closeMenu();
    }
  });
});

// FV Slider Fade Animation
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.fv-slider .slide');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  const displayTime = 45000; // 45 seconds
  const transitionTime = 500; // 0.5 seconds
  
  // Initialize: show first slide
  slides[0].classList.add('active');
  
  function nextSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to next slide (loop back to 0 if at end)
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
  }
  
  // Start the animation loop
  setInterval(nextSlide, displayTime);
});

// Header Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const scrollThreshold = 100; // 100px

  function handleScroll() {
    if (window.scrollY >= scrollThreshold) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  // Initial check
  handleScroll();

  // Listen to scroll events
  window.addEventListener('scroll', handleScroll, { passive: true });
});

// News section scroll animation (section-t then news-content)
document.addEventListener('DOMContentLoaded', function() {
  const newsSection = document.querySelector('section.news');
  if (!newsSection) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );

  observer.observe(newsSection);
});

// Concept section scroll animation (section-t then concept-context)
document.addEventListener('DOMContentLoaded', function() {
  const conceptSection = document.querySelector('section.concept');
  if (!conceptSection) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );

  observer.observe(conceptSection);
});

// Business section scroll animation (section-t then business-content)
document.addEventListener('DOMContentLoaded', function() {
  const businessSection = document.querySelector('section.business');
  if (!businessSection) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );

  observer.observe(businessSection);
});

// Delivery section scroll animation (section-t then delivery-contxt and all-view-btn)
document.addEventListener('DOMContentLoaded', function() {
  const deliverySection = document.querySelector('section.delivery');
  if (!deliverySection) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );

  observer.observe(deliverySection);
});

// Delivery flow steps: trigger animation when delivery-flow-step enters view
document.addEventListener('DOMContentLoaded', function() {
  const deliveryFlowStep = document.querySelector('.delivery-flow-step');
  if (!deliveryFlowStep) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );

  observer.observe(deliveryFlowStep);
});

// Philo section scroll animation (philo-title-box then philo-context)
document.addEventListener('DOMContentLoaded', function() {
  const philoSection = document.querySelector('section.philo');
  if (!philoSection) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );

  observer.observe(philoSection);
});

// CEO message scroll animation (ceo-msg-t then ceo-msg-box)
document.addEventListener('DOMContentLoaded', function() {
  const ceoMsg = document.querySelector('.ceo-msg');
  if (!ceoMsg) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );

  observer.observe(ceoMsg);
});

// Company images fade-in when scroll reaches them
document.addEventListener('DOMContentLoaded', function() {
  const companyImgWrap = document.querySelector('.company-img-wrap');
  if (!companyImgWrap) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );

  observer.observe(companyImgWrap);
});

// Recruit images fade-in when scroll reaches them
document.addEventListener('DOMContentLoaded', function() {
  const recruitImgWrap = document.querySelector('.recruit-img-wrap');
  if (!recruitImgWrap) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );

  observer.observe(recruitImgWrap);
});
