let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find((p) => p.id == productId);

  if (!product) {
    alert("Product not found!");
    return;
  }
  // console.log(product);
  // console.log(cart);
  const existingProduct = cart.find((item) => item.id == productId);
  // console.log(existingProduct);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    const productCopy = { ...product, quantity: 1 };
    cart.push(productCopy);
  }

  alert(`${product.name} added to cart!`);
  updateCartDisplay();
  renderCart();
  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartDisplay();
  renderCart();
  saveCart();
}

function changeQuantity(productId, increment) {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity += increment;
    if (product.quantity <= 0) {
      removeFromCart(productId);
    }
  }
  renderCart();
  updateCartDisplay();
  saveCart();
}

function updateCartDisplay() {
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.innerText = `Cart: ${cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  )}`;
}

function renderCart() {
  const cartContent = document.getElementById("cart-content");
  cartContent.innerHTML = "";

  if (cart.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item) => {
    const productElement = document.createElement("div");
    productElement.classList.add("cart-item");
    productElement.innerHTML = `
      <p><strong>${item.name}</strong> - $${item.price}</p>
      <div class="cart-item-controls">
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
        ${item.quantity}
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartContent.appendChild(productElement);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartDisplay();
  renderCart();
});

document.getElementById("close-cart").onclick = function () {
  document.getElementById("cart-popup").style.display = "none";
  document.getElementById("cart-overlay").style.display = "none";
};

document.getElementById("cart-count").onclick = function () {
  document.getElementById("cart-popup").style.display = "block";
  document.getElementById("cart-overlay").style.display = "block";
};
