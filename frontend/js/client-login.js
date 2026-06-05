document
  .getElementById("clientLoginForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:5000/api/clients/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("clientToken", result.token);
        window.location.href = "client-dashboard.html";
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Login error.");
    }
  });
