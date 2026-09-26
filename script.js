const products = [
  ["Rava", "grocery"],
  ["Maida", "grocery"],
  ["Moong Dal", "dal"],
  ["Arhar Dal", "dal"],
  ["Chola Chana", "dal"],
  ["Mungfali", "grocery"],
  ["Rajma", "dal"],
  ["Tata Namak", "grocery"],
  ["Pasta", "grocery"],
  ["Macaroni", "grocery"],
  ["Haldi", "masala"],
  ["Dhaniya", "masala"],
  ["Mirch", "masala"]
];

let cart = [];

function showProducts(list = products) {
  const box = document.getElementById("products");

  if (!box) return;

  box.innerHTML = "";

  list.forEach(([name, category]) => {
    const item = document.createElement("div");

    item.className = "product";

    item.innerHTML = `
      <h3>${name}</h3>
      <p>${category}</p>
      <button onclick="addToCart('${name}')">
        Add to Cart
      </button>
    `;

    box.appendChild(item);
  });
}

function filterProducts(category) {
  if (category === "all") {
    showProducts();
    return;
  }

  const filtered = products.filter(
    product => product[1] === category
  );

  showProducts(filtered);
}

function searchProducts() {
  const search = document
    .getElementById("search")
    .value
    .toLowerCase();

  const filtered = products.filter(product =>
    product[0].toLowerCase().includes(search)
  );

  showProducts(filtered);
}

function addToCart(name) {
  cart.push(name);

  const count = document.getElementById("count");

  if (count) {
    count.textContent = cart.length;
  }

  alert(name + " cart mein add ho gaya!");
}

function order() {
  if (cart.length === 0) {
    alert("Cart abhi khaali hai.");
    return;
  }

  const name = prompt("Apna naam likhiye:");
  if (!name) return;

  const mobile = prompt("Apna mobile number likhiye:");
  if (!mobile) return;

  const address = prompt("Delivery address likhiye:");
  if (!address) return;

  const message =
    "Namaste! Mujhe order karna hai:%0A%0A" +
    "Naam: " + encodeURIComponent(name) + "%0A" +
    "Mobile: " + encodeURIComponent(mobile) + "%0A" +
    "Address: " + encodeURIComponent(address) + "%0A%0A" +
    "Items:%0A" +
    cart.map((item, i) => (i + 1) + ". " + encodeURIComponent(item)).join("%0A");

  const whatsapp =
    "https://wa.me/918840299142?text=" + message;

  window.open(whatsapp, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  showProducts();

  const search = document.getElementById("search");

  if (search) {
    search.addEventListener("input", searchProducts);
  }
});
