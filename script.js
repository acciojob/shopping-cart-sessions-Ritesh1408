// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Function to render product list
function renderProducts() {
  productList.innerHTML = ""; 
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners to buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.id);
      addToCart(productId);
    });
  });
}

// Function to render cart
function renderCart() {
  cartList.innerHTML = ""; 
  const cart = getCart();

  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners to remove buttons
  document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.id);
      removeFromCart(productId);
    });
  });
}

function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || []; 
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart)); 
}

function addToCart(productId) {
  let cart = getCart(); // Get current cart items
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product); 
    saveCart(cart); 
    renderCart(); 
  }
}

// Function to remove item from cart
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  renderCart();
}

// Function to clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Initial render on page load
renderProducts();
renderCart();

// Event listener for Clear Cart button
clearCartBtn.addEventListener("click", clearCart);
