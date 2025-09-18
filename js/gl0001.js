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
  // Ensure all animation elements start in hidden state
  const animationElements = document.querySelectorAll(
    ".float-up, .stagger-up, .slide-from-right, .step-float-up, .testimonial-float-up, .qa-float-up, .mobile-ad-float-up"
  );
  animationElements.forEach((el) => {
    el.style.visibility = "hidden";
    el.style.opacity = "0";
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

  // Section title floating animation
  const sectionTitleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("is-visible")
        ) {
          // Use requestAnimationFrame for smoother animation triggering
          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");
          });

          // Stop observing this element after animation is triggered
          sectionTitleObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -30px 0px" // Start animation slightly before element is fully visible
    }
  );

  // Recommend items floating animation
  const recommendItemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("is-visible") &&
          !entry.target.classList.contains("animation-completed")
        ) {
          // Use requestAnimationFrame for smoother animation triggering
          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");

            // Mark as completed after animation duration
            setTimeout(() => {
              entry.target.classList.add("animation-completed");
            }, 1200);
          });

          // Stop observing this element immediately after animation is triggered
          recommendItemObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: "0px 0px -30px 0px" // Start animation when element is more visible
    }
  );

  // Initialize section title animations
  function initializeSectionTitleAnimations() {
    const sectionTitles = document.querySelectorAll(".section-title");
    sectionTitles.forEach((title) => {
      sectionTitleObserver.observe(title);
    });
  }

  // Initialize recommend item animations
  function initializeRecommendItemAnimations() {
    const recommendItems = document.querySelectorAll(".recommend-item");
    recommendItems.forEach((item) => {
      // Ensure items start in hidden state
      item.style.visibility = "hidden";
      item.style.opacity = "0";
      item.style.transform = "translate3d(0, 40px, 0)";

      recommendItemObserver.observe(item);
    });
  }

  // About images floating animation
  const aboutImageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("is-visible") &&
          !entry.target.classList.contains("animation-completed")
        ) {
          // Use requestAnimationFrame for smoother animation triggering
          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");

            // Mark as completed after animation duration
            setTimeout(() => {
              entry.target.classList.add("animation-completed");
            }, 1500);
          });

          // Stop observing this element immediately after animation is triggered
          aboutImageObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: "0px 0px -30px 0px" // Start animation when element is more visible
    }
  );

  // Initialize about image animations
  function initializeAboutImageAnimations() {
    const aboutImages = document.querySelectorAll(".about");
    aboutImages.forEach((image) => {
      aboutImageObserver.observe(image);
    });
  }

  // iPhone items sliding from right animation
  const iphoneItemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("is-visible") &&
          !entry.target.classList.contains("animation-completed")
        ) {
          // Use requestAnimationFrame for smoother animation triggering
          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");

            // Mark as completed after animation duration
            setTimeout(() => {
              entry.target.classList.add("animation-completed");
            }, 1200);
          });

          // Stop observing this element immediately after animation is triggered
          iphoneItemObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Start animation when element is more visible
    }
  );

  // Initialize iPhone item animations
  function initializeIphoneItemAnimations() {
    const iphoneItems = document.querySelectorAll(".iphone-item");
    iphoneItems.forEach((item) => {
      // Ensure items start in hidden state
      item.style.visibility = "hidden";
      item.style.opacity = "0";
      item.style.transform = "translate3d(60px, 0, 0)";

      iphoneItemObserver.observe(item);
    });
  }

  // Evi items sliding from right animation
  const eviItemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("is-visible") &&
          !entry.target.classList.contains("animation-completed")
        ) {
          // Use requestAnimationFrame for smoother animation triggering
          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");

            // Mark as completed after animation duration
            setTimeout(() => {
              entry.target.classList.add("animation-completed");
            }, 1500);
          });

          // Stop observing this element immediately after animation is triggered
          eviItemObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Start animation when element is more visible
    }
  );

  // Initialize evi item animations
  function initializeEviItemAnimations() {
    const eviItems = document.querySelectorAll(".evi-item");
    eviItems.forEach((item) => {
      // Ensure items start in hidden state
      item.style.visibility = "hidden";
      item.style.opacity = "0";
      item.style.transform = "translate3d(60px, 0, 0)";

      eviItemObserver.observe(item);
    });
  }

  // Ad panel floating upward animation
  const adPanelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("is-visible") &&
          !entry.target.classList.contains("animation-completed")
        ) {
          // Use requestAnimationFrame for smoother animation triggering
          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");

            // Mark as completed after animation duration
            setTimeout(() => {
              entry.target.classList.add("animation-completed");
            }, 1500);
          });

          // Stop observing this element immediately after animation is triggered
          adPanelObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -30px 0px" // Start animation when element is more visible
    }
  );

  // Initialize ad panel animations
  function initializeAdPanelAnimations() {
    const adPanels = document.querySelectorAll(".ad-panel");
    adPanels.forEach((panel) => {
      adPanelObserver.observe(panel);
    });
  }

  // Mobile ad panel floating upward animation
  const mobileAdPanelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("is-visible") &&
          !entry.target.classList.contains("animation-completed")
        ) {
          // Use requestAnimationFrame for smoother animation triggering
          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");

            // Mark as completed after animation duration
            setTimeout(() => {
              entry.target.classList.add("animation-completed");
            }, 1500);
          });

          // Stop observing this element immediately after animation is triggered
          mobileAdPanelObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -30px 0px" // Start animation when element is more visible
    }
  );

  // Initialize mobile ad panel animations
  function initializeMobileAdPanelAnimations() {
    const mobileAdPanels = document.querySelectorAll(".mobile-ad-panel");
    mobileAdPanels.forEach((panel) => {
      mobileAdPanelObserver.observe(panel);
    });
  }

  // Step item floating upward animation
  const stepItemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("is-visible") &&
          !entry.target.classList.contains("animation-completed")
        ) {
          // Use requestAnimationFrame for smoother animation triggering
          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");

            // Mark as completed after animation duration
            setTimeout(() => {
              entry.target.classList.add("animation-completed");
            }, 1500);
          });

          // Stop observing this element immediately after animation is triggered
          stepItemObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -30px 0px" // Start animation when element is more visible
    }
  );

  // Initialize step item animations
  function initializeStepItemAnimations() {
    const stepItems = document.querySelectorAll(".step-item");
    stepItems.forEach((item) => {
      stepItemObserver.observe(item);
    });
  }

  // Testimonial card floating upward animation
  const testimonialCardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("is-visible") &&
          !entry.target.classList.contains("animation-completed")
        ) {
          // Use requestAnimationFrame for smoother animation triggering
          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");

            // Mark as completed after animation duration
            setTimeout(() => {
              entry.target.classList.add("animation-completed");
            }, 1200);
          });

          // Stop observing this element immediately after animation is triggered
          testimonialCardObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: "0px 0px -30px 0px" // Start animation when element is more visible
    }
  );

  // Initialize testimonial card animations
  function initializeTestimonialCardAnimations() {
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    testimonialCards.forEach((card) => {
      // Ensure cards start in hidden state
      card.style.visibility = "hidden";
      card.style.opacity = "0";
      card.style.transform = "translate3d(0, 40px, 0)";

      testimonialCardObserver.observe(card);
    });
  }

  // QA item floating upward animation
  const qaItemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("is-visible") &&
          !entry.target.classList.contains("animation-completed")
        ) {
          // Use requestAnimationFrame for smoother animation triggering
          requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");

            // Mark as completed after animation duration
            setTimeout(() => {
              entry.target.classList.add("animation-completed");
            }, 1200);
          });

          // Stop observing this element immediately after animation is triggered
          qaItemObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: "0px 0px -30px 0px" // Start animation when element is more visible
    }
  );

  // Initialize QA item animations
  function initializeQaItemAnimations() {
    const qaItems = document.querySelectorAll(".qa-item");
    qaItems.forEach((item) => {
      // Ensure items start in hidden state
      item.style.visibility = "hidden";
      item.style.opacity = "0";
      item.style.transform = "translate3d(0, 40px, 0)";

      qaItemObserver.observe(item);
    });
  }

  // Wait for page to be fully loaded before starting animations
  if (document.readyState === "complete") {
    initializeSectionTitleAnimations();
    initializeRecommendItemAnimations();
    initializeAboutImageAnimations();
    initializeIphoneItemAnimations();
    initializeEviItemAnimations();
    initializeAdPanelAnimations();
    initializeMobileAdPanelAnimations();
    initializeStepItemAnimations();
    initializeTestimonialCardAnimations();
    initializeQaItemAnimations();
  } else {
    window.addEventListener("load", () => {
      initializeSectionTitleAnimations();
      initializeRecommendItemAnimations();
      initializeAboutImageAnimations();
      initializeIphoneItemAnimations();
      initializeEviItemAnimations();
      initializeAdPanelAnimations();
      initializeMobileAdPanelAnimations();
      initializeStepItemAnimations();
      initializeTestimonialCardAnimations();
      initializeQaItemAnimations();
    });
  }

  // Scroll animations removed - keeping only main animation
});

// グローバル
let buttonPushed = false;

function onIframeLoaded() {
  if (buttonPushed) {
    window.location.href = "https://monoriba.com/lp/lth1234/";
  }
}

function generateUUIDv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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

document.addEventListener("DOMContentLoaded", function () {
  // UUID 埋め込み
  const uuid = generateUUIDv4();
  document.getElementById("uuidInput").value = uuid;

  const form = document.getElementById("myForm");
  const checkbox = document.getElementById("termsCheckbox");
  const errorMsg = document.getElementById("termsError");
  const submitBtnPC = document.getElementById("submitBtn");
  const submitBtnSP = document.getElementById("submitBtnSp");

  // 初期状態
  submitBtnPC.disabled = !checkbox.checked;
  submitBtnSP.disabled = !checkbox.checked;

  // 規約チェックでボタン有効化
  checkbox.addEventListener("change", function () {
    const isChecked = checkbox.checked;
    submitBtnPC.disabled = !isChecked;
    submitBtnSP.disabled = !isChecked;
    errorMsg.style.display = isChecked ? "none" : "block";
  });

  // 送信共通処理
  function handleSubmit(e) {
    if (!checkbox.checked) {
      e.preventDefault();
      errorMsg.style.display = "block";
      return;
    }
    if (form.checkValidity()) {
      errorMsg.style.display = "none";
      // ★ここが重要：フラグを立ててから送信
      buttonPushed = true;
      form.submit(); // target="resultFrame" に送信
    } else {
      e.preventDefault();
      form.reportValidity();
    }
  }

  submitBtnPC.addEventListener("click", handleSubmit);
  submitBtnSP.addEventListener("click", handleSubmit);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const checkbox = document.getElementById("termsCheckbox");
  const errorMsg = document.getElementById("termsError");

  const submitBtnPC = document.getElementById("submitBtn");
  const submitBtnSP = document.getElementById("submitBtnSp");

  // ✅ チェックされてる時だけ両方のボタンを有効にする
  checkbox.addEventListener("change", function () {
    const isChecked = checkbox.checked;
    submitBtnPC.disabled = !isChecked;
    submitBtnSP.disabled = !isChecked;
    errorMsg.style.display = isChecked ? "none" : "block";
  });

  // ✅ ボタンクリック時の共通処理
  function handleSubmit(e) {
    if (!checkbox.checked) {
      e.preventDefault();
      errorMsg.style.display = "block";
      return;
    }

    if (form.checkValidity()) {
      errorMsg.style.display = "none";
      form.submit();
    } else {
      e.preventDefault();
      form.reportValidity();
    }
  }

  // PC・SP 両方にイベント登録
  submitBtnPC.addEventListener("click", handleSubmit);
  submitBtnSP.addEventListener("click", handleSubmit);
});
