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
cart.html           Cart (Week 3)
checkout.html       Checkout (Week 4)
confirmation.html   Order confirmation (Week 4)
css/styles.css      Brand theme and responsive layout
js/products.js      Product data array and shared card builder
js/home.js          Featured games on the homepage
js/shop.js          Shop grid, filter, and search
js/product.js       Product detail page
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

## Color Palette

| Color | Hex | Use |
|-------|-----|-----|
| Midnight Navy | `#1B1F3B` | Body text, header, footer |
| Cartridge Cream | `#FDF8F0` | Page background |
| Power Red | `#C1272D` | Buttons, calls to action |
| Coin Gold | `#FFC857` | Badges, sale tags, cart count |
| Console Teal | `#0E7C7B` | Links, hover states |
