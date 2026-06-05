document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    serviceType: document.getElementById("serviceType").value,
    preferredDate: document.getElementById("preferredDate").value,
  };

  try {
    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      // Temporarily store booking details to compile after password authentication
      sessionStorage.setItem("pendingBookingId", result.bookingId);

      if (result.action === "set_password") {
        window.location.href = `set-password.html?email=${encodeURIComponent(formData.email)}`;
      } else if (result.action === "enter_password") {
        window.location.href = `enter-password.html?email=${encodeURIComponent(formData.email)}`;
      }
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to connect to the server.");
  }
});
