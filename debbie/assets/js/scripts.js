// Title and navigation animation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get the title elements
    const titleH1 = document.querySelector('.title h1'); // "デヴィ夫人を"
    const titleBtm = document.querySelector('.title-btm'); // div containing h2 and p
    const navLinks = document.querySelectorAll('.nav-bar a'); // all navigation links
    
    // Start animations with a slight delay to ensure CSS is loaded
    setTimeout(() => {
        // First: animate the main h1 "デヴィ夫人を"
        if (titleH1) {
            titleH1.classList.add('animate-in');
        }
        
        // Second: animate the title-btm div (both h2 and p inside it)
        // This has CSS transition-delay: 0.5s, so it starts 0.5s after the class is added
        if (titleBtm) {
            titleBtm.classList.add('animate-in');
        }
        
        // Third: animate navigation links after title animations
        // Start nav animations 1.5s after title animations begin
        setTimeout(() => {
            navLinks.forEach(link => {
                link.classList.add('animate-in');
            });
        }, 1500);
    }, 100);
    
    // Header background change on scroll (desktop only)
    const header = document.querySelector('header');
    
    function handleHeaderScroll() {
        // Only apply on desktop (768px or larger)
        if (window.innerWidth >= 768) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop >= 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        } else {
            // Remove class on mobile to ensure no blur effect
            header.classList.remove('scrolled');
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Add resize event listener to handle screen size changes
    window.addEventListener('resize', handleHeaderScroll);
    
    // Initial check on page load
    handleHeaderScroll();
    
    // Scroll-triggered animations for section titles, features, effects, flow, and FAQ
    const sectionTitles = document.querySelectorAll('.section-title');
    const featureImages = document.querySelectorAll('.fea-img'); // Get all feature images
    const featureTexts = document.querySelectorAll('.fea-txt'); // Get all feature texts
    const effectDivs = document.querySelectorAll('.effect'); // Get all individual effect divs
    const flowContainer = document.querySelector('.flow-container'); // Get flow container
    const faqItems = document.querySelectorAll('.q-a'); // Get all FAQ items
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully in view
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                if (entry.target.classList.contains('flow-container')) {
                    entry.target.classList.add('animate-flow');
                } else {
                    entry.target.classList.add('animate-on-scroll');
                }
            }
        });
    }, observerOptions);
    
    // Observe all section titles
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
    
    // Observe each feature image and text separately
    featureImages.forEach(featureImg => {
        observer.observe(featureImg);
    });
    featureTexts.forEach(featureTxt => {
        observer.observe(featureTxt);
    });
    
    // Observe each individual effect div
    effectDivs.forEach(effect => {
        observer.observe(effect);
    });
    
    // Observe each individual FAQ item
    faqItems.forEach(faqItem => {
        observer.observe(faqItem);
    });
    
    // Observe flow container for step pulse animation
    if (flowContainer) {
        observer.observe(flowContainer);
        
        // Show/hide scrollbar during scrolling
        let scrollTimeout;
        
        flowContainer.addEventListener('scroll', () => {
            // Show scrollbar when scrolling starts
            flowContainer.classList.add('scrolling');
            
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Hide scrollbar after 1 second of no scrolling
            scrollTimeout = setTimeout(() => {
                flowContainer.classList.remove('scrolling');
            }, 1000);
        });
        
        // Also show scrollbar on mouse enter (for better UX)
        flowContainer.addEventListener('mouseenter', () => {
            flowContainer.classList.add('scrolling');
        });
        
        // Hide scrollbar on mouse leave (after a delay)
        flowContainer.addEventListener('mouseleave', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                flowContainer.classList.remove('scrolling');
            }, 500);
        });
    }
});
