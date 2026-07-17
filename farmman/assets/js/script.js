// Typewriter animation for the hero text
document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("animated-text");

  if (!textElement) return;

  // Get the original HTML content
  const originalHTML = textElement.innerHTML;

  // Clear the content initially
  textElement.innerHTML = "";
  textElement.style.opacity = "1"; // Make sure it's visible

  // Function to split text into characters while preserving HTML tags
  function splitTextIntoChars(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const result = [];

    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        // Split each character
        for (let i = 0; i < text.length; i++) {
          result.push({
            type: "char",
            content: text[i],
          });
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Preserve HTML elements like <br />
        const tagName = node.tagName.toLowerCase();
        if (tagName === "br") {
          result.push({
            type: "element",
            content: "<br />",
          });
        } else {
          // Process child nodes
          Array.from(node.childNodes).forEach((child) => {
            processNode(child);
          });
        }
      }
    }

    // Process all nodes
    Array.from(tempDiv.childNodes).forEach((node) => {
      processNode(node);
    });

    return result;
  }

  // Split the text into characters
  const chars = splitTextIntoChars(originalHTML);

  // Animate each character
  let currentIndex = 0;
  let currentHTML = "";
  const delay = 50; // Delay between each character (in milliseconds)

  function animateChar() {
    if (currentIndex >= chars.length) {
      return; // Animation complete
    }

    const char = chars[currentIndex];

    if (char.type === "char") {
      currentHTML += char.content;
    } else if (char.type === "element") {
      currentHTML += char.content;
    }

    textElement.innerHTML = currentHTML;
    currentIndex++;

    if (currentIndex < chars.length) {
      setTimeout(animateChar, delay);
    }
  }

  // Start the animation after a short delay
  setTimeout(animateChar, 300);

  // Floating up animation for mark-group - triggers on scroll
  const floatingMark = document.getElementById("floating-mark");
  if (floatingMark) {
    // Use Intersection Observer to detect when element comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the element enters the viewport
          if (entry.isIntersecting) {
            floatingMark.classList.add("animate-float");
            // Unobserve after animation triggers to prevent re-triggering
            observer.unobserve(floatingMark);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before fully visible
      }
    );

    // Start observing the element
    observer.observe(floatingMark);
  }

  // Floating up animation for concern title - triggers on scroll
  const floatingConcernTitle = document.getElementById(
    "floating-concern-title"
  );
  if (floatingConcernTitle) {
    const observerConcern = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            floatingConcernTitle.classList.add("animate-float");
            observerConcern.unobserve(floatingConcernTitle);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );
    observerConcern.observe(floatingConcernTitle);
  }

  // Floating up animation for contact top section - triggers on scroll
  const floatingContactTop = document.getElementById("floating-contact-top");
  if (floatingContactTop) {
    // Use Intersection Observer to detect when element comes into view
    const observerContact = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the element enters the viewport
          if (entry.isIntersecting) {
            floatingContactTop.classList.add("animate-float");
            // Unobserve after animation triggers to prevent re-triggering
            observerContact.unobserve(floatingContactTop);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before fully visible
      }
    );

    // Start observing the element
    observerContact.observe(floatingContactTop);
  }

  // Sequential floating animation for concern items - triggers on scroll
  const concernContent = document.getElementById("concern-content");
  if (concernContent) {
    const concernItems = [
      document.getElementById("concern-item-1"),
      document.getElementById("concern-item-2"),
      document.getElementById("concern-item-3"),
    ].filter(Boolean); // Remove any null items

    if (concernItems.length > 0) {
      const observerConcernItems = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Animate items sequentially with delay
              concernItems.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add("animate-float");
                }, index * 200); // 200ms delay between each item
              });
              // Unobserve after animation triggers
              observerConcernItems.unobserve(concernContent);
            }
          });
        },
        {
          threshold: 0.2, // Trigger when 20% of the content is visible
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observerConcernItems.observe(concernContent);
    }
  }

  // Floating animation for points items - each item triggers when it comes into view
  const pointsItems = [
    document.getElementById("points-item-1"),
    document.getElementById("points-item-2"),
    document.getElementById("points-item-3"),
    document.getElementById("points-item-4"),
  ].filter(Boolean); // Remove any null items

  if (pointsItems.length > 0) {
    const observerPointsItems = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the specific item that came into view
            entry.target.classList.add("animate-float");
            // Unobserve after animation triggers to prevent re-triggering
            observerPointsItems.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the item is visible
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe each item individually
    pointsItems.forEach((item) => {
      observerPointsItems.observe(item);
    });
  }

  // Floating animation for performance items - each item triggers when it comes into view
  const performanceItems = [
    document.getElementById("performance-item-1"),
    document.getElementById("performance-item-2"),
    document.getElementById("performance-item-3"),
    document.getElementById("performance-item-4"),
    document.getElementById("performance-item-5"),
  ].filter(Boolean); // Remove any null items

  if (performanceItems.length > 0) {
    const observerPerformanceItems = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the specific item that came into view
            entry.target.classList.add("animate-float");
            // Unobserve after animation triggers to prevent re-triggering
            observerPerformanceItems.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the item is visible
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe each item individually
    performanceItems.forEach((item) => {
      observerPerformanceItems.observe(item);
    });
  }

  // Floating animation for step items - each item triggers when it comes into view
  const stepItems = [
    document.getElementById("step-item-1"),
    document.getElementById("step-item-2"),
    document.getElementById("step-item-3"),
  ].filter(Boolean); // Remove any null items

  if (stepItems.length > 0) {
    const observerStepItems = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the specific item that came into view
            entry.target.classList.add("animate-float");
            // Unobserve after animation triggers to prevent re-triggering
            observerStepItems.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the item is visible
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe each item individually
    stepItems.forEach((item) => {
      observerStepItems.observe(item);
    });
  }

  // Floating animation for example items - each item triggers when it comes into view
  const exampleItems = [
    document.getElementById("example-item-1"),
    document.getElementById("example-item-2"),
    document.getElementById("example-item-3"),
  ].filter(Boolean); // Remove any null items

  if (exampleItems.length > 0) {
    const observerExampleItems = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the specific item that came into view
            entry.target.classList.add("animate-float");
            // Unobserve after animation triggers to prevent re-triggering
            observerExampleItems.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the item is visible
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe each item individually
    exampleItems.forEach((item) => {
      observerExampleItems.observe(item);
    });
  }

  // Floating animation for faq items - each item triggers when it comes into view
  const faqItems = [
    document.getElementById("faq-item-1"),
    document.getElementById("faq-item-2"),
    document.getElementById("faq-item-3"),
    document.getElementById("faq-item-4"),
  ].filter(Boolean); // Remove any null items

  if (faqItems.length > 0) {
    const observerFaqItems = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the specific item that came into view
            entry.target.classList.add("animate-float");
            // Unobserve after animation triggers to prevent re-triggering
            observerFaqItems.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the item is visible
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe each item individually
    faqItems.forEach((item) => {
      observerFaqItems.observe(item);
    });
  }

  // Accordion functionality for FAQ items
  const faqItemElements = document.querySelectorAll(".faq .content .item");
  faqItemElements.forEach((item) => {
    const questionElement = item.querySelector(".q");
    if (questionElement) {
      questionElement.addEventListener("click", () => {
        // Toggle active class on the item
        item.classList.toggle("active");
      });
    }
  });
});
