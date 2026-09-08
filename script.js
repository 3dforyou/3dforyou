const products=[
 {id:1,name:"NOVA Hoodie",price:39.95,emoji:"🧥",desc:"Comfortabele hoodie voor elke dag."},
 {id:2,name:"NOVA Cap",price:19.95,emoji:"🧢",desc:"Minimalistische cap met NOVA-logo."},
 {id:3,name:"NOVA Bottle",price:14.95,emoji:"🥤",desc:"Herbruikbare drinkfles voor onderweg."},
 {id:4,name:"NOVA Backpack",price:49.95,emoji:"🎒",desc:"Strakke rugzak voor school en onderweg."},
 {id:5,name:"NOVA T-Shirt",price:24.95,emoji:"👕",desc:"Basic T-shirt met moderne fit."},
 {id:6,name:"NOVA Socks",price:9.95,emoji:"🧦",desc:"Set comfortabele NOVA sokken."},
 {id:7,name:"NOVA Case",price:17.95,emoji:"📱",desc:"Beschermende telefoonhoes met stijl."},
 {id:8,name:"NOVA Mug",price:12.95,emoji:"☕",desc:"Minimalistische mok voor thuis."}
];
let cart=JSON.parse(localStorage.getItem("novaCart")||"[]");

const euro=n=>new Intl.NumberFormat("nl-NL",{style:"currency",currency:"EUR"}).format(n);

function renderProducts(){
 const q=document.getElementById("search").value.toLowerCase();
 const list=products.filter(p=>(p.name+" "+p.desc).toLowerCase().includes(q));
 document.getElementById("products").innerHTML=list.map(p=>`
 <article class="product">
   <div class="product-img">${p.emoji}</div>
   <div class="product-info">
    <h3>${p.name}</h3><p>${p.desc}</p><div class="price">${euro(p.price)}</div>
    <button class="add" onclick="addToCart(${p.id})">In winkelmandje</button>
   </div>
 </article>`).join("");
}
function addToCart(id){const x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openCart()}
function removeFromCart(id){cart=cart.filter(i=>i.id!==id);save()}
function changeQty(id,d){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)removeFromCart(id);else save()}
function save(){localStorage.setItem("novaCart",JSON.stringify(cart));renderCart()}
function renderCart(){
 let total=0,count=0;
 const html=cart.map(i=>{const p=products.find(x=>x.id===i.id);total+=p.price*i.qty;count+=i.qty;return`
 <div class="cart-row"><div><strong>${p.name}</strong><br><span class="small">${euro(p.price)} per stuk</span></div>
 <div class="qty"><button onclick="changeQty(${p.id},-1)">−</button>${i.qty}<button onclick="changeQty(${p.id},1)">+</button></div></div>`}).join("");
 document.getElementById("cartItems").innerHTML=html||'<p class="small">Je winkelmandje is nog leeg.</p>';
 document.getElementById("cartTotal").textContent=euro(total);
 document.getElementById("cartCount").textContent=count;
}
function openCart(){document.getElementById("cartOverlay").classList.remove("hidden");renderCart()}
function closeCart(e){if(!e||e.target.id==="cartOverlay")document.getElementById("cartOverlay").classList.add("hidden")}
function checkout(){
 if(!cart.length){alert("Je winkelmandje is leeg.");return}
 alert("Demo-checkout: de producten zijn geselecteerd. Voor echte betalingen moet je een betaalprovider koppelen.");
}
renderProducts();renderCart();
