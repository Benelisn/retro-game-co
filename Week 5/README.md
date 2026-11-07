# Retro Game Co.

An e-commerce website for a used retro video game store, built for my SDC260 project by Joshua Farr.

## Purpose

Retro Game Co. sells tested, cleaned, and graded used games for the Nintendo 64, PlayStation, and PlayStation 2 (N64, PS1, PS2). Shoppers can browse the catalog, filter by console, view game details, add games to a cart, and complete a simulated checkout.

## Pages

- Store Homepage
- Shop / Catalog
- Product Detail
- About / Contact
- Cart
- Checkout
- Order Confirmation

## File Structure

```
index.html          Homepage (hero, console buttons, featured games)
shop.html           Catalog grid with console filter and title search
product.html        Product detail (loads a game by ?id=productId)
about.html          About, condition grading guide, contact form
network.html        Network Connection Test (host, port, protocol, last launch)
cart.html           Cart with quantity, remove, clear, and totals
checkout.html       Shipping and payment forms with validation and coupons
confirmation.html   Order confirmation
css/styles.css      Brand theme and responsive layout
js/products.js      Product data array and shared card builder
js/cart.js          Shared cart storage, header badge, totals, coupon codes
js/validation.js    Reusable input validation functions
js/home.js          Featured games on the homepage (forEach loop)
js/shop.js          Shop grid, filter, and search (forEach loop)
js/product.js       Product detail page
js/cart-page.js     Cart page rows and controls
js/checkout.js      Checkout validation, coupon, and order summary
js/contact.js       Contact form validation
js/confirmation.js  Order confirmation details
js/network.js       Network Connection Test and launch cookie
images/             Console placeholder images
```

## Tech Stack

- HTML, CSS, JavaScript
- Product data stored in a JavaScript array
- Cart saved in the browser with `localStorage`
- Hosted on GitHub Pages

## Feature Roadmap

| Week | Dates | Milestone | Key Features |
|------|-------|-----------|--------------|
| 1 | Oct 18th | Foundation & Homepage | Folder structure, shared header/nav/footer, color theme in CSS, homepage hero and featured games, responsive layout |
| 2 | Oct 25th | Catalog & Product Detail | Product data file, catalog grid built from data, console filter and search, product detail page, About/Contact page |
| 3 | Nov 1st | Shopping Cart | Add to cart, cart page with quantity update and remove, subtotal/tax/total, cart count badge in header |
| 4 | Nov 8th | Checkout & Launch | Checkout form with validation, order confirmation page, accessibility review, testing, GitHub Pages launch |

**Week 3 update:** The course moved checkout forms into Week 3, so this milestone delivered both the shopping cart and the checkout/contact form validation. Week 4 focuses on the accessibility review, testing, and the GitHub Pages launch.

**Week 4 update:** Added inventory awareness (live "Available" counts, sold-out games greyed out with an "Out of Stock" cursor tooltip and a disabled Add to Cart button), a Clear Cart button, purchased games staying sold after checkout, and the GitHub Pages launch.

**Week 5 update:** Added the Network Connection Test page (host, port, protocol, and last launch time saved in a cookie), a skip-to-content link, screen reader announcements for cart changes, console product photos with a placeholder fallback, and a full accessibility check (axe-core, no WCAG A/AA issues). See the main README for the complete feature list.

## Coupon Codes

| Code | Discount |
|------|----------|
| RETRO10 | 10% off the order |
| PRESSSTART | 15% off the order |
| N64FAN | 20% off N64 games only |

Sales tax is 6%. Shipping is free.

## Color Palette

| Color | Hex | Use |
|-------|-----|-----|
| Midnight Navy | `#1B1F3B` | Body text, header, footer |
| Cartridge Cream | `#FDF8F0` | Page background |
| Power Red | `#C1272D` | Buttons, calls to action |
| Coin Gold | `#FFC857` | Badges, sale tags, cart count |
| Console Teal | `#0E7C7B` | Links, hover states |
