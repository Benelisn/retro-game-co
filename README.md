# Retro Game Co.

An e-commerce website for a used retro video game store, built for my SDC260 project by Joshua Farr.

## Purpose

Retro Game Co. sells tested, cleaned, and graded used games for N64, PS1, and PS2. Shoppers can browse the catalog, filter by console, view game details, add games to a cart, and complete a simulated checkout.

## Pages

- Store Homepage
- Shop / Catalog
- Product Detail
- About / Contact
- Cart
- Checkout
- Order Confirmation

## Tech Stack

- HTML, CSS, JavaScript
- Product data stored in a JavaScript array
- Cart saved in the browser with `localStorage`
- Hosted on GitHub Pages: https://benelisn.github.io/retro-game-co/

## Repository Layout

Each week's milestone is kept in its own folder (`Week 2`, `Week 3`, `Week 4`). The root `index.html` redirects to the latest version.

## Feature Roadmap

| Week | Dates | Milestone | Key Features |
|------|-------|-----------|--------------|
| 1 | Oct 18th | Foundation & Homepage | Folder structure, shared header/nav/footer, color theme in CSS, homepage hero and featured games, responsive layout |
| 2 | Oct 25th | Catalog & Product Detail | Product data file, catalog grid built from data, console filter and search, product detail page, About/Contact page |
| 3 | Nov 1st | Shopping Cart | Add to cart, cart page with quantity update and remove, subtotal/tax/total, cart count badge in header |
| 4 | Nov 8th | Checkout & Launch | Checkout form with validation, order confirmation page, accessibility review, testing, GitHub Pages launch |

## Week 4 Update

- Shows available stock on every game card and product page
- Stock goes down when a game is added to the cart and back up when it's removed
- Sold-out games are greyed out, can't be added, and show an "Out of Stock" cursor tooltip
- Clear Cart button on the cart page
- Purchased games stay sold after checkout (saved in localStorage)
- Live on GitHub Pages

To reset the store while testing, open the browser Console and run `localStorage.clear()`.

## Color Palette

| Color | Hex | Use |
|-------|-----|-----|
| Midnight Navy | `#1B1F3B` | Body text, header, footer |
| Cartridge Cream | `#FDF8F0` | Page background |
| Power Red | `#C1272D` | Buttons, calls to action |
| Coin Gold | `#FFC857` | Badges, sale tags, cart count |
| Console Teal | `#0E7C7B` | Links, hover states |
