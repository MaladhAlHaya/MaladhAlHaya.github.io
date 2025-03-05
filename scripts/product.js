/**
 * Maladh Al Haya - Product JavaScript File
 * Handles product page functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize product gallery
    initProductGallery();
    
    // Initialize quantity selector
    initQuantitySelector();
    
    // Initialize product tabs
    initProductTabs();
    
    // Initialize product actions
    initProductActions();
    
    // Initialize review form
    initReviewForm();
});

/**
 * Initialize product gallery
 * Handles thumbnail clicks and image zoom
 */
function initProductGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const modal = document.getElementById('product-image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentImageIndex = 0;
    const imageUrls = Array.from(thumbnails).map(thumb => thumb.getAttribute('data-image'));
    
    // Thumbnail click event
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            // Update main image
            const imageUrl = thumbnail.getAttribute('data-image');
            mainImage.src = imageUrl;
            
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
            
            // Update current index
            currentImageIndex = index;
        });
    });
    
    // Image zoom on click
    if (mainImage && modal && modalImage) {
        mainImage.addEventListener('click', () => {
            modalImage.src = mainImage.src;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
        
        // Close modal
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
        
        // Navigate through images in modal
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
            modalImage.src = imageUrls[currentImageIndex];
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
            modalImage.src = imageUrls[currentImageIndex];
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
                    modalImage.src = imageUrls[currentImageIndex];
                } else if (e.key === 'ArrowRight') {
                    currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
                    modalImage.src = imageUrls[currentImageIndex];
                } else if (e.key === 'Escape') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Restore scrolling
                }
            }
        });
    }
}

/**
 * Initialize quantity selector
 * Handles quantity input and buttons
 */
function initQuantitySelector() {
    const quantityInput = document.getElementById('quantity-input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    if (quantityInput && minusBtn && plusBtn) {
        // Decrease quantity
        minusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        // Increase quantity
        plusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });
        
        // Validate input
        quantityInput.addEventListener('change', () => {
            let value = parseInt(quantityInput.value);
            if (isNaN(value) || value < 1) {
                quantityInput.value = 1;
            } else if (value > 10) {
                quantityInput.value = 10;
            }
        });
    }
}

/**
 * Initialize product tabs
 * Handles tab switching
 */
function initProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

/**
 * Initialize product actions
 * Handles add to cart, buy now, wishlist, and compare buttons
 */
function initProductActions() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const buyNowBtn = document.querySelector('.buy-now-btn');
    const wishlistBtn = document.querySelector('.wishlist-btn');
    const compareBtn = document.querySelector('.compare-btn');
    const colorOptions = document.querySelectorAll('.color-option');
    const sizeOptions = document.querySelectorAll('.size-option');
    
    // Add to cart button
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity-input').value);
            const color = document.querySelector('.color-option.active').getAttribute('data-color');
            const size = document.querySelector('.size-option.active').getAttribute('data-size');
            
            // Add product to cart
            addToCart({
                id: 'JUB-PRE-001',
                name: 'Premium Jubba',
                price: 1999,
                quantity: quantity,
                color: color,
                size: size,
                image: '../assets/images/products/jubba-1.jpg'
            });
            
            // Show success message
            showNotification('Product added to cart!', 'success');
            
            // Update cart count
            updateCartCount();
        });
    }
    
    // Buy now button
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity-input').value);
            const color = document.querySelector('.color-option.active').getAttribute('data-color');
            const size = document.querySelector('.size-option.active').getAttribute('data-size');
            
            // Add product to cart
            addToCart({
                id: 'JUB-PRE-001',
                name: 'Premium Jubba',
                price: 1999,
                quantity: quantity,
                color: color,
                size: size,
                image: '../assets/images/products/jubba-1.jpg'
            });
            
            // Redirect to checkout
            window.location.href = 'checkout.html';
        });
    }
    
    // Wishlist button
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            // Toggle wishlist icon
            const icon = wishlistBtn.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Product added to wishlist!', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Product removed from wishlist!', 'info');
            }
        });
    }
    
    // Compare button
    if (compareBtn) {
        compareBtn.addEventListener('click', () => {
            // Add product to compare list
            addToCompare({
                id: 'JUB-PRE-001',
                name: 'Premium Jubba',
                price: 1999,
                image: '../assets/images/products/jubba-1.jpg'
            });
            
            showNotification('Product added to compare list!', 'success');
        });
    }
    
    // Color options
    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
    }
    
    // Size options
    if (sizeOptions.length > 0) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', () => {
                sizeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
    }
}

/**
 * Initialize review form
 * Handles review submission and rating selection
 */
function initReviewForm() {
    const reviewForm = document.querySelector('.review-form');
    const ratingStars = document.querySelectorAll('.rating-selector i');
    const helpfulBtns = document.querySelectorAll('.helpful-btn');
    
    // Rating stars
    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            // Hover effect
            star.addEventListener('mouseover', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                updateStars(rating);
            });
            
            // Click event
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                updateStars(rating, true);
            });
        });
        
        // Reset stars on mouse out
        document.querySelector('.rating-selector').addEventListener('mouseout', () => {
            const selectedRating = document.querySelector('.rating-selector').getAttribute('data-selected-rating');
            if (selectedRating) {
                updateStars(parseInt(selectedRating));
            } else {
                resetStars();
            }
        });
    }
    
    // Review form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const rating = document.querySelector('.rating-selector').getAttribute('data-selected-rating');
            const title = document.getElementById('review-title').value;
            const content = document.getElementById('review-content').value;
            
            // Validate form
            if (!rating) {
                showNotification('Please select a rating!', 'error');
                return;
            }
            
            if (!title) {
                showNotification('Please enter a review title!', 'error');
                return;
            }
            
            if (!content) {
                showNotification('Please enter your review!', 'error');
                return;
            }
            
            // Submit review (in a real app, this would be an API call)
            showNotification('Your review has been submitted!', 'success');
            
            // Reset form
            resetStars();
            document.querySelector('.rating-selector').removeAttribute('data-selected-rating');
            reviewForm.reset();
        });
    }
    
    // Helpful buttons
    if (helpfulBtns.length > 0) {
        helpfulBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const icon = btn.querySelector('i');
                const text = btn.textContent;
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    
                    // Update count
                    const countMatch = text.match(/\((\d+)\)/);
                    if (countMatch) {
                        const count = parseInt(countMatch[1]) + 1;
                        btn.textContent = btn.textContent.replace(/\(\d+\)/, `(${count})`);
                    }
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    
                    // Update count
                    const countMatch = text.match(/\((\d+)\)/);
                    if (countMatch) {
                        const count = parseInt(countMatch[1]) - 1;
                        btn.textContent = btn.textContent.replace(/\(\d+\)/, `(${count})`);
                    }
                }
            });
        });
    }
}

/**
 * Update stars in rating selector
 * @param {number} rating - The rating value (1-5)
 * @param {boolean} select - Whether to select the rating permanently
 */
function updateStars(rating, select = false) {
    const stars = document.querySelectorAll('.rating-selector i');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
    
    if (select) {
        document.querySelector('.rating-selector').setAttribute('data-selected-rating', rating);
    }
}

/**
 * Reset stars in rating selector
 */
function resetStars() {
    const stars = document.querySelectorAll('.rating-selector i');
    
    stars.forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
    });
}

/**
 * Add product to cart
 * @param {Object} product - The product to add to cart
 */
function addToCart(product) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.color === product.color && 
        item.size === product.size
    );
    
    if (existingProductIndex !== -1) {
        // Update quantity if product already exists
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        // Add new product to cart
        cart.push(product);
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Update cart count in floating navigation
 */
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total quantity
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update all cart count elements
    cartCountElements.forEach(element => {
        element.textContent = totalQuantity;
        
        // Show/hide based on count
        if (totalQuantity > 0) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}

/**
 * Add product to compare list
 * @param {Object} product - The product to add to compare list
 */
function addToCompare(product) {
    // Get compare list from localStorage
    let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
    
    // Check if product already exists in compare list
    const existingProductIndex = compareList.findIndex(item => item.id === product.id);
    
    if (existingProductIndex === -1) {
        // Add new product to compare list (max 4 products)
        if (compareList.length < 4) {
            compareList.push(product);
        } else {
            // Remove first product and add new one
            compareList.shift();
            compareList.push(product);
        }
        
        // Save compare list to localStorage
        localStorage.setItem('compareList', JSON.stringify(compareList));
    }
}

/**
 * Show notification
 * @param {string} message - The notification message
 * @param {string} type - The notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="close-notification"><i class="fas fa-times"></i></button>
    `;
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close notification on click
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});