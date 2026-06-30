// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // If reduced motion is preferred, don't run complex GSAP animations
        // Basic CSS fallbacks will take over
        gsap.set(".char-wrap, .reveal-element", { y: 0, opacity: 1, rotation: 0, scale: 1 });
        return;
    }

    /* =========================================
       HERO ANIMATION (ON LOAD)
       ========================================= */
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Initial state
    gsap.set(".hero-sticker", { scale: 0, rotation: -45 });
    gsap.set(".hero-shape-1", { scale: 0, opacity: 0 });
    gsap.set(".hero-shape-2", { scale: 0, opacity: 0 });
    gsap.set(".hero-btn", { y: 50, opacity: 0 });
    gsap.set(".hero-subtitle", { y: 20, opacity: 0 });

    heroTl
        // Stagger text in
        .to(".char-wrap", {
            y: "0%",
            duration: 1,
            stagger: 0.1,
            ease: "expo.out"
        })
        // Pop in the sticker with a bounce
        .to(".hero-sticker", {
            scale: 1,
            rotation: -5,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.6")
        // Fade in subtitle
        .to(".hero-subtitle", {
            y: 0,
            opacity: 1,
            duration: 0.6
        }, "-=0.4")
        // Button settles in
        .to(".hero-btn", {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.2)"
        }, "-=0.4")
        // Pop in decorative shapes
        .to(".hero-shape-1", {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.5)"
        }, "-=0.8")
        .to(".hero-shape-2", {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.5)"
        }, "-=0.6");


    /* =========================================
       PROJECT PAGE ANIMATIONS (ON LOAD)
       ========================================= */
    // Set initial state to prevent flash of unstyled content
    gsap.set(".project-anim", { y: 30, opacity: 0 });
    
    // Animate in smoothly without scroll trigger
    gsap.to(".project-anim", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1
    });

    /* =========================================
       BACKGROUND SHAPE FLOATING
       ========================================= */
    // Subtle persistent animation for shapes
    gsap.to(".hero-shape-1", {
        y: -30,
        x: 20,
        rotation: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-shape-2", {
        y: 30,
        x: -20,
        rotation: -25,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    /* =========================================
       SCROLL REVEALS
       ========================================= */
    
    // Select all elements with the 'reveal-element' class
    const revealElements = document.querySelectorAll('.reveal-element');

    revealElements.forEach((el, index) => {
        // Different animation based on element type
        let animProps = {
            y: 100,
            opacity: 0,
            rotation: 5
        };

        if (el.classList.contains('section-title')) {
            animProps = { x: -100, opacity: 0, rotation: 0 };
        } else if (el.classList.contains('service-card')) {
            animProps = { y: 150, opacity: 0, rotation: (index % 2 === 0) ? -5 : 5, scale: 0.9 };
        } else if (el.classList.contains('work-card')) {
            animProps = { y: 100, opacity: 0, rotation: (index % 2 === 0) ? 2 : -2 };
        } else if (el.classList.contains('hero-subtitle') || el.classList.contains('project-title') || el.tagName.toLowerCase() === 'p') {
            // Text blocks look janky when rotated during animation. Just slide and fade.
            animProps = { y: 30, opacity: 0, rotation: 0 };
        }

        gsap.from(el, {
            ...animProps,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Trigger when top of element hits 85% of viewport
                toggleActions: "play none none reverse" // Play on enter, reverse on leave back
            }
        });
    });

    // Parallax effect on work images
    const workImages = document.querySelectorAll('.work-placeholder');
    workImages.forEach(img => {
        gsap.to(img, {
            y: "20%", // Move down slightly as user scrolls down
            ease: "none",
            scrollTrigger: {
                trigger: img.closest('.work-card'),
                start: "top bottom",
                end: "bottom top",
                scrub: true // Scub smoothly ties animation progress to scroll bar
            }
        });
    });
});
