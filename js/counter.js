import { getProduct } from "./getProducts.js";

export const arrayCount = getProduct();

export const counter = document.querySelector(".cart-counter");
export const counterWhite = document.querySelector(".cart-counter-white");

export function changeCartCount(event) {
  parseInt((arrayCount.length += 1));

  counter.innerHTML = arrayCount.length;
  counterWhite.innerHTML = arrayCount.length;
}
