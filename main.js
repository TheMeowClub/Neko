
  const generatingText = document.getElementById('generatingText');
  const nekoImage = document.getElementById('nekoImage');
  const downloadButton = document.getElementById('downloadButton');
  const generateButton = document.getElementById('generateButton');
  const categorySelect = document.getElementById('categorySelect');

  let currentImageUrl = null; 

  function showGeneratingText() {
    generatingText.style.display = 'block';
    generatingText.style.animation = 'slideDown 1s forwards';

    setTimeout(() => {
      generatingText.style.animation = 'slideUp 1s forwards';
      setTimeout(() => {
        generatingText.style.display = 'none';
      }, 1000);
    }, 2000);
  }

  async function generateNeko() {
    const category = categorySelect.value;

    showGeneratingText();
    nekoImage.src = "";
    downloadButton.style.display = 'none';
    currentImageUrl = null;

    try {
      const res = await fetch(`https://nekos.best/api/v2/${category}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 
        }
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const imageUrl = data.results[0].url; 

      currentImageUrl = imageUrl;
      nekoImage.src = imageUrl;
      nekoImage.alt = category + " image";

      downloadButton.style.display = 'inline-block';
    } catch (err) {
      console.error('Error fetching image:', err);
      alert('Failed to fetch image. Please try again.');
    }
  }

  async function downloadCurrentImage() {
  if (!currentImageUrl) return;

  try {
    const downloadUrl =
      currentImageUrl +
      (currentImageUrl.includes("?") ? "&" : "?") +
      "dl=" +
      Date.now();

    const response = await fetch(downloadUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const category = categorySelect.value;
    const ext = blob.type === "image/gif" ? ".gif" : ".png";

    const fileName = `TheMeowClub-${category}-${Date.now()}${ext}`;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error("Download failed:", e);
    alert(`Download failed. Please try again`);
  }
  }
  generateButton.addEventListener('click', generateNeko);

  downloadButton.addEventListener('click', function (e) {
    e.preventDefault();
    downloadCurrentImage();
  });
  
  
  
  
  const nekoInfoBtn = document.getElementById('nekoInfoBtn');
const nekoOverlay = document.getElementById('nekoOverlay');
const nekoCloseBtn = document.getElementById('nekoCloseBtn');

function openNekoOverlay() {
  nekoOverlay.style.display = 'flex';
}

function closeNekoOverlay() {
  nekoOverlay.style.display = 'none';
}

nekoInfoBtn.addEventListener('click', openNekoOverlay);
nekoCloseBtn.addEventListener('click', closeNekoOverlay);


nekoOverlay.addEventListener('click', (e) => {
  if (e.target === nekoOverlay) closeNekoOverlay();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNekoOverlay();
});
