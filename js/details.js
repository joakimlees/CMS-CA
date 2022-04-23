/*import { products } from "./jacketsArray.js"; */
import { getProduct } from "./getProducts.js";
import { changeCartCount } from "./counter.js";

const detailsContainer = document.querySelector(".main-golden-age");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const jacketId = params.get("id");

const specificProductUrl = "https://joakimlees.no/rainydays-api/wp-json/wc/store/products/" + jacketId;

async function getApiProduct(url) {
  const response = await fetch(url);
  const products = await response.json();
  return products;
}

const jacket = await getApiProduct(specificProductUrl);

console.log(jacket);

console.log(jacket.name);
console.log(jacket.prices.price);
console.log(jacket.images[0].src);
console.log(jacket.categories[0].name);
//casual, hike, sport
console.log(jacket.tags[0].name);
//size
console.log(jacket.attributes[0].terms[1].name);
//descriton
console.log(jacket.description);
//color
console.log(jacket.attributes[1].terms[0].name);

for (let i = 0; i < jacket.tags.length; i++) {
  if (!jacket.tags[i]) {
    jacket.tags[i] = "";
  }
}

/*
const findId = products.filter((product) => {
  return product.id === jacketId;
});

const jacket = findId[0];

*/

detailsContainer.innerHTML = `

<div class="product-wrapper-details">
  <div class="product-text">
    <div>
      <h1>${jacket.name}</h1>
      <p>${jacket.categories[0].name}<p>
      <p>${jacket.tags[0].name}, ${jacket.tags[1].name}, ${jacket.tags[2].name}</p>
      <p class="price-tag"><b>Price:</b> $${jacket.prices.price}</p>
    </div>
    <div class="input-details-wrapper" >
      <div>
        <input ${jacket.attributes[1].terms[0].name};" type="radio" id="${jacket.attributes[1].terms[0].name}" value="${jacket.attributes[1].terms[0].name}" name="color" checked="checked">
        <label for=${jacket.attributes[1].terms[0].name}>${jacket.attributes[1].terms[0].name}<label>
      </div>
      <div>
        <input type="radio" id="${jacket.attributes[1].terms[1].name}" value="${jacket.attributes[1].terms[1].name}" name="color">
        <label for=${jacket.attributes[1].terms[1].name}>${jacket.attributes[1].terms[1].name}<label>
      </div>
      <div>
        <input type="radio" id="${jacket.attributes[1].terms[2].name}" value="${jacket.attributes[1].terms[2].name}" name="color">
        <label for=${jacket.attributes[1].terms[2].name}>${jacket.attributes[1].terms[2].name}<label>
      </div>
      <div>
        <label for="size-select">Select size:</label>
        <select class="size-select" name="size-select" id="size-select">
          <option value="${jacket.attributes[0].terms[0].name}" selected="selected">${jacket.attributes[0].terms[0].name}</option>
          <option value="${jacket.attributes[0].terms[1].name}">${jacket.attributes[0].terms[1].name}</option>
          <option value="${jacket.attributes[0].terms[2].name}">${jacket.attributes[0].terms[2].name}</option>
        </select>
      </div>
    </div>
    <div class="details-button-wrapper">
      <button class="add-cart-btn to-cart-cta" data-image="${jacket.images[0].src}" data-brand="${jacket.name}" data-name="${jacket.name}" data-price="${jacket.prices.price}" data-color="${jacket.attributes[1].terms[0].name}" data-size="${jacket.attributes[0].terms[0].name}">Add to shopping cart</button>
      <a class="view-cart-cta" href="/html/newCheckout.html">View shopping cart</a>
    </div>
  </div>
  <div class="image-container-details">
  <img class="image-details" src="${jacket.images[0].src}" />
</div>
</div>
<section class="more-details-wrapper">
  <h3>${jacket.name}, more details:</h3>
    <p>${jacket.description}</p>
    <a class="back-to-jackets-cta" href="/html/store.html">See more jackets</a>
</section>`;

const addCartButton = document.querySelector(".add-cart-btn");

const colorSelects = document.querySelectorAll("input[name='color']");
for (let i = 0; i < colorSelects.length; i++) {
  colorSelects[i].addEventListener("click", onColorSelect);
}

function onColorSelect(event) {
  addCartButton.dataset.color = event.target.value;
}

const sizeSelects = document.querySelectorAll("select[name='size-select'] option");
for (let i = 0; i < sizeSelects.length; i++) {
  sizeSelects[i].addEventListener("click", onSizeSelect);
}

function onSizeSelect(event) {
  addCartButton.dataset.size = event.target.value;
}

addCartButton.addEventListener("click", orderDetails);
addCartButton.addEventListener("click", changeCartCount);

function orderDetails(event) {
  event.preventDefault();

  const color = this.dataset.color;
  const size = this.dataset.size;
  const brand = this.dataset.brand;
  const name = this.dataset.name;
  const price = this.dataset.price;
  const image = this.dataset.image;

  const currentProd = getProduct();
  const storedProdDetails = { brand: brand, name: name, size: size, color: color, price: price, image: image };

  currentProd.push(storedProdDetails);

  saveProducts(currentProd);
}

function saveProducts(storedProducts) {
  localStorage.setItem("products", JSON.stringify(storedProducts));
}
