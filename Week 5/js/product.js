/*
  Retro Game Co. - Product detail page
  Author: Joshua Farr
  Date: November 2, 2026 (updated November 7, 2026)
*/

const detail = document.getElementById("product-detail");
const id = new URLSearchParams(window.location.search).get("id");
const game = products.find(item => item.productId === id);

if (game) {
  document.title = `${game.title} | Retro Game Co.`;
  detail.innerHTML = `
    <img src="${game.imageUrl}" alt="${game.platform} game: ${game.title}" onerror="${imageFallback(game)}">
    <div>
      <h1>${game.title}</h1>
      <p class="tag">${game.platform}</p>
      <p class="price">$${game.price.toFixed(2)}</p>
      <p>${game.description}</p>
      <dl>
        <dt>Genre</dt><dd>${game.genre}</dd>
        <dt>Released</dt><dd>${game.releaseYear}</dd>
        <dt>Condition</dt><dd>${game.condition}</dd>
        <dt>Includes</dt><dd>${game.completeness}</dd>
      </dl>
      <p class="stock-count" data-id="${game.productId}">Available: ${game.stock}</p>
      <button class="btn add-to-cart" type="button" data-id="${game.productId}">Add to Cart</button>
    </div>`;
  updateStockDisplay();
} else {
  detail.innerHTML = `<h1>Game not found</h1><p>Try browsing the <a href="shop.html">Shop</a>.</p>`;
}
