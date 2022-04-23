/*import { products } from "./jacketsArray.js";*/

const BaseUrl = "https://joakimlees.no/rainydays-api/wp-json/wc/store/products/";

const productContainer = document.querySelector(".product-list");

async function getApi(url) {
  const response = await fetch(url);
  const products = await response.json();

  products.forEach(function (product) {
    productContainer.innerHTML += ` 
  <div class="singel-product-wrapper">
  <a href="/html/details.html?id=${product.id}">
    <div class="product-wrapper">
      <div class="image-container">
        <img src="${product.images[0].src}" />
      </div>
      <div class="product-text">
        <h2>${product.name}</h2>
        <p class="price-tag">$${product.prices.price}</p>
      </div>
    </div>
  </a>
  </div>`;
  });
}

getApi(BaseUrl);

/*
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
}); */
