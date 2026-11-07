/*
  Retro Game Co. - Order confirmation
  Author: Joshua Farr
  Date: November 7, 2026
  Purpose: Show the order that was just placed
*/

const orderDetails = document.getElementById("order-details");
let order = null;

try {
  order = JSON.parse(localStorage.getItem("rgcLastOrder"));
} catch (error) {
  order = null;
}

if (order) {
  orderDetails.innerHTML = `
    <p>Order <strong>${order.number}</strong> for ${order.name}</p>
    <p>${order.items} game(s) shipping to ${order.city}, ${order.state}</p>
    ${order.coupon ? `<p>Coupon used: ${order.coupon}</p>` : ""}
    <p>Total charged to card ending in ${order.cardLast4}: <strong>${money(order.total)}</strong></p>`;
}
