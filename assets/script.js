document.getElementById("dataForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    company: document.getElementById("company").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    team_size: document.getElementById("team-size").value,
    priority_area: document.getElementById("priority-area").value,
    details: document.getElementById("details").value
  };

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyk_2ntqWScl3ay4Y4kBPh5f0ZYBMQJjt2D_THCyVrtQjoNgcNRCD97L0ogybTd5CecNw/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      }
    );

    alert("Thank you! Your details have been sent.");
    document.getElementById("dataForm").reset();

  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error(error);
  }
});

