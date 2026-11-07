/*
  Retro Game Co. - Cart page
  Author: Joshua Farr
  Date: November 7, 2026 (updated November 7, 2026)
  Purpose: List cart items with quantity and remove controls, show totals,
           and let the shopper clear the whole cart
*/

const cartItems = document.getElementById("cart-items");
const cartSummary = document.getElementById("cart-summary");
const checkoutLink = document.getElementById("checkout-link");
const clearButton = document.getElementById("clear-cart");

function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartItems.innerHTML = `<p>Your cart is empty. <a href="shop.html">Browse games</a>.</p>`;
    cartSummary.innerHTML = `<p>Subtotal: $0.00</p>`;
    checkoutLink.hidden = true;
    clearButton.hidden = true;
    return;
  }

  let rowsHTML = "";

  // Loop through each cart line and build a row
  for (const item of cart) {
    const game = findProduct(item.productId);

    rowsHTML += `
      <article class="cart-row">
        <img src="${game.imageUrl}" alt="${game.platform} game: ${game.title}" onerror="${imageFallback(game)}">
        <div class="cart-info">
          <h3>${game.title}</h3>
          <p><span class="tag">${game.platform}</span> ${game.condition} &middot; ${money(game.price)} each</p>
        </div>
        <div class="cart-controls">
          <label for="qty-${game.productId}">Qty</label>
          <input type="number" id="qty-${game.productId}" class="qty-input"
                 data-id="${game.productId}" min="1" max="${getStockLeft(game.productId)}" value="${item.qty}">
          <button type="button" class="btn btn-outline remove-btn" data-id="${game.productId}">Remove</button>
        </div>
        <p class="price">${money(game.price * item.qty)}</p>
      </article>`;
  }

  cartItems.innerHTML = rowsHTML;

  const totals = calculateTotals("");
  cartSummary.innerHTML = `
    <p>Subtotal: ${money(totals.subtotal)}</p>
    <p>Tax (6%): ${money(totals.tax)}</p>
    <p><strong>Total: ${money(totals.total)}</strong></p>
    <p class="note">Have a coupon? Enter it at checkout.</p>`;
  checkoutLink.hidden = false;
  clearButton.hidden = false;
}

// Quantity changes
cartItems.addEventListener("change", function (event) {
  if (event.target.classList.contains("qty-input")) {
    const qty = parseInt(event.target.value, 10) || 0;
    updateQuantity(event.target.dataset.id, qty);
    renderCart();
    announce(`Quantity updated. Cart total is ${money(calculateTotals("").total)}.`);
  }
});

// Remove buttons
cartItems.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    const title = findProduct(event.target.dataset.id).title;
    removeFromCart(event.target.dataset.id);
    renderCart();
    announce(`${title} removed from cart.`);
  }
});

// Clear Cart button
clearButton.addEventListener("click", function () {
  if (confirm("Remove every game from your cart?")) {
    clearCart();
    renderCart();
    announce("Cart cleared.");
  }
});

renderCart();
