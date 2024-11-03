let products = null;
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    showDetail();
  });

function showDetail() {
  let detail = document.querySelector(".detail");
  let listProduct = document.querySelector(".listProduct");
  let productId = new URLSearchParams(window.location.search).get("id");
  let thisProduct = products.find((product) => product.id == productId);

  if (!thisProduct) {
    window.location.href = "/";
    return;
  }

  detail.querySelector(".image img").src = thisProduct.image;
  detail.querySelector(".name").innerText = thisProduct.name;
  detail.querySelector(".price").innerText = "$" + thisProduct.price;
  detail.querySelector(".description").innerText = thisProduct.description;

  detail.querySelector(".dimensions").innerText =
    "Dimensions: " + thisProduct.specifications.dimensions;
  detail.querySelector(".material").innerText =
    "Material: " + thisProduct.specifications.material;
  detail.querySelector(".weight").innerText =
    "Weight: " + thisProduct.specifications.weight;

  const reviewsList = document.querySelector(".reviews-list");
  thisProduct.reviews.forEach((review) => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");
    reviewElement.innerHTML = `
    <p><strong>${review.name}</strong> &nbsp; <span class="rating">${"★".repeat(
      review.rating
    )}</span> <br/> ${review.comment}</p>
  `;
    reviewsList.appendChild(reviewElement);
  });

  products
    .filter((product) => product.id != productId)
    .forEach((product) => {
      let newProduct = document.createElement("a");
      newProduct.href = "/detail.html?id=" + product.id;
      newProduct.classList.add("item");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>`;
      listProduct.appendChild(newProduct);
    });
}
