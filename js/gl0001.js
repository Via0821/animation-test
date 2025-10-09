// Device performance detection
function detectDevicePerformance() {
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  // Check for WebGL support
  const hasWebGL = !!gl;

  // Check device memory (if available)
  const deviceMemory = navigator.deviceMemory || 4; // Default to 4GB if not available

  // Check hardware concurrency
  const cores = navigator.hardwareConcurrency || 4;

  // Check connection speed (if available)
  const connection = navigator.connection || navigator.mozConnection;
  const connectionSpeed = connection ? connection.effectiveType : "4g";

  // Check if device prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // More balanced performance score calculation
  let performanceScore = 5; // Start with higher base score

  if (hasWebGL) performanceScore += 2;
  if (deviceMemory >= 4) performanceScore += 2;
  if (deviceMemory >= 8) performanceScore += 1;
  if (cores >= 4) performanceScore += 1;
  if (cores >= 8) performanceScore += 1;
  if (connectionSpeed === "4g") performanceScore += 1;
  if (connectionSpeed === "3g") performanceScore -= 1;
  if (connectionSpeed === "2g") performanceScore -= 2;

  // More lenient performance level thresholds
  let performanceLevel = "high";
  if (performanceScore <= 3 || prefersReducedMotion) {
    performanceLevel = "low";
  } else if (performanceScore <= 6) {
    performanceLevel = "medium";
  }

  return {
    level: performanceLevel,
    score: performanceScore,
    hasWebGL,
    deviceMemory,
    cores,
    connectionSpeed,
    prefersReducedMotion
  };
}

// Adaptive animation settings based on device performance
function getAnimationSettings(performance) {
  const settings = {
    low: {
      duration: 0.6, // Increased from 0.3
      staggerDelay: 0.1, // Increased from 0.05
      useTransforms: true, // Enable transforms even for low performance
      useOpacity: true,
      useScale: false,
      useHardwareAcceleration: true, // Enable hardware acceleration
      reduceMotion: false // Allow motion
    },
    medium: {
      duration: 0.8, // Increased from 0.5
      staggerDelay: 0.15, // Increased from 0.1
      useTransforms: true,
      useOpacity: true,
      useScale: true, // Enable scale for medium performance
      useHardwareAcceleration: true,
      reduceMotion: false
    },
    high: {
      duration: 0.8,
      staggerDelay: 0.2,
      useTransforms: true,
      useOpacity: true,
      useScale: true,
      useHardwareAcceleration: true,
      reduceMotion: false
    }
  };

  return settings[performance.level];
}

// Performance monitoring to detect frame drops
function monitorPerformance() {
  let frameCount = 0;
  let lastTime = performance.now();
  let droppedFrames = 0;
  let isMonitoring = true;

  function checkFrame() {
    if (!isMonitoring) return;

    frameCount++;
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;

    // If frame took longer than 16.67ms (60fps), it's a dropped frame
    if (deltaTime > 16.67) {
      droppedFrames++;
    }

    lastTime = currentTime;

    // Check every 120 frames (less frequent monitoring)
    if (frameCount % 120 === 0) {
      const dropRate = droppedFrames / 120;

      // If more than 50% frames are dropped, reduce animation complexity
      if (dropRate > 0.5) {
        console.log("High frame drop rate detected:", dropRate);
        document.body.classList.add("performance-degraded");

        // Stop monitoring after first detection to avoid interference
        isMonitoring = false;
      }

      // Reset counters
      droppedFrames = 0;
    }

    requestAnimationFrame(checkFrame);
  }

  // Start monitoring after initial animations complete
  setTimeout(() => {
    requestAnimationFrame(checkFrame);
  }, 5000);
}

// Counter animation function
function startCounterAnimation(priceTag) {
  const digitContainers = priceTag.querySelectorAll(".digit-container");

  // Animate each digit from right to left
  digitContainers.forEach((container, index) => {
    const targetValue = parseInt(container.dataset.target);

    // Clear container and create rolling digits
    container.innerHTML = "";
    container.style.overflow = "hidden";
    container.style.position = "relative";

    // Create 20 digit elements for smooth rolling effect
    for (let i = 0; i < 20; i++) {
      const digitElement = document.createElement("div");
      digitElement.className = "digit";
      digitElement.textContent = i % 10; // 0-9 repeating
      digitElement.style.position = "absolute";
      digitElement.style.top = `${i * 1.2}em`;
      digitElement.style.left = "0";
      digitElement.style.width = "100%";
      digitElement.style.height = "1.2em";
      digitElement.style.display = "flex";
      digitElement.style.alignItems = "center";
      digitElement.style.justifyContent = "center";
      digitElement.style.fontSize = "inherit";
      digitElement.style.fontWeight = "inherit";
      digitElement.style.color = "inherit";
      digitElement.style.opacity = "1";
      container.appendChild(digitElement);
    }

    // Start rolling animation
    setTimeout(() => {
      // Find the target digit (first occurrence of target value)
      const targetIndex = Array.from(container.children).findIndex(
        (el, i) => parseInt(el.textContent) === targetValue && i >= 10
      );

      if (targetIndex !== -1) {
        // Animate to target position
        const translateY = -(targetIndex * 1.2);

        // Apply rolling animation to all digits
        Array.from(container.children).forEach((el, i) => {
          el.style.transition =
            "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          el.style.transform = `translateY(${
            translateY + (i - targetIndex) * 1.2
          }em)`;
        });

        // Hide non-target digits after animation
        setTimeout(() => {
          Array.from(container.children).forEach((el, i) => {
            if (i !== targetIndex) {
              el.style.opacity = "0";
            } else {
              el.style.opacity = "1";
            }
          });
        }, 800);
      }
    }, 100 + (digitContainers.length - 1 - index) * 150); // Right to left timing
  });
}

// Smartphone and price tag animation script
document.addEventListener("DOMContentLoaded", function () {
  // Detect device performance
  const devicePerformance = detectDevicePerformance();
  const animationSettings = getAnimationSettings(devicePerformance);

  // Log performance info for debugging
  console.log("Device Performance:", devicePerformance);
  console.log("Animation Settings:", animationSettings);

  // Apply performance-based classes to body
  document.body.classList.add(`performance-${devicePerformance.level}`);
  if (devicePerformance.prefersReducedMotion) {
    document.body.classList.add("reduced-motion");
  }

  // Ensure main section animation elements are optimized
  const mainAnimationElements = document.querySelectorAll(
    ".smartphone1, .smartphone2, .coin--animated"
  );
  mainAnimationElements.forEach((el) => {
    // Apply performance-based optimizations
    if (animationSettings.reduceMotion) {
      el.classList.add("reduced-motion");
    }
    if (!animationSettings.useHardwareAcceleration) {
      el.classList.add("no-hardware-accel");
    }
  });
  function startAnimation() {
    // 1. First, animate the smartphone images with fade-in effect from both sides
    const phoneContainer = document.querySelector(".coin-animation");
    const smartphone1 = document.querySelector(".smartphone1");
    const smartphone2 = document.querySelector(".smartphone2");

    if (phoneContainer) {
      phoneContainer.classList.add("animate");
    }

    // Animate smartphone1 from right side with enhanced slide animation
    if (smartphone1) {
      setTimeout(() => {
        smartphone1.classList.add("slide-animate");
      }, 200);
    }

    // Animate smartphone2 from left side with enhanced slide animation
    if (smartphone2) {
      setTimeout(() => {
        smartphone2.classList.add("slide-animate");
      }, 400);
    }

    // 2. Wait for smartphones to appear, then animate price tags
    setTimeout(() => {
      const priceTags = document.querySelectorAll(".price");
      // Both tags appear simultaneously with flexible animation
      priceTags.forEach((tag) => {
        tag.classList.add("animate");

        // Start counter animation after price tag appears
        setTimeout(() => {
          startCounterAnimation(tag);
        }, 300); // Small delay after price tag appears
      });
    }, 1200); // Wait for smartphones to complete

    // 3. Wait for price tags to finish, then start coin animations
    setTimeout(() => {
      const coins = document.querySelectorAll(".coin--animated");

      // Start all coin animations by adding the 'started' class
      coins.forEach((coin) => {
        coin.classList.add("started");
      });
    }, 2500); // Wait for price tags to complete
  }

  // Start animation once on page load
  setTimeout(startAnimation, 500);

  // Fallback: ensure animations start even if there are issues
  setTimeout(() => {
    const phoneContainer = document.querySelector(".coin-animation");
    if (phoneContainer && !phoneContainer.classList.contains("animate")) {
      phoneContainer.classList.add("animate");
    }
  }, 2000);

  // Start performance monitoring
  monitorPerformance();

  // Header scroll effect
  const header = document.querySelector("header");
  const mainSection = document.querySelector(".fv");
  const boxContent = document.querySelector(".box-content");

  function handleScroll() {
    const scrollPosition = window.scrollY;

    // Hide header when scrolling down 200px
    if (scrollPosition > 35) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }

    // Keep existing scrolled effect for main section
    if (mainSection && boxContent) {
      const mainBottom = mainSection.offsetTop + mainSection.offsetHeight;

      // Trigger header effect when scrolling past the main section
      if (scrollPosition > mainBottom - 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  }

  // Initial check
  handleScroll();

  // Track animated elements to prevent re-triggering
  const animatedElements = new Set();

  // Create a single observer that triggers animations only once
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;
      const elementId = element.id || element.className + Math.random();

      // Check if element is already animated or currently animating
      if (
        entry.isIntersecting &&
        !element.classList.contains("is-visible") &&
        !element.classList.contains("animation-completed") &&
        !animatedElements.has(elementId)
      ) {
        // Mark as being animated
        animatedElements.add(elementId);

        // Lightweight callback - just toggle CSS class, let CSS handle animation
        element.classList.add("is-visible");
        element.style.visibility = "visible";

        // Stop observing this element immediately after animation is triggered
        animationObserver.unobserve(element);
      }
    });
  });

  // Floating animation for all section titles, recommend items, about images, step items, testimonial cards, QA items, iPhone items, ad panel images, and mobile ad panel images
  function initFloatingAnimation() {
    const targetElements = document.querySelectorAll(
      ".bg_white-title, .section-title, .recommend-item, .about, .step-item, .testimonial-card, .qa-item, .iphone-item, .line, .ad-image img, .mobile-ad-panel .panel-image img"
    );
    const animatedElements = new Set();

    function checkScroll() {
      targetElements.forEach((element) => {
        if (animatedElements.has(element)) return;

        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          // Special handling for ad panel images with scale animation
          if (
            element.tagName === "IMG" &&
            (element.closest(".ad-image") || element.closest(".panel-image"))
          ) {
            element.classList.add("animate-in");
          } else {
            element.classList.add("animate-in");
          }
          animatedElements.add(element);
        }
      });
    }

    // Optimized scroll handling
    let scrollTimeout;
    const optimizedScrollHandler = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(checkScroll, 10);
    };

    // Add scroll event listener
    window.addEventListener("scroll", optimizedScrollHandler, {
      passive: true
    });

    // Check on initial load
    checkScroll();

    // Add scroll event listener with proper throttling
    window.addEventListener("scroll", optimizedScrollHandler, {
      passive: true
    });
  }

  // Initialize floating animation
  initFloatingAnimation();

  // Form handling functionality
  initFormHandling();

  // Ensure smooth animations without jerky movements
  ensureSmoothAnimations();
});

// Global variables for form handling
let buttonPushed = false;

// Form handling initialization
function initFormHandling() {
  // UUID generation
  function generateUUIDv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Toggle other job input
  function toggleOtherInput() {
    const jobSelect = document.getElementById("job");
    const otherJobContainer = document.getElementById("otherJobContainer");
    const otherJobInput = document.getElementById("otherJob");

    if (jobSelect.value === "__other_option__") {
      otherJobContainer.style.display = "block";
      otherJobInput.required = true;
    } else {
      otherJobContainer.style.display = "none";
      otherJobInput.required = false;
      otherJobInput.value = "";
    }
  }

  // Iframe loaded handler
  function onIframeLoaded() {
    if (buttonPushed) {
      window.location.href = "https://monoriba.com/lp/lth1234/";
    }
  }

  // Make onIframeLoaded globally available
  window.onIframeLoaded = onIframeLoaded;
  window.toggleOtherInput = toggleOtherInput;

  // Initialize form elements
  const form = document.getElementById("myForm");
  const checkbox = document.getElementById("termsCheckbox");
  const errorMsg = document.getElementById("termsError");
  const submitBtnPC = document.getElementById("submitBtn");
  const submitBtnSP = document.getElementById("submitBtnSp");

  // Check if form elements exist before proceeding
  if (!form || !checkbox || !errorMsg || !submitBtnPC || !submitBtnSP) {
    console.warn("Form elements not found, skipping form initialization");
    return;
  }

  // Set UUID
  const uuid = generateUUIDv4();
  const uuidInput = document.getElementById("uuidInput");
  if (uuidInput) {
    uuidInput.value = uuid;
  }

  // Initial state
  submitBtnPC.disabled = !checkbox.checked;
  submitBtnSP.disabled = !checkbox.checked;

  // Checkbox change handler
  checkbox.addEventListener("change", function () {
    const isChecked = checkbox.checked;
    submitBtnPC.disabled = !isChecked;
    submitBtnSP.disabled = !isChecked;
    errorMsg.style.display = isChecked ? "none" : "block";
  });

  // Submit handler
  function handleSubmit(e) {
    if (!checkbox.checked) {
      e.preventDefault();
      errorMsg.style.display = "block";
      return;
    }

    if (form.checkValidity()) {
      errorMsg.style.display = "none";
      // Set flag before submission
      buttonPushed = true;
      form.submit(); // Submit to target="resultFrame"
    } else {
      e.preventDefault();
      form.reportValidity();
    }
  }

  // Add event listeners
  submitBtnPC.addEventListener("click", handleSubmit);
  submitBtnSP.addEventListener("click", handleSubmit);
}

// Ensure smooth animations without jerky movements
function ensureSmoothAnimations() {
  // Remove conflicting transitions after animations complete
  const animatedElements = document.querySelectorAll(
    ".smartphone1.slide-animate, .smartphone2.slide-animate, .price.animate, .coin--animated.started"
  );

  animatedElements.forEach((element) => {
    // Wait for animation to complete, then remove conflicting properties
    element.addEventListener("animationend", () => {
      element.style.transition = "none";
      element.style.willChange = "auto";
    });
  });

  // Ensure floating animations don't have conflicting transitions
  const floatingElements = document.querySelectorAll(
    ".bg_white-title.animate-in, .section-title.animate-in, .recommend-item.animate-in, .about.animate-in, .step-item.animate-in, .testimonial-card.animate-in, .qa-item.animate-in, .iphone-item.animate-in, .line.animate-in, .ad-image img.animate-in, .mobile-ad-panel .panel-image img.animate-in"
  );

  floatingElements.forEach((element) => {
    element.addEventListener("animationend", () => {
      element.style.transition = "none";
      element.style.willChange = "auto";
    });
  });
}

("use strict");

function carousel() {
  let carouselSlider = document.querySelector(".evi-grid-case");
  let list = document.querySelector(".evi-grid");
  let item = document.querySelectorAll(".evi-item");
  let list2;

  const speed = 1;

  const width = list.offsetWidth;
  let x = 0;
  let x2 = width;

  function clone() {
    list2 = list.cloneNode(true);
    carouselSlider.appendChild(list2);
    list2.style.left = `${width}px`;
  }

  function moveFirst() {
    x -= speed;

    if (width >= Math.abs(x)) {
      list.style.left = `${x}px`;
    } else {
      x = width;
    }
  }

  function moveSecond() {
    x2 -= speed;

    if (list2.offsetWidth >= Math.abs(x2)) {
      list2.style.left = `${x2}px`;
    } else {
      x2 = width;
    }
  }

  function hover() {
    clearInterval(a);
    clearInterval(b);
  }

  function unhover() {
    a = setInterval(moveFirst, 7);
    b = setInterval(moveSecond, 7);
  }

  clone();

  let a = setInterval(moveFirst, 7);
  let b = setInterval(moveSecond, 7);

  carouselSlider.addEventListener("mouseenter", hover);
  carouselSlider.addEventListener("mouseleave", unhover);
}

carousel();
