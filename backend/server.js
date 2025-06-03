const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());

const clpath = path.join(__dirname, "../frontend");
app.use(express.static(clpath)); 

app.get("/", (req, res) => {
  res.sendFile(path.join(clpath, "index.html"));
});

app.get("/screenshot", async (req, res) => {
  
  const screenshotUrl = `https://infographic-screenshot-frontend.vercel.app/`;

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto(screenshotUrl, { waitUntil: "networkidle0" });

    const screenshotBuffer = await page.screenshot({ type: "png", fullPage: true });
    await browser.close();

    res.set("Content-Disposition", "attachment; filename=infographic-screenshot.png");
    res.set("Content-Type", "image/png");
    res.send(screenshotBuffer);
  } catch (error) {
    console.error("Screenshot error:", error);
    res.status(500).send("Failed to capture screenshot");
  }
});

app.listen(PORT, () => {
  console.log(` http://localhost:${PORT}`);
});
