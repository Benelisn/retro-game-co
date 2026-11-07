/*
  Retro Game Co. - Shop grid, console filter, and title search
  Author: Joshua Farr (josfar6040)
  Date: November 2, 2026 (updated November 7, 2026)
*/

const shopGrid = document.getElementById("shop-grid");
const platformFilter = document.getElementById("platform-filter");
const searchBox = document.getElementById("search-box");
const resultCount = document.getElementById("result-count");

// Pre-select a console when coming from the homepage (shop.html?platform=N64)
const urlPlatform = new URLSearchParams(window.location.search).get("platform");
if (urlPlatform) {
  platformFilter.value = urlPlatform;
}

function showGames() {
  const platform = platformFilter.value;
  const search = searchBox.value.trim().toLowerCase();

  let cardsHTML = "";
  let count = 0;

  // Loop through all products and build a card for each match
  products.forEach(function (game) {
    const platformMatch = platform === "All" || game.platform === platform;
    const titleMatch = game.title.toLowerCase().includes(search);

    if (platformMatch && titleMatch) {
      cardsHTML += createGameCard(game);
      count++;
    }
  });

  resultCount.textContent = `Showing ${count} game(s)`;
  shopGrid.innerHTML = count > 0 ? cardsHTML : "<p>No games match your search.</p>";
  updateStockDisplay();
}

platformFilter.addEventListener("change", showGames);
searchBox.addEventListener("input", showGames);

showGames();
