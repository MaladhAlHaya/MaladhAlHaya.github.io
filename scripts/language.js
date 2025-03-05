/**
 * Maladh Al Haya - Language JavaScript File
 * Handles multilingual support for the website
 * Supports English (default), Malayalam, and Arabic
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSelector();
});

/**
 * Initialize Language Selector
 * Sets up the language selector functionality
 */
function initLanguageSelector() {
  const languageButtons = document.querySelectorAll('.language-selector button');
  
  if (languageButtons.length === 0) return;
  
  // Get saved language preference or use default (English)
  const savedLanguage = localStorage.getItem('language') || 'en';
  
  // Set initial language
  setLanguage(savedLanguage);
  
  // Set active button
  languageButtons.forEach(button => {
    const lang = button.getAttribute('data-lang');
    
    if (lang === savedLanguage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
    
    // Add click event
    button.addEventListener('click', () => {
      setLanguage(lang);
      
      // Update active button
      languageButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Save language preference
      localStorage.setItem('language', lang);
    });
  });
}

/**
 * Set Language
 * Changes the language of the website
 * @param {string} lang - Language code (en, ml, ar)
 */
function setLanguage(lang) {
  // Set language attribute on html element
  document.documentElement.setAttribute('lang', lang);
  
  // Set direction attribute for RTL languages
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
  
  // Translate all elements with data-lang-key attribute
  const elements = document.querySelectorAll('[data-lang-key]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-lang-key');
    
    if (translations[key]) {
      const translation = translations[key][lang];
      
      if (translation) {
        // Check if element is an input or textarea
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          // Set placeholder for inputs
          if (element.getAttribute('placeholder')) {
            element.setAttribute('placeholder', translation);
          } else {
            element.value = translation;
          }
        } else {
          // Set text content for other elements
          element.textContent = translation;
        }
      }
    }
  });
}

/**
 * Translations Object
 * Contains translations for all supported languages
 */
const translations = {
  // Navigation
  "home": {
    "en": "Home",
    "ml": "ഹോം",
    "ar": "الرئيسية"
  },
  "categories": {
    "en": "Categories",
    "ml": "വിഭാഗങ്ങൾ",
    "ar": "الفئات"
  },
  "products": {
    "en": "Products",
    "ml": "ഉൽപ്പന്നങ്ങൾ",
    "ar": "المنتجات"
  },
  "about": {
    "en": "About",
    "ml": "ഞങ്ങളെക്കുറിച്ച്",
    "ar": "عن المتجر"
  },
  "contact": {
    "en": "Contact",
    "ml": "ബന്ധപ്പെടുക",
    "ar": "اتصل بنا"
  },
  "profile": {
    "en": "Profile",
    "ml": "പ്രൊഫൈൽ",
    "ar": "الملف الشخصي"
  },
  "cart": {
    "en": "Cart",
    "ml": "കാർട്ട്",
    "ar": "عربة التسوق"
  },
  "menu": {
    "en": "Menu",
    "ml": "മെനു",
    "ar": "القائمة"
  },
  
  // Product Categories
  "white_dresses": {
    "en": "White Dresses",
    "ml": "വെള്ള വസ്ത്രങ്ങൾ",
    "ar": "الثياب البيضاء"
  },
  "kandura": {
    "en": "Kandura",
    "ml": "കന്ദൂര",
    "ar": "كندورة"
  },
  "jubba": {
    "en": "Jubba",
    "ml": "ജുബ്ബ",
    "ar": "جبة"
  },
  "kurta": {
    "en": "Kurta",
    "ml": "കുർത്ത",
    "ar": "كورتا"
  },
  "mund": {
    "en": "Mund",
    "ml": "മുണ്ട്",
    "ar": "موند"
  },
  "turban": {
    "en": "Turban",
    "ml": "തലപ്പാവ്",
    "ar": "عمامة"
  },
  "shall": {
    "en": "Shall",
    "ml": "ഷാൾ",
    "ar": "شال"
  },
  "inners": {
    "en": "Inners",
    "ml": "അകത്തുള്ള വസ്ത്രങ്ങൾ",
    "ar": "ملابس داخلية"
  },
  "abaya": {
    "en": "Abaya",
    "ml": "അബായ",
    "ar": "عباية"
  },
  "parda": {
    "en": "Parda",
    "ml": "പർദ",
    "ar": "بردة"
  },
  "hijab": {
    "en": "Hijab",
    "ml": "ഹിജാബ്",
    "ar": "حجاب"
  },
  "niqab": {
    "en": "Niqab",
    "ml": "നിഖാബ്",
    "ar": "نقاب"
  },
  "fragrance": {
    "en": "Fragrance",
    "ml": "സുഗന്ധം",
    "ar": "عطور"
  },
  "quran": {
    "en": "Quran",
    "ml": "ഖുർആൻ",
    "ar": "القرآن"
  },
  "kithabs": {
    "en": "Kithabs",
    "ml": "കിതാബുകൾ",
    "ar": "كتب"
  },
  "prayer_mats": {
    "en": "Prayer Mats",
    "ml": "നമസ്കാര മാറ്റുകൾ",
    "ar": "سجادة صلاة"
  },
  
  // Featured Product
  "premium_jubba": {
    "en": "Premium Jubba Collection",
    "ml": "പ്രീമിയം ജുബ്ബ കളക്ഷൻ",
    "ar": "مجموعة الجبة الفاخرة"
  },
  "premium_jubba_desc": {
    "en": "Discover our exclusive collection of premium Jubbas, designed for comfort and elegance.",
    "ml": "സുഖവും ആഡംബരവും ലക്ഷ്യമാക്കി രൂപകൽപ്പന ചെയ്ത ഞങ്ങളുടെ പ്രത്യേക പ്രീമിയം ജുബ്ബ ശേഖരം കണ്ടെത്തുക.",
    "ar": "اكتشف مجموعتنا الحصرية من الجبب الفاخرة، المصممة للراحة والأناقة."
  },
  "swipe_next": {
    "en": "Swipe for next product",
    "ml": "അടുത്ത ഉൽപ്പന്നത്തിനായി സ്വൈപ്പ് ചെയ്യുക",
    "ar": "اسحب للمنتج التالي"
  },
  
  // Sections
  "popular_products": {
    "en": "Popular Products",
    "ml": "ജനപ്രിയ ഉൽപ്പന്നങ്ങൾ",
    "ar": "المنتجات الشائعة"
  },
  "new_arrivals": {
    "en": "New Arrivals",
    "ml": "പുതിയ വരവുകൾ",
    "ar": "وصل حديثاً"
  },
  "see_all": {
    "en": "See All",
    "ml": "എല്ലാം കാണുക",
    "ar": "عرض الكل"
  },
  
  // Offer Banner
  "special_offer": {
    "en": "Special Offer",
    "ml": "പ്രത്യേക ഓഫർ",
    "ar": "عرض خاص"
  },
  "offer_description": {
    "en": "Get 20% off on all Jubba collections. Use code: JUBBA20",
    "ml": "എല്ലാ ജുബ്ബ കളക്ഷനുകളിലും 20% ഓഫ് നേടൂ. കോഡ് ഉപയോഗിക്കുക: JUBBA20",
    "ar": "احصل على خصم 20٪ على جميع مجموعات الجبة. استخدم الرمز: JUBBA20"
  },
  
  // Buttons
  "view_product": {
    "en": "View Product",
    "ml": "ഉൽപ്പന്നം കാണുക",
    "ar": "عرض المنتج"
  },
  "add_to_cart": {
    "en": "Add to Cart",
    "ml": "കാർട്ടിലേക്ക് ചേർക്കുക",
    "ar": "أضف إلى السلة"
  },
  "shop_now": {
    "en": "Shop Now",
    "ml": "ഇപ്പോൾ ഷോപ്പ് ചെയ്യുക",
    "ar": "تسوق الآن"
  },
  
  // Footer
  "about_us": {
    "en": "About Us",
    "ml": "ഞങ്ങളെക്കുറിച്ച്",
    "ar": "عن المتجر"
  },
  "about_description": {
    "en": "Maladh Al Haya is dedicated to providing high-quality Islamic clothing and products for Muslims around the world.",
    "ml": "ലോകമെമ്പാടുമുള്ള മുസ്ലിംകൾക്ക് ഉയർന്ന നിലവാരമുള്ള ഇസ്ലാമിക വസ്ത്രങ്ങളും ഉൽപ്പന്നങ്ങളും നൽകുന്നതിന് മലാദ് അൽ ഹയ സമർപ്പിതമാണ്.",
    "ar": "ملاذ الحياء مكرس لتوفير ملابس ومنتجات إسلامية عالية الجودة للمسلمين في جميع أنحاء العالم."
  },
  "quick_links": {
    "en": "Quick Links",
    "ml": "ക്വിക്ക് ലിങ്കുകൾ",
    "ar": "روابط سريعة"
  },
  "contact_us": {
    "en": "Contact Us",
    "ml": "ഞങ്ങളുമായി ബന്ധപ്പെടുക",
    "ar": "اتصل بنا"
  },
  "follow_us": {
    "en": "Follow Us",
    "ml": "ഞങ്ങളെ പിന്തുടരുക",
    "ar": "تابعنا"
  },
  
  // PWA Install Prompt
  "install_app": {
    "en": "Install Our App",
    "ml": "ഞങ്ങളുടെ ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യുക",
    "ar": "تثبيت تطبيقنا"
  },
  "install_description": {
    "en": "Install Maladh Al Haya on your device for a better experience!",
    "ml": "മികച്ച അനുഭവത്തിനായി നിങ്ങളുടെ ഉപകരണത്തിൽ മലാദ് അൽ ഹയ ഇൻസ്റ്റാൾ ചെയ്യുക!",
    "ar": "قم بتثبيت ملاذ الحياء على جهازك لتجربة أفضل!"
  },
  "install": {
    "en": "Install",
    "ml": "ഇൻസ്റ്റാൾ ചെയ്യുക",
    "ar": "تثبيت"
  },
  
  // Product Page
  "product_description": {
    "en": "Product Description",
    "ml": "ഉൽപ്പന്ന വിവരണം",
    "ar": "وصف المنتج"
  },
  "product_features": {
    "en": "Product Features",
    "ml": "ഉൽപ്പന്ന സവിശേഷതകൾ",
    "ar": "ميزات المنتج"
  },
  "product_reviews": {
    "en": "Product Reviews",
    "ml": "ഉൽപ്പന്ന അവലോകനങ്ങൾ",
    "ar": "تقييمات المنتج"
  },
  "related_products": {
    "en": "Related Products",
    "ml": "സമാന ഉൽപ്പന്നങ്ങൾ",
    "ar": "منتجات ذات صلة"
  },
  "select_color": {
    "en": "Select Color",
    "ml": "നിറം തിരഞ്ഞെടുക്കുക",
    "ar": "اختر اللون"
  },
  "select_size": {
    "en": "Select Size",
    "ml": "വലുപ്പം തിരഞ്ഞെടുക്കുക",
    "ar": "اختر الحجم"
  },
  "quantity": {
    "en": "Quantity",
    "ml": "അളവ്",
    "ar": "الكمية"
  },
  "add_to_wishlist": {
    "en": "Add to Wishlist",
    "ml": "വിഷ് ലിസ്റ്റിലേക്ക് ചേർക്കുക",
    "ar": "أضف إلى قائمة الرغبات"
  },
  "buy_now": {
    "en": "Buy Now",
    "ml": "ഇപ്പോൾ വാങ്ങുക",
    "ar": "اشتر الآن"
  },
  
  // Cart Page
  "shopping_cart": {
    "en": "Shopping Cart",
    "ml": "ഷോപ്പിംഗ് കാർട്ട്",
    "ar": "عربة التسوق"
  },
  "empty_cart": {
    "en": "Your cart is empty",
    "ml": "നിങ്ങളുടെ കാർട്ട് ശൂന്യമാണ്",
    "ar": "عربة التسوق فارغة"
  },
  "continue_shopping": {
    "en": "Continue Shopping",
    "ml": "ഷോപ്പിംഗ് തുടരുക",
    "ar": "مواصلة التسوق"
  },
  "checkout": {
    "en": "Checkout",
    "ml": "ചെക്ക്ഔട്ട്",
    "ar": "الدفع"
  },
  "subtotal": {
    "en": "Subtotal",
    "ml": "ആകെ തുക",
    "ar": "المجموع الفرعي"
  },
  "shipping": {
    "en": "Shipping",
    "ml": "ഷിപ്പിംഗ്",
    "ar": "الشحن"
  },
  "total": {
    "en": "Total",
    "ml": "ആകെ",
    "ar": "المجموع"
  },
  
  // Profile Page
  "my_account": {
    "en": "My Account",
    "ml": "എന്റെ അക്കൗണ്ട്",
    "ar": "حسابي"
  },
  "my_orders": {
    "en": "My Orders",
    "ml": "എന്റെ ഓർഡറുകൾ",
    "ar": "طلباتي"
  },
  "my_wishlist": {
    "en": "My Wishlist",
    "ml": "എന്റെ വിഷ് ലിസ്റ്റ്",
    "ar": "قائمة رغباتي"
  },
  "my_addresses": {
    "en": "My Addresses",
    "ml": "എന്റെ വിലാസങ്ങൾ",
    "ar": "عناويني"
  },
  "logout": {
    "en": "Logout",
    "ml": "ലോഗ്ഔട്ട്",
    "ar": "تسجيل الخروج"
  },
  
  // Search
  "search_results": {
    "en": "Search Results",
    "ml": "തിരയൽ ഫലങ്ങൾ",
    "ar": "نتائج البحث"
  },
  "no_results": {
    "en": "No results found",
    "ml": "ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല",
    "ar": "لم يتم العثور على نتائج"
  },
  
  // Error Messages
  "error_404": {
    "en": "Page Not Found",
    "ml": "പേജ് കണ്ടെത്തിയില്ല",
    "ar": "الصفحة غير موجودة"
  },
  "error_404_message": {
    "en": "The page you are looking for does not exist.",
    "ml": "നിങ്ങൾ തിരയുന്ന പേജ് നിലവിലില്ല.",
    "ar": "الصفحة التي تبحث عنها غير موجودة."
  },
  "go_back": {
    "en": "Go Back",
    "ml": "തിരികെ പോകുക",
    "ar": "عد"
  }
};

/**
 * Get Translation
 * Returns the translation for a given key and language
 * @param {string} key - Translation key
 * @param {string} lang - Language code (en, ml, ar)
 * @returns {string} - Translated text or key if translation not found
 */
function getTranslation(key, lang = 'en') {
  if (translations[key] && translations[key][lang]) {
    return translations[key][lang];
  }
  
  // Fallback to English
  if (translations[key] && translations[key]['en']) {
    return translations[key]['en'];
  }
  
  // Return key if translation not found
  return key;
}