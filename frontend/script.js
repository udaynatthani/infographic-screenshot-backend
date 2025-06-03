document.getElementById("screenshot-btn").addEventListener("click", async () => {
  // ✅ Replace with your actual deployed URLs
  const screenshotAPI = "https://your-vercel-app.vercel.app/screenshot"; // <-- Vercel backend URL
  const url = "https://your-netlify-site.netlify.app/index.html";        // <-- Netlify frontend URL

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
