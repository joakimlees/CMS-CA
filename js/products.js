/*import { products } from "./jacketsArray.js";*/

const BaseUrl = "https://joakimlees.no/rainydays-api/wp-json/wc/store/products/";

const productContainer = document.querySelector(".product-list");

async function getApi(url) {
  try {
    const response = await fetch(url);
    const products = await response.json();

    productContainer.innerHTML = "";

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
  } catch (error) {
    productContainer.innerHTML = "Something went wrong - unable to load products";
    console.log(error);
  }
}

getApi(BaseUrl);
