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
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  const connectionSpeed = connection ? connection.effectiveType : "4g";

  // Check if device prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Detect iOS devices
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

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

  // iOS specific adjustments
  if (isIOS) {
    performanceScore += 1; // iOS generally has good performance
  }

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
    prefersReducedMotion,
    isIOS
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
      reduceMotion: false, // Allow motion
      // iOS specific settings
      useIOSOptimizations: performance.isIOS,
      forceGPUAcceleration: performance.isIOS
    },
    medium: {
      duration: 0.8, // Increased from 0.5
      staggerDelay: 0.15, // Increased from 0.1
      useTransforms: true,
      useOpacity: true,
      useScale: true, // Enable scale for medium performance
      useHardwareAcceleration: true,
      reduceMotion: false,
      // iOS specific settings
      useIOSOptimizations: performance.isIOS,
      forceGPUAcceleration: performance.isIOS
    },
    high: {
      duration: 0.8,
      staggerDelay: 0.2,
      useTransforms: true,
      useOpacity: true,
      useScale: true,
      useHardwareAcceleration: true,
      reduceMotion: false,
      // iOS specific settings
      useIOSOptimizations: performance.isIOS,
      forceGPUAcceleration: performance.isIOS
    }
  };

  return settings[performance.level];
}

// Performance monitoring to detect frame drops
function monitorPerformance() {
  let frameCount = 0;
  let lastTime = performance.now();
  let droppedFrames = 0;

  function checkFrame() {
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

      // If more than 40% frames are dropped, reduce animation complexity (less aggressive)
      if (dropRate > 0.4) {
        console.log("High frame drop rate detected:", dropRate);
        document.body.classList.add("performance-degraded");

        // Only reduce animation duration, don't disable transforms
        const animatedElements = document.querySelectorAll(
          ".float-up, .stagger-up, .slide-from-right"
        );
        animatedElements.forEach((el) => {
          el.classList.add("reduced-motion");
          el.style.transition = "all 0.3s ease-out";
          el.style.webkitTransition = "all 0.3s ease-out";
        });
      }

      // Reset counters
      droppedFrames = 0;
    }

    requestAnimationFrame(checkFrame);
  }

  requestAnimationFrame(checkFrame);
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
        const targetElement = container.children[targetIndex];
        const translateY = -(targetIndex * 1.2);

        // Apply rolling animation
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
            }
          });
        }, 800);
      }
    }, 200 + (digitContainers.length - 1 - index) * 200); // Right to left timing
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
      }, 100);
    }

    // Animate smartphone2 from left side with enhanced slide animation
    if (smartphone2) {
      setTimeout(() => {
        smartphone2.classList.add("slide-animate");
      }, 300);
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
        }, 200); // Small delay after price tag appears
      });
    }, 1300); // Wait for smartphones to complete (1200ms + 100ms buffer)

    // 3. Wait for price tags to finish, then start coin animations
    setTimeout(() => {
      const coins = document.querySelectorAll(".coin--animated");

      // Start all coin animations by adding the 'started' class
      coins.forEach((coin) => {
        coin.classList.add("started");
      });
    }, 3000); // Wait for price tags to complete (1300ms + 1500ms + 200ms buffer)
  }

  // Start animation once on page load
  setTimeout(startAnimation, 500);

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

  // iOS specific scroll handling to prevent flickering
  let scrollTimeout;
  const optimizedScrollHandler = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    if (devicePerformance.isIOS) {
      // Use passive listener for iOS to prevent scroll blocking
      requestAnimationFrame(handleScroll);
    } else {
      scrollTimeout = setTimeout(handleScroll, 16); // ~60fps
    }
  };

  // Add scroll event listener with iOS optimization
  if (devicePerformance.isIOS) {
    window.addEventListener("scroll", optimizedScrollHandler, {
      passive: true
    });
  } else {
    window.addEventListener("scroll", optimizedScrollHandler);
  }

  // Initial check
  handleScroll();

  // Track animated elements to prevent re-triggering
  const animatedElements = new Set();

  // Create a single observer that triggers animations only once - iOS optimized
  const animationObserver = new IntersectionObserver(
    (entries) => {
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

          // LIGHTWEIGHT callback - just toggle CSS class, let CSS handle animation
          element.classList.add("is-visible");
          element.style.visibility = "visible";

          // Stop observing this element immediately after animation is triggered
          animationObserver.unobserve(element);
        }
      });
    },
    {
      threshold: devicePerformance.isIOS ? 0.1 : 0.15, // Lower threshold for iOS
      rootMargin: devicePerformance.isIOS
        ? "0px 0px -30px 0px"
        : "0px 0px -50px 0px" // Smaller margin for iOS
    }
  );

  // iOS specific initialization
  const initializeForIOS = () => {
    if (devicePerformance.isIOS) {
      // Add iOS specific class - let CSS handle the rest
      document.body.classList.add("ios-device");

      // iOS animation delays removed for elements outside header and main
    }
  };

  // Wait for page to be fully loaded before starting animations
  if (document.readyState === "complete") {
    initializeForIOS();
    initializeAnimations();
  } else {
    window.addEventListener("load", () => {
      initializeForIOS();
      initializeAnimations();
    });
  }

  function initializeAnimations() {
    // Check if mobile device for optimization
    const isMobile =
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
  }

  // Floating animation for all section titles, recommend items, about images, step items, testimonial cards, QA items, iPhone items, and evidence items
  function initFloatingAnimation() {
    const targetElements = document.querySelectorAll(
      ".bg_white-title, .section-title, .recommend-item, .about, .step-item, .testimonial-card, .qa-item, .iphone-item, .evi-item, .line"
    );
    const animatedElements = new Set();

    // Safari-specific optimizations
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    function checkScroll() {
      targetElements.forEach((element) => {
        if (animatedElements.has(element)) return;

        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("animate-in");
          animatedElements.add(element);
        }
      });
    }

    // Safari-optimized scroll handling
    let scrollTimeout;
    const optimizedScrollHandler = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      if (isSafari) {
        // Use requestAnimationFrame for Safari to prevent scroll blocking
        requestAnimationFrame(checkScroll);
      } else {
        scrollTimeout = setTimeout(checkScroll, 16); // ~60fps
      }
    };

    // Add scroll event listener with Safari optimization
    if (isSafari) {
      window.addEventListener("scroll", optimizedScrollHandler, {
        passive: true
      });
    } else {
      window.addEventListener("scroll", optimizedScrollHandler);
    }

    // Check on initial load
    checkScroll();
  }

  // Initialize floating animation
  initFloatingAnimation();
});
