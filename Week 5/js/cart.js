/*
  Retro Game Co. - Shared cart, totals, and coupon logic
  Author: Joshua Farr
  Date: November 7, 2026 (updated November 7, 2026)
  Purpose: Save the cart in localStorage, track available stock,
           update the header badge, and calculate totals with coupon discounts
*/

const CART_KEY = "rgcCart";
const COUPON_KEY = "rgcCoupon";
const SOLD_KEY = "rgcSold";
const TAX_RATE = 0.06;

// Coupon codes: percent off the whole order, or only one console's games
const coupons = {
  RETRO10:    { percent: 10, platform: "All", label: "10% off your order" },
  PRESSSTART: { percent: 15, platform: "All", label: "15% off your order" },
  N64FAN:     { percent: 20, platform: "N64", label: "20% off N64 games" }
};

// ===== CART STORAGE =====
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    // Storage blocked; the cart just won't persist
  }
  updateCartBadge();
  updateStockDisplay();
}

function findProduct(productId) {
  return products.find(game => game.productId === productId);
}

// ===== INVENTORY =====
// Copies already sold in past orders, saved as { productId: qty }
function getSold() {
  try {
    return JSON.parse(localStorage.getItem(SOLD_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function markSold(cart) {
  const sold = getSold();
  cart.forEach(item => {
    sold[item.productId] = (sold[item.productId] || 0) + item.qty;
  });
  try {
    localStorage.setItem(SOLD_KEY, JSON.stringify(sold));
  } catch (error) {
    // Ignore storage errors
  }
}

// Copies left to sell (stock minus past orders), before the cart
function getStockLeft(productId) {
  const game = findProduct(productId);
  return Math.max(game.stock - (getSold()[productId] || 0), 0);
}

function getQtyInCart(productId) {
  const line = getCart().find(item => item.productId === productId);
  return line ? line.qty : 0;
}

// Copies a shopper can still add (stock left minus what's in the cart)
function getAvailable(productId) {
  return Math.max(getStockLeft(productId) - getQtyInCart(productId), 0);
}

function addToCart(productId) {
  // Out of stock: don't add
  if (getAvailable(productId) <= 0) {
    return false;
  }

  const cart = getCart();
  const line = cart.find(item => item.productId === productId);

  if (line) {
    line.qty++;
  } else {
    cart.push({ productId: productId, qty: 1 });
  }

  saveCart(cart);
  return true;
}

function updateQuantity(productId, qty) {
  let cart = getCart();

  if (qty <= 0) {
    cart = cart.filter(item => item.productId !== productId);
  } else {
    const line = cart.find(item => item.productId === productId);
    line.qty = Math.min(qty, getStockLeft(productId));
  }

  saveCart(cart);
}

function removeFromCart(productId) {
  updateQuantity(productId, 0);
}

// Empty the cart. Stock goes back up automatically because
// available stock is calculated from what's in the cart.
function clearCart() {
  saveCart([]);
  setCoupon("");
}

function getCartCount() {
  let count = 0;
  for (const item of getCart()) {
    count += item.qty;
  }
  return count;
}

function updateCartBadge() {
  const badges = document.querySelectorAll(".cart-count");
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
  });
}

// ===== COUPONS =====
function findCoupon(code) {
  const cleanCode = code.trim().toUpperCase();
  return coupons[cleanCode] ? cleanCode : null;
}

function getCoupon() {
  try {
    return localStorage.getItem(COUPON_KEY) || "";
  } catch (error) {
    return "";
  }
}

function setCoupon(code) {
  try {
    localStorage.setItem(COUPON_KEY, code);
  } catch (error) {
    // Ignore storage errors
  }
}

// ===== TOTALS =====
function calculateTotals(couponCode) {
  const coupon = coupons[couponCode];
  let subtotal = 0;
  let discount = 0;

  for (const item of getCart()) {
    const game = findProduct(item.productId);
    const lineTotal = game.price * item.qty;
    subtotal += lineTotal;

    // Apply the discount to this line if the coupon covers its console
    if (coupon && (coupon.platform === "All" || coupon.platform === game.platform)) {
      discount += lineTotal * (coupon.percent / 100);
    }
  }

  const taxable = subtotal - discount;
  const tax = taxable * TAX_RATE;

  return {
    subtotal: subtotal,
    discount: discount,
    tax: tax,
    total: taxable + tax
  };
}

function money(amount) {
  return "$" + amount.toFixed(2);
}

// Wire up any "Add to Cart" button on the page (uses event delegation)
document.addEventListener("click", function (event) {
  const button = event.target.closest(".add-to-cart");
  if (!button) {
    return;
  }

  // Visual feedback: the button says "Added!" for a moment
  if (addToCart(button.dataset.id)) {
    announce(`${findProduct(button.dataset.id).title} added to cart. Cart has ${getCartCount()} items.`);
    button.dataset.flash = "true";
    button.textContent = "Added!";

    setTimeout(function () {
      delete button.dataset.flash;
      updateStockDisplay();
    }, 1200);
  }
});

// ===== SCREEN READER ANNOUNCEMENTS =====
// A hidden live region; screen readers read anything put in it
const liveRegion = document.createElement("p");
liveRegion.className = "visually-hidden";
liveRegion.setAttribute("role", "status");
liveRegion.setAttribute("aria-live", "polite");
document.body.appendChild(liveRegion);

function announce(message) {
  liveRegion.textContent = "";
  setTimeout(function () {
    liveRegion.textContent = message;
  }, 50);
}

// ===== STOCK DISPLAY =====
// Update every "Available" count and Add to Cart button on the page
function updateStockDisplay() {
  document.querySelectorAll(".stock-count").forEach(label => {
    const left = getAvailable(label.dataset.id);
    label.textContent = left > 0 ? `Available: ${left}` : "Out of Stock";
    label.classList.toggle("is-out", left === 0);
  });

  document.querySelectorAll(".add-to-cart").forEach(button => {
    const left = getAvailable(button.dataset.id);
    const card = button.closest(".game-card, .product-detail");

    button.disabled = left === 0;
    // Leave "Added!" showing until its timer ends
    if (!button.dataset.flash) {
      button.textContent = left === 0 ? "Out of Stock" : "Add to Cart";
    }
    if (card) {
      card.classList.toggle("sold-out", left === 0);
    }
  });
}

// ===== OUT OF STOCK TOOLTIP =====
// A tooltip that follows the cursor over sold-out games
const stockTooltip = document.createElement("div");
stockTooltip.className = "stock-tooltip";
stockTooltip.textContent = "Out of Stock";
stockTooltip.setAttribute("aria-hidden", "true");
document.body.appendChild(stockTooltip);

document.addEventListener("mousemove", function (event) {
  const soldOut = event.target.closest(".sold-out");
  if (soldOut) {
    stockTooltip.style.left = `${event.clientX + 14}px`;
    stockTooltip.style.top = `${event.clientY + 14}px`;
    stockTooltip.classList.add("show");
  } else {
    stockTooltip.classList.remove("show");
  }
});

updateCartBadge();
updateStockDisplay();
