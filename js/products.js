import { products } from "./jacketsArray.js";

const productContainer = document.querySelector(".product-list");

products.forEach((product) => {
  console.log(product);

  productContainer.innerHTML += ` 
  <div class="singel-product-wrapper">
  <a href="/html/details.html?id=${product.id}">
    <div class="product-wrapper">
      <div class="image-container">
        <img src="${product.image}" />
      </div>
      <div class="product-text">
        <h2>${product.brand}</h2>
        <h3>${product.name}</h3>
        <p>${product.model}</p>
        <p class="price-tag">$${product.price}</p>
      </div>
    </div>
  </a>
  </div>`;
});
