document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");

  //====================================== Update cart count badge
  function updateCartCount() {
    if (cartCount) {
      const totalItems = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);
      cartCount.textContent = totalItems;
    }
  }

  updateCartCount();

  // ======================================Handle add to cart buttons
  document.querySelectorAll(".btn-cart").forEach(button => {
    button.addEventListener("click", () => {
      const itemDiv = button.closest(".item");
      const name = itemDiv.querySelector("h3").textContent.trim(); // get name
      const priceText = itemDiv.querySelector("p").textContent.trim();
      const price = parseFloat(priceText.replace("₱", "")) || 0;       // get price
      const size = itemDiv.querySelector("select").value;
      const quantity = parseInt(itemDiv.querySelector(".count").value) || 1;

      // ==============================Check if item already exists (same name & size)
      const existingItem = cart.find(i => i.name === name && i.size === size);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ name, price, size, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${quantity} ${size} ${name}(s) added to cart!`);
    });
  });

  // ==========================================Quantity increase/decrease buttons
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector(".count");
      input.value = parseInt(input.value) + 1;
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector(".count");
      if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
      }
    });
  });
});
//=============================================== Animate elements on scroll
window.addEventListener("scroll", () => {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
});


  // =====================================================================Search bar
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  // Dictionary of items
  const items = {
    // Coffee
    "americano": { page: "coffee.html", id: "americano" },
    "latte": { page: "coffee.html", id: "latte" },
    "cappuccino": { page: "coffee.html", id: "cappuccino" },
    "caramel macchiato": { page: "coffee.html", id: "caramel macchaito" },
    "chocolate": { page: "coffee.html", id: "chocolate" },
    "latte": { page: "coffee.html", id: "latte" },
    "mocha": { page: "coffee.html", id: "mocha" },

    "caramel latte": { page: "coffee.html", id: "caramel latte" },
    "matcha lette": { page: "coffee.html", id: "matcha latte" },
    "classic": { page: "coffee.html", id: "classic" },
    "pitachio": { page: "coffee.html", id: "pitachio" },
    "saulted caramel": { page: "coffee.html", id: "suleted caramel " },

    // None Coffee
    "milk tea": { page: "none_coffee.html", id: "milk-tea" },
    "fruit tea": { page: "none_coffee.html", id: "fruit tea" },
    "winter melon": { page: "none_coffee.html", id: "winter melon" },
    "blueberry": { page: "none_coffee.html", id: "blueberry" },
    "lemon": { page: "none_coffee.html", id: "lemon" },
    "lytchee": { page: "none_coffee.html", id: "lytchee" },

    // Snacks
    "burger": { page: "snack.html", id: "burger" },
    "fries": { page: "snack.html", id: "fries" },
    "donut": { page: "snack.html", id: "donut" },

    // Desserts
    "berry cheesecake": { page: "dessert.html", id: "berry-cheesecake" },
    "brownie": { page: "dessert.html", id: "brownie" },
    "cheesecake": { page: "dessert.html", id: "cheesecake" },
    "choco fantasy": { page: "dessert.html", id: "choco-fantasy" },
    "strawberry cake": { page: "dessert.html", id: "strawberry-cake" },
    "red velvet": { page: "dessert.html", id: "red-velvet" }
  };

  // Handle search submit
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();

      if (!query) {
        alert("Please enter an item to search.");
        return;
      }

      // ✅ Fuzzy search (find first item that includes the query)
      const matchKey = Object.keys(items).find(key => key.includes(query));

      if (matchKey) {
        const { page, id } = items[matchKey];
        window.location.href = `${page}#${id}`;
      } else {
        alert("Item not found. Try another search.");
      }
    });
  }

  // Highlight item if URL has a hash (#id)
  const hash = window.location.hash.substring(1);
  if (hash) {
    const target = document.getElementById(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        target.style.border = "3px solid red";
        setTimeout(() => target.style.border = "", 2000);
      }, 500);
    }
  }
});
