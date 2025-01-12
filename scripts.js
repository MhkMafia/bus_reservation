document.addEventListener("DOMContentLoaded", function () {
    const authSection = document.getElementById("auth-section");
    const busSearchSection = document.getElementById("bus-search-section");
    const busListSection = document.getElementById("bus-list-section");
    const seatSelectionSection = document.getElementById("seat-selection-section");
    const passengerDetailsSection = document.getElementById("passenger-details-section");
    const confirmationSection = document.getElementById("confirmation-section");
    const profileIcon = document.getElementById("profile-icon");
    const profileDropdown = document.getElementById("profile-dropdown");

    let selectedSeat = null;
    const unavailableSeats = new Set(); // Track unavailable seats

    // Profile Dropdown
    profileIcon.addEventListener("click", function () {
        profileDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", function (e) {
        if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.add("hidden");
        }
    });

    // Sign-in Form
    document.getElementById("sign-in-form").addEventListener("submit", function (event) {
        event.preventDefault();
        authSection.classList.add("hidden");
        busSearchSection.classList.remove("hidden");
    });

    // Bus Search
    document.getElementById("bus-search-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const fromCity = document.getElementById("from-city").value.trim();
        const toCity = document.getElementById("to-city").value.trim();
        const journeyDate = document.getElementById("journey-date").value;

        if (!fromCity || !toCity || !journeyDate) {
            document.getElementById("search-error-message").classList.remove("hidden");
            return;
        }

        busSearchSection.classList.add("hidden");
        busListSection.classList.remove("hidden");

        const busList = document.getElementById("bus-list");
        busList.innerHTML = "";
        const buses = ["Bus A - ₹1500", "Bus B - ₹1700"];
        buses.forEach((bus) => {
            const listItem = document.createElement("li");
            listItem.textContent = bus;
            const selectButton = document.createElement("button");
            selectButton.textContent = "Select Bus";
            selectButton.addEventListener("click", function () {
                busListSection.classList.add("hidden");
                seatSelectionSection.classList.remove("hidden");
            });
            listItem.appendChild(selectButton);
            busList.appendChild(listItem);
        });
    });

    // Seat Selection
    const seatGrid = document.getElementById("seat-selection-grid");
    const proceedToDetails = document.getElementById("proceed-to-details");
    for (let i = 1; i <= 35; i++) {
        const seatButton = document.createElement("button");
        seatButton.textContent = i;
        seatButton.disabled = unavailableSeats.has(i);
        seatButton.addEventListener("click", function () {
            selectedSeat = i;
            seatGrid.querySelectorAll("button").forEach((btn) => btn.classList.remove("selected"));
            seatButton.classList.add("selected");
            proceedToDetails.classList.remove("hidden");
        });
        seatGrid.appendChild(seatButton);
    }

    proceedToDetails.addEventListener("click", function () {
        if (!selectedSeat) {
            alert("Please select a seat!");
        } else {
            seatSelectionSection.classList.add("hidden");
            passengerDetailsSection.classList.remove("hidden");
            document.getElementById("selected-seat").textContent = selectedSeat;
        }
    });

    // Payment Processing
    document.getElementById("proceed-to-payment").addEventListener("click", function () {
        const name = document.getElementById("passenger-name").value;
        const email = document.getElementById("passenger-email").value;
        const phone = document.getElementById("passenger-phone").value;
        const insurance = document.getElementById("insurance-checkbox").checked;

        if (!name || !email || !phone) {
            alert("Please fill all passenger details!");
            return;
        }

        const amount = insurance ? 1601 : 1500;
        unavailableSeats.add(selectedSeat); // Mark selected seat as unavailable
        passengerDetailsSection.classList.add("hidden");
        confirmationSection.classList.remove("hidden");
        document.getElementById("confirm-name").textContent = name;
        document.getElementById("confirm-seat").textContent = selectedSeat;
        document.getElementById("confirm-amount").textContent = amount;
    });

    // Booking Another Ticket
    document.getElementById("book-another-ticket").addEventListener("click", function () {
        confirmationSection.classList.add("hidden");
        busSearchSection.classList.remove("hidden");
    });

    // Back to Home
    document.getElementById("back-to-home").addEventListener("click", function () {
        confirmationSection.classList.add("hidden");
        authSection.classList.remove("hidden");
    });
});
