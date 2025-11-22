// utils/validators.js
export function isValidGmail(email) {
    return /^[^\s@]+@gmail\.com$/.test(email);
  }
  