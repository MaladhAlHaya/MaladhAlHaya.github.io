/**
 * Maladh Al Haya - Main JavaScript File
 * Contains core functionality for the website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initThemeToggle();
  initSideMenu();
  initDropdowns();
  initProductGallery();
  initQuantitySelectors();
  initScrollAnimations();
  initCustomCursor();
  initTouchEffect();
  initFeaturedProductSwipe();
  initFloatingNav();
  initSearchFunctionality();
  
  // Remove loading state
  document.body.classList.remove('loading');
  document.body.classList.add('loaded');
});

/**
 * Theme Toggle Functionality
 * Switches between dark and light themes
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  if (!themeToggleBtn) return;
  
  // Check for saved theme preference or use default (dark)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.add(`${savedTheme}-theme`);
  
  // Toggle theme on button click
  themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.replace('dark-theme', 'light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.replace('light-theme', 'dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  });
}

/**
 * Side Menu Functionality
 * Handles opening and closing the side menu
 */
function initSideMenu() {
  const sideMenu = document.querySelector('.side-menu');
  const sideMenuToggle = document.querySelector('.side-menu-toggle');
  const closeMenuBtn = document.querySelector('.close-menu-btn');
  const sideMenuOverlay = document.createElement('div');
  
  if (!sideMenu || !sideMenuToggle) return;
  
  // Create overlay
  sideMenuOverlay.classList.add('side-menu-overlay');
  document.body.appendChild(sideMenuOverlay);
  
  // Open menu
  sideMenuToggle.addEventListener('click', () => {
    sideMenu.classList.add('active');
    sideMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close menu
  const closeMenu = () => {
    sideMenu.classList.remove('active');
    sideMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  closeMenuBtn.addEventListener('click', closeMenu);
  sideMenuOverlay.addEventListener('click', closeMenu);
  
  // Wake up side menu on hover (desktop only)
  if (window.innerWidth >= 992) {
    const sideMenuTriggerArea = document.createElement('div');
    sideMenuTriggerArea.style.position = 'fixed';
    sideMenuTriggerArea.style.top = '0';
    sideMenuTriggerArea.style.left = '0';
    sideMenuTriggerArea.style.width = '20px';
    sideMenuTriggerArea.style.height = '100%';
    sideMenuTriggerArea.style.zIndex = '1000';
    document.body.appendChild(sideMenuTriggerArea);
    
    sideMenuTriggerArea.addEventListener('mouseenter', () => {
      sideMenu.classList.add('active');
    });
    
    sideMenu.addEventListener('mouseleave', () => {
      sideMenu.classList.remove('active');
    });
  }
}

/**
 * Dropdown Functionality
 * Handles dropdown menus in the side menu
 */
function initDropdowns() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      
      const dropdownMenu = toggle.nextElementSibling;
      
      // Toggle active class
      toggle.classList.toggle('active');
      dropdownMenu.classList.toggle('active');
    });
  });
}

/**
 * Product Gallery Functionality
 * Handles product image gallery on product detail pages
 */
function initProductGallery() {
  const galleryMain = document.querySelector('.gallery-main img');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const prevBtn = document.querySelector('.gallery-control.prev');
  const nextBtn = document.querySelector('.gallery-control.next');
  
  if (!galleryMain || thumbnails.length === 0) return;
  
  let currentIndex = 0;
  
  // Set active thumbnail
  const setActiveThumbnail = (index) => {
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnails[index].classList.add('active');
    galleryMain.src = thumbnails[index].querySelector('img').src;
    currentIndex = index;
  };
  
  // Initialize first thumbnail as active
  setActiveThumbnail(0);
  
  // Thumbnail click event
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      setActiveThumbnail(index);
    });
  });
  
  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = thumbnails.length - 1;
      setActiveThumbnail(newIndex);
    });
  }
  
  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= thumbnails.length) newIndex = 0;
      setActiveThumbnail(newIndex);
    });
  }
}

/**
 * Quantity Selector Functionality
 * Handles quantity selectors on product pages
 */
function initQuantitySelectors() {
  const quantitySelectors = document.querySelectorAll('.quantity-selector');
  
  quantitySelectors.forEach(selector => {
    const minusBtn = selector.querySelector('.quantity-btn.minus');
    const plusBtn = selector.querySelector('.quantity-btn.plus');
    const input = selector.querySelector('.quantity-input');
    
    if (!minusBtn || !plusBtn || !input) return;
    
    // Set minimum quantity
    const minQuantity = 1;
    
    // Decrease quantity
    minusBtn.addEventListener('click', () => {
      let currentValue = parseInt(input.value);
      if (currentValue > minQuantity) {
        input.value = currentValue - 1;
        minusBtn.classList.remove('disabled');
      }
      if (parseInt(input.value) === minQuantity) {
        minusBtn.classList.add('disabled');
      }
    });
    
    // Increase quantity
    plusBtn.addEventListener('click', () => {
      let currentValue = parseInt(input.value);
      input.value = currentValue + 1;
      minusBtn.classList.remove('disabled');
    });
    
    // Input change
    input.addEventListener('change', () => {
      let currentValue = parseInt(input.value);
      if (isNaN(currentValue) || currentValue < minQuantity) {
        input.value = minQuantity;
        minusBtn.classList.add('disabled');
      } else {
        minusBtn.classList.toggle('disabled', currentValue === minQuantity);
      }
    });
  });
}

/**
 * Scroll Animations
 * Adds animations to elements when they come into view
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length === 0) return;
  
  const checkScroll = () => {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  };
  
  // Check elements on load
  checkScroll();
  
  // Check elements on scroll
  window.addEventListener('scroll', checkScroll);
}

/**
 * Custom Cursor
 * Creates a custom cursor that follows the mouse
 */
function initCustomCursor() {
  // Only initialize on desktop
  if (window.innerWidth < 992 || 'ontouchstart' in window) return;
  
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);
  
  // Move cursor with mouse
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  
  // Add hover effect
  document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
  });
  
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
  });
  
  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .product-card');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
  
  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', () => {
    cursor.classList.add('hidden');
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('hidden');
  });
  
  // Auto-hide cursor after 3 seconds of inactivity
  let cursorTimeout;
  
  const resetCursorTimeout = () => {
    clearTimeout(cursorTimeout);
    cursor.classList.remove('hidden');
    
    cursorTimeout = setTimeout(() => {
      cursor.classList.add('hidden');
    }, 3000);
  };
  
  document.addEventListener('mousemove', resetCursorTimeout);
  resetCursorTimeout();
}

/**
 * Touch Effect
 * Creates a ripple effect on touch
 */
function initTouchEffect() {
  // Only initialize on touch devices
  if (!('ontouchstart' in window)) return;
  
  document.addEventListener('touchstart', (e) => {
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    
    const touchEffect = document.createElement('div');
    touchEffect.classList.add('touch-effect');
    touchEffect.style.left = `${x}px`;
    touchEffect.style.top = `${y}px`;
    
    document.body.appendChild(touchEffect);
    
    setTimeout(() => {
      touchEffect.remove();
    }, 600);
  });
}

/**
 * Featured Product Swipe
 * Enables swiping through featured products
 */
function initFeaturedProductSwipe() {
  const featuredProducts = document.querySelectorAll('.featured-product');
  
  if (featuredProducts.length <= 1) return;
  
  let currentIndex = 0;
  let startX, moveX;
  let isAnimating = false;
  
  // Hide all products except the first one
  featuredProducts.forEach((product, index) => {
    if (index !== 0) {
      product.style.display = 'none';
    }
  });
  
  // Show next product
  const showNextProduct = () => {
    if (isAnimating) return;
    isAnimating = true;
    
    featuredProducts[currentIndex].classList.add('fade-out');
    
    setTimeout(() => {
      featuredProducts[currentIndex].style.display = 'none';
      featuredProducts[currentIndex].classList.remove('fade-out');
      
      currentIndex = (currentIndex + 1) % featuredProducts.length;
      
      featuredProducts[currentIndex].style.display = 'flex';
      featuredProducts[currentIndex].classList.add('fade-in');
      
      setTimeout(() => {
        featuredProducts[currentIndex].classList.remove('fade-in');
        isAnimating = false;
      }, 500);
    }, 500);
  };
  
  // Show previous product
  const showPrevProduct = () => {
    if (isAnimating) return;
    isAnimating = true;
    
    featuredProducts[currentIndex].classList.add('fade-out');
    
    setTimeout(() => {
      featuredProducts[currentIndex].style.display = 'none';
      featuredProducts[currentIndex].classList.remove('fade-out');
      
      currentIndex = (currentIndex - 1 + featuredProducts.length) % featuredProducts.length;
      
      featuredProducts[currentIndex].style.display = 'flex';
      featuredProducts[currentIndex].classList.add('fade-in');
      
      setTimeout(() => {
        featuredProducts[currentIndex].classList.remove('fade-in');
        isAnimating = false;
      }, 500);
    }, 500);
  };
  
  // Touch events for swiping
  featuredProducts.forEach(product => {
    product.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    product.addEventListener('touchmove', (e) => {
      moveX = e.touches[0].clientX;
    });
    
    product.addEventListener('touchend', () => {
      if (startX - moveX > 50) {
        showNextProduct();
      } else if (moveX - startX > 50) {
        showPrevProduct();
      }
    });
  });
  
  // Click events for swipe indicators
  const nextButtons = document.querySelectorAll('.swipe-indicator');
  nextButtons.forEach(button => {
    button.addEventListener('click', showNextProduct);
  });
}

/**
 * Floating Navigation
 * Handles the floating navigation bar
 */
function initFloatingNav() {
  const floatingNav = document.querySelector('.floating-nav');
  
  if (!floatingNav) return;
  
  // Hide floating nav on scroll down, show on scroll up
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      floatingNav.classList.add('hidden');
    } else {
      floatingNav.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Active state for nav items
  const navItems = floatingNav.querySelectorAll('.floating-nav-item');
  const currentPath = window.location.pathname;
  
  navItems.forEach(item => {
    const itemPath = item.getAttribute('href');
    
    if (currentPath === itemPath || (currentPath.includes(itemPath) && itemPath !== '/')) {
      item.classList.add('active');
    }
  });
}

/**
 * Search Functionality
 * Handles the search functionality
 */
function initSearchFunctionality() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  if (!searchInput || !searchBtn) return;
  
  // Search on button click
  searchBtn.addEventListener('click', () => {
    if (searchInput.value.trim() !== '') {
      window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
  });
  
  // Search on Enter key
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
      window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
  });
}

/**
 * Add to Cart Functionality
 * Handles adding products to cart
 */
function addToCart(productId, quantity = 1) {
  // Get existing cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex(item => item.id === productId);
  
  if (existingProductIndex !== -1) {
    // Update quantity if product already exists
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Add new product to cart
    cart.push({
      id: productId,
      quantity: quantity
    });
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
  
  // Show success message
  showToast('Product added to cart!');
}

/**
 * Update Cart Count
 * Updates the cart count in the UI
 */
function updateCartCount() {
  const cartCountElements = document.querySelectorAll('.cart-count');
  
  if (cartCountElements.length === 0) return;
  
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Calculate total quantity
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Update cart count elements
  cartCountElements.forEach(element => {
    element.textContent = totalQuantity;
    
    if (totalQuantity > 0) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  });
}

/**
 * Show Toast Message
 * Displays a toast message
 */
function showToast(message, type = 'success', duration = 3000) {
  // Create toast element
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${type}`);
  toast.textContent = message;
  
  // Add toast to the DOM
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Hide and remove toast after duration
  setTimeout(() => {
    toast.classList.remove('show');
    
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

// Initialize cart count on page load
updateCartCount();