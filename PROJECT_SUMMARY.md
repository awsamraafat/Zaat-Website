# Zaat Link Shopify Theme - Complete File-by-File Documentation

This documentation provides an exhaustive, detailed explanation of every folder and file in the **Zaat Website (Zaat Link) Version 1** codebase. This theme is built as a Shopify 2.0 template designed for custom NFC smart networking products.

---

## 📂 Project Directory Map
```text
Zaat-Website Version 1/
├── assets/
│   ├── theme.css
│   ├── theme.js
│   └── [Image and asset files...]
├── config/
│   ├── settings_data.json
│   └── settings_schema.json
├── layout/
│   └── theme.liquid
├── sections/
│   ├── download-app.liquid
│   ├── faq.liquid
│   ├── features.liquid
│   ├── footer.liquid
│   ├── header.liquid
│   ├── hero.liquid
│   ├── main-collection.liquid
│   ├── main-product.liquid
│   ├── privacy-policy.liquid
│   ├── support.liquid
│   ├── terms-conditions.liquid
│   └── testimonials.liquid
├── snippets/
│   └── product-card.liquid
├── templates/
│   ├── collection.json
│   ├── index.json
│   ├── page.download.json
│   ├── page.faq.json
│   ├── page.privacy-policy.json
│   ├── page.support.json
│   ├── page.terms-conditions.json
│   └── product.json
├── preview.html
└── PROJECT_SUMMARY.md
```

---

## 🏛️ 1. Layout Files (`layout/`)

### 📄 [theme.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/layout/theme.liquid)
The main shell wrapper that outputs on every page of the storefront.
* **HTML Wrapper**: Declares the doctype and sets lang to the locale ISO code (`request.locale.iso_code`).
* **Header Tags**: 
  - Resolves mobile compatibility with standard meta viewport settings.
  - Dynamically builds the `<title>` tag with formatting for search filters (`current_tags`), pagination (`current_page`), and shop naming details.
  - Conditionally renders search-engine meta descriptions.
  - Injects critical Shopify header scripts, hooks, and tracker assets via `{{ content_for_header }}`.
* **External Assets Integration**:
  - Connects to Google Fonts web service to preload the fonts `Inter` (for body copy) and `Outfit` (for heading content).
  - Styles the document via `{{ 'theme.css' | asset_url | stylesheet_tag }}`.
* **Body Elements**:
  - Automatically appends a target template helper class (`template-{{ template.name }}`) to the page body.
  - Inserts the global header section `{% section 'header' %}`.
  - Standardizes the main content workspace inside `<main id="MainContent">` using `{{ content_for_layout }}`.
  - Outputs the global footer `{% section 'footer' %}`.
  - Loads the primary client script `{{ 'theme.js' | asset_url | script_tag }}` using the `defer` loading attribute.

---

## 🧩 2. Section Files (`sections/`)

These Liquid files act as the building blocks of the store pages, allowing administrators to customize layout sections directly from the Shopify admin interface.

### 📄 [header.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/header.liquid)
The navigation and header capsule block displayed at the top of the viewport.
* **Code Structure**:
  - Wrapped inside a `<header class="site-header">` container.
  - **Logo Branding**: Outputs a custom logo image if uploaded in settings (`section.settings.logo`); falls back to the animated asset `logo.gif`.
  - **Navigation**: Uses a loop `{% for link in linklists[section.settings.menu].links %}` to build a dynamic navigation menu. If no menu is configured, it falls back to hardcoded defaults (Help Center and Collection).
  - **User Actions**: Integrates links for user profiles (`/account`) and the shopping cart drawer (`/cart`) with dynamic item counters (`{{ cart.item_count }}`).
* **Shopify Schema Settings**:
  - `logo`: Image Picker option to customize the header brand.
  - `menu`: Link List selector to map navigation lists (default: `main-menu`).

### 📄 [hero.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/hero.liquid)
The premium intro showcase section displayed on the homepage.
* **Code Structure**:
  - **Hero Text**: Outputs centered titles and detailed descriptions (`section.settings.title`, `section.settings.description`).
  - **Central Art Assets**: Renders the background neon flare (`hero-bg-glow.png`), the primary glossy design backdrop (`hero-bg-liquid.png`), and the floating black NFC card (`card-black-edition.png` or a custom configured image upload).
  - **Info Panels**: Layered absolute-positioned cards (Left and Right) containing smiling user photography (`hero-woman.png`), NFC icons, calls-to-action, and feature details.
  - **Watermark Backdrop**: Huge stylized text block (`Zaatlink`) shifting position in response to viewport scrolling.
* **Shopify Schema Settings**:
  - `title`: Hero main title.
  - `description`: Sub-header description paragraph.
  - `nfc_card`: Image picker to replace the main featured NFC card.
  - `left_card_title` & `left_card_desc`: Content settings for the floating left-side card.
  - `button_text` & `button_url`: Custom button attributes.
  - `right_card_title` & `right_card_desc`: Content settings for the right-side card.
  - `watermark_text`: Customizable ambient background watermark.

### 📄 [features.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/features.liquid)
An interactive features matrix highlighting card benefits.
* **Code Structure**:
  - **Features Grid**: Contains 4 main feature columns:
    - *Smart Profile*: Explains how profiles compile contact data.
    - *All-in-One Links*: Outlines links aggregation.
    - *Tap to Share*: Details NFC touch transmissions.
    - *Live Updates*: Shows app-based sync features.
  - **Central Phone Screen**: Houses an iPhone model mock-up (`phone-mockup.png`).
  - **Radial Integration**: Contains an interactive, circular network map showing how social app icons connect around the core Zaat ecosystem.
  - **Vertical Steps**: Details card registration instructions.
  - **Diagonal Stack Display**: Displays a floating card deck (`card-black-edition.png`, `12.png`, `card-pink-edition.png`, `13.png`) with dynamic tilt angles.
* **Shopify Schema Settings**:
  - `showcase_banner`: Pick-list image option to swap showcase headers.
  - `deck_card_1` through `deck_card_4`: Individual image upload zones to map customizable card variant images in the floating deck.

### 📄 [main-product.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/main-product.liquid)
The main e-commerce listing details page for purchasing personalized NFC cards.
* **Code Structure**:
  - **Gallery Elements**: Left panel displaying thumbnail slide controllers. Loops through all product media files.
  - **Product Form**: Powered by Shopify's `{% form 'product', product %}` tag.
  - **Color Swatches**: Custom-coded color selectors. Selecting a swatch dynamically updates an underlying hidden form input `properties[Color]` and updates the gallery view.
  - **Embossing Customization**: Text input elements mapped to custom line items (`properties[Name]` and `properties[Title]`). Includes custom real-time character limit trackers showing a `0 / 20` scale.
  - **Quantity Selector**: Numeric quantity editor equipped with subtraction/addition controllers.
  - **Accordions**: Three toggling tabs displaying Description, Device Compatibility list, and Shipping/Delivery notices.
* **Shopify Schema Settings**:
  - Default settings for the product catalog layout.

### 📄 [main-collection.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/main-collection.liquid)
The grid template listing all available items in the shop catalog.
* **Code Structure**:
  - **Filter Sidebar**: Categorized list selectors sorting by Cards, Stands, and Medals.
  - **Catalog Sort**: Form dropdown allowing users to sort by price, recommended status, and popularity.
  - **Product Grid**: Displays filtered shop listings using reusable snippets `{% render 'product-card', product: product %}`.

### 📄 [faq.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/faq.liquid)
A categorized, searchable Customer Help Center section.
* **Code Structure**:
  - **Search Header**: Features a text input field linked to an instant search algorithm that filters matching FAQs dynamically.
  - **Category Tabs**: Toggles content categories (General and Setup guides).
  - **FAQ Panels**: Toggling glass-styled cards containing questions, descriptions, and answer text.

### 📄 [support.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/support.liquid)
Customer support hub page.
* **Code Structure**:
  - **Quick Contact Cards**: Stylized glass boxes linking to email support, phone assistance, and the FAQs page.
  - **Ticket Form**: Uses Shopify's `{% form 'contact' %}` schema. It gathers Name, Email, Phone number, Topic (dropdown containing Order Status, Profile Setup, NFC Compatibility, Corporate inquiries), Subject, and Message Details.

### 📄 [download-app.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/download-app.liquid)
Promotional call-to-action layout encouraging mobile application downloads.
* **Code Structure**:
  - **Layout Cards**: Displays app logos, details, and feature highlights.
  - **Badge Links**: Houses official App Store and Google Play SVG graphic links.
* **Shopify Schema Settings**:
  - `app_name`: String value setting app title.
  - `title` & `description`: Section title and description.
  - `app_store_url` & `google_play_url`: Download links.

### 📄 [testimonials.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/testimonials.liquid)
User review display grid.
* **Code Structure**:
  - Displays customer cards in a responsive grid.
  - Each review contains user info, fallback colored letter avatars, and quote text.

### 📄 [footer.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/footer.liquid)
The global footer section of the theme.
* **Code Structure**:
  - **Navigation Columns**: Maps lists for internal link groups, social channels, and brand contact info.
  - **Integrated Form**: Includes a general Contact Form (`{% form 'contact' %}`) allowing visitors to send direct messages to the store admin.
  - **Bottom Panel**: Renders copyright labels and app download badges.

### 📄 [privacy-policy.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/privacy-policy.liquid) & [terms-conditions.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/sections/terms-conditions.liquid)
Static legal document layouts.
* **Code Structure**:
  - Layouts optimized for segmented legal sections.
  - Includes a sticky sidebar navigation on the left, which dynamically switches the active tab view on the right using a lightweight inline JavaScript controller (preventing standard hash viewport jump and selectively showing/hiding targeted section blocks).

---

## 📦 3. Snippet Files (`snippets/`)

### 📄 [product-card.liquid](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/snippets/product-card.liquid)
A reusable card snippet displaying product details in collection grids.
* **Key Mechanisms**:
  - **Image Swapping**: Displays the main featured product image. If an alternative image exists (`product.images.size > 1`), it loads it as a hover image, creating a smooth transition effect when users hover over the card.
  - **Liquid Formatting**: Outputs product title headers and formats currency prices using Shopify's `{{ product.price | money }}` filter.

---

## ⚙️ 4. Configuration Files (`config/`)

### 📄 [settings_schema.json](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/config/settings_schema.json)
Configures custom layout settings for merchants in the Shopify customizer.
* **Sections**:
  - `theme_info`: Declares theme metadata (Theme Author: Antigravity, version 1.0.0).
  - `Colors`: Provides color pickers mapping to site background, text color, primary accents, and card container surfaces.
  - `Social Media`: Text input fields for LinkedIn, Facebook, Instagram, and Twitter URLs.

### 📄 [settings_data.json](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/config/settings_data.json)
Stores active setting values configured in the theme customizer, including active sections, color hex codes, and social media URLs.

---

## 🎨 5. Asset Files (`assets/`)

### 📄 [theme.css](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/assets/theme.css)
The core stylesheet of the theme.
* **Key Components**:
  - **CSS Variables**: Declares theme-wide visual settings (background color, card transparency, typography, borders, and animations) in `:root`.
  - **Layout Framework**: Custom layout grid structures, flexbox alignments, responsive utility helpers, and scrollbar styles.
  - **Visual Styling**: Implements premium dark-mode styling with glassmorphism container panels (`.glass-card`).
  - **Animations**: Keyframe declarations (`@keyframes float` and `float-slow`) to create smooth vertical animations for background elements.

### 📄 [theme.js](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/assets/theme.js)
Contains all frontend Javascript functionality. Key functions include:
* `initHeaderScroll()`: Automatically hides the navigation header when scrolling down and shows it when scrolling up.
* `initHeroParallax()`: Adjusts the positions of floating elements and watermarks in response to page scrolling.
* `initCartDrawer()`: Handles opening and closing actions for the slide-out cart drawer.
* `initMobileMenu()`: Manages mobile navigation menu toggle states.
* `initAccordions()`: Handles expand/collapse states and height calculations for product details and FAQ accordion panels.
* `initProductGallery()`: Swaps the main product image when thumbnails are clicked.
* `initColorSwatches()`: Manages variant color selection, updates hidden form inputs, and focuses the main gallery image.
* `initQuantityPickers()`: Updates checkout quantities and calculates cart totals in real-time.
* `initCharacterCounters()`: Tracks character counts for personalized name and title text inputs.
* `initFaqSearch()`: Handles live keyword search filtering for FAQ questions.
* `initContactForm()`: Validates contact form entries and manages submit status feedback.

---

## 🖥️ 6. Store Simulator (`preview.html`)

### 📄 [preview.html](file:///Users/amirasamir/Downloads/Zaat%20Website/Zaat-Website%20Version%201/preview.html)
An offline simulator file containing mockup structures for all pages of the theme.
* **Layout Structure**:
  - Incorporates the styling properties of the core stylesheet (`theme.css`) and embeds simulated section wrappers.
  - Uses Javascript to toggle page visibility, allowing developers to switch between sections (Homepage, Product details page, Collection grid, FAQs, Support, App download, and Legal pages) without running a live Shopify store.
