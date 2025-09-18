// メインアニメーション
document.addEventListener("DOMContentLoaded", function () {
  // スマートフォンとコインのアニメーション
  const smartphone = document.querySelector(".smartphone");
  const coin = document.querySelector(".coin");

  if (smartphone && coin) {
    // アニメーション開始
    setTimeout(() => {
      smartphone.style.animation = "float 3s ease-in-out infinite";
      coin.style.animation = "scalePulse 2s ease-in-out infinite";
    }, 500);
  }

  // ヘッダーのスクロール処理
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          header.classList.add("hidden");
        } else {
          header.classList.remove("hidden");
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Initial check
  handleScroll();

  // Single optimized animation observer for all elements
  const animationObserver = new IntersectionObserver(
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

            // Mark as completed after animation duration based on element type
            const duration = getAnimationDuration(entry.target);
            setTimeout(() => {
              entry.target.classList.add("animation-completed");
            }, duration);
          });

          // Stop observing this element immediately after animation is triggered
          animationObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -30px 0px" // Start animation when element is more visible
    }
  );

  // Get animation duration based on element type
  function getAnimationDuration(element) {
    if (
      element.classList.contains("section-title") ||
      element.classList.contains("about") ||
      element.classList.contains("ad-panel") ||
      element.classList.contains("mobile-ad-panel")
    ) {
      return 1500;
    } else if (element.classList.contains("step-item")) {
      return 1800;
    } else {
      return 1200; // Default for recommend-item, iphone-item, evi-item, testimonial-card, qa-item
    }
  }

  // Initialize all animations with single observer
  function initializeAllAnimations() {
    // Section titles
    const sectionTitles = document.querySelectorAll(".section-title");
    sectionTitles.forEach((title) => {
      animationObserver.observe(title);
    });

    // Recommend items
    const recommendItems = document.querySelectorAll(".recommend-item");
    recommendItems.forEach((item) => {
      // Ensure items start in hidden state
      item.style.visibility = "hidden";
      item.style.opacity = "0";
      item.style.transform = "translate3d(0, 40px, 0)";

      animationObserver.observe(item);
    });

    // About images
    const aboutImages = document.querySelectorAll(".about");
    aboutImages.forEach((image) => {
      animationObserver.observe(image);
    });

    // iPhone items
    const iphoneItems = document.querySelectorAll(".iphone-item");
    iphoneItems.forEach((item) => {
      // Ensure items start in hidden state
      item.style.visibility = "hidden";
      item.style.opacity = "0";
      item.style.transform = "translate3d(60px, 0, 0)";

      animationObserver.observe(item);
    });

    // Evi items
    const eviItems = document.querySelectorAll(".evi-item");
    eviItems.forEach((item) => {
      // Ensure items start in hidden state
      item.style.visibility = "hidden";
      item.style.opacity = "0";
      item.style.transform = "translate3d(60px, 0, 0)";

      animationObserver.observe(item);
    });

    // Ad panels
    const adPanels = document.querySelectorAll(".ad-panel");
    adPanels.forEach((panel) => {
      animationObserver.observe(panel);
    });

    // Mobile ad panels
    const mobileAdPanels = document.querySelectorAll(".mobile-ad-panel");
    mobileAdPanels.forEach((panel) => {
      animationObserver.observe(panel);
    });

    // Step items
    const stepItems = document.querySelectorAll(".step-item");
    stepItems.forEach((item) => {
      animationObserver.observe(item);
    });

    // Testimonial cards
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    testimonialCards.forEach((card) => {
      // Ensure cards start in hidden state
      card.style.visibility = "hidden";
      card.style.opacity = "0";
      card.style.transform = "translate3d(0, 40px, 0)";

      animationObserver.observe(card);
    });

    // QA items
    const qaItems = document.querySelectorAll(".qa-item");
    qaItems.forEach((item) => {
      // Ensure items start in hidden state
      item.style.visibility = "hidden";
      item.style.opacity = "0";
      item.style.transform = "translate3d(0, 40px, 0)";

      animationObserver.observe(item);
    });
  }

  // Wait for page to be fully loaded before starting animations
  if (document.readyState === "complete") {
    initializeAllAnimations();
  } else {
    window.addEventListener("load", () => {
      initializeAllAnimations();
    });
  }
});

// グローバル

// フォーム送信処理
function submitForm() {
  const form = document.getElementById("contactForm");
  if (form) {
    // フォームの送信処理をここに追加
    console.log("フォームが送信されました");
    // 実際の送信処理を実装してください
  }
}

// スムーススクロール
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// モバイルメニューの開閉
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("active");
  }
}

// ページ読み込み完了時の処理
window.addEventListener("load", function () {
  // ページ読み込み完了後の処理をここに追加
  console.log("ページの読み込みが完了しました");
});
