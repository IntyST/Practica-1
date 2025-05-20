document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("PingButton");
  const msg = document.getElementById("message");

  btn.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:8080/ping");
      const data = await response.json();
      msg.innerHTML = data.message;
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      msg.innerHTML = "Error al conectar con el servidor. Inténtalo más tarde.";
    }
  });
});
