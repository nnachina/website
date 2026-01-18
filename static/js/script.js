// Optimize scroll performance with requestAnimationFrame
let ticking = false;

// Prevent hash-based scrolling on reload
if (window.location.hash) {
    // Store the hash temporarily
    const hash = window.location.hash;
    // Remove the hash without triggering scroll
    history.replaceState(null, null, ' ');
}

function updateScrollEffects() {
    const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const waves = document.querySelectorAll('.wave');
    
    // Handle WIP notice fade based on scroll
    const wipNotice = document.getElementById('wipNotice');
    const siteHeader = document.querySelector('.site-header');
    if (wipNotice && wipNotice.style.display !== 'none') {
        // Fade starts at 0 scroll, fully faded by 500px
        const fadeDistance = 500;
        const scrollY = window.scrollY;
        
        if (scrollY >= fadeDistance) {
            wipNotice.style.display = 'none';
            if (siteHeader) {
                siteHeader.style.top = '0';
            }
        } else {
            const opacity = 1 - (scrollY / fadeDistance);
            wipNotice.style.opacity = Math.max(0, opacity);
        }
    }
    
    waves.forEach((wave, index) => {
        // Waves fade out as you scroll deeper
        const fadeStart = 0.2 + (index * 0.1);
        const fadeEnd = 0.5 + (index * 0.1);
        
        if (scrollPercentage < fadeStart) {
            wave.style.opacity = 0.6 - (index * 0.1);
        } else if (scrollPercentage > fadeEnd) {
            wave.style.opacity = 0;
        } else {
            const fadeProgress = (scrollPercentage - fadeStart) / (fadeEnd - fadeStart);
            wave.style.opacity = (0.6 - (index * 0.1)) * (1 - fadeProgress);
        }
    });
    
    // Parallax effect removed to prevent conflict with CSS animations
    
    // Adjust ocean container opacity based on depth
    const oceanContainer = document.querySelector('.ocean-container');
    if (oceanContainer) {
        oceanContainer.style.opacity = Math.max(0.3, 1 - scrollPercentage);
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}, { passive: true });

// Particle system removed for performance

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Toggle text morph on title hover/click
document.addEventListener('DOMContentLoaded', () => {
    const surfaceTitle = document.querySelector('.site-title');
    if (surfaceTitle) {
        const originalText = 'Lost In A Sea Of<br>Parentheses';
        const morphedText = 'Lost Ina Seaof<br>Parentheses';
        let isMorphed = false;
        
        const morphText = () => {
            surfaceTitle.innerHTML = morphedText;
            isMorphed = true;
        };
        
        const unmorphText = () => {
            surfaceTitle.innerHTML = originalText;
            isMorphed = false;
        };
        
        surfaceTitle.addEventListener('mouseenter', morphText);
        surfaceTitle.addEventListener('mouseleave', () => {
            if (!surfaceTitle.classList.contains('locked')) {
                unmorphText();
            }
        });
        
        surfaceTitle.addEventListener('click', () => {
            if (surfaceTitle.classList.contains('locked')) {
                surfaceTitle.classList.remove('locked');
                unmorphText();
            } else {
                surfaceTitle.classList.add('locked');
                morphText();
            }
        });
    }
});
