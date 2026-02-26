document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Respect prefers-reduced-motion
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                
                if (!prefersReducedMotion) {
                    entry.target.classList.add('visible');
                } else {
                    // Instantly make visible without transition if reduced motion is preferred
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                    entry.target.classList.add('visible');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Fallback: If elements aren't intersecting (e.g., loaded at bottom of page), guarantee visibility
    setTimeout(() => {
        fadeElements.forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, 2000); 
});
