const products = [
  {id:1,name:'HÉRITAGE',img:'heritage.jpg',tag:'BEST SELLER',price:29.90,desc:'Symbole d’héritage et de valeurs transmises.',reviews:128,stock:20},
  {id:2,name:'VOYAGEUR',img:'voyageur.jpg',tag:'NOUVEAU',price:29.90,desc:'Pour les esprits libres et les âmes aventurières.',reviews:96,black:true,stock:18},
  {id:3,name:'FORCE',img:'force.jpg',price:27.90,desc:'La puissance intérieure au quotidien.',reviews:84,stock:24},
  {id:4,name:'ÉQUILIBRE',img:'equilibre.jpg',tag:'ÉDITION LIMITÉE',price:32.90,desc:'L’harmonie parfaite entre force et sérénité.',reviews:71,black:true,stock:12},
  {id:5,name:'PROTECTEUR',img:'protecteur.jpg',price:28.90,desc:'Un talisman moderne pour vous accompagner.',reviews:63,stock:15},
  {id:6,name:'INTEMPOREL',img:'intemporel.jpg',price:27.90,desc:'Un classique qui traverse le temps.',reviews:55,stock:22}
];
let storedProducts = JSON.parse(localStorage.getItem('kairo_products') || 'null');
if(storedProducts && Array.isArray(storedProducts)) products.splice(0, products.length, ...storedProducts);
let cart = JSON.parse(localStorage.getItem('kairo_cart') || '[]');
const euro = n => n.toLocaleString('fr-FR',{style:'currency',currency:'EUR'});
function saveCart(){localStorage.setItem('kairo_cart', JSON.stringify(cart));}
function renderProducts(){
  const grid=document.getElementById('productGrid'); if(!grid) return;
  grid.innerHTML=products.map(p=>`<article class="card" role="listitem">
    ${p.tag?`<div class="badge ${p.black?'black':''}">${p.tag}</div>`:''}
    <div class="pimg"><img src="assets/images/${p.img}" alt="Bracelet ${p.name}" loading="lazy"></div>
    <div class="card-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${euro(p.price)}</div><div class="stars">★★★★★ <small>(${p.reviews})</small></div><div class="colors"><i></i><i></i><i></i><i></i><i></i></div><button class="btn-add" data-id="${p.id}">Ajouter au panier</button></div>
  </article>`).join('');
}
function addToCart(id){const p=products.find(x=>x.id===+id); if(!p) return; const item=cart.find(x=>x.id===p.id); if(item)item.qty++; else cart.push({id:p.id,name:p.name,price:p.price,img:p.img,qty:1}); drawCart(); saveCart(); openCart();}
function removeFromCart(id){cart=cart.filter(i=>i.id!==+id); drawCart(); saveCart();}
function changeQty(id,qty){const item=cart.find(i=>i.id===+id); if(!item)return; item.qty=Math.max(1,qty); drawCart(); saveCart();}
function drawCart(){
  const count=document.getElementById('cartCount'); if(count) count.textContent=cart.reduce((s,i)=>s+i.qty,0);
  const items=document.getElementById('cartItems'); if(!items) return;
  if(!cart.length) items.innerHTML='<p>Votre panier est vide.</p>'; else items.innerHTML=cart.map(i=>`<div class="cart-item"><div><strong>${i.name}</strong><div class="cart-controls"><button class="qty-decrease" data-id="${i.id}">−</button><input class="qty-input" data-id="${i.id}" value="${i.qty}" aria-label="Quantité"><button class="qty-increase" data-id="${i.id}">+</button><button class="remove-item" data-id="${i.id}">Supprimer</button></div></div><b>${euro(i.price*i.qty)}</b></div>`).join('');
  const total=document.getElementById('cartTotal'); if(total) total.textContent=euro(cart.reduce((s,i)=>s+i.price*i.qty,0));
}
function openCart(){const p=document.getElementById('cartPanel'); if(p){p.classList.add('open');p.setAttribute('aria-hidden','false');document.getElementById('cartToggle')?.setAttribute('aria-expanded','true');}}
function closeCart(){const p=document.getElementById('cartPanel'); if(p){p.classList.remove('open');p.setAttribute('aria-hidden','true');document.getElementById('cartToggle')?.setAttribute('aria-expanded','false');}}
document.addEventListener('click',e=>{const add=e.target.closest('.btn-add'); if(add)return addToCart(add.dataset.id); const rem=e.target.closest('.remove-item'); if(rem)return removeFromCart(rem.dataset.id); const inc=e.target.closest('.qty-increase'); if(inc){const it=cart.find(i=>i.id===+inc.dataset.id); return changeQty(inc.dataset.id,(it?it.qty:1)+1)} const dec=e.target.closest('.qty-decrease'); if(dec){const it=cart.find(i=>i.id===+dec.dataset.id); return changeQty(dec.dataset.id,Math.max(1,(it?it.qty:1)-1))} if(e.target.id==='cartToggle') return openCart(); if(e.target.id==='closeCart') return closeCart(); if(e.target.id==='checkout') alert('Paiement Stripe à connecter : la partie visuelle est prête.');});
document.addEventListener('input',e=>{if(e.target.classList.contains('qty-input')) changeQty(e.target.dataset.id,parseInt(e.target.value,10)||1);});
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeCart();});
document.addEventListener('DOMContentLoaded',()=>{renderProducts();drawCart();});
