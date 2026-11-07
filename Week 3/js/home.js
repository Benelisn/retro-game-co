/*
  Retro Game Co. - Homepage featured games
  Author: Joshua Farr
  Date: November 2, 2026 (updated November 7, 2026)
*/

const featuredGrid = document.getElementById("featured-grid");

// Loop through every product and add the featured ones to the grid
let featuredHTML = "";
products.forEach(function (game) {
  if (game.featured) {
    featuredHTML += createGameCard(game);
  }
});

featuredGrid.innerHTML = featuredHTML;
