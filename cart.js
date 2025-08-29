function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <tr class="total-row">
        <td colspan="5">Your cart is empty</td>
      </tr>
    `;
    return;
  }

  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItems.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₱${item.price}</td>
        <td>${item.quantity}</td>
        <td>₱${itemTotal}</td>
        <td><button class="remove-item" data-index="${index}">Remove</button></td>
      </tr>
    `;
  });

  // Total Row
  cartItems.innerHTML += `
    <tr class="total-row">
      <td colspan="3">Total</td>
      <td colspan="2">₱${total}</td>
    </tr>
  `;

  // ✅ Reattach remove event listeners correctly
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index"); // safer than button.dataset.index
      removeItem(index);
    });
  });
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  index = parseInt(index, 10); // ensure it's an integer
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  loadCart(); // refresh UI
}

// Clear cart
document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  loadCart();
});

// Continue Shopping
document.getElementById("continue-shopping").addEventListener("click", () => {
  window.location.href = "index.html";
});

// My Cart (refresh)
document.getElementById("my-cart").addEventListener("click", () => {
  window.location.reload();
});

// ✅ Initial load
loadCart();
