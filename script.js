// Load cart from storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add item to cart
function addToCart(name, price) {

let item = cart.find(i => i.name === name);

if(item){
item.qty += 1;
} else {
cart.push({name, price, qty:1});
}

localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();

alert(name + " added to cart!");
}

// Update cart count in navbar
function updateCartCount(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let count = 0;

cart.forEach(item=>{
count += item.qty;
});

let counter = document.getElementById("cart-count");

if(counter){
counter.innerText = count;
}

}

// Load cart items on cart page
function loadCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let list = document.getElementById("cartItems");

if(!list) return;

let total = 0;
list.innerHTML = "";

cart.forEach(item=>{

let price = item.price * item.qty;

list.innerHTML += `
<li>
${item.name} x ${item.qty} - ₹${price}
</li>
`;

total += price;

});

document.getElementById("total").innerText = total;

}

// Place order
function placeOrder(){

let address = document.getElementById("address").value;

if(address === ""){
alert("Please enter delivery address");
return;
}

alert("✅ Order Confirmed!");

setTimeout(()=>{
alert("👨‍🍳 Preparing your order");
},2000);

setTimeout(()=>{
alert("🚚 Out for delivery");
},4000);

setTimeout(()=>{
alert("🎉 Delivered! Enjoy your meal.");
},6000);

localStorage.removeItem("cart");

}

// Search restaurants
function searchRestaurant(){

let input = document.getElementById("search").value.toLowerCase();
let cards = document.querySelectorAll(".restaurant-card");

cards.forEach(card=>{
let name = card.innerText.toLowerCase();

if(name.includes(input)){
card.style.display = "block";
} else {
card.style.display = "none";
}

});

}

// Filter restaurants
function filterRestaurant(category){

let cards = document.querySelectorAll(".restaurant-card");

cards.forEach(card=>{

if(category === "all"){
card.style.display = "block";
}
else if(card.dataset.category === category){
card.style.display = "block";
}
else{
card.style.display = "none";
}

});

}

// Back button
function goBack(){
window.history.back();
}

// Theme toggle
function toggleTheme(){
document.body.classList.toggle("light-mode");
}

// Run on page load
updateCartCount();
loadCart();
function loadCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let list = document.getElementById("cartItems");

if(!list) return;

let total = 0;

list.innerHTML = "";

cart.forEach(item=>{

let qty = item.qty || 1;
let price = item.price * qty;

list.innerHTML += `
<li class="cart-item">
<span>${item.name}</span>
<span> x ${qty}</span>
<span> ₹${price}</span>
</li>
`;

total += price;

});

document.getElementById("total").innerText = total;

}
function placeOrder(){

let address = document.getElementById("address").value;

if(address === ""){
alert("Please enter delivery address");
return;
}

alert("✅ Your Order is Confirmed!");

setTimeout(()=>{
alert("👨‍🍳 Preparing your order");
},2000);

setTimeout(()=>{
alert("🚚 Out for Delivery");
},4000);

setTimeout(()=>{
alert("🎉 Order Delivered!");
},6000);

// CLEAR CART
localStorage.removeItem("cart");

// Reset cart array
cart = [];

// Refresh cart page
loadCart();

// Update navbar counter
updateCartCount();

}
card.innerHTML = `
  <div class="card-img">
    <img src="${item.img}">
  </div>

  <div class="card-title">
    ${item.name} 
    <span class="${item.type}"></span>
  </div>

  <div class="card-meta">${item.desc}</div>
  <div class="rating">⭐ ${item.rating}</div>

  <div class="card-bottom">
    <span class="price">${formatINR(item.price)}</span>

    <div class="qty-controls" data-id="${item.id}">
      <button class="btnMinus" ${qty===0?'disabled':''}>-</button>
      <span>${qty}</span>
      <button class="btnPlus">+</button>
    </div>
  </div>
`;
let currentFilter = "all";

function filterMenu(category){
  currentFilter = category;
  renderMenu();
}

function renderMenu() {
  const menuList = document.getElementById('menuList');
  menuList.innerHTML = '';

  MENU_ITEMS
    .filter(item => currentFilter==="all" || item.category===currentFilter || item.type===currentFilter)
    .forEach(item => {
      const qty = cart[item.id] || 0;

      const card = document.createElement('div');
      card.className = 'card';

      // (use same card HTML from above)
      card.innerHTML = `
        <div class="card-img">
          <img src="${item.img}">
        </div>

        <div class="card-title">
          ${item.name} 
          <span class="${item.type}"></span>
        </div>

        <div class="card-meta">${item.desc}</div>
        <div class="rating">⭐ ${item.rating}</div>

        <div class="card-bottom">
          <span class="price">${formatINR(item.price)}</span>

          <div class="qty-controls" data-id="${item.id}">
            <button class="btnMinus" ${qty===0?'disabled':''}>-</button>
            <span>${qty}</span>
            <button class="btnPlus">+</button>
          </div>
        </div>
      `;

      menuList.appendChild(card);
    });
}
function filterMenu(type){
  currentFilter = type;

  // remove active
  document.querySelectorAll('.filters button').forEach(btn=>{
    btn.classList.remove('active');
  });

  // add active
  event.target.classList.add('active');

  renderMenu();
}