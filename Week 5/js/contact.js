/*
  Retro Game Co. - Contact form validation
  Author: Joshua Farr
  Date: November 7, 2026
  Purpose: Require a valid email and a message before the form sends
*/

const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  contactMessage.className = "form-message";

  const valid = validateFields([
    { input: document.getElementById("email"),   check: checkEmail },
    { input: document.getElementById("message"), check: v => checkRequired(v, "Message") }
  ]);

  if (!valid) {
    contactMessage.textContent = "Please fix the highlighted fields.";
    return;
  }

  // No server yet, so just confirm on the page
  const name = document.getElementById("full-name").value.trim();
  contactMessage.className = "form-message success";
  contactMessage.textContent = `Thanks${name ? ", " + name : ""}! Your message has been sent. We'll reply by email.`;
  contactForm.reset();
});

contactForm.addEventListener("input", function (event) {
  if (event.target.getAttribute("aria-invalid") === "true") {
    showFieldError(event.target, "");
  }
});
