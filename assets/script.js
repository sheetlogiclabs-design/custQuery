// Replace with your deployed Web App URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3qjDILPB7lxEcY5xgJSKQUE1tSA8_8uKxHpvzQ2U0ir8Apx-xzA1X720GtrDKhrhQMg/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dataForm");
  if (!form) return;

  // Create a message element dynamically
  let messageEl = document.createElement("div");
  messageEl.style.display = "none";
  messageEl.style.marginTop = "12px";
  messageEl.style.padding = "10px";
  messageEl.style.borderRadius = "8px";
  messageEl.style.fontWeight = "500";
  form.parentNode.insertBefore(messageEl, form.nextSibling);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const payload = {
      name: document.getElementById("name")?.value || "",
      company: document.getElementById("company")?.value || "",
      email: document.getElementById("email")?.value || "",
      phone: document.getElementById("phone")?.value || "",
      team_size: document.getElementById("team-size")?.value || "",
      priority_area: document.getElementById("priority-area")?.value || "",
      details: document.getElementById("details")?.value || ""
    };

    // Basic validation
    if (!payload.name || !payload.email) {
      alert("Please enter your name and email.");
      return;
    }

    try {
      // Send POST request
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // Parse JSON response
      const result = await response.json();

      // Display message
      if (result.status === "success") {
        messageEl.style.background = "linear-gradient(90deg,#dff7e6,#e6fff0)";
        messageEl.style.color = "#064e25";
        messageEl.textContent = result.message || "Thanks! Your process has been sent — we received it.";
        messageEl.style.display = "block";
        form.reset();
      } else {
        messageEl.style.background = "linear-gradient(90deg,#ffe6e6,#ffd6d6)";
        messageEl.style.color = "#800000";
        messageEl.textContent = result.message || "Submission failed, please try again.";
        messageEl.style.display = "block";
      }

      // Hide after 5 seconds
      setTimeout(() => {
        messageEl.style.display = "none";
      }, 5000);

    } catch (err) {
      console.error("Submit error:", err);
      messageEl.style.background = "linear-gradient(90deg,#ffe6e6,#ffd6d6)";
      messageEl.style.color = "#800000";
      messageEl.textContent = "Submission failed — check console for details.";
      messageEl.style.display = "block";

      setTimeout(() => {
        messageEl.style.display = "none";
      }, 5000);
    }
  });
});