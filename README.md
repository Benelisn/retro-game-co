# Retro Game Co.

An e-commerce website for a used retro video game store, built for my SDC260 project by Joshua Farr (josfar6040).

**Live site:** https://benelisn.github.io/retro-game-co/

## Purpose

Retro Game Co. sells tested, cleaned, and graded used games for the N64, PS1, and PS2. Shoppers can browse the catalog, filter by console, check stock, add games to a cart, apply a coupon, and complete a simulated checkout.

## Features

### Shopping
- **Homepage** with a hero banner, shop-by-console buttons, and featured games
- **Shop page** that builds 12 game cards with a JavaScript loop, with a console filter and title search
- **Product detail page** with genre, release year, condition, what's included, and price
- Responsive layout: 1 column on phones, 2 on tablets, 4 on desktops

### Cart and Inventory
- Add to Cart from the shop, homepage, or product page, with an "Added!" confirmation on the button
- Cart page with quantity controls, Remove buttons, a **Clear Cart** button, subtotal, 6% tax, and total
- Header cart badge that shows the item count on every page
- Cart is saved in `localStorage`, so it stays after a refresh or closing the browser
- Every game shows how many copies are available. Stock goes down when a game is added and back up when it's removed
- Sold-out games are greyed out, can't be added, and show an "Out of Stock" tooltip that follows the cursor
- Purchased games stay sold after checkout

### Checkout
- Shipping form (name, street, city, state, ZIP, phone) and payment form (cardholder, card number, expiration, security code)
- JavaScript validation on every required field, with error messages under each field
- Coupon codes checked against a list, with a percent discount on the order or on one console's games
- Order confirmation page with order number, shipping city, coupon used, and total

| Code | Discount |
|------|----------|
| RETRO10 | 10% off the order |
| PRESSSTART | 15% off the order |
| N64FAN | 20% off N64 games only |

### Contact
- About page with a contact form (name, email, subject, message) that validates the email and message

### Network Connection Test
- `network.html` shows the local host name, communication port, transmission protocol, and the last time the site was launched
- Detects whether the page is served over a network (HTTP/HTTPS) or opened as a file
- Saves the launch time in a cookie (`rgcLastLaunch`) and shows the previous launch on the next visit

### Accessibility
- "Skip to main content" link on every page for keyboard users
- Screen readers announce when a game is added, removed, or the cart is cleared
- Labels on every form field, alt text on every image, and visible focus outlines
- Passed an automated WCAG A/AA check (axe-core) on every page

## Browser Storage

| Storage | Key | Holds |
|---------|-----|-------|
| localStorage | `rgcCart` | Games and quantities in the cart |
| localStorage | `rgcCoupon` | Coupon applied at checkout |
| localStorage | `rgcSold` | Copies sold in past orders |
| localStorage | `rgcLastOrder` | Details for the confirmation page |
| Cookie | `rgcLastLaunch` | Last time the Network Test page was launched |

To reset the store while testing, open the browser Console and run `localStorage.clear()`.

## Running Locally

1. Open the `Week 5` folder in Visual Studio Code.
2. Open `index.html` and click **Show Preview** (Live Preview extension), or open the preview URL in a browser.
3. Visit the **Network** page to confirm the site is being served over the network.

## Repository Layout

Each weekly milestone is kept in its own folder so progress can be compared week to week. The root `index.html` redirects to the latest version.

```
retro-game-co/
├── index.html        Redirects to Week 5
├── README.md         This file
├── Week 2/           Catalog and product detail
├── Week 3/           Cart, checkout and contact forms, coupons
├── Week 4/           Inventory tracking, Clear Cart, GitHub Pages launch
└── Week 5/           Final site: Network Test page, accessibility, photos
    ├── *.html        Home, Shop, Product, About, Network, Cart, Checkout, Confirmation
    ├── css/          styles.css
    ├── images/       Product photos and console placeholders
    └── js/           One script per page, plus shared cart, product, and validation code
```

## Tech Stack

- HTML, CSS, JavaScript (no frameworks)
- Product data stored in a JavaScript array
- localStorage and cookies for saved data
- Hosted on GitHub Pages

## Feature Roadmap

| Week | Milestone | Status |
|------|-----------|--------|
| 1 | Foundation and homepage | Complete |
| 2 | Catalog and product detail | Complete |
| 3 | Shopping cart, checkout forms, validation, coupons | Complete |
| 4 | Inventory tracking, Clear Cart, GitHub Pages launch | Complete |
| 5 | Network Test page, accessibility review, product photos, testing | Complete |

## Color Palette

| Color | Hex | Use |
|-------|-----|-----|
| Midnight Navy | `#1B1F3B` | Body text, header, footer |
| Cartridge Cream | `#FDF8F0` | Page background |
| Power Red | `#C1272D` | Buttons, calls to action |
| Coin Gold | `#FFC857` | Badges, sale tags, cart count |
| Console Teal | `#0E7C7B` | Links, hover states |
