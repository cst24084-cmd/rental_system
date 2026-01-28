// bookNow.js (FULL UPDATED)

document.addEventListener("DOMContentLoaded", () => {
  const bookNowButtons = document.querySelectorAll(".booknow");
  const bookingForm = document.querySelector(".Booking-form");
  const closeButton = document.querySelector(".close-button");
  const overlay = document.querySelector(".overlay");

  const form = document.getElementById("booking-form");
  const inputs = form.querySelectorAll("input, select"); // all inputs + select

  const pickupDate = document.getElementById("pickup-date");
  const returnDate = document.getElementById("return-date");
  const vehicleSelect = document.getElementById("vehicle-type");

  // -------------------------
  // Open / Close modal
  // -------------------------
  function openForm() {
    bookingForm.classList.add("display");
    overlay.classList.add("display");
  }

  function closeForm() {
    bookingForm.classList.remove("display");
    overlay.classList.remove("display");
  }

  closeButton.addEventListener("click", closeForm);
  overlay.addEventListener("click", closeForm);

  // Close on ESC key (nice UX)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeForm();
  });

  // -------------------------
  // Get Vehicle Name from Card
  // -------------------------
  function getVehicleNameFromCard(cardEl) {
    const headerEl = cardEl.querySelector(".card-header");
    const subEl = cardEl.querySelector(".car-subname");

    const brand = headerEl ? headerEl.childNodes[0].textContent.trim() : "";
    const sub = subEl ? subEl.textContent.trim() : "";

    return `${brand} ${sub}`.trim();
  }

  function isNotAvailable(cardEl) {
    return !!cardEl.querySelector(".not-available");
  }

  // -------------------------
  // Open form only for available vehicles + auto select vehicle
  // -------------------------
  bookNowButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("booknow-not-available")) return;

      const card = btn.closest(".card");
      if (!card || isNotAvailable(card)) return;

      // Auto-fill vehicle dropdown based on the clicked card
      const vehicleName = getVehicleNameFromCard(card);

      const option = [...vehicleSelect.options].find(
        (o) => o.value.trim().toLowerCase() === vehicleName.toLowerCase()
      );

      vehicleSelect.value = option ? option.value : "";

      openForm();
    });
  });

  // -------------------------
  // Date validation (Return >= Pickup)
  // -------------------------
  pickupDate.addEventListener("change", () => {
    returnDate.min = pickupDate.value;

    if (returnDate.value && returnDate.value < pickupDate.value) {
      returnDate.value = "";
    }
  });

  // -------------------------
  // Clear error style on typing
  // -------------------------
  inputs.forEach((input) => {
    input.addEventListener("input", () => input.classList.remove("error"));
    input.addEventListener("change", () => input.classList.remove("error"));
  });

  // -------------------------
  // Submit: validate + save to localStorage
  // -------------------------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    let formdata = {};

    // Validate required fields
    inputs.forEach((input) => {
      const value = input.value.trim();

      if (!value) {
        valid = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
        // Use ID as key (because HTML inputs don't have name="")
        formdata[input.id] = value;
      }
    });

    // Extra date validation
    if (pickupDate.value && returnDate.value && returnDate.value < pickupDate.value) {
      valid = false;
      returnDate.classList.add("error");
      alert("⚠️ Return date must be same or after Pickup date.");
      return;
    }

    if (!valid) {
      alert("⚠️ Please fill all fields correctly before submitting.");
      return;
    }

    // Save booking list (multiple bookings)
    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push({
      ...formdata,
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem("bookings", JSON.stringify(existing));

    alert("✅ Booking Saved Successfully!");
    form.reset();

    // Reset return min
    returnDate.min = "";

    // Close modal
    closeForm();
  });

  // -------------------------
  // Optional: Close form on reset/clear button click
  // -------------------------
  form.addEventListener("reset", () => {
    inputs.forEach((input) => input.classList.remove("error"));
  });
});