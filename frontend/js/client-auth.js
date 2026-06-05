// js/client-auth.js
let userEmail = "";

// Handle Step 1: Requesting Token
document.getElementById("requestTokenForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  userEmail = document.getElementById("clientEmail").value;

  try {
    const response = await fetch("http://localhost:5000/api/clients/auth/request-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("A login code has been sent to your email!");
      
      // Toggle form visibility
      document.getElementById("requestTokenForm").style.display = "none";
      document.getElementById("verifyTokenForm").style.display = "block";
      document.getElementById("authSubtitle").innerText = `Enter the code sent to ${userEmail}`;
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Auth request error:", error);
    alert("Connection error. Please try again later.");
  }
});

// Handle Step 2: Verifying Token
document.getElementById("verifyTokenForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = document.getElementById("loginCode").value;

  try {
    const response = await fetch("http://localhost:5000/api/clients/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, token: token }),
    });

    const result = await response.json();

    if (response.ok) {
      // Securely store the JWT for dashboard access
      localStorage.setItem("clientToken", result.token);
      alert("Login successful! Redirecting to dashboard...");
      window.location.href = "client-dashboard.html"; // Target dashboard route
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Verification error:", error);
    alert("Verification failed. Please try again.");
  }
});