import { getProduct, getCustomer } from "./getProducts.js";

const prodDetails = getProduct();

const checkoutInfoContainer = document.querySelector(".checkout-info-container");

let totalPrice = 0;

const heading = document.querySelector(".checkout-h1");

prodDetails.forEach((product) => {
  totalPrice += parseInt(product.price);

  return totalPrice;
});

prodDetails.forEach((product) => {
  checkoutInfoContainer.innerHTML += ` 
                                      <div class="each-product-wrapper-cart">
                                        <div class="cart-image-wrapper">
                                          <img src="${product.image}" />
                                        </div>
                                        <div class="cart-prod-text">
                                          <h2>${product.brand}</h2>
                                          <h3>${product.name}</h3>
                                          <p><b>Color:</b> ${product.color}</p>
                                          <p><b>Size:</b> ${product.size}</p>
                                          <p><b>Price:</b> $${product.price}</p>
                                        </div>
                                      </div>`;
});

heading.innerHTML = "Your shopping cart";

checkoutInfoContainer.innerHTML =
  `<div class="product-wrapper-cart">${checkoutInfoContainer.innerHTML}</div>` +
  ` <div class="price-button-wrapper">
      <div class="price-button-sticky">
        <p><b>Quantity:</b> ${prodDetails.length} - products</p>
        <p><b>Total Price:</b> $${totalPrice},-</p>
        </p><button class="to-checkout-button">Begin checkout</button>
      </div>
    </div> `;

//make cart html page
function makeCartHtml(event) {
  heading.innerHTML = "";
  checkoutInfoContainer.innerHTML = "";

  heading.innerHTML = "Your shopping cart";

  prodDetails.forEach((product) => {
    checkoutInfoContainer.innerHTML += ` 
                                        <div class="each-product-wrapper-cart">
                                          <div class="cart-image-wrapper">
                                            <img src="${product.image}" />
                                          </div>
                                          <div class="cart-prod-text">
                                            <h2>${product.brand}</h2>
                                            <h3>${product.name}</h3>
                                            <p><b>Color:</b> ${product.color}</p>
                                            <p><b>Size:</b> ${product.size}</p>
                                            <p><b>Price:</b> $${product.price}</p>
                                          </div>
                                        </div>`;
  });

  checkoutInfoContainer.innerHTML =
    `<div class="product-wrapper-cart">${checkoutInfoContainer.innerHTML}</div>` +
    ` <div class="price-button-wrapper">
        <div class="price-button-sticky">
          <p><b>Quantity:</b> ${prodDetails.length} - products</p>
          <p><b>Total Price:</b> $${totalPrice},-</p>
          </p><button class="to-checkout-button">Begin Checkout</button>
        </div>
      </div> `;

  if (document.querySelector(".to-checkout-button")) {
    const toCheckoutButton = document.querySelector(".to-checkout-button");
    toCheckoutButton.addEventListener("click", makeCheckoutPage);
  }
}

// make checkout page HTML
function makeCheckoutPage(event) {
  heading.innerHTML = "";
  checkoutInfoContainer.innerHTML = "";

  heading.innerHTML = "Delivery information";

  prodDetails.forEach((product) => {
    checkoutInfoContainer.innerHTML += ` 
                                        <div class="each-product-wrapper-cart">
                                          <div class="cart-image-wrapper">
                                            <img src="${product.image}" />
                                          </div>
                                          <div class="cart-prod-text">
                                            <h2>${product.brand}</h2>
                                            <h3>${product.name}</h3>
                                            <p><b>Color:</b> ${product.color}</p>
                                            <p><b>Size:</b> ${product.size}</p>
                                            <p><b>Price:</b> $${product.price}</p>
                                          </div>
                                        </div>`;
  });

  checkoutInfoContainer.innerHTML =
    `<div class="product-wrapper-cart">${checkoutInfoContainer.innerHTML}</div>` +
    `<section class="delivery-input-wrapper">
                                          <div class="delivery-input-sticky">
                                            <fieldset class="delivery-fieldset">
                                              <legend>Delivery information</legend>
                                              <div>
                                                <label for="full-name">Full Name<label>
                                                <input type="text" id="full-name" placeholder="Enter full name">
                                              </div>
                                              <div>
                                                <label for="email">email-address</label>
                                                <input type="email" id="email" placeholder="enter e-mail address">
                                              </div>
                                              <div>
                                                <label for="phone-number">Phone number:</label>
                                                <input type="tel" id="phone-number">
                                              </div>
                                              <div>
                                                <label for="Delivery address">Delivery Address</label>
                                                <input type="text" id="delivery-address" placeholder="Enter delivery address (required)">
                                              </div>
                                            </fieldset>
                                            <div class="delivery-info-button-wrapper">
                                              <button type='button' class='to-payment-button'>Confirm & continue</button>
                                              <button class='backB-checkout'>Back to previous</button>
                                            </div>
                                          </div>  
                                        </section>
                                           `;

  //making var and event to buttons forward and backwards.
  if (document.querySelector(".backB-checkout")) {
    const backCheckoutButton = document.querySelector(".backB-checkout");
    backCheckoutButton.addEventListener("click", makeCartHtml);
  }

  if (document.querySelector(".to-payment-button")) {
    const toPayment = document.querySelector(".to-payment-button");
    toPayment.addEventListener("click", storeInput);
    toPayment.addEventListener("click", makePaymentHtml);
  }
}

const toCheckoutButton = document.querySelector(".to-checkout-button");

toCheckoutButton.addEventListener("click", makeCheckoutPage);

//function to store input values
function storeInput(event) {
  const name = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone-number").value;
  const address = document.getElementById("delivery-address").value;

  const storedInputs = { name: name, email: email, phone: phone, address: address };

  localStorage.setItem("customerInfo", JSON.stringify(storedInputs));
}

//function which makes payment html page
function makePaymentHtml(product) {
  heading.innerHTML = "";
  checkoutInfoContainer.innerHTML = "";

  heading.innerHTML = "Payment information";

  const customerDetails = getCustomer();

  prodDetails.forEach((product) => {
    checkoutInfoContainer.innerHTML += `
    <div class="each-product-wrapper-cart">
                                        <div class="cart-image-wrapper">
                                          <img src="${product.image}" />
                                        </div>
                                        <div class="cart-prod-text">
                                          <h2>${product.brand}</h2>
                                          <h3>${product.name}</h3>
                                          <p><b>Color:</b> ${product.color}</p>
                                          <p><b>Size:</b> ${product.size}</p>
                                          <p><b>Price:</b> $${product.price}</p>
                                        </div>
                                      </div>`;
  });

  checkoutInfoContainer.innerHTML =
    `<div class="product-wrapper-cart"><h2>Your order</h2>${checkoutInfoContainer.innerHTML}</div>` +
    `
    <section class="payment-container">
      <h2>Delivery information</h2>
      <section class="payment-text-wrapper">
        <p><b>Full name:</b> ${customerDetails.name}</p>
        <p><b>Email address:</b> ${customerDetails.email}</p>
        <p><b>Phone number:</b> ${customerDetails.phone}</p>
        <p><b>Delivery address:</b> ${customerDetails.address}</p>
        <p><b>Product quantity:</b> ${prodDetails.length}</p>
        <p><b>Total Price:</b> ${totalPrice},-</p>
      </section>
      <section class="delivery-input-wrapper payment-input-wrapper">
                                          <div class="delivery-input-sticky">
                                            <fieldset class="delivery-fieldset">
                                              <legend>Your payment information</legend>
                                              <select class="card-select" name="size-select" id="size-select">
                                                <option value="visa" selected="selected">Visa</option>
                                                <option value="mastercard">Mastercard</option>
                                              </select>
                                              <div>
                                                <label for="card-number">Card number:</label>
                                                <input type="tel" id="card-number" placeholder="Enter credit card number (required)">
                                              </div>
                                            </fieldset>
                                            <div class="delivery-info-button-wrapper">
                                              <button type='button' class='complete-order'>Confirm & complete order</button>
                                              <button class='backB-checkout'>Back to previous</button>
                                            </div>
                                          </div>  
      </section>
    </section>`;

  if (document.querySelector(".backB-checkout")) {
    const backCheckoutButton = document.querySelector(".backB-checkout");
    backCheckoutButton.addEventListener("click", makeCheckoutPage);
  }
  if (document.querySelector(".complete-order")) {
    const completeOrder = document.querySelector(".complete-order");
    completeOrder.addEventListener("click", orderSuccessHtml);
    completeOrder.addEventListener("click", localStorage.clear());
  }
}

function orderSuccessHtml() {
  heading.innerHTML = "";
  checkoutInfoContainer.innerHTML = "";

  heading.innerHTML = "Order successfully completed";

  checkoutInfoContainer.innerHTML = `<section class="success-container">
                                      <h2>Your order is now send to us</h2>
                                      <p>Thanks for your order. A confirmation email with details on your order has been send to you.</p>
                                      <br>
                                      <p>If you have any questions feel free to <a href="/html/contact.html">contact us here</a></p>
                                      <a class="success-back-button" href="../index.html">Back to Rainy days - Home</a>
                                    </section>`;
}
