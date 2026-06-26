document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccordions();
  initProductGallery();
  initColorSwatches();
  initQuantityPickers();
  initFaqSearch();
  initContactForm();
  initCharacterCounters();
  initCartDrawer();
  initHeaderScroll();
  initHeroParallax();
});

// Hide/Show Header on Scroll
function initHeaderScroll() {
  let lastScrollTop = 0;
  const header = document.querySelector('.site-header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scroll Down - Slide Header Up out of view
        header.style.transform = 'translate(-50%, -150%)';
      } else {
        // Scroll Up - Slide Header Down back into view
        header.style.transform = 'translate(-50%, 0)';
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
  }
}

// Hero Parallax Scroll Effect for side info cards and background watermark
function initHeroParallax() {
  const leftCard = document.querySelector('.hero-info-left');
  const rightCard = document.querySelector('.hero-info-right');
  const watermark = document.querySelector('.hero-watermark-text');
  const watermarkContainer = document.querySelector('.hero-watermark');
  
  if (!leftCard && !rightCard && !watermark) return;

  let ticked = false;
  let watermarkTop = 0;

  const measurePositions = () => {
    if (watermarkContainer) {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      const rect = watermarkContainer.getBoundingClientRect();
      watermarkTop = rect.top + scrolled;
    }
  };

  const updateParallax = () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    
    if (window.innerWidth > 768) {
      // Calculate scroll multiplier for moving down, capping it so they scroll out of view naturally
      const leftY = Math.min(scrolled * 0.4, 150);  // Cap at 150px
      const rightY = Math.min(scrolled * 0.5, 180); // Cap at 180px
      
      if (leftCard) leftCard.style.setProperty('--scroll-y', `${leftY}px`);
      if (rightCard) rightCard.style.setProperty('--scroll-y', `${rightY}px`);
      
      if (watermark) {
        // Start parallax only when the watermark reaches the middle of the viewport
        const threshold = watermarkTop - window.innerHeight * 0.5;
        
        let watermarkY = 0;
        if (scrolled > threshold) {
          watermarkY = (scrolled - threshold) * 0.45; // Sinks down smoothly once past threshold
        }
        watermark.style.setProperty('--scroll-y', `${watermarkY}px`);
      }
    } else {
      // Clear parallax scroll offset on mobile devices where layout is stacked
      if (leftCard) leftCard.style.setProperty('--scroll-y', '0px');
      if (rightCard) rightCard.style.setProperty('--scroll-y', '0px');
      if (watermark) watermark.style.setProperty('--scroll-y', '0px');
    }
    ticked = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticked) {
      window.requestAnimationFrame(updateParallax);
      ticked = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    measurePositions();
    if (!ticked) {
      window.requestAnimationFrame(updateParallax);
      ticked = true;
    }
  }, { passive: true });

  // Initial call
  measurePositions();
  updateParallax();
}

// Cart Drawer Slide Open/Close
function initCartDrawer() {
  const cartIcon = document.getElementById('cart-icon-btn');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartOverlay = document.querySelector('.cart-overlay');
  const closeBtn = document.querySelector('.cart-drawer-close');

  if (cartIcon && cartDrawer && cartOverlay) {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      cartDrawer.classList.add('active');
      cartOverlay.classList.add('active');
    });

    const closeCart = () => {
      cartDrawer.classList.remove('active');
      cartOverlay.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
  }
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = toggleBtn.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
}

// Collapsible Accordions (Generic & FAQ)
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header, .faq-accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content, .faq-accordion-content');
      
      // Close other items in the same list if needed (optional, here we let multiple open)
      item.classList.toggle('active');
      
      if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        if (content.style.paddingBottom === '') {
          content.style.paddingBottom = '20px';
        }
      } else {
        content.style.maxHeight = '0px';
        content.style.paddingBottom = '0px';
      }
    });
  });
}

// Product Detail Page Gallery
function initProductGallery() {
  const thumbnails = document.querySelectorAll('.thumbnail-btn');
  const mainImage = document.querySelector('.gallery-main-image img');
  
  if (thumbnails.length > 0 && mainImage) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        const newSrc = thumb.getAttribute('data-image-src');
        if (newSrc) {
          mainImage.src = newSrc;
        }
      });
    });
  }
}

// Color Swatches
function initColorSwatches() {
  const swatches = document.querySelectorAll('.swatch-btn');
  const colorInput = document.getElementById('product-color-input');
  
  if (swatches.length > 0) {
    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        
        const value = swatch.getAttribute('data-value');
        if (colorInput) {
          colorInput.value = value;
        }
        
        // Optionally switch gallery focus or product details based on variant selected
        // Example: If a color has a specific thumbnail, trigger click on that thumbnail.
        const colorIndex = swatch.getAttribute('data-index');
        const correspondingThumb = document.querySelector(`.thumbnail-btn[data-color-index="${colorIndex}"]`);
        if (correspondingThumb) {
          correspondingThumb.click();
        }
      });
    });
  }
}

// Quantity Inputs
function initQuantityPickers() {
  const pickers = document.querySelectorAll('.quantity-picker');
  
  pickers.forEach(picker => {
    const decBtn = picker.querySelector('.dec-btn');
    const incBtn = picker.querySelector('.inc-btn');
    const input = picker.querySelector('.quantity-input');
    
    function updatePrice() {
      const priceElement = document.querySelector('.product-price');
      if (priceElement && input) {
        if (!priceElement.hasAttribute('data-base-price')) {
          const text = priceElement.textContent.trim();
          const numMatch = text.match(/[\d,]+(\.\d+)?/);
          if (numMatch) {
            const basePrice = parseFloat(numMatch[0].replace(/,/g, ''));
            priceElement.setAttribute('data-base-price', basePrice);
            priceElement.setAttribute('data-currency', text.replace(numMatch[0], '').trim());
          }
        }
        
        const basePrice = parseFloat(priceElement.getAttribute('data-base-price'));
        const currency = priceElement.getAttribute('data-currency') || '';
        const quantity = parseInt(input.value) || 1;
        
        if (!isNaN(basePrice)) {
          const total = basePrice * quantity;
          const formattedTotal = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          priceElement.textContent = currency ? `${currency} ${formattedTotal}` : formattedTotal;
        }
      }
    }
    
    if (decBtn && incBtn && input) {
      decBtn.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        if (val > 1) {
          input.value = val - 1;
          updatePrice();
        }
      });
      
      incBtn.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        input.value = val + 1;
        updatePrice();
      });
      
      input.addEventListener('input', () => {
        let val = parseInt(input.value) || 1;
        if (val < 1) input.value = 1;
        updatePrice();
      });
      
      input.addEventListener('change', () => {
        let val = parseInt(input.value) || 1;
        if (val < 1) input.value = 1;
        updatePrice();
      });
    }
  });
}

// Character Limit Counters
function initCharacterCounters() {
  const customInputs = document.querySelectorAll('.custom-engrave-input');
  
  customInputs.forEach(input => {
    const counterId = input.getAttribute('data-counter-id');
    const counterSpan = document.getElementById(counterId);
    
    if (counterSpan) {
      input.addEventListener('input', () => {
        const length = input.value.length;
        counterSpan.textContent = `${length} / 20`;
      });
    }
  });
}

// Help Center / FAQ Filter Tabs and Search
function initFaqSearch() {
  const tabs = document.querySelectorAll('.faq-tab-btn');
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  const searchInput = document.querySelector('.faq-search-input');
  
  // Tab Switching
  if (tabs.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const category = tab.getAttribute('data-category');
        filterFaq(category, searchInput ? searchInput.value : '');
      });
    });
  }
  
  // Search Filtering
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const activeTab = document.querySelector('.faq-tab-btn.active');
      const category = activeTab ? activeTab.getAttribute('data-category') : 'all';
      filterFaq(category, searchInput.value);
    });
  }
  
  function filterFaq(category, searchVal) {
    const query = searchVal.toLowerCase().trim();
    
    faqItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      const questionText = item.querySelector('.faq-question-text').textContent.toLowerCase();
      const answerText = item.querySelector('.faq-answer-text') ? item.querySelector('.faq-answer-text').textContent.toLowerCase() : '';
      
      const matchesCategory = (category === 'all' || itemCategory === category);
      const matchesSearch = (questionText.includes(query) || answerText.includes(query));
      
      if (matchesCategory && matchesSearch) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
        
        // Make sure to collapse if hidden
        item.classList.remove('active');
        const content = item.querySelector('.faq-accordion-content');
        if (content) {
          content.style.maxHeight = '0px';
        }
      }
    });
  }
}

// Contact Form feedback
function initContactForm() {
  const contactForm = document.getElementById('contact-us-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate basic inputs
      const first = document.getElementById('contact-first-name');
      const email = document.getElementById('contact-email');
      const message = document.getElementById('contact-message');
      
      if (!first.value || !email.value || !message.value) {
        alert('Please fill out the required fields (First Name, Email, and Message).');
        return;
      }
      
      // Simulate success response
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent Successfully!';
        submitBtn.style.backgroundColor = '#10b981'; // green color
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }, 1500);
    });
  }
}
