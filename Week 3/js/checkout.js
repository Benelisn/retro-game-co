/*
  Retro Game Co. - Checkout page
  Author: Joshua Farr
  Date: November 7, 2026
  Purpose: Validate shipping and payment fields, apply coupon codes,
           and show the order summary
*/

const checkoutForm = document.getElementById("checkout-form");
const checkoutSummary = document.getElementById("checkout-summary");
const formMessage = document.getElementById("form-message");
const couponInput = document.getElementById("coupon-code");
const couponButton = document.getElementById("apply-coupon");
const couponMessage = document.getElementById("coupon-message");

let appliedCoupon = getCoupon();

// ===== ORDER SUMMARY =====
function renderSummary() {
  const cart = getCart();

  if (cart.length === 0) {
    checkoutSummary.innerHTML = `<p>Your cart is empty. <a href="shop.html">Browse games</a>.</p>`;
    return;
  }

  let listHTML = "<ul class=\"summary-list\">";
  for (const item of cart) {
    const game = findProduct(item.productId);
    listHTML += `<li>${game.title} (${game.platform}) x ${item.qty} <span>${money(game.price * item.qty)}</span></li>`;
  }
  listHTML += "</ul>";

  const totals = calculateTotals(appliedCoupon);
  let discountHTML = "";
  if (totals.discount > 0) {
    discountHTML = `<p class="discount">Discount (${appliedCoupon}): -${money(totals.discount)}</p>`;
  }

  checkoutSummary.innerHTML = `
    ${listHTML}
    <p>Subtotal: ${money(totals.subtotal)}</p>
    ${discountHTML}
    <p>Tax (6%): ${money(totals.tax)}</p>
    <p class="total"><strong>Total: ${money(totals.total)}</strong></p>`;
}

// ===== COUPON =====
function applyDiscount() {
  const code = couponInput.value;
  couponMessage.textContent = "";

  if (code.trim() === "") {
    appliedCoupon = "";
    setCoupon("");
    showFieldError(couponInput, "");
    renderSummary();
    return;
  }

  const validCode = findCoupon(code);

  if (!validCode) {
    appliedCoupon = "";
    setCoupon("");
    showFieldError(couponInput, `"${code.trim()}" is not a valid coupon code.`);
    renderSummary();
    return;
  }

  showFieldError(couponInput, "");
  appliedCoupon = validCode;
  setCoupon(validCode);
  couponInput.value = validCode;

  // A console-only coupon only helps if that console's games are in the cart
  if (calculateTotals(validCode).discount === 0) {
    couponMessage.textContent = `${validCode} applied, but it only covers ${coupons[validCode].platform} games and none are in your cart.`;
  } else {
    couponMessage.textContent = `${validCode} applied: ${coupons[validCode].label}.`;
  }
  renderSummary();
}

couponButton.addEventListener("click", applyDiscount);

// Pressing Enter in the coupon box applies the coupon instead of placing the order
couponInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    applyDiscount();
  }
});

// ===== FORM VALIDATION =====
function field(id) {
  return document.getElementById(id);
}

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();
  formMessage.textContent = "";

  if (getCart().length === 0) {
    formMessage.textContent = "Your cart is empty. Add a game before checking out.";
    return;
  }

  const valid = validateFields([
    { input: field("ship-name"),   check: v => checkRequired(v, "Full name") },
    { input: field("ship-street"), check: v => checkRequired(v, "Street address") },
    { input: field("ship-city"),   check: v => checkRequired(v, "City") },
    { input: field("ship-state"),  check: v => checkRequired(v, "State") },
    { input: field("ship-zip"),    check: checkZip },
    { input: field("ship-phone"),  check: checkPhone },
    { input: field("card-name"),   check: v => checkRequired(v, "Cardholder name") },
    { input: field("card-number"), check: checkCardNumber },
    { input: field("card-exp"),    check: checkExpiration },
    { input: field("card-cvv"),    check: checkSecurityCode }
  ]);

  if (!valid) {
    formMessage.textContent = "Please fix the highlighted fields.";
    return;
  }

  // A typed-but-not-applied coupon still gets checked
  if (couponInput.value.trim() !== "" && couponInput.value.trim().toUpperCase() !== appliedCoupon) {
    applyDiscount();
    if (!appliedCoupon) {
      couponInput.focus();
      return;
    }
  }

  // Save a simple order record for the confirmation page
  const totals = calculateTotals(appliedCoupon);
  const order = {
    number: "RGC-" + Date.now().toString().slice(-6),
    name: field("ship-name").value.trim(),
    city: field("ship-city").value.trim(),
    state: field("ship-state").value,
    items: getCartCount(),
    coupon: appliedCoupon,
    total: totals.total,
    cardLast4: digitsOnly(field("card-number").value).slice(-4)
  };

  try {
    localStorage.setItem("rgcLastOrder", JSON.stringify(order));
  } catch (error) {
    // Ignore storage errors
  }

  clearCart();
  window.location.href = "confirmation.html";
});

// Clear a field's error as soon as the user fixes it
checkoutForm.addEventListener("input", function (event) {
  if (event.target.getAttribute("aria-invalid") === "true") {
    showFieldError(event.target, "");
  }
});

// Start with any coupon saved from earlier
couponInput.value = appliedCoupon;
renderSummary();
