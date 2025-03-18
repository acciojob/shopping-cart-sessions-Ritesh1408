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

// Load cart from session storage
let cart = JSON.parse(sessionStorage.getItem("cart"))||[];

//Render product List
function renderProducts(){
	productList.innerHTML ="";
	products.forEach((product)=>{
		const li = document.createElement("li");
		li.innerHTML =`${product.name} - $${product.price}
		<button class = "add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
	productList.appendChild(li);
		
});
	
// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll(".add-to-cart-btn").forEach((button)=>{
  button.addEventListener("click",()=>addToCart(parseInt(button.dataset.id)));
});
	
}
// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // **Ensure the cart is truly empty when no items exist**
  
  if (cart.length > 0) {
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - $${item.price} 
        <button class="remove-from-cart-btn" data-index="${index}">Remove</button>`;
      cartList.appendChild(li);
    });
// Attach event listeners to "Remove" buttons
    document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
      button.addEventListener("click", () => removeFromCart(parseInt(button.dataset.index)));
    });
  }

  // Save cart to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  renderCart();
}

// Event Listener for Clear Cart Button
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", clearCart);
}

// Ensure the script runs only after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});