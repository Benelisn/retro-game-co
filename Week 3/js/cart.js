/*
  Retro Game Co. - Shared cart, totals, and coupon logic
  Author: Joshua Farr
  Date: November 7, 2026
  Purpose: Save the cart in localStorage, update the header badge,
           and calculate totals with coupon discounts
*/

const CART_KEY = "rgcCart";
const COUPON_KEY = "rgcCoupon";
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
}

function findProduct(productId) {
  return products.find(game => game.productId === productId);
}

function addToCart(productId) {
  const cart = getCart();
  const game = findProduct(productId);
  const line = cart.find(item => item.productId === productId);

  if (line) {
    // Don't sell more copies than are in stock
    if (line.qty >= game.stock) {
      return false;
    }
    line.qty++;
  } else {
    cart.push({ productId: productId, qty: 1 });
  }

  saveCart(cart);
  return true;
}

function updateQuantity(productId, qty) {
  let cart = getCart();
  const game = findProduct(productId);

  if (qty <= 0) {
    cart = cart.filter(item => item.productId !== productId);
  } else {
    const line = cart.find(item => item.productId === productId);
    line.qty = Math.min(qty, game.stock);
  }

  saveCart(cart);
}

function removeFromCart(productId) {
  updateQuantity(productId, 0);
}

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

  const added = addToCart(button.dataset.id);
  const original = button.dataset.label || button.textContent;
  button.dataset.label = original;
  button.textContent = added ? "Added!" : "Max in stock";

  setTimeout(function () {
    button.textContent = original;
  }, 1200);
});

updateCartBadge();
