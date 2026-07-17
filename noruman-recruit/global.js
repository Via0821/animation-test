// NORUMAN Website GSAP Animations
// Make sure to include GSAP and ScrollTrigger in your HTML:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

gsap.registerPlugin(ScrollTrigger);

// =====================
// MAIN VISUAL ANIMATIONS
// =====================
function initDecorativeLines() {
    const redLine = document.querySelector('.decor-line-red');
    const yellowLine = document.querySelector('.decor-line-yellow');

    if (redLine && yellowLine) {
        // Set initial positions - make sure they start in view
        gsap.set([redLine, yellowLine], {
            opacity: 0.8,
            willChange: 'transform'
        });

        // Red line - sophisticated diagonal movement with rotation
        gsap.to(redLine, {
            y: '-50vh',
            x: '20vw',
            rotation: 15,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
                invalidateOnRefresh: true
            }
        });

        // Yellow line - counter-movement with subtle rotation
        gsap.to(yellowLine, {
            y: '-30vh',
            x: '-15vw',
            rotation: -10,
            scale: 0.9,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom top",
                scrub: 1.5,
                invalidateOnRefresh: true
            }
        });

        // Additional sophisticated effect - opacity changes based on scroll
        ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "50% top",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const opacity = 0.8 - (progress * 0.3); // Fade slightly as we scroll
                gsap.set([redLine, yellowLine], {
                    opacity: Math.max(opacity, 0.3)
                });
            }
        });

        // Elegant floating animation on top of scroll movement
        gsap.to(redLine, {
            y: "+=20",
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });

        gsap.to(yellowLine, {
            y: "+=15",
            duration: 3.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1
        });

        // Subtle scale breathing effect
        gsap.to(redLine, {
            scale: "+=0.05",
            duration: 6,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true
        });

        gsap.to(yellowLine, {
            scale: "+=0.03",
            duration: 5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: 2
        });

        console.log('Sophisticated decorative lines animation initialized');
    } else {
        console.warn('Decorative lines not found - check selectors .decor-line-red and .decor-line-yellow');
    }
}

// Hero image slideshow (if multiple images exist)
function initHeroSlideshow() {
    const heroImages = document.querySelectorAll('.header-img img');
    if (heroImages.length > 1) {
        let currentIndex = 0;

        // Hide all images except first
        gsap.set(heroImages, { opacity: 0 });
        gsap.set(heroImages[0], { opacity: 1 });

        setInterval(() => {
            const nextIndex = (currentIndex + 1) % heroImages.length;
            gsap.to(heroImages[currentIndex], { opacity: 0, duration: 1 });
            gsap.to(heroImages[nextIndex], { opacity: 1, duration: 1 });
            currentIndex = nextIndex;
        }, 4000);
    }
}

// =====================
// ABOUT US SECTION ANIMATIONS
// =====================

function initAboutAnimations() {
    // Main title and center cake image fade in first
    gsap.set('.about-title', { opacity: 0, y: 30 });
    gsap.set('.gallery-img-2', { opacity: 0, scale: 0.8 }); // Center strawberry cake

    // Surrounding images (delayed fade in)
    gsap.set(['.gallery-img-1', '.gallery-img-3', '.gallery-img-4', '.gallery-img-5', '.gallery-img-6'], {
        opacity: 0,
        y: 50,
        scale: 0.9
    });

    // Create timeline for About section
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            once: true
        }
    });

    aboutTl
        .to('.about-title', { opacity: 1, y: 0, duration: 1 })
        .to('.gallery-img-2', { opacity: 1, scale: 1, duration: 1 }, "-=0.5")
        .to(['.gallery-img-1', '.gallery-img-3', '.gallery-img-4', '.gallery-img-5', '.gallery-img-6'], {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2
        }, "+=0.5");

    // Parallax effect for gallery images (only on desktop)
    if (window.innerWidth > 768) {
        gsap.utils.toArray('.about-gallery img').forEach(img => {
            gsap.to(img, {
                yPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });
    }
}

// =====================
// STEPS SECTION ANIMATIONS
// =====================



function initStepsAnimations() {
    // Background color change on scroll
    const stepsSection = document.querySelector('.steps-section');
    if (stepsSection) {
        gsap.to(stepsSection, {
            backgroundColor: '#373534',
            scrollTrigger: {
                trigger: '.steps-section',
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        });
    }

    // Get all step cards and the last step card
    const stepCards = gsap.utils.toArray('.step-card');
    const lastStepCard = document.querySelector('.step-card-last');
    const stepsRight = document.querySelector('.steps-right');
    const graphContainer = document.querySelector('.graph-container');
    const stepsLeft = document.querySelector('.steps-left');

    // ✅ Sticky behavior ONLY for screens wider than 768px
    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
            if (graphContainer && stepsLeft && lastStepCard && stepCards.length > 0) {
                ScrollTrigger.refresh();

                let isSticky = false;
                let originalStyles = {};

                // Store original styles
                const storeOriginalStyles = () => {
                    const computedStyle = window.getComputedStyle(graphContainer);
                    originalStyles = {
                        position: computedStyle.position,
                        top: computedStyle.top,
                        left: computedStyle.left,
                        right: computedStyle.right,
                        width: computedStyle.width,
                        height: computedStyle.height,
                        zIndex: computedStyle.zIndex,
                        transform: computedStyle.transform
                    };
                };

                storeOriginalStyles();

                ScrollTrigger.create({
                    trigger: stepsSection,
                    start: 'top bottom',
                    end: 'bottom top',
                    onUpdate: self => {
                        const scrollY = window.scrollY;
                        const graphRect = graphContainer.getBoundingClientRect();
                        const stepsRightRect = stepsRight.getBoundingClientRect();
                        const lastStepRect = lastStepCard.getBoundingClientRect();
                        const stepsSectionRect = stepsSection.getBoundingClientRect();

                        const withinStepsSection = (
                            stepsSectionRect.top <= window.innerHeight &&
                            stepsSectionRect.bottom >= 0
                        );

                        if (!withinStepsSection && isSticky) {
                            isSticky = false;
                            // Restore original styles
                            gsap.set(graphContainer, originalStyles);
                            console.log('Removed sticky - outside steps section');
                            return;
                        }

                        const shouldBeSticky = withinStepsSection && (
                            graphRect.bottom <= window.innerHeight &&
                            lastStepRect.top > window.innerHeight * 0.3 &&
                            stepsSectionRect.top <= 0
                        );

                        if (shouldBeSticky && !isSticky) {
                            isSticky = true;

                            // Get current viewport and container dimensions
                            const viewportWidth = window.innerWidth;
                            const viewportHeight = window.innerHeight;
                            const currentStepsRightRect = stepsRight.getBoundingClientRect();

                            // Calculate center position
                            const containerWidth = 480; // Fixed width for the graph
                            const containerHeight = 480; // Fixed height for the graph

                            // Center horizontally within the steps-right area
                            const leftPosition = currentStepsRightRect.left + (currentStepsRightRect.width - containerWidth) / 2;

                            // Center vertically in viewport
                            const topPosition = (viewportHeight - containerHeight) / 2;

                            gsap.set(graphContainer, {
                                position: 'fixed',
                                top: topPosition + 'px',
                                left: leftPosition + 'px',
                                right: 'auto',
                                bottom: 'auto',
                                width: containerWidth + 'px',
                                height: containerHeight + 'px',
                                zIndex: 100,
                                transform: 'none',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            });

                            // Ensure images are properly positioned - background centered, levels keep CSS positioning
                            const images = graphContainer.querySelectorAll('img');
                            images.forEach((img, index) => {
                                if (index === 0) {
                                    // First image (background) - center it
                                    gsap.set(img, {
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: 'auto',
                                        height: 'auto'
                                    });
                                } else {
                                    // Other images (levels) - don't override CSS positioning
                                    gsap.set(img, {
                                        maxWidth: '100%',
                                        maxHeight: '100%'
                                    });
                                }
                            });

                            console.log('Made sticky and perfectly centered');
                        } else if (!shouldBeSticky && isSticky) {
                            isSticky = false;
                            // Restore original styles
                            gsap.set(graphContainer, originalStyles);

                            // Reset images to normal
                            const images = graphContainer.querySelectorAll('img');
                            images.forEach((img, index) => {
                                if (index === 0) {
                                    // Reset background image
                                    gsap.set(img, {
                                        position: 'static',
                                        top: 'auto',
                                        left: 'auto',
                                        transform: 'none',
                                        maxWidth: 'none',
                                        maxHeight: 'none',
                                        width: 'auto',
                                        height: 'auto'
                                    });
                                } else {
                                    // Level images - minimal reset, let CSS handle positioning
                                    gsap.set(img, {
                                        maxWidth: 'none',
                                        maxHeight: 'none'
                                    });
                                }
                            });

                            console.log('Removed sticky');
                        }
                    }
                });

                // ✅ Graph level animations for BIG SCREENS ONLY
                const graphLevels = gsap.utils.toArray('.graph-container img:not(:first-child)');
                const allCards = gsap.utils.toArray('.steps-content .step-card, .steps-content .step-card-last');

                if (graphLevels.length > 0 && allCards.length > 0) {
                    graphLevels.forEach((level, index) => {
                        if (allCards[index]) {
                            // Hide levels initially
                            gsap.set(level, {
                                opacity: 0,
                                scale: 0.8
                            });

                            ScrollTrigger.create({
                                trigger: allCards[index],
                                start: 'top 70%',
                                onEnter: () => {
                                    gsap.to(level, {
                                        opacity: 1,
                                        scale: 1,
                                        duration: 0.6,
                                        ease: "back.out(1.7)"
                                    });
                                },
                                onLeaveBack: () => {
                                    gsap.to(level, {
                                        opacity: 0,
                                        scale: 0.8,
                                        duration: 0.4,
                                        ease: "power2.inOut"
                                    });
                                }
                            });
                        }
                    });
                    console.log('Graph level animations set up for big screen');
                }
            }
        },

        // ✅ On medium screens (tablets/mobile) - NO animations, just static
        "(max-width: 768px)": function () {
            // Do nothing - let CSS handle everything for mobile/tablet
            console.log('Mobile/tablet - letting CSS handle all positioning');
        }
    });

    // ✅ Responsive graph handling - COMPLETELY hands-off, let CSS handle everything
    const responsiveGraph = document.querySelector('#graph-responsive');
    if (responsiveGraph) {
        console.log('Responsive graph found - letting CSS handle all positioning and styling');
        // Don't touch anything - let CSS handle it completely
    }

    // Step cards animation - KEEP ALL ANIMATIONS
    const allStepCards = gsap.utils.toArray('.step-card, .step-card-last');

    allStepCards.forEach((card, index) => {
        gsap.set(card, {
            opacity: 0,
            x: -50,
            y: 20
        });

        gsap.to(card, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                once: true,
                toggleActions: "play none none none"
            }
        });

        ScrollTrigger.create({
            trigger: card,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => {
                gsap.to(card, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            },
            onLeave: () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            },
            onEnterBack: () => {
                gsap.to(card, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            },
            onLeaveBack: () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });

    // Timeline line animation - KEEP ALL ANIMATIONS
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
        gsap.set(timelineLine, { scaleY: 0, transformOrigin: 'top' });

        gsap.to(timelineLine, {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: timelineLine,
                start: 'top 80%',
                once: true
            }
        });
    }

    // Refresh ScrollTrigger on resize with debouncing
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
            console.log('ScrollTrigger refreshed after resize');
        }, 250);
    });

    // Final safety check - REMOVED - let CSS handle everything
    console.log('All responsive graph styling handled by CSS');
}
// =====================
// REQUEST SECTION ANIMATIONS
// =====================

function initRequestAnimations() {
    const requestCards = document.querySelectorAll('.request-card');

    // Function to collapse all other cards
    function collapseAllOtherCards(currentCard) {
        requestCards.forEach((otherCard, otherIndex) => {
            if (otherCard !== currentCard) {
                const otherDescription = otherCard.querySelector('.card-text-content p');
                const otherToggleIcon = otherCard.querySelector('.toggle-button img');
                const otherOverlay = otherCard.querySelector('.card-overlay');
                
                // Reset the expanded state for other cards
                otherCard.isExpanded = false;
                
                // Change button icon back to plus
                if (otherToggleIcon) {
                    otherToggleIcon.src = "images/5_348.svg"; // plus icon
                }
                
                // Hide description with animation
                if (otherDescription) {
                    gsap.to(otherDescription, {
                        opacity: 0,
                        height: 0,
                        marginTop: 0,
                        duration: 0.3,
                        ease: "power2.in"
                    });
                }
                
                // Reset overlay opacity to 0.3
                if (otherOverlay) {
                    gsap.to(otherOverlay, { opacity: 0.3, duration: 0.3 });
                }
            }
        });
    }

    requestCards.forEach((card, index) => {
        const img = card.querySelector('img');
        const overlay = card.querySelector('.card-overlay');
        const textContent = card.querySelector('.card-text-content');
        const toggleButton = card.querySelector('.toggle-button');
        const toggleIcon = toggleButton?.querySelector('img');
        const title = textContent.querySelector('h4');
        const subtitle = textContent.querySelector('h5');
        const description = textContent.querySelector('p');

        // Store expanded state on the card element itself
        card.isExpanded = false;

        // Set initial states
        gsap.set(card, { opacity: 0, y: "+=30" });

        // Set initial overlay opacity to 0.3
        if (overlay) {
            gsap.set(overlay, { opacity: 0.3 });
        }

        // Initially hide description text completely
        if (description) {
            gsap.set(description, {
                opacity: 0,
                height: 0,
                overflow: 'hidden',
                marginTop: 0,
                paddingTop: 0,
                paddingBottom: 0,
                display: 'block'
            });
        }

        // Ensure toggle button starts with plus icon
        if (toggleIcon) {
            toggleIcon.src = "images/5_348.svg"; // plus icon
        }

        // Card reveal animation (fade in)
        gsap.to(card, {
            opacity: 1,
            y: "-=30",
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',

                once: true
            },
            delay: index * 0.1
        });

        // Hover animations (only on desktop)
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', () => {
                if (img && !card.isExpanded) {
                    gsap.to(img, { scale: 1.05, duration: 0.3 });
                }
            });

            card.addEventListener('mouseleave', () => {
                if (img) {
                    gsap.to(img, { scale: 1, duration: 0.3 });
                }
            });
        }

        // Toggle functionality
        if (toggleButton) {
            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!card.isExpanded) {
                    // First, collapse all other cards
                    collapseAllOtherCards(card);
                    
                    // Expand: Show description content
                    card.isExpanded = true;

                    // Change button icon to minus
                    if (toggleIcon) {
                        toggleIcon.src = "images/5_365.svg"; // minus icon
                    }

                    // Show description with animation
                    if (description) {
                        // Clear all GSAP transforms and inline styles
                        gsap.killTweensOf(description);
                        description.removeAttribute('style');

                        // Create a temporary clone to measure natural height
                        const clone = description.cloneNode(true);
                        clone.style.visibility = 'hidden';
                        clone.style.position = 'absolute';
                        clone.style.height = 'auto';
                        clone.style.width = description.parentElement.offsetWidth + 'px';
                        clone.style.opacity = '1';
                        clone.style.display = 'block';
                        clone.style.marginTop = '10px';

                        // Add clone to measure
                        description.parentElement.appendChild(clone);
                        const naturalHeight = clone.offsetHeight;
                        description.parentElement.removeChild(clone);

                        // Set initial collapsed state
                        gsap.set(description, {
                            height: 0,
                            opacity: 0,
                            marginTop: 0,
                            overflow: 'hidden',
                            display: 'block'
                        });

                        // Animate to expanded state
                        gsap.to(description, {
                            opacity: 1,
                            height: naturalHeight,
                            marginTop: 10,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }

                    // Change overlay opacity to 0.9 when expanded
                    if (overlay) {
                        gsap.to(overlay, { opacity: 0.9, duration: 0.3 });
                    }

                } else {
                    // Collapse: Hide description content
                    card.isExpanded = false;

                    // Change button icon back to plus
                    if (toggleIcon) {
                        toggleIcon.src = "images/5_348.svg"; // plus icon
                    }

                    // Hide description with animation
                    if (description) {
                        gsap.to(description, {
                            opacity: 0,
                            height: 0,
                            marginTop: 0,
                            duration: 0.3,
                            ease: "power2.in"
                        });
                    }

                    // Reset overlay opacity to 0.3
                    if (overlay) {
                        gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
                    }
                }
            });
        }
    });

    // Animate the section title
    const requestIntro = document.querySelector('.request-intro h3');
    if (requestIntro) {
        gsap.set(requestIntro, { opacity: 0, y: 30 });
        gsap.to(requestIntro, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.request-section',
                start: 'top 70%',
                once: true
            }
        });
    }
}

// =====================
// MESSAGE SECTION ANIMATIONS
// =====================

function initMessageAnimations() {
    // Auto-scrolling "Message" background text
    const messageImg = document.querySelector('.message-section img[src*="Message"]');
    if (messageImg) {
        gsap.to(messageImg, {
            x: '-100%',
            duration: 20,
            repeat: -1,
            ease: 'none'
        });
    }

    // Message content fade in
    gsap.set('.message-vertical-title, .message-body', { opacity: 0, y: 30 });

    gsap.to('.message-vertical-title, .message-body', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: '.message-section',
            start: 'top 70%',
            once: true
        }
    });
}

// =====================
// GALLERY SECTION ANIMATIONS
// =====================

function initGalleryAnimations() {
    const galleryContainer = document.querySelector('.gallery-scroll-container');
    if (galleryContainer) {
        const images = Array.from(galleryContainer.querySelectorAll('img'));
        let autoScrollTween;
        let isInteracting = false;
        let currentIndex = 0;

        // Duplicate the images for infinite loop effect
        images.forEach(img => {
            const clone = img.cloneNode(true);
            galleryContainer.appendChild(clone);
        });

        // Calculate dimensions
        const allImages = Array.from(galleryContainer.querySelectorAll('img'));
        const imageWidth = images[0].offsetWidth + 10; // including gap
        const totalImages = images.length;
        const totalWidth = imageWidth * totalImages;

        let currentPosition = 0;
        let animationId;

        // Auto-scroll function
        function startAutoScroll() {
            if (isInteracting) return;

            const speed = 1; // pixels per frame

            function animate() {
                if (isInteracting) return;

                currentPosition += speed;

                // Reset position when we've scrolled through one full set
                if (currentPosition >= totalWidth) {
                    currentPosition = 0;
                }

                galleryContainer.style.transform = `translateX(-${currentPosition}px)`;
                animationId = requestAnimationFrame(animate);
            }

            animate();
        }

        // Stop auto-scroll
        function stopAutoScroll() {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }

        // Snap to nearest image (swiper behavior)
        function snapToNearestImage() {
            const nearestIndex = Math.round(currentPosition / imageWidth);
            const targetPosition = nearestIndex * imageWidth;

            // Handle wrapping
            if (targetPosition >= totalWidth) {
                currentPosition = 0;
                galleryContainer.style.transform = `translateX(0px)`;
            } else {
                currentPosition = targetPosition;
                galleryContainer.style.transition = 'transform 0.3s ease-out';
                galleryContainer.style.transform = `translateX(-${currentPosition}px)`;

                // Remove transition after animation
                setTimeout(() => {
                    galleryContainer.style.transition = '';
                }, 300);
            }
        }

        // Mouse enter/leave events
        galleryContainer.addEventListener('mouseenter', () => {
            isInteracting = true;
            stopAutoScroll();
        });

        galleryContainer.addEventListener('mouseleave', () => {
            if (!isDragging) {
                isInteracting = false;
                snapToNearestImage();

                // Resume auto-scroll after a short delay
                setTimeout(() => {
                    startAutoScroll();
                }, 500);
            }
        });

        // Mouse drag functionality
        let isDragging = false;
        let startX = 0;
        let startPosition = 0;

        galleryContainer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            isInteracting = true;
            startX = e.clientX;
            startPosition = currentPosition;
            galleryContainer.style.cursor = 'grabbing';
            stopAutoScroll();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();

            const deltaX = startX - e.clientX;
            let newPosition = startPosition + deltaX;

            // Allow smooth dragging with wrapping
            if (newPosition < 0) {
                newPosition = totalWidth + newPosition;
            } else if (newPosition >= totalWidth) {
                newPosition = newPosition - totalWidth;
            }

            currentPosition = newPosition;
            galleryContainer.style.transform = `translateX(-${currentPosition}px)`;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                galleryContainer.style.cursor = 'grab';

                // Snap to nearest image
                snapToNearestImage();

                // Update current index based on position
                currentIndex = Math.round(currentPosition / imageWidth) % totalImages;

                // Resume auto-scroll after delay
                setTimeout(() => {
                    isInteracting = false;
                    startAutoScroll();
                }, 1000);
            }
        });

        // Touch events for mobile
        let touchStartX = 0;
        let touchStartPosition = 0;

        galleryContainer.addEventListener('touchstart', (e) => {
            isInteracting = true;
            touchStartX = e.touches[0].clientX;
            touchStartPosition = currentPosition;
            stopAutoScroll();
        }, { passive: true });

        galleryContainer.addEventListener('touchmove', (e) => {
            const deltaX = touchStartX - e.touches[0].clientX;
            let newPosition = touchStartPosition + deltaX;

            // Handle wrapping
            if (newPosition < 0) {
                newPosition = totalWidth + newPosition;
            } else if (newPosition >= totalWidth) {
                newPosition = newPosition - totalWidth;
            }

            currentPosition = newPosition;
            galleryContainer.style.transform = `translateX(-${currentPosition}px)`;
        }, { passive: true });

        galleryContainer.addEventListener('touchend', () => {
            // Snap to nearest image
            snapToNearestImage();

            // Update current index
            currentIndex = Math.round(currentPosition / imageWidth) % totalImages;

            // Resume auto-scroll after delay
            setTimeout(() => {
                isInteracting = false;
                startAutoScroll();
            }, 1000);
        }, { passive: true });

        // Set initial styles
        galleryContainer.style.cursor = 'grab';
        galleryContainer.style.userSelect = 'none';
        galleryContainer.style.display = 'flex';

        // Prevent context menu
        galleryContainer.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Image fade-in animation
        images.forEach((img, index) => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.8)';

            setTimeout(() => {
                img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, index * 200);
        });

        // Start auto-scroll initially
        startAutoScroll();

        // Cleanup function
        return () => {
            stopAutoScroll();
            clearTimeout(galleryContainer.resumeTimeout);
        };
    }
}

// Initialize when DOM is ready




// =====================
// CTA FIXED POSITION
// =====================

// =====================
// CTA FIXED POSITION
// =====================

function initFixedCTA() {
    // Create a fixed CTA element matching your simple design
    const fixedCTA = document.createElement('div');
    fixedCTA.className = 'fixed-cta';
    fixedCTA.innerHTML = `
        <div class="fixed-cta-container">
            <div class="link-bg-white1">
                <a href="#section-details" class="link-recruit1">
                    <img src="./images/ico_form.png" alt="Form Icon" />
                    <div class="recruit-text1">募集要項を見る</div>
                </a>
                <div class="link-border1"></div>
                <a href="#section-entry" class="link-entry1">
                    <img src="./images/ico_entry.png" alt="Entry Icon" />
                    <div class="entry-text1">応募する</div>
                </a>
            </div>
        </div>
    `;

    // Add comprehensive styles to match your design exactly
    const style = document.createElement('style');
    style.textContent = `
        .fixed-cta {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100%);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .fixed-cta-container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .link-bg-white1 {
            position: relative;
            background: #FFFFFF;
            box-shadow: 5px 20px 40px rgba(40, 40, 40, 0.08);
            border-radius: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px 30px;
            gap: 20px;
            min-width: 400px;
            height: 70px;
        }
        
        .link-border1 {
            width: 1px;
            height: 40px;
            background: #E8E8E8;
            flex-shrink: 0;
        }
        
        .link-recruit1,
        .link-entry1 {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            text-decoration: none;
            color: #282828;
            font-family: 'Noto Sans JP', sans-serif;
            font-weight: 500;
            font-size: 16px;
            transition: all 0.3s ease;
            flex: 1;
        }
        
        .link-recruit1:hover,
        .link-entry1:hover {
            transform: scale(1.05);
            color: #8B4513;
        }
        
        .link-recruit1 img,
        .link-entry1 img {
            width: 30px;
            height: 30px;
            object-fit: contain;
        }
        
        .recruit-text1,
        .entry-text1 {
            white-space: nowrap;
            margin: 0;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .link-bg-white1 {
                min-width: 350px;
                height: 60px;
                padding: 10px 20px;
                gap: 15px;
            }
            
            .link-recruit1,
            .link-entry1 {
                font-size: 14px;
                gap: 8px;
            }
            
            .link-recruit1 img,
            .link-entry1 img {
                width: 24px;
                height: 24px;
            }
            
            .link-border1 {
                height: 30px;
            }
        }
        
        @media (max-width: 480px) {
            .link-bg-white1 {
                min-width: 300px;
                height: 55px;
                padding: 8px 15px;
                gap: 10px;
            }
            
            .link-recruit1,
            .link-entry1 {
                font-size: 12px;
                gap: 6px;
            }
            
            .link-recruit1 img,
            .link-entry1 img {
                width: 20px;
                height: 20px;
            }
            
            .link-border1 {
                height: 25px;
            }
        }
        
        /* Animation states */
        .fixed-cta.show {
            transform: translateX(-50%) translateY(0);
        }
        
        .fixed-cta.hide {
            transform: translateX(-50%) translateY(100%);
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(fixedCTA);

    // Show CTA when hero is half scrolled
    ScrollTrigger.create({
        trigger: '.header',
        start: 'bottom 20%',
        onEnter: () => {
            fixedCTA.classList.add('show');
            gsap.to(fixedCTA, {
                y: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        },
        onLeaveBack: () => {
            fixedCTA.classList.remove('show');
            gsap.to(fixedCTA, {
                y: '100%',
                duration: 0.5,
                ease: "power2.in"
            });
        }
    });

    // Add click tracking for analytics if needed
    const recruitLink = fixedCTA.querySelector('.link-recruit1');
    const entryLink = fixedCTA.querySelector('.link-entry1');

    recruitLink.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: "#section-details",
                offsetY: 100
            },
            ease: "power2.out"
        });
    });

    entryLink.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: "#section-entry",
                offsetY: 100
            },
            ease: "power2.out"
        });
    });
}

// =====================
// MODAL FUNCTIONALITY
// =====================

// =====================
// MODAL FUNCTIONALITY
// =====================



// =====================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// =====================

function initSmoothScrolling() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 100
                    },
                    ease: "power2.out"
                });
            }
        });
    });
}

// =====================
// INITIALIZATION
// =====================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initDecorativeLines();
    initHeroSlideshow();
    initAboutAnimations();
    initStepsAnimations();
    initRequestAnimations();
    initMessageAnimations();
    initGalleryAnimations();
    initFixedCTA();
    initSmoothScrolling();

    // General fade-in animations for other elements
    gsap.utils.toArray('.details-section, .entry-section').forEach(section => {
        gsap.set(section.children, { opacity: 0, y: 30 });

        gsap.to(section.children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                once: true
            }
        });
    });
});

// =====================
// RESPONSIVE ADJUSTMENTS
// =====================

// Disable some animations on mobile for performance
if (window.innerWidth <= 768) {
    // Disable parallax on mobile
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.scrub) {
            trigger.kill();
        }
    });
}


$(document).ready(function () {
    $('.carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: true,
        dots: false,
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        autoplay: true, // Enable autoplay
        autoplaySpeed: 1000, // Autoplay interval in milliseconds
        pauseOnHover: true, // Pause on hover
        pauseOnFocus: true, // Pause on focus
        swipeToSlide: true, // Allow manual swiping
        touchMove: true,
        responsive: [
        {
            breakpoint: 1024, // screens smaller than 1024px
            settings: {
                slidesToShow: 3,
                centerMode: true,
                centerPadding: '0px'
            }
        },
        {
            breakpoint: 768, // screens smaller than 768px
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '20%'
            }
        },
        {
            breakpoint: 600, // screens smaller than 600px
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '15%'
            }
        },
        {
            breakpoint: 500, // screens smaller than 500px
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '10%'
            }
        },
        {
            breakpoint: 400, // screens smaller than 400px
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '5%'
            }
        },
        {
            breakpoint: 360, // screens smaller than 360px
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '2%'
            }
        }
    ]
    });
});