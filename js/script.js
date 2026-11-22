// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navbar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        });
    });
}

// Menu category filters
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.filter;
        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        menuCards.forEach((card) => {
            card.hidden = selectedCategory !== "all" && card.dataset.category !== selectedCategory;
        });
    });
});

// Set the minimum reservation date to today.
const bookingDate = document.getElementById("bookingDate");

function setMinimumBookingDate() {
    if (!bookingDate) return;
    const today = new Date();
    bookingDate.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString().split("T")[0];
}
setMinimumBookingDate();

// Demo reservation form. This does not send or save a real booking.
const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");

if (reservationForm && formMessage) {
    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!reservationForm.reportValidity()) return;

        const guestName = document.getElementById("guestName").value.trim();
        formMessage.textContent =
            `Thank you, ${guestName}. This demo request is not a confirmed booking.`;
        reservationForm.reset();
        setMinimumBookingDate();
    });
}

// Automatically update the footer year.
const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();
