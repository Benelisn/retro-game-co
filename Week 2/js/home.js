/*
  Retro Game Co. - Homepage featured games
  Author: Joshua Farr
  Date: November 2, 2026
*/

const featuredGrid = document.getElementById("featured-grid");
const featuredGames = products.filter(game => game.featured);

featuredGrid.innerHTML = featuredGames.map(createGameCard).join("");
