/**
 * RESTAURANT ISTANBUL DREUX — INTERNATIONALIZATION (i18n)
 * Exhaustive French & English bilingual dictionary for all user interface elements.
 */

const translations = {
  fr: {
    meta: {
      title: "Restaurant Istanbul Dreux | Cuisine Turque Authentique & Grillades au Feu de Bois",
      desc: "Bienvenue chez Istanbul à Dreux (3 rue Saint-Thibault). Découvrez nos kebabs généreux, lahmacuns, grillades au feu de braise et assiettes gourmandes. Ouvert 7j/7 de 11h à 1h du matin."
    },
    nav: {
      logoAlt: "Restaurant Istanbul Dreux - Depuis 1992",
      home: "Accueil",
      about: "À propos",
      specialties: "Spécialités",
      menu: "Menu",
      reviews: "Avis clients",
      hours: "Horaires",
      contact: "Contact",
      bookBtn: "RÉSERVER UNE TABLE",
      callUs: "02 37 55 85 97",
      openHoursBadge: "7j/7 · 11h – 1h",
      langAria: "Changer de langue",
      mobileMenuAria: "Ouvrir ou fermer le menu de navigation"
    },
    hero: {
      smallLabel: "ISTANBUL · DREUX · DEPUIS 1992",
      heading: "L’AUTHENTIQUE GOÛT DE LA TURQUIE",
      supporting: "Des kebabs généreux, des grillades savoureuses et des spécialités turques au cœur de Dreux.",
      btnMenu: "DÉCOUVRIR NOTRE MENU",
      btnReserve: "RÉSERVER UNE TABLE",
      scrollHint: "Défiler pour découvrir"
    },
    about: {
      label: "À PROPOS",
      heading: "Bienvenue chez Istanbul",
      copy: "Bienvenue chez Istanbul, votre adresse dédiée aux saveurs authentiques de la cuisine turque à Dreux. Découvrez nos kebabs généreux, nos lahmacuns, nos grillades et nos assiettes gourmandes dans une ambiance chaleureuse et conviviale. Que ce soit pour un déjeuner, un dîner en famille ou un repas entre amis, nous vous accueillons pour un moment de plaisir autour de la cuisine turque.",
      sinceBadge: "Depuis 1992 · 34 ans de passion",
      btnExplore: "Explorer notre carte",
      badgeTitle: "Maison Fondée en 1992",
      badgeSub: "Tradition & Savoir-faire d'Anatolie",
      imgAlt: "Salle conviviale et préparation des grillades au restaurant Istanbul à Dreux"
    },
    features: {
      label: "POURQUOI NOUS CHOISIR",
      heading: "L'Excellence de la Table Turque",
      item1Title: "Cuisine turque authentique",
      item1Desc: "Découvrez les grands classiques de la cuisine turque préparés avec respect des recettes traditionnelles.",
      item2Title: "Portions généreuses",
      item2Desc: "Des plats gourmands pour toutes les envies, servis avec générosité et des accompagnements complets.",
      item3Title: "Accueil chaleureux",
      item3Desc: "Un cadre convivial pour partager un bon repas en famille, entre amis ou sur le pouce."
    },
    hours: {
      label: "VOTRE RENDEZ-VOUS GOURMAND",
      title: "Des Horaires Adaptés à Toutes Vos Envies",
      bannerBadge: "ACCUEIL NON-STOP",
      badgeDay: "OUVERT 7 JOURS SUR 7",
      badgeTime: "11 H – 1 H DU MATIN",
      serviceNote: "Sur place · À emporter · En livraison",
      addressNote: "3 rue Saint-Thibault, 28100 Dreux",
      phoneCta: "Commande & Renseignements : 02 37 55 85 97"
    },
    stats: {
      stat1Number: "200+",
      stat1Label: "visiteurs par jour",
      stat2Number: "800+",
      stat2Label: "livraisons par mois",
      stat3Number: "100%",
      stat3Label: "avis positifs",
      stat4Number: "Depuis 1992",
      stat4Label: "d'excellence culinaire"
    },
    reviews: {
      label: "TÉMOIGNAGES VÉRIFIÉS",
      heading: "Ce Que Nos Clients Disent de Nous",
      sub: "Des avis authentiques laissés par nos clients sur notre fiche Google.",
      googleBadge: "Note Google : 4.4 / 5 basée sur plus de 300 avis",
      prevAria: "Avis précédent",
      nextAria: "Avis suivant",
      viewAllGoogle: "Voir tous les avis Google",
      verifiedCustomer: "Client Google Vérifié"
    },
    menu: {
      label: "NOTRE CARTE",
      heading: "NOTRE CARTE",
      sub: "Les saveurs de la Turquie, à découvrir.",
      categories: {
        "sandwichs": "Sandwichs",
        "panini": "Panini",
        "crudites": "Crudités",
        "barquettes-frites": "Barquettes de frites",
        "barquettes-viande": "Barquettes de viande",
        "assiettes": "Assiettes",
        "lahmacun": "Lahmacun",
        "salades": "Salades",
        "desserts": "Desserts",
        "boissons": "Boissons",
        "menu-enfant": "Menu enfant",
        "supplements": "Suppléments"
      },
      dualNotice: "Les menus Sandwichs et Paninis comprennent une portion de frites dorées et une boisson 33 cl au choix.",
      platesNotice: "Toutes nos assiettes comprennent frites, boulgour turc parfumé, riz doré et salade composée. Supplément assiette mixte (viande supp.) : +3,00 €.",
      soloLabel: "Seul",
      menuLabel: "Menu",
      btnReserveCta: "RÉSERVER UNE TABLE",
      btnOrderDish: "Commander ce plat",
      orderDirect: "Commander en direct",
      emptyCategory: "Aucun produit trouvé dans cette catégorie."
    },
    reservation: {
      label: "RÉSERVATION EN LIGNE",
      heading: "Réservez votre table",
      supporting: "Nous serons ravis de vous accueillir chez Istanbul. Remplissez le formulaire ci-dessous ou appelez-nous directement.",
      nameLabel: "Nom et Prénom",
      namePlaceholder: "ex. Marc Dubois",
      phoneLabel: "Téléphone",
      phonePlaceholder: "ex. 06 12 34 56 78",
      emailLabel: "Adresse e-mail",
      emailPlaceholder: "ex. marc.dubois@email.fr",
      dateLabel: "Date de venue",
      timeLabel: "Heure souhaitée",
      guestsLabel: "Nombre de personnes",
      guestsPlaceholder: "Sélectionnez le nombre de personnes",
      guestsOption: "{n} convives",
      guestsSingle: "1 personne",
      messageLabel: "Message ou demande particulière (facultatif)",
      messagePlaceholder: "Anniversaire, table au calme, intolérances, chaise haute...",
      btnSubmit: "CONFIRMER MA DEMANDE",
      instantCallText: "Réservation immédiate par téléphone :",
      phoneLinkText: "02 37 55 85 97",
      waText: "Ou contactez-nous directement sur WhatsApp"
    },
    footer: {
      introLine1: "Au cœur de Dreux depuis 1992, le Restaurant Istanbul sublime l'art des grillades au feu de braise,",
      introLine2: "des döner kebabs authentiques et des spécialités traditionnelles d'Anatolie.",
      introLine3: "Une cuisine généreuse, conviviale et halal préparée chaque jour avec des ingrédients rigoureusement sélectionnés.",
      navTitle: "Navigation",
      catsTitle: "Notre Carte (12 Catégories)",
      specsTitle: "Spécialités Emblématiques",
      specKebab: "Kebab artisanal en pain maison",
      specLahmacun: "Lahmacun traditionnel au feu",
      specGrillades: "Grillades mixtes & côtelettes d'agneau",
      contactTitle: "Nous Trouver & Nous Joindre",
      addressLabel: "3 rue Saint-Thibault, 28100 Dreux, France",
      phoneLabel: "02 37 55 85 97",
      hoursLabel: "11 h – 1 h du matin, 7 jours sur 7",
      whatsappLabel: "Commander / Écrire sur WhatsApp",
      copyright: "© 2026 Restaurant Istanbul Dreux. Tous droits réservés.",
      backToTop: "Retour en haut"
    },
    modal: {
      resSuccessTitle: "Demande de Réservation Envoyée !",
      resSuccessMessage: "Merci pour votre confiance. Votre demande a bien été transmise à l'équipe du restaurant. Notre équipe confirmera votre table par appel ou SMS dans les plus brefs délais.",
      resSummaryTitle: "Récapitulatif de votre demande :",
      btnClose: "Fermer",
      orderModalTitle: "Commander chez Istanbul",
      orderModalDesc: "Pour déguster nos plats à emporter ou en livraison directe au meilleur prix :",
      callDirectBtn: "Appeler le restaurant : 02 37 55 85 97",
      waOrderBtn: "Commander par WhatsApp"
    }
  },

  en: {
    meta: {
      title: "Istanbul Restaurant Dreux | Authentic Turkish Cuisine & Flame-Grilled Specialties",
      desc: "Welcome to Istanbul Restaurant in Dreux (3 rue Saint-Thibault). Savor generous kebabs, crispy lahmacun, charcoal grill specialties and complete platters. Open 7 days a week from 11 AM to 1 AM."
    },
    nav: {
      logoAlt: "Istanbul Restaurant Dreux - Since 1992",
      home: "Home",
      about: "About Us",
      specialties: "Specialties",
      menu: "Menu",
      reviews: "Customer Reviews",
      hours: "Hours",
      contact: "Contact",
      bookBtn: "RESERVE A TABLE",
      callUs: "+33 2 37 55 85 97",
      openHoursBadge: "7 Days a Week · 11 AM – 1 AM",
      langAria: "Switch language",
      mobileMenuAria: "Toggle navigation menu"
    },
    hero: {
      smallLabel: "ISTANBUL · DREUX · SINCE 1992",
      heading: "THE AUTHENTIC TASTE OF TURKEY",
      supporting: "Generous kebabs, delicious grilled dishes and authentic Turkish specialties in the heart of Dreux.",
      btnMenu: "EXPLORE OUR MENU",
      btnReserve: "RESERVE A TABLE",
      scrollHint: "Scroll to discover"
    },
    about: {
      label: "ABOUT US",
      heading: "Welcome to Istanbul",
      copy: "Welcome to Istanbul, your destination for authentic Turkish cuisine in Dreux. Discover generous kebabs, lahmacun, grilled specialties and delicious platters in a welcoming atmosphere. Whether you're visiting for lunch, dinner or a meal with friends and family, we look forward to welcoming you.",
      sinceBadge: "Since 1992 · 34 Years of Passion",
      btnExplore: "Explore our menu",
      badgeTitle: "Established in 1992",
      badgeSub: "Tradition & Anatolian Craftsmanship",
      imgAlt: "Welcoming dining ambiance and open grill preparation at Istanbul Restaurant in Dreux"
    },
    features: {
      label: "WHY CHOOSE US",
      heading: "Excellence in Turkish Hospitality",
      item1Title: "Authentic Turkish cuisine",
      item1Desc: "Discover the timeless classics of Turkish culinary traditions, prepared with utmost respect for heritage recipes.",
      item2Title: "Generous portions",
      item2Desc: "Hearty and delicious dishes for every appetite, served with generous complete sides of bulgur, rice and fresh salad.",
      item3Title: "Warm hospitality",
      item3Desc: "A warm, convivial setting to share great meals with family, friends or on the go.",
      btnExplore: "Discover our dishes"
    },
    hours: {
      label: "YOUR CULINARY DESTINATION",
      title: "Opening Hours Tailored to Your Schedule",
      bannerBadge: "NON-STOP WELCOME",
      badgeDay: "OPEN 7 DAYS A WEEK",
      badgeTime: "11 AM – 1 AM",
      serviceNote: "Dine-in · Takeout · Fast delivery",
      addressNote: "3 rue Saint-Thibault, 28100 Dreux, France",
      phoneCta: "Orders & Inquiries: +33 2 37 55 85 97"
    },
    stats: {
      stat1Number: "200+",
      stat1Label: "visitors per day",
      stat2Number: "800+",
      stat2Label: "deliveries per month",
      stat3Number: "100%",
      stat3Label: "positive reviews",
      stat4Number: "Since 1992",
      stat4Label: "of culinary excellence"
    },
    reviews: {
      label: "VERIFIED REVIEWS",
      heading: "What Our Guests Say About Us",
      sub: "Authentic testimonials submitted by real diners on our Google Business listing.",
      googleBadge: "Google Rating: 4.4 / 5 based on 300+ reviews",
      prevAria: "Previous review",
      nextAria: "Next review",
      viewAllGoogle: "View all Google reviews",
      verifiedCustomer: "Verified Google Reviewer"
    },
    menu: {
      label: "OUR MENU",
      heading: "OUR MENU",
      sub: "Discover the flavors of Turkey.",
      categories: {
        "sandwichs": "Sandwiches",
        "panini": "Panini",
        "crudites": "Fresh Subs",
        "barquettes-frites": "Fries Boxes",
        "barquettes-viande": "Meat Boxes",
        "assiettes": "Platters",
        "lahmacun": "Lahmacun",
        "salades": "Salads",
        "desserts": "Desserts",
        "boissons": "Beverages",
        "menu-enfant": "Kids Menu",
        "supplements": "Supplements"
      },
      dualNotice: "Sandwich and Panini menus include golden crispy fries and your choice of a 33 cl beverage.",
      platesNotice: "All our platters include golden fries, fragrant Turkish bulgur, rice and crisp salad. Mixed meat supplement (extra meat): +€3.00.",
      soloLabel: "Single",
      menuLabel: "Menu Combo",
      btnReserveCta: "RESERVE A TABLE",
      btnOrderDish: "Order this dish",
      orderDirect: "Direct order",
      emptyCategory: "No items found in this category."
    },
    reservation: {
      label: "ONLINE BOOKING",
      heading: "Reserve Your Table",
      supporting: "We look forward to welcoming you at Istanbul. Fill in the form below or contact our concierge directly by phone.",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Alexander Smith",
      phoneLabel: "Phone Number",
      phonePlaceholder: "e.g. +33 6 12 34 56 78",
      emailLabel: "Email Address",
      emailPlaceholder: "e.g. alexander@email.com",
      dateLabel: "Reservation Date",
      timeLabel: "Preferred Time",
      guestsLabel: "Number of Guests",
      guestsPlaceholder: "Select number of diners",
      guestsOption: "{n} guests",
      guestsSingle: "1 guest",
      messageLabel: "Special Requests or Dietary Notes (Optional)",
      messagePlaceholder: "Birthday celebration, quiet corner, allergies, baby high chair...",
      btnSubmit: "CONFIRM RESERVATION",
      instantCallText: "Immediate reservation by phone:",
      phoneLinkText: "02 37 55 85 97",
      waText: "Or message us directly on WhatsApp"
    },
    footer: {
      introLine1: "In the historic heart of Dreux since 1992, Istanbul Restaurant elevates the craft of flame grilling,",
      introLine2: "authentic spit-roasted döner kebabs and timeless culinary specialties of Anatolia.",
      introLine3: "A generous, warm and halal table prepared daily with rigorously selected fresh ingredients.",
      navTitle: "Navigation",
      catsTitle: "Our Menu (12 Categories)",
      specsTitle: "Signature Specialties",
      specKebab: "Artisanal kebab in freshly baked bread",
      specLahmacun: "Traditional flame-baked lahmacun",
      specGrillades: "Mixed charcoal grill & lamb chops",
      contactTitle: "Location & Contact",
      addressLabel: "3 rue Saint-Thibault, 28100 Dreux, France",
      phoneLabel: "+33 2 37 55 85 97",
      hoursLabel: "11 AM – 1 AM, 7 days a week",
      whatsappLabel: "Order / Chat on WhatsApp",
      copyright: "© 2026 Istanbul Restaurant Dreux. All rights reserved.",
      backToTop: "Back to top"
    },
    modal: {
      resSuccessTitle: "Reservation Request Submitted!",
      resSuccessMessage: "Thank you for choosing Istanbul. Your booking request has been forwarded to our team. We will confirm your table shortly by phone or SMS.",
      resSummaryTitle: "Your reservation summary:",
      btnClose: "Close",
      orderModalTitle: "Order from Istanbul",
      orderModalDesc: "To enjoy our dishes for takeaway or direct delivery with zero markup:",
      callDirectBtn: "Call Restaurant: 02 37 55 85 97",
      waOrderBtn: "Order via WhatsApp"
    }
  }
};
