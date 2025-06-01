document.getElementById('screenshotBtn').addEventListener('click', async () => {
    const response = await fetch(`http://localhost:3000/screenshot?url=${encodeURIComponent(window.location.href)}`);
    const blob = await response.blob();
  
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'infographic-screenshot.png';
    link.click();
  });
  