/*
  Retro Game Co. - Input validation functions
  Author: Joshua Farr
  Date: November 7, 2026
  Purpose: Reusable checks for the contact and checkout forms
*/

// Each check returns an error message, or "" when the value is valid

function checkRequired(value, fieldName) {
  return value.trim() === "" ? `${fieldName} is required.` : "";
}

function checkEmail(value) {
  if (value.trim() === "") {
    return "Email address is required.";
  }
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value.trim()) ? "" : "Enter a valid email, like name@example.com.";
}

function digitsOnly(value) {
  return value.replace(/[\s-]/g, "");
}

function checkCardNumber(value) {
  const digits = digitsOnly(value);
  if (digits === "") {
    return "Credit card number is required.";
  }
  if (!/^\d{16}$/.test(digits)) {
    return "Card number must be 16 digits.";
  }
  return "";
}

function checkExpiration(value) {
  if (value.trim() === "") {
    return "Expiration date is required.";
  }

  const match = value.trim().match(/^(\d{2})\/(\d{2})$/);
  if (!match) {
    return "Use MM/YY format, like 08/28.";
  }

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) {
    return "Month must be 01 to 12.";
  }

  // Card is valid through the last day of its expiration month
  const today = new Date();
  const endOfMonth = new Date(year, month, 1);
  if (endOfMonth <= today) {
    return "This card is expired.";
  }
  return "";
}

function checkSecurityCode(value) {
  if (value.trim() === "") {
    return "Security code is required.";
  }
  return /^\d{3,4}$/.test(value.trim()) ? "" : "Security code must be 3 or 4 digits.";
}

function checkZip(value) {
  if (value.trim() === "") {
    return "ZIP code is required.";
  }
  return /^\d{5}(-\d{4})?$/.test(value.trim()) ? "" : "ZIP must be 5 digits, like 23112.";
}

function checkPhone(value) {
  if (value.trim() === "") {
    return "Phone number is required.";
  }
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 ? "" : "Phone number must be 10 digits.";
}

// Show or clear an error under a field. Returns true if the field is valid.
function showFieldError(input, message) {
  const errorBox = document.getElementById(input.id + "-error");

  if (message) {
    input.setAttribute("aria-invalid", "true");
    errorBox.textContent = message;
    return false;
  }

  input.removeAttribute("aria-invalid");
  errorBox.textContent = "";
  return true;
}

// Run a list of { input, check } rules. Returns true only if all pass.
function validateFields(rules) {
  let allValid = true;
  let firstInvalid = null;

  rules.forEach(function (rule) {
    const message = rule.check(rule.input.value);
    const valid = showFieldError(rule.input, message);

    if (!valid) {
      allValid = false;
      if (!firstInvalid) {
        firstInvalid = rule.input;
      }
    }
  });

  // Move focus to the first problem so keyboard users land on it
  if (firstInvalid) {
    firstInvalid.focus();
  }
  return allValid;
}
