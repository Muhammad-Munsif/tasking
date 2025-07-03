// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
  document.body.classList.add("dark-mode");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";
  localStorage.setItem("theme", theme);

  themeToggle.innerHTML =
    theme === "dark"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
});

// Booking modal
const bookButtons = document.querySelectorAll(".book-btn");
const bookingModal = document.getElementById("bookingModal");
const closeModal = document.getElementById("closeModal");
const modalRoomName = document.getElementById("modalRoomName");

bookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const roomName = button.getAttribute("data-room");
    modalRoomName.textContent = roomName;
    bookingModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

closeModal.addEventListener("click", () => {
  bookingModal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
  if (e.target === bookingModal) {
    bookingModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Form submission
const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Booking request submitted! We will contact you shortly to confirm your reservation."
  );
  bookingModal.style.display = "none";
  document.body.style.overflow = "auto";
  bookingForm.reset();
});

// Set minimum date for check-in to today
const today = new Date().toISOString().split("T")[0];
document.getElementById("check-in").min = today;
document.getElementById("modal-check-in").min = today;

// Update check-out min date when check-in changes
document.getElementById("check-in").addEventListener("change", function () {
  document.getElementById("check-out").min = this.value;
});

document
  .getElementById("modal-check-in")
  .addEventListener("change", function () {
    document.getElementById("modal-check-out").min = this.value;
  });
