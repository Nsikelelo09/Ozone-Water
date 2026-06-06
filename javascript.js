const products = [
    {id:1,name:"500ml",price:10,image:"images/500ml.jpg",desc:"Small bottle"},
    {id:2,name:"1L",price:20,image:"images/1L.jpg",desc:"Medium bottle"},
    {id:3,name:"5L",price:100,image:"images/5L.jpg",desc:"Family size"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedDelivery = null;
let deliveryFee = 0;
let userLocation = null;

function setDelivery(type){

    selectedDelivery = type;
    localStorage.setItem("deliveryMethod", type);

    const box = document.getElementById("location-box");

    if(type === "delivery"){
        box.style.display = "block";
    } else {
        box.style.display = "none";
        deliveryFee = 0;
        userLocation = null;
    }
}


/* ---------------- RENDER PRODUCTS ---------------- */
function render(){
    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";

    products.forEach(p=>{
        grid.innerHTML += `
        <div class="product-card">

           <img src="${p.image}" alt="${p.name}" class="product-image">
         
         
           <div class="product-info"> 
             <h3>${p.name}</h3>
             <p>R${p.desc}</p>
             <p class="price">R${p.price}</p>

           <input type="number" value="1" min="1" class="qty-${p.id}">

           <button class="add-btn" onclick="addToCart(${p.id})">
            Add to cart
           </button>
          <div>


        </div>`;
    });
}

/* ---------------- ADD TO CART ---------------- */
function addToCart(id){
    const product = products.find(p => p.id === id);
    const qty = parseInt(document.querySelector(".qty-"+id).value);

    if(isNaN(qty) || qty <= 0){
        alert("Enter valid quantity");
        return;
    }

    const existing = cart.find(i => i.id === id);

    if(existing){
        existing.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty,
            image: product.image
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCount();

    alert(`${product.name} added to cart`);
}

/* ---------------- CART COUNT ---------------- */
function updateCount(){
    let total = cart.reduce((sum, i) => sum + i.quantity, 0);
    document.getElementById("cart-count").innerText = total;
}

/* ---------------- NAVIGATION ---------------- */
function viewCart(){
    window.location.href = "cart.html";
}

function goToCheckout(){
    if(cart.length === 0){
        alert("Your cart is empty.");
        return;
    }

      const loggedIn = localStorage.getItem("loggedIn");

    if(loggedIn === "true"){

        window.location.href = "delivery-option.html";

    }else{

        localStorage.setItem(
            "redirectAfterLogin",
            "delivery-option.html"
        );

        alert("Please login or create an account first.");

        window.location.href = "login.html";
    }
}

/* ---------------- INIT ---------------- */
render();
updateCount();