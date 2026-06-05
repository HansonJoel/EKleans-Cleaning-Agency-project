document
  .getElementById("enterPasswordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(
        "http://localhost:5000/api/clients/confirm-booking-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            bookingId: sessionStorage.getItem("pendingBookingId"),
          }),
        },
      );

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("clientToken", result.token);
        window.location.href = "client-dashboard.html";
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Authentication failed.");
    }
  });
