/**
 * Maladh Al Haya - Effects JavaScript File
 * Handles cursor and touch effects for the website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cursor effects only on desktop devices
    if (window.matchMedia('(min-width: 992px)').matches) {
        initCustomCursor();
    }

    // Initialize touch ripple effect on all devices
    initTouchRipple();

    // Initialize side menu hover effect
    initSideMenuHover();
});

/**
 * Initialize custom cursor effect
 * Creates a custom cursor that follows the mouse movement
 * and changes size when hovering over interactive elements
 */
function initCustomCursor() {
    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Show cursor after it's positioned
        if (cursor.style.display !== 'block') {
            cursor.style.display = 'block';
        }
    });

    // Add active class when hovering over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .card, .product-card, .nav-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });

    // Hide cursor when it leaves the window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null || e.relatedTarget.nodeName === 'HTML') {
            cursor.classList.add('hidden');
        }
    });

    // Show cursor when it enters the window
    document.addEventListener('mouseover', (e) => {
        if (cursor.classList.contains('hidden')) {
            cursor.classList.remove('hidden');
        }
    });

    // Auto-hide cursor after 3 seconds of inactivity
    let cursorTimeout;
    document.addEventListener('mousemove', () => {
        clearTimeout(cursorTimeout);
        
        if (cursor.classList.contains('hidden')) {
            cursor.classList.remove('hidden');
        }
        
        cursorTimeout = setTimeout(() => {
            cursor.classList.add('hidden');
        }, 3000);
    });
}

/**
 * Initialize touch ripple effect
 * Creates a ripple effect when touching/clicking elements
 */
function initTouchRipple() {
    // Add ripple effect to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .product-card, .nav-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('click', createRipple);
        el.addEventListener('touchstart', createRipple, { passive: true });
    });

    function createRipple(event) {
        // Don't create ripple for right clicks
        if (event.type === 'click' && event.button !== 0) {
            return;
        }

        const element = this;
        
        // Get position relative to the element
        const rect = element.getBoundingClientRect();
        let x, y;
        
        if (event.type === 'touchstart') {
            x = event.touches[0].clientX - rect.left;
            y = event.touches[0].clientY - rect.top;
        } else {
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
        }
        
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('touch-ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        // Add ripple to element
        element.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

/**
 * Initialize side menu hover effect
 * Shows the side menu when cursor approaches the side of the screen
 */
function initSideMenuHover() {
    const sideMenu = document.querySelector('.side-menu');
    if (!sideMenu) return;
    
    // Detect when cursor is near the left edge of the screen
    document.addEventListener('mousemove', (e) => {
        // Only on desktop
        if (!window.matchMedia('(min-width: 992px)').matches) return;
        
        // If cursor is within 20px of the left edge
        if (e.clientX <= 20) {
            sideMenu.classList.add('active');
        } else if (e.clientX > 300 && !sideMenu.contains(e.target)) {
            // If cursor moves away from the menu and not hovering over the menu
            sideMenu.classList.remove('active');
        }
    });
    
    // Close side menu when clicking outside
    document.addEventListener('click', (e) => {
        if (sideMenu.classList.contains('active') && !sideMenu.contains(e.target)) {
            sideMenu.classList.remove('active');
        }
    });
    
    // Add close button to side menu
    const closeButton = document.createElement('button');
    closeButton.classList.add('side-menu-close');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.setAttribute('aria-label', 'Close side menu');
    sideMenu.appendChild(closeButton);
    
    closeButton.addEventListener('click', () => {
        sideMenu.classList.remove('active');
    });
}

/**
 * Initialize scroll animations
 * Adds animations when scrolling up or down
 */
function initScrollAnimations() {
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    const scrollUpElements = document.querySelectorAll('.animate-on-scroll-up');
    const scrollDownElements = document.querySelectorAll('.animate-on-scroll-down');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Determine scroll direction
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            if (header) {
                header.classList.add('header-hidden');
            }
            
            scrollDownElements.forEach(el => {
                if (isElementInViewport(el)) {
                    el.classList.add('animate');
                }
            });
        } else {
            // Scrolling up
            if (header) {
                header.classList.remove('header-hidden');
            }
            
            scrollUpElements.forEach(el => {
                if (isElementInViewport(el)) {
                    el.classList.add('animate');
                }
            });
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }, { passive: true });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});