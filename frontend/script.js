document.getElementById("screenshot-btn").addEventListener("click", async () => {
  const screenshotAPI = "https://infographic-screenshot-backend.onrender.com/screenshot"; // backend URL
  const url = "https://infographic-screenshot-frontend.vercel.app"; // your frontend deployed URL

  try {
    const response = await fetch(`${screenshotAPI}?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error("Screenshot failed");

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "infographic-screenshot.png";
    link.click();
  } catch (err) {
    alert("Failed to take screenshot: " + err.message);
    console.error(err);
  }
});
