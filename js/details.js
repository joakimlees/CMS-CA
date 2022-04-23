import { products } from "./jacketsArray.js";
import { getProduct } from "./getProducts.js";
import { changeCartCount } from "./counter.js";

const detailsContainer = document.querySelector(".main-golden-age");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const jacketId = params.get("id");

const findId = products.filter((product) => {
  return product.id === jacketId;
});

const jacket = findId[0];

detailsContainer.innerHTML = `

<div class="product-wrapper-details">
  <div class="product-text">
    <div>
      <h1>${jacket.brand}</h1>
      <h2>${jacket.name}</h2>
      <p>${jacket.type}<p>
      <p>${jacket.model}</p>
      <p class="price-tag"><b>Price:</b> $${jacket.price}</p>
    </div>
    <div class="input-details-wrapper" >
      <div>
        <input ${jacket.color[0]};" type="radio" id="${jacket.color[0]}" value="${jacket.color[0]}" name="color" checked="checked">
        <label for=${jacket.color[0]}>${jacket.color[0]}<label>
      </div>
      <div>
        <input type="radio" id="${jacket.color[1]}" value="${jacket.color[1]}" name="color">
        <label for=${jacket.color[1]}>${jacket.color[1]}<label>
      </div>
      <div>
        <input type="radio" id="${jacket.color[2]}" value="${jacket.color[2]}" name="color">
        <label for=${jacket.color[2]}>${jacket.color[2]}<label>
      </div>
      <div>
        <label for="size-select">Select size:</label>
        <select class="size-select" name="size-select" id="size-select">
          <option value="${jacket.size[0]}" selected="selected">${jacket.size[0]}</option>
          <option value="${jacket.size[1]}">${jacket.size[1]}</option>
          <option value="${jacket.size[2]}">${jacket.size[2]}</option>
        </select>
      </div>
    </div>
    <div class="details-button-wrapper">
      <button class="add-cart-btn to-cart-cta" data-image="${jacket.image}" data-brand="${jacket.brand}" data-name="${jacket.name}" data-price="${jacket.price}" data-color="${jacket.color[0]}" data-size="${jacket.size[0]}">Add to shopping cart</button>
      <a class="view-cart-cta" href="/html/newCheckout.html">View shopping cart</a>
    </div>
  </div>
  <div class="image-container-details">
  <img class="image-details" src="${jacket.image}" />
</div>
</div>
<section class="more-details-wrapper">
  <h3>${jacket.name}, more details:</h3>
    <p>${jacket.details}</p>
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
