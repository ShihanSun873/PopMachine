const nameInput = document.getElementById("nameInput");
const sloganInput = document.getElementById("sloganInput");
const imageInput = document.getElementById("imageInput");

const generateBtn = document.getElementById("generateBtn");
const massBtn = document.getElementById("massBtn");
const resetBtn = document.getElementById("resetBtn");

const posterArea = document.getElementById("posterArea");
const popupContainer = document.getElementById("popupContainer");

let uploadedImage = "";
let productCount = 0;

const slogans = [
  "LIMITED EDITION",
  "NEW DROP",
  "BUY NOW",
  "TRENDING",
  "FAMOUS FOR 15 MINUTES",
  "MASS PRODUCED",
  "COLLECT THEM ALL",
  "CULTURE READY"
];

imageInput.addEventListener("change", function () {
  const file = imageInput.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    uploadedImage = event.target.result;
  };

  reader.readAsDataURL(file);
});

generateBtn.addEventListener("click", function () {
  createPopCard();
});

massBtn.addEventListener("click", function () {
  for (let i = 0; i < 16; i++) {
    createPopCard(true);
  }

  createPopups();

  document.body.classList.add("glitch");

  setTimeout(function () {
    document.body.classList.remove("glitch");
  }, 1200);
});

resetBtn.addEventListener("click", function () {
  posterArea.innerHTML = `
    <div class="empty-message">
      Upload yourself. Become a product.
    </div>
  `;

  popupContainer.innerHTML = "";
  productCount = 0;
});

function createPopCard(randomMode = false) {
  const userName = nameInput.value || "UNKNOWN PRODUCT";
  const userSlogan = sloganInput.value || "Limited Edition Human";

  if (!uploadedImage) {
    alert("Please upload an image first.");
    return;
  }

  if (productCount === 0) {
    posterArea.innerHTML = "";
  }

  productCount++;

  const card = document.createElement("div");

  card.classList.add("pop-card");

  const stampText = randomMode
    ? slogans[Math.floor(Math.random() * slogans.length)]
    : "ORIGINAL";

  const price = randomMode
    ? `$${Math.floor(Math.random() * 900 + 99)}.99`
    : "$999.99";

  const p1 = Math.floor(Math.random() * 6) + 1;
  const p2 = Math.floor(Math.random() * 6) + 1;
  const p3 = Math.floor(Math.random() * 6) + 1;
  const p4 = Math.floor(Math.random() * 6) + 1;

  card.innerHTML = `
    <div class="stamp">${stampText}</div>

    <div class="warhol-grid">
      <div class="warhol-cell palette-${p1}">
        <img src="${uploadedImage}" alt="Uploaded image">
      </div>

      <div class="warhol-cell palette-${p2}">
        <img src="${uploadedImage}" alt="Uploaded image">
      </div>

      <div class="warhol-cell palette-${p3}">
        <img src="${uploadedImage}" alt="Uploaded image">
      </div>

      <div class="warhol-cell palette-${p4}">
        <img src="${uploadedImage}" alt="Uploaded image">
      </div>
    </div>

    <h3>${userName}</h3>

    <p>${userSlogan}</p>

    <div class="price-tag">${price}</div>

    <div class="barcode"></div>
  `;

  posterArea.appendChild(card);
}

function createPopups() {
  const popupWords = [
    "BUY",
    "LIKE",
    "SHARE",
    "REPEAT",
    "TRENDING",
    "NEW",
    "SALE",
    "CONSUME"
  ];

  for (let i = 0; i < 8; i++) {
    const popup = document.createElement("div");

    popup.classList.add("popup");

    popup.textContent =
      popupWords[Math.floor(Math.random() * popupWords.length)];

    popup.style.left = Math.random() * 75 + "vw";
    popup.style.top = Math.random() * 75 + "vh";

    popupContainer.appendChild(popup);

    setTimeout(function () {
      popup.remove();
    }, 2500);
  }
}

setInterval(function () {
  if (productCount > 6) {
    createPopups();
  }

  if (productCount > 12) {
    const cards = document.querySelectorAll(".pop-card");

    cards.forEach(function (card) {
      if (Math.random() > 0.7) {
        card.style.transform =
          `rotate(${Math.random() * 8 - 4}deg)`;
      }
    });
  }

  if (productCount > 30) {
    document.body.classList.add("glitch");
  }
}, 1500);
