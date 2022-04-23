export function getProduct() {
  const storedProducts = localStorage.getItem("products");

  if (!storedProducts) {
    return [];
  }
  return JSON.parse(storedProducts);
}

export function getCustomer() {
  const storedCustomer = localStorage.getItem("customerInfo");

  if (!storedCustomer) {
    return [];
  }
  return JSON.parse(storedCustomer);
}
