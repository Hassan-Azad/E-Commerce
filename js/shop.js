// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".my-cart");
let closeCart = document.querySelector(".close-cart");
let cartCount = 0;

// open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// cart working js
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// making function
function ready() {
  // Retrieve cart data from sessionStorage (if available)
  const cartData = sessionStorage.getItem("cart");
  const cartItems = cartData ? JSON.parse(cartData) : [];

  // Display the cart items
  displayCart();

  // remove items from cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //   Quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Add to Cart
  var addCart = document.getElementsByClassName("cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // Buy button work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

// Buy Button
function buyButtonClicked() {
  alert("Your Order is placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
  // Clear cart data from sessionStorage
  sessionStorage.removeItem("cart");
}

// remove items from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
  updateCartData(); // Update cart data in sessionStorage
}

// quantity changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
  updateCartData(); // Update cart data in sessionStorage
}

// Add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
  updateCartData(); // Update cart data in sessionStorage
  // counter
  cartCount++;
  document.getElementById("cart-count").textContent = cartCount;
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerHTML == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartBoxContent = `
                     <img src="${productImg}" alt="" class="cart-img" />
                     <div class="detail-box">
                     <div class="cart-product-title">${title}</div>
                     <div class="cart-price">${price}</div>
                     <input type="number" value="1" class="cart-quantity" />
                     </div>
                     <!-- remove cart -->
                     <i class="fa fa-trash-o cart-remove" style="font-size: 24px"></i>
                     `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// Update cart data in sessionStorage
function updateCartData() {
  var cartItems = Array.from(document.getElementsByClassName("cart-box")).map(
    function (cartBox) {
      var title =
        cartBox.getElementsByClassName("cart-product-title")[0].innerText;
      var price = cartBox.getElementsByClassName("cart-price")[0].innerText;
      var quantity = cartBox.getElementsByClassName("cart-quantity")[0].value;
      return { title, price, quantity };
    }
  );
  sessionStorage.setItem("cart", JSON.stringify(cartItems));
}

// Display the cart items
function displayCart() {
  const cartContent = document.getElementsByClassName("cart-content")[0];
  const cartData = sessionStorage.getItem("cart");
  const cartItems = cartData ? JSON.parse(cartData) : [];

  cartContent.innerHTML = ""; // Clear previous cart items

  cartItems.forEach(function (item) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    var cartBoxContent = `
      <img src="${item.productImg}" alt="" class="cart-img" />
      <div class="detail-box">
        <div class="cart-product-title">${item.title}</div>
        <div class="cart-price">${item.price}</div>
        <input type="number" value="${item.quantity}" class="cart-quantity" />
      </div>
      <!-- remove cart -->
      <i class="fa fa-trash-o cart-remove" style="font-size: 24px"></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartContent.appendChild(cartShopBox);

    cartShopBox
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);
    cartShopBox
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("change", quantityChanged);
  });

  updatetotal();
}

//update total
function updatetotal() {
  var cartBoxes = document.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerHTML.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    // If Price contain some cents value
  }
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
