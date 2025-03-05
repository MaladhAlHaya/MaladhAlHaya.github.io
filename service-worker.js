/**
 * Maladh Al Haya - Service Worker
 * Handles caching and offline functionality
 */

// Cache Name - Update version when content changes
const CACHE_NAME = 'maladh-al-haya-v1';

// Files to cache
const filesToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/scripts/language.js',
  '/scripts/pwa.js',
  '/manifest.json',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  // Images
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png',
  '/assets/images/logo.png',
  '/assets/images/placeholder.jpg',
  // Pages
  '/pages/cart.html',
  '/pages/profile.html',
  '/pages/categories.html',
  '/pages/about.html',
  '/pages/contact.html',
  // Offline page
  '/offline.html'
];

// Install event - Cache files
self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching files');
        return cache.addAll(filesToCache);
      })
      .catch(error => {
        console.error('[Service Worker] Cache error:', error);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  
  // Claim clients to ensure the service worker controls all clients
  event.waitUntil(self.clients.claim());
  
  // Remove old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - Serve cached content when offline
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.startsWith('https://fonts.googleapis.com') && 
      !event.request.url.startsWith('https://cdnjs.cloudflare.com')) {
    return;
  }
  
  // Handle API requests differently (network first, then cache)
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        })
        .catch(() => {
          // If network fails, try to get from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // If not in cache, return a default offline JSON response
              return new Response(
                JSON.stringify({
                  error: 'You are offline and this data is not cached.'
                }),
                {
                  headers: { 'Content-Type': 'application/json' }
                }
              );
            });
        })
    );
    return;
  }
  
  // For HTML pages, use network first, then cache, then offline page
  if (event.request.mode === 'navigate' || 
      (event.request.method === 'GET' && 
       event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the latest version
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        })
        .catch(() => {
          // If network fails, try to get from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // If not in cache, return the offline page
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }
  
  // For other requests, use cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise, fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response to store in cache
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.error('[Service Worker] Fetch error:', error);
            
            // For image requests, return a placeholder image
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
              return caches.match('/assets/images/placeholder.jpg');
            }
            
            // For other requests, just propagate the error
            throw error;
          });
      })
  );
});

// Push event - Handle push notifications
self.addEventListener('push', event => {
  console.log('[Service Worker] Push received');
  
  let data = {};
  
  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: 'Maladh Al Haya',
      body: event.data ? event.data.text() : 'New notification',
      icon: '/assets/icons/icon-192x192.png'
    };
  }
  
  const options = {
    body: data.body || 'New notification from Maladh Al Haya',
    icon: data.icon || '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Maladh Al Haya', options)
  );
});

// Notification click event - Open the notification URL
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click');
  
  event.notification.close();
  
  const url = event.notification.data.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(windowClients => {
        // Check if there is already a window/tab open with the target URL
        for (let client of windowClients) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If no window/tab is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

// Sync event - Handle background sync
self.addEventListener('sync', event => {
  console.log('[Service Worker] Sync event:', event.tag);
  
  if (event.tag === 'sync-cart') {
    event.waitUntil(syncCart());
  }
});

/**
 * Sync Cart
 * Syncs the cart data with the server when online
 */
async function syncCart() {
  try {
    // Get cart data from IndexedDB
    const cartData = await getCartDataFromIndexedDB();
    
    if (!cartData || cartData.length === 0) {
      console.log('[Service Worker] No cart data to sync');
      return;
    }
    
    // Send cart data to server
    const response = await fetch('/api/cart/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to sync cart data');
    }
    
    console.log('[Service Worker] Cart data synced successfully');
    
    // Clear the sync queue
    await clearSyncQueue();
  } catch (error) {
    console.error('[Service Worker] Sync error:', error);
    throw error;
  }
}

/**
 * Get Cart Data from IndexedDB
 * Retrieves cart data from IndexedDB
 */
function getCartDataFromIndexedDB() {
  return new Promise((resolve, reject) => {
    // This is a placeholder. In a real app, you would implement IndexedDB access
    // For now, we'll just return an empty array
    resolve([]);
  });
}

/**
 * Clear Sync Queue
 * Clears the sync queue after successful sync
 */
function clearSyncQueue() {
  return new Promise((resolve, reject) => {
    // This is a placeholder. In a real app, you would implement IndexedDB access
    resolve();
  });
}