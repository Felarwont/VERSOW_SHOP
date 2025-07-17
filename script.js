function generateShort(text, maxLength = 100) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function toggleDescription(button) {
  const desc = button.previousElementSibling;
  const expanded = button.getAttribute("data-expanded") === "true";
  desc.textContent = expanded ? desc.dataset.short : desc.dataset.full;
  button.textContent = expanded ? "Развернуть ↓" : "Скрыть ↑";
  button.setAttribute("data-expanded", !expanded);
}

async function loadProducts() {
  const response = await fetch("http://127.0.0.1:8000/products");
  const products = await response.json();

  const container = document.getElementById("product-grid");
  container.innerHTML = '';

  products.forEach(product => {
    const shortDesc = generateShort(product.description);

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <div class="image-slider">
        <img src="${product.image_url}" alt="${product.title}" class="main-photo"/>
      </div>
      <h2>${product.title}</h2>
      <p class="price">${product.price ? product.price + ' ₽' : ''}</p>
      <p class="description" data-full="${product.description}" data-short="${shortDesc}">${shortDesc}</p>
      ${product.description.length > 150 ? '<button class="toggle-btn" data-expanded="false">Развернуть ↓</button>' : ''}
      <a href="https://t.me/VERSOW_SHOP" class="buy-btn" target="_blank">Купить в Telegram</a>
    `;

    container.appendChild(card);

    const btn = card.querySelector(".toggle-btn");
    if (btn) {
      btn.addEventListener("click", () => toggleDescription(btn));
    }
  });
}

loadProducts();
