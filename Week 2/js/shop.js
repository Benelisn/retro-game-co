/*
  Retro Game Co. - Shop grid, console filter, and title search
  Author: Joshua Farr (josfar6040)
  Date: November 2, 2026
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

  const matches = products.filter(game =>
    (platform === "All" || game.platform === platform) &&
    game.title.toLowerCase().includes(search)
  );

  resultCount.textContent = `Showing ${matches.length} game(s)`;
  shopGrid.innerHTML = matches.length
    ? matches.map(createGameCard).join("")
    : "<p>No games match your search.</p>";
}

platformFilter.addEventListener("change", showGames);
searchBox.addEventListener("input", showGames);

showGames();
