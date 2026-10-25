/**
 * RESTAURANT ISTANBUL DREUX — MAIN JAVASCRIPT ENGINE
 * Handles:
 * 1. Instant bilingual FR/EN engine
 * 2. Interactive 12-category menu renderer with smooth transitions & dual-pricing
 * 3. Verified Google reviews carousel with touch swipe & indicators
 * 4. Reservation form validation & accessible confirmation modal
 * 5. Direct telephone & WhatsApp order concierge
 * 6. Sticky header, mobile drawer & back-to-top navigation
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. STATE MANAGEMENT
  // ==========================================================================
  const DEFAULT_LANG = 'fr';
  let currentLang = DEFAULT_LANG;
  let currentCategory = 'sandwichs';
  let currentReviewIndex = 0;
  let reviewAutoPlayInterval = null;

  try {
    const saved = localStorage.getItem('istanbul_dreux_lang');
    if (saved === 'fr' || saved === 'en') {
      currentLang = saved;
    }
  } catch (e) {
    console.warn('localStorage unavailable, defaulting to fr');
  }

  // ==========================================================================
  // 2. DOM REFERENCES
  // ==========================================================================
  const siteHeader = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const btnLangFr = document.querySelectorAll('.btn-lang-fr');
  const btnLangEn = document.querySelectorAll('.btn-lang-en');
  
  const menuTabsScroll = document.getElementById('menu-tabs-scroll');
  const menuGrid = document.getElementById('menu-grid');
  const menuNotice = document.getElementById('menu-notice');
  const menuNoticeText = document.getElementById('menu-notice-text');

  const reviewTrack = document.getElementById('review-track');
  const reviewCards = document.querySelectorAll('.review-card');
  const reviewPrevBtn = document.getElementById('review-prev-btn');
  const reviewNextBtn = document.getElementById('review-next-btn');
  const reviewDotsContainer = document.getElementById('review-dots-container');

  const resForm = document.getElementById('reservation-form');
  const resModal = document.getElementById('res-modal');
  const resModalClose = document.getElementById('res-modal-close');
  const resModalSummary = document.getElementById('res-modal-summary');

  const orderModal = document.getElementById('order-modal');
  const orderModalClose = document.getElementById('order-modal-close');
  const orderModalTitle = document.getElementById('order-modal-dish-title');
  const orderModalWaLink = document.getElementById('order-modal-wa-link');

  const backToTopBtn = document.getElementById('back-to-top-btn');

  // ==========================================================================
  // 3. I18N BILINGUAL ENGINE
  // ==========================================================================
  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;

    try {
      localStorage.setItem('istanbul_dreux_lang', lang);
    } catch (e) {}

    document.documentElement.lang = lang === 'fr' ? 'fr-FR' : 'en';

    // 1. Meta Tags
    document.title = translations[lang].meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', translations[lang].meta.desc);

    // 2. Update all [data-i18n] text
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = resolveKey(translations[lang], key);
      if (val !== undefined) {
        el.textContent = val;
      }
    });

    // 3. Update all [data-i18n-html]
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = resolveKey(translations[lang], key);
      if (val !== undefined) {
        el.innerHTML = val;
      }
    });

    // 4. Update Form Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(input => {
      const key = input.getAttribute('data-i18n-placeholder');
      const val = resolveKey(translations[lang], key);
      if (val !== undefined) {
        input.setAttribute('placeholder', val);
      }
    });

    // 5. Update Language Switcher Buttons UI
    btnLangFr.forEach(btn => {
      if (lang === 'fr') {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    btnLangEn.forEach(btn => {
      if (lang === 'en') {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // 6. Update Guests select options
    updateGuestOptions(lang);

    // 7. Re-render Current Menu Category in Selected Language
    renderMenu(currentCategory, lang);
  }

  function resolveKey(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  function updateGuestOptions(lang) {
    const guestsSelect = document.getElementById('res-guests');
    if (!guestsSelect) return;
    const currentVal = guestsSelect.value;
    const t = translations[lang].reservation;

    guestsSelect.innerHTML = `
      <option value="" disabled ${!currentVal ? 'selected' : ''}>${t.guestsPlaceholder}</option>
      <option value="1" ${currentVal === '1' ? 'selected' : ''}>${t.guestsSingle}</option>
      <option value="2" ${currentVal === '2' ? 'selected' : ''}>${t.guestsOption.replace('{n}', '2')}</option>
      <option value="3" ${currentVal === '3' ? 'selected' : ''}>${t.guestsOption.replace('{n}', '3')}</option>
      <option value="4" ${currentVal === '4' ? 'selected' : ''}>${t.guestsOption.replace('{n}', '4')}</option>
      <option value="5" ${currentVal === '5' ? 'selected' : ''}>${t.guestsOption.replace('{n}', '5')}</option>
      <option value="6" ${currentVal === '6' ? 'selected' : ''}>${t.guestsOption.replace('{n}', '6')}</option>
      <option value="7+" ${currentVal === '7+' ? 'selected' : ''}>7+ ${lang === 'fr' ? 'convives (Grande table)' : 'guests (Large party)'}</option>
    `;
  }

  // Language button event bindings
  btnLangFr.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentLang !== 'fr') setLanguage('fr');
    });
  });

  btnLangEn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentLang !== 'en') setLanguage('en');
    });
  });

  // ==========================================================================
  // 4. INTERACTIVE 12-CATEGORY MENU RENDERER
  // ==========================================================================
  function renderMenu(categoryKey, lang) {
    if (!menuGrid) return;
    const items = menuDatabase[categoryKey] || [];
    const tMenu = translations[lang].menu;

    // Notice text update
    if (categoryKey === 'sandwichs' || categoryKey === 'panini' || categoryKey === 'crudites') {
      menuNotice.style.display = 'flex';
      menuNoticeText.textContent = tMenu.dualNotice;
    } else if (categoryKey === 'assiettes') {
      menuNotice.style.display = 'flex';
      menuNoticeText.textContent = tMenu.platesNotice;
    } else {
      menuNotice.style.display = 'none';
    }

    menuGrid.classList.add('fade-out');

    setTimeout(() => {
      if (items.length === 0) {
        menuGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
            <p>${tMenu.emptyCategory}</p>
          </div>
        `;
        menuGrid.classList.remove('fade-out');
        return;
      }

      let html = '';
      items.forEach(dish => {
        const dishName = dish.name[lang] || dish.name.fr;
        const dishDesc = dish.desc[lang] || dish.desc.fr;
        const dishTag = dish.tag ? (dish.tag[lang] || dish.tag.fr) : '';
        const dishExtra = dish.extraNote ? (dish.extraNote[lang] || dish.extraNote.fr) : '';

        let pricingHtml = '';
        if (dish.pricing.type === 'dual') {
          pricingHtml = `
            <div class="price-dual-container">
              <div class="price-chip">
                <span class="price-chip-label">${tMenu.soloLabel}</span>
                <span class="price-chip-val">${dish.pricing.solo}</span>
              </div>
              <div class="price-chip highlight">
                <span class="price-chip-label">${tMenu.menuLabel}</span>
                <span class="price-chip-val">${dish.pricing.menu}</span>
              </div>
            </div>
          `;
        } else {
          pricingHtml = `
            <span class="price-single">${dish.pricing.price}</span>
            <button type="button" class="btn btn-sage btn-order-trigger" 
              data-dish-name="${dishName}"
              style="padding: 8px 14px; font-size: 0.72rem;">
              <i class="fa-solid fa-utensils"></i> ${tMenu.btnOrderDish}
            </button>
          `;
        }

        html += `
          <article class="dish-card" id="dish-${dish.id}">
            <div class="dish-thumb-wrapper">
              <img src="${dish.img}" alt="${dishName} - Restaurant Istanbul Dreux" class="dish-thumb" loading="lazy">
              ${dishTag ? `<span class="dish-tag-badge">${dishTag}</span>` : ''}
            </div>
            <div class="dish-body">
              <h3 class="dish-title">${dishName}</h3>
              <p class="dish-desc">${dishDesc}</p>
              ${dishExtra ? `<div class="dish-extra-note"><i class="fa-solid fa-circle-check"></i> ${dishExtra}</div>` : ''}
              <div class="dish-pricing-row">
                ${pricingHtml}
              </div>
            </div>
          </article>
        `;
      });

      menuGrid.innerHTML = html;
      menuGrid.classList.remove('fade-out');

      // Bind dish order buttons
      document.querySelectorAll('.btn-order-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const name = btn.getAttribute('data-dish-name');
          openOrderModal(name);
        });
      });

    }, 180);
  }

  // Handle Tab Click
  const categoryTabButtons = document.querySelectorAll('.menu-tab-btn');
  categoryTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      if (category === currentCategory) return;

      currentCategory = category;

      categoryTabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Ensure tab is scrolled smoothly into view in horizontal overflow
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

      renderMenu(currentCategory, currentLang);
    });
  });

  // Footer Category Links
  document.querySelectorAll('.footer-cat-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCat = link.getAttribute('data-target-cat');
      if (!targetCat) return;

      const targetTabBtn = document.querySelector(`.menu-tab-btn[data-category="${targetCat}"]`);
      if (targetTabBtn) {
        targetTabBtn.click();
        const menuSection = document.getElementById('menu');
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ==========================================================================
  // 5. GOOGLE REVIEW CAROUSEL
  // ==========================================================================
  function initCarousel() {
    if (!reviewTrack || reviewCards.length === 0) return;

    // Create pagination dots
    reviewDotsContainer.innerHTML = '';
    reviewCards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Page avis ${idx + 1}`);
      dot.addEventListener('click', () => goToReview(idx));
      reviewDotsContainer.appendChild(dot);
    });

    updateCarousel();

    if (reviewPrevBtn) {
      reviewPrevBtn.addEventListener('click', () => {
        prevReview();
        restartReviewAutoPlay();
      });
    }

    if (reviewNextBtn) {
      reviewNextBtn.addEventListener('click', () => {
        nextReview();
        restartReviewAutoPlay();
      });
    }

    // Touch Swipe Handling for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    reviewTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    reviewTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 40;
      if (touchEndX < touchStartX - threshold) {
        nextReview();
        restartReviewAutoPlay();
      } else if (touchEndX > touchStartX + threshold) {
        prevReview();
        restartReviewAutoPlay();
      }
    }

    startReviewAutoPlay();

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => clearInterval(reviewAutoPlayInterval));
      carouselContainer.addEventListener('mouseleave', () => startReviewAutoPlay());
    }
  }

  function updateCarousel() {
    const isMobile = window.innerWidth <= 900;
    
    if (isMobile) {
      // 1 card per slide on mobile
      const offset = currentReviewIndex * 100;
      reviewTrack.style.transform = `translateX(-${offset}%)`;
    } else {
      // Desktop: 3 cards visible, slide one by one or stay within bounds
      const maxIndex = Math.max(0, reviewCards.length - 3);
      const safeIndex = Math.min(currentReviewIndex, maxIndex);
      const cardWidthPercent = 33.333;
      const gapOffset = safeIndex * 28; // gap is 28px
      reviewTrack.style.transform = `translateX(calc(-${safeIndex * cardWidthPercent}% - ${gapOffset}px))`;
    }

    // Update Dots
    const dots = reviewDotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentReviewIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToReview(index) {
    currentReviewIndex = index;
    updateCarousel();
  }

  function nextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % reviewCards.length;
    updateCarousel();
  }

  function prevReview() {
    currentReviewIndex = (currentReviewIndex - 1 + reviewCards.length) % reviewCards.length;
    updateCarousel();
  }

  function startReviewAutoPlay() {
    clearInterval(reviewAutoPlayInterval);
    reviewAutoPlayInterval = setInterval(nextReview, 6000);
  }

  function restartReviewAutoPlay() {
    startReviewAutoPlay();
  }

  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // ==========================================================================
  // 6. RESERVATION SYSTEM & VALIDATION
  // ==========================================================================
  function initReservation() {
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    if (resForm) {
      resForm.addEventListener('submit', handleReservationSubmit);
    }

    if (resModalClose) {
      resModalClose.addEventListener('click', closeResModal);
    }

    if (resModal) {
      resModal.addEventListener('click', (e) => {
        if (e.target === resModal) closeResModal();
      });
    }
  }

  function handleReservationSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('res-name').value.trim();
    const phone = document.getElementById('res-phone').value.trim();
    const email = document.getElementById('res-email').value.trim();
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    const message = document.getElementById('res-message').value.trim();

    if (!name || !phone || !email || !date || !time || !guests) {
      alert(currentLang === 'fr' 
        ? "Veuillez renseigner tous les champs obligatoires du formulaire." 
        : "Please complete all required fields.");
      return;
    }

    // Format display date
    const dateObj = new Date(date);
    const dateFormatted = dateObj.toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Populate modal summary
    if (resModalSummary) {
      resModalSummary.innerHTML = `
        <div class="modal-summary-item">
          <span>${currentLang === 'fr' ? 'Nom' : 'Name'} :</span>
          <strong>${escapeHtml(name)}</strong>
        </div>
        <div class="modal-summary-item">
          <span>${currentLang === 'fr' ? 'Téléphone' : 'Phone'} :</span>
          <strong>${escapeHtml(phone)}</strong>
        </div>
        <div class="modal-summary-item">
          <span>${currentLang === 'fr' ? 'E-mail' : 'Email'} :</span>
          <strong>${escapeHtml(email)}</strong>
        </div>
        <div class="modal-summary-item">
          <span>${currentLang === 'fr' ? 'Date' : 'Date'} :</span>
          <strong>${escapeHtml(dateFormatted)}</strong>
        </div>
        <div class="modal-summary-item">
          <span>${currentLang === 'fr' ? 'Heure' : 'Time'} :</span>
          <strong>${escapeHtml(time)}</strong>
        </div>
        <div class="modal-summary-item">
          <span>${currentLang === 'fr' ? 'Personnes' : 'Guests'} :</span>
          <strong>${escapeHtml(guests)} ${currentLang === 'fr' ? 'convives' : 'guests'}</strong>
        </div>
        ${message ? `
          <div class="modal-summary-item" style="border-top: 1px dashed var(--color-border-light); padding-top: 6px; margin-top: 6px;">
            <span>${currentLang === 'fr' ? 'Note' : 'Note'} :</span>
            <em>${escapeHtml(message)}</em>
          </div>
        ` : ''}
      `;
    }

    // Open confirmation modal
    if (resModal) {
      resModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Reset form
    resForm.reset();
    updateGuestOptions(currentLang);
  }

  function closeResModal() {
    if (resModal) {
      resModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // ==========================================================================
  // 7. ORDER DISH MODAL
  // ==========================================================================
  function openOrderModal(dishName) {
    if (!orderModal) return;
    if (orderModalTitle) {
      orderModalTitle.textContent = dishName;
    }
    if (orderModalWaLink) {
      const waText = encodeURIComponent(
        currentLang === 'fr'
          ? `Bonjour Restaurant Istanbul Dreux, je souhaite commander : ${dishName}`
          : `Hello Istanbul Restaurant Dreux, I would like to order: ${dishName}`
      );
      orderModalWaLink.href = `https://wa.me/33237558597?text=${waText}`;
    }

    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeOrderModal() {
    if (orderModal) {
      orderModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (orderModalClose) {
    orderModalClose.addEventListener('click', closeOrderModal);
  }

  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeOrderModal();
    });
  }

  // ==========================================================================
  // 8. HEADER SCROLL & MOBILE DRAWER
  // ==========================================================================
  function handleHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (window.scrollY > 600) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  function toggleMobileDrawer() {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeMobileDrawer();
    } else {
      openMobileDrawer();
    }
  }

  function openMobileDrawer() {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('active');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('active');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileDrawer);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileDrawer);
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // Global ESC key to close any active modal or drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResModal();
      closeOrderModal();
      closeMobileDrawer();
    }
  });

  // Back to top smooth scroll
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active navigation highlight based on scroll position
  const sections = document.querySelectorAll('section[id], header[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

  function highlightActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // Escape HTML utility
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================================================
  // 9. INITIALIZATION
  // ==========================================================================
  initReservation();
  initCarousel();
  setLanguage(currentLang);

});
