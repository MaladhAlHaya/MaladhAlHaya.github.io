/**
 * Maladh Al Haya - PWA JavaScript File
 * Handles Progressive Web App functionality
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initPWA();
});

/**
 * Initialize PWA Functionality
 * Registers service worker and sets up install prompt
 */
function initPWA() {
  // Register Service Worker
  registerServiceWorker();
  
  // Initialize Install Prompt
  initInstallPrompt();
}

/**
 * Register Service Worker
 * Registers the service worker for offline functionality
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

/**
 * Initialize Install Prompt
 * Sets up the PWA install prompt functionality
 */
function initInstallPrompt() {
  let deferredPrompt;
  const pwaInstallPrompt = document.getElementById('pwa-install-prompt');
  const installBtn = document.getElementById('install-btn');
  const closePromptBtn = document.querySelector('.close-prompt-btn');
  
  if (!pwaInstallPrompt || !installBtn || !closePromptBtn) return;
  
  // Hide install prompt by default
  pwaInstallPrompt.style.display = 'none';
  
  // Check if user is on mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Only show install prompt on mobile devices
  if (!isMobile) return;
  
  // Capture install prompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Check if user has already dismissed the prompt
    const promptDismissed = localStorage.getItem('pwaPromptDismissed');
    
    if (!promptDismissed) {
      // Show the install prompt after a delay
      setTimeout(() => {
        pwaInstallPrompt.style.display = 'flex';
        pwaInstallPrompt.classList.add('active');
      }, 3000);
    }
  });
  
  // Install button click event
  installBtn.addEventListener('click', () => {
    // Hide the install prompt
    pwaInstallPrompt.style.display = 'none';
    pwaInstallPrompt.classList.remove('active');
    
    // Show the browser install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        
        // Clear the deferred prompt
        deferredPrompt = null;
      });
    }
  });
  
  // Close button click event
  closePromptBtn.addEventListener('click', () => {
    pwaInstallPrompt.style.display = 'none';
    pwaInstallPrompt.classList.remove('active');
    
    // Save dismissal to localStorage
    localStorage.setItem('pwaPromptDismissed', 'true');
  });
  
  // Check if app is installed
  window.addEventListener('appinstalled', () => {
    // Hide the install prompt
    pwaInstallPrompt.style.display = 'none';
    pwaInstallPrompt.classList.remove('active');
    
    console.log('PWA was installed');
  });
}

/**
 * Check Online Status
 * Monitors the online/offline status and shows appropriate notifications
 */
function checkOnlineStatus() {
  const updateOnlineStatus = () => {
    if (navigator.onLine) {
      // Online
      document.body.classList.remove('offline');
      
      // Show online notification
      showToast('You are back online!', 'success');
    } else {
      // Offline
      document.body.classList.add('offline');
      
      // Show offline notification
      showToast('You are offline. Some features may be limited.', 'warning', 5000);
    }
  };
  
  // Initial check
  updateOnlineStatus();
  
  // Add event listeners
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
}

/**
 * Show Toast Message
 * Displays a toast message
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error, warning, info)
 * @param {number} duration - Duration in milliseconds
 */
function showToast(message, type = 'info', duration = 3000) {
  // Check if toast container exists
  let toastContainer = document.querySelector('.toast-container');
  
  // Create toast container if it doesn't exist
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.classList.add('toast-container');
    document.body.appendChild(toastContainer);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${type}`);
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
    </div>
    <div class="toast-content">${message}</div>
    <button class="toast-close"><i class="fas fa-times"></i></button>
  `;
  
  // Add toast to container
  toastContainer.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Close button click event
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.classList.remove('show');
    
    setTimeout(() => {
      toast.remove();
    }, 300);
  });
  
  // Auto close after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.remove('show');
      
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }
  }, duration);
}

// Initialize online status check
checkOnlineStatus();