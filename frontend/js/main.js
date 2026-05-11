document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Gather data from the form, including the new optional date
  const formData = {
    fullName: document.getElementById("fullName").value,
    phone: document.getElementById("phone").value,
    serviceType: document.getElementById("serviceType").value,
    preferredDate: document.getElementById("preferredDate").value || null, // Send null if left blank
  };

  try {
    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Booking requested successfully! We will contact you soon.");
      document.getElementById("bookingForm").reset();
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to connect to the server. Please try again later.");
  }
});
