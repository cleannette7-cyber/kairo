
const defaultProducts = [
  {id:1,universe:'homme',name:'HÉRITAGE',img:'heritage.jpg',tag:'BEST SELLER',price:29.90,desc:'Symbole d’héritage, de valeurs transmises et de caractère discret.',reviews:128,stock:20,black:false},
  {id:2,universe:'homme',name:'VOYAGEUR',img:'voyageur.jpg',tag:'NOUVEAU',price:29.90,desc:'Pour les esprits libres, les âmes aventurières et les styles affirmés.',reviews:96,stock:18,black:true},
  {id:3,universe:'homme',name:'FORCE',img:'force.jpg',tag:'',price:27.90,desc:'La puissance intérieure au quotidien, dans une pièce sobre et masculine.',reviews:84,stock:24,black:false},
  {id:4,universe:'homme',name:'ÉQUILIBRE',img:'equilibre.jpg',tag:'ÉDITION LIMITÉE',price:32.90,desc:'L’harmonie parfaite entre force, sérénité et élégance du cuir.',reviews:71,stock:12,black:true},
  {id:5,universe:'femme',name:'ÉLÉGANCE',img:'protecteur.jpg',tag:'BEST SELLER',price:28.90,desc:'Un bracelet délicat au caractère lumineux, pensé pour sublimer le poignet.',reviews:63,stock:15,black:false},
  {id:6,universe:'femme',name:'LUMIÈRE',img:'intemporel.jpg',tag:'NOUVEAU',price:27.90,desc:'Un modèle doux et intemporel, entre cuir fin, éclat champagne et féminité.',reviews:55,stock:22,black:false},
  {id:7,universe:'femme',name:'HARMONIE',img:'equilibre.jpg',tag:'ÉDITION LIMITÉE',price:32.90,desc:'Une pièce raffinée qui associe douceur, équilibre et détails précieux.',reviews:48,stock:14,black:true},
  {id:8,universe:'femme',name:'GRÂCE',img:'heritage.jpg',tag:'',price:29.90,desc:'Un bracelet élégant, minimaliste et facile à porter au quotidien.',reviews:42,stock:16,black:false}
];
let products = JSON.parse(localStorage.getItem('kairo_products') || 'null') || defaultProducts;
let cart = JSON.parse(localStorage.getItem('kairo_cart') || '[]');
const euro = n => Number(n||0).toLocaleString('fr-FR',{style:'currency',currency:'EUR'});
const currentUniverse = document.body.dataset.universe || 'all';
function saveCart(){ localStorage.setItem('kairo_cart', JSON.stringify(cart)); }
function shownProducts(){ return currentUniverse==='all' ? products : products.filter(p => p.universe===currentUniverse || p.universe==='mixte'); }
function renderProducts(){
  const grid=document.getElementById('productGrid'); if(!grid) return;
  grid.innerHTML=shownProducts().map(p=>`<article class="card" role="listitem">
    ${p.tag?`<div class="badge ${p.black?'black':''}">${p.tag}</div>`:''}
    <div class="pimg"><img src="assets/images/${p.img}" alt="Bracelet ${p.name}" loading="lazy"></div>
    <div class="card-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${euro(p.price)}</div><div class="stars">★★★★★ <small>(${p.reviews||0})</small></div><div class="colors"><i></i><i></i><i></i><i></i><i></i></div><button class="btn-add" data-id="${p.id}">Ajouter au panier</button></div>
  </article>`).join('');
}
function addToCart(id){ const p=products.find(x=>x.id===+id); if(!p) return; const item=cart.find(x=>x.id===p.id); if(item)item.qty++; else cart.push({id:p.id,name:p.name,price:p.price,img:p.img,universe:p.universe,qty:1}); drawCart(); saveCart(); openCart(); }
function removeFromCart(id){ cart=cart.filter(i=>i.id!==+id); drawCart(); saveCart(); }
function changeQty(id,qty){ const item=cart.find(i=>i.id===+id); if(!item)return; item.qty=Math.max(1,qty); drawCart(); saveCart(); }
function drawCart(){
  const count=document.getElementById('cartCount'); if(count) count.textContent=cart.reduce((s,i)=>s+i.qty,0);
  const items=document.getElementById('cartItems'); if(!items) return;
  if(!cart.length) items.innerHTML='<p>Votre panier est vide.</p>'; else items.innerHTML=cart.map(i=>`<div class="cart-item"><div><strong>${i.name}</strong><small>${i.universe==='femme'?'Femme':'Homme'}</small><div class="cart-controls"><button class="qty-decrease" data-id="${i.id}">−</button><input class="qty-input" data-id="${i.id}" value="${i.qty}" aria-label="Quantité"><button class="qty-increase" data-id="${i.id}">+</button><button class="remove-item" data-id="${i.id}">Supprimer</button></div></div><b>${euro(i.price*i.qty)}</b></div>`).join('');
  const total=document.getElementById('cartTotal'); if(total) total.textContent=euro(cart.reduce((s,i)=>s+i.price*i.qty,0));
}
function openCart(){const p=document.getElementById('cartPanel'); if(p){p.classList.add('open');p.setAttribute('aria-hidden','false');document.getElementById('cartToggle')?.setAttribute('aria-expanded','true');}}
function closeCart(){const p=document.getElementById('cartPanel'); if(p){p.classList.remove('open');p.setAttribute('aria-hidden','true');document.getElementById('cartToggle')?.setAttribute('aria-expanded','false');}}
document.addEventListener('click',e=>{const add=e.target.closest('.btn-add'); if(add)return addToCart(add.dataset.id); const rem=e.target.closest('.remove-item'); if(rem)return removeFromCart(rem.dataset.id); const inc=e.target.closest('.qty-increase'); if(inc){const it=cart.find(i=>i.id===+inc.dataset.id); return changeQty(inc.dataset.id,(it?it.qty:1)+1)} const dec=e.target.closest('.qty-decrease'); if(dec){const it=cart.find(i=>i.id===+dec.dataset.id); return changeQty(dec.dataset.id,Math.max(1,(it?it.qty:1)-1))} if(e.target.id==='cartToggle') return openCart(); if(e.target.id==='closeCart') return closeCart(); if(e.target.id==='checkout') alert('Paiement Stripe à connecter : la partie visuelle est prête.');});
document.addEventListener('input',e=>{if(e.target.classList.contains('qty-input')) changeQty(e.target.dataset.id,parseInt(e.target.value,10)||1);});
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeCart();});
document.addEventListener('DOMContentLoaded',()=>{renderProducts();drawCart();});
