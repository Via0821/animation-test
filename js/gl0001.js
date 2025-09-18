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
          el.style.transition = "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          el.style.transform = `translateY(${translateY + (i - targetIndex) * 1.2}em)`;
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
  // Ensure all animation elements start in hidden state
  const animationElements = document.querySelectorAll('.float-up, .stagger-up, .slide-from-right, .step-float-up, .testimonial-float-up, .qa-float-up, .mobile-ad-float-up');
  animationElements.forEach(el => {
    el.style.visibility = 'hidden';
    el.style.opacity = '0';
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

  // Header scroll effect
  const header = document.querySelector("header");
  const mainSection = document.querySelector("main");
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

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Initial check
  handleScroll();

  // Create a single observer that triggers animations only once
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains("is-visible") && !entry.target.classList.contains("animation-completed")) {
        // Use requestAnimationFrame for smoother animation triggering
        requestAnimationFrame(() => {
          entry.target.classList.add("is-visible");
          entry.target.style.visibility = 'visible';
          
          // Mark as completed after animation duration
          setTimeout(() => {
            entry.target.classList.add("animation-completed");
          }, 1500);
        });
        
        // Stop observing this element immediately after animation is triggered
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,  // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -30px 0px" // Smaller margin for earlier triggering
  });

  // Wait for page to be fully loaded before starting animations
  if (document.readyState === 'complete') {
    initializeAnimations();
  } else {
    window.addEventListener('load', initializeAnimations);
  }
  
  function initializeAnimations() {
    // Float-up animation on scroll
    const floatUps = document.querySelectorAll(".float-up");
    floatUps.forEach(el => animationObserver.observe(el));
  
    // Observe all stagger-up elements (just like float-up)
    const staggerUps = document.querySelectorAll(".stagger-up");
    staggerUps.forEach(el => animationObserver.observe(el));
    
    // iPhone items slide-in animation
    const iphoneItems = document.querySelectorAll(".iphone-item");
    iphoneItems.forEach(item => {
      item.classList.add("slide-from-right");
      animationObserver.observe(item);
    });
    
    // Evidence items slide from right animation
    const eviItems = document.querySelectorAll(".evi-item");
    eviItems.forEach(item => {
      item.classList.add("slide-from-right");
      animationObserver.observe(item);
    });
    
    // Step items float-up animation
    const stepItems = document.querySelectorAll(".step-item");
    stepItems.forEach(item => {
      item.classList.add("step-float-up");
      animationObserver.observe(item);
    });
    
    // Testimonial cards float-up animation
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    testimonialCards.forEach(card => {
      card.classList.add("testimonial-float-up");
      animationObserver.observe(card);
    });
    
    // Q&A items float-up animation
    const qaItems = document.querySelectorAll(".qa-item");
    qaItems.forEach(item => {
      item.classList.add("qa-float-up");
      animationObserver.observe(item);
    });
    
    // Mobile ad panels float-up animation
    const mobileAdPanels = document.querySelectorAll(".mobile-ad-panel");
    mobileAdPanels.forEach(panel => {
      panel.classList.add("mobile-ad-float-up");
      animationObserver.observe(panel);
    });
    
    // Ad panels (PC version) float-up animation
    const adPanels = document.querySelectorAll(".ad-panel");
    adPanels.forEach(panel => {
      panel.classList.add("float-up");
      animationObserver.observe(panel);
    });
    
    // Ad text elements stagger animation
    const adTexts = document.querySelectorAll(".ad-text");
    adTexts.forEach((text, index) => {
      text.classList.add("stagger-up");
      // Add staggered delay
      text.style.setProperty('--stagger-delay', `${index * 0.2}s`);
      animationObserver.observe(text);
    });
  }
  
  // Ad panel images scale animation (integrated with main observer)
  const adImages = document.querySelectorAll(".ad-image img");
  adImages.forEach(img => {
    img.classList.add("ad-scale-up");
    
    // Use the main animation observer for consistency
    animationObserver.observe(img);
  });
});
