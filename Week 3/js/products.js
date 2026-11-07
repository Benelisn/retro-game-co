/*
  Retro Game Co. - Product Data
  Author: Joshua Farr
  Date: November 2, 2026 (updated November 7, 2026)
*/

const products = [
  { productId: "RGC-0001", title: "Super Smash Bros.", platform: "N64", genre: "Fighting", releaseYear: 1999, condition: "Good", completeness: "Loose (game only)", price: 49.99, stock: 2, imageUrl: "images/n64.svg", description: "Tested cartridge, light label wear.", featured: true },
  { productId: "RGC-0002", title: "Spyro the Dragon", platform: "PS1", genre: "Platformer", releaseYear: 1998, condition: "Excellent", completeness: "CIB (complete in box)", price: 34.99, stock: 1, imageUrl: "images/ps1.svg", description: "Case and manual included, disc tested.", featured: true },
  { productId: "RGC-0003", title: "Mario Kart 64", platform: "N64", genre: "Racing", releaseYear: 1997, condition: "Good", completeness: "Loose (game only)", price: 44.99, stock: 3, imageUrl: "images/n64.svg", description: "Tested cartridge, saves working.", featured: false },
  { productId: "RGC-0004", title: "GoldenEye 007", platform: "N64", genre: "Shooter", releaseYear: 1997, condition: "Fair", completeness: "Loose (game only)", price: 24.99, stock: 2, imageUrl: "images/n64.svg", description: "Torn label, plays perfectly.", featured: false },
  { productId: "RGC-0005", title: "The Legend of Zelda: Ocarina of Time", platform: "N64", genre: "Adventure", releaseYear: 1998, condition: "Excellent", completeness: "CIB (complete in box)", price: 129.99, stock: 1, imageUrl: "images/n64.svg", description: "Box, manual, and cartridge in great shape.", featured: true },
  { productId: "RGC-0006", title: "Crash Bandicoot", platform: "PS1", genre: "Platformer", releaseYear: 1996, condition: "Good", completeness: "CIB (complete in box)", price: 29.99, stock: 2, imageUrl: "images/ps1.svg", description: "Minor case scuffs, disc resurfaced and tested.", featured: false },
  { productId: "RGC-0007", title: "Final Fantasy VII", platform: "PS1", genre: "RPG", releaseYear: 1997, condition: "Good", completeness: "CIB (complete in box)", price: 59.99, stock: 1, imageUrl: "images/ps1.svg", description: "All 3 discs included and tested.", featured: false },
  { productId: "RGC-0008", title: "Tony Hawk's Pro Skater 2", platform: "PS1", genre: "Sports", releaseYear: 2000, condition: "Fair", completeness: "Loose (game only)", price: 12.99, stock: 4, imageUrl: "images/ps1.svg", description: "Disc only, light scratches, plays fine.", featured: false },
  { productId: "RGC-0009", title: "Kingdom Hearts", platform: "PS2", genre: "RPG", releaseYear: 2002, condition: "Excellent", completeness: "CIB (complete in box)", price: 19.99, stock: 3, imageUrl: "images/ps2.svg", description: "Clean disc, case and manual included.", featured: true },
  { productId: "RGC-0010", title: "Ratchet & Clank", platform: "PS2", genre: "Platformer", releaseYear: 2002, condition: "Good", completeness: "CIB (complete in box)", price: 17.99, stock: 2, imageUrl: "images/ps2.svg", description: "Light case wear, disc tested.", featured: false },
  { productId: "RGC-0011", title: "Jak and Daxter: The Precursor Legacy", platform: "PS2", genre: "Platformer", releaseYear: 2001, condition: "Good", completeness: "Loose (game only)", price: 14.99, stock: 2, imageUrl: "images/ps2.svg", description: "Disc only, tested from start to finish.", featured: false },
  { productId: "RGC-0012", title: "Grand Theft Auto: San Andreas", platform: "PS2", genre: "Action", releaseYear: 2004, condition: "Fair", completeness: "CIB (complete in box)", price: 13.99, stock: 5, imageUrl: "images/ps2.svg", description: "Cracked case, disc and map included.", featured: false }
];

function createGameCard(game) {
  return `
    <article class="game-card">
      <img src="${game.imageUrl}" alt="${game.platform} game: ${game.title}">
      <h3>${game.title}</h3>
      <p class="tag">${game.platform}</p>
      <p>${game.condition} &middot; ${game.completeness}</p>
      <p class="price">$${game.price.toFixed(2)}</p>
      <div class="card-actions">
        <a href="product.html?id=${game.productId}" class="btn btn-outline">View Details</a>
        <button type="button" class="btn add-to-cart" data-id="${game.productId}">Add to Cart</button>
      </div>
    </article>`;
}
