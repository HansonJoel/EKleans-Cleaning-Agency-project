document
  .getElementById("setPasswordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/clients/setup-password",
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
      alert("Error setting password.");
    }
  });
