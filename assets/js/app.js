
const defaultVariants = [
  {id:'noir', name:'Noir', hex:'#15110e'},
  {id:'marron', name:'Marron', hex:'#6b3f22'},
  {id:'cognac', name:'Cognac', hex:'#b4773d'},
  {id:'chocolat', name:'Chocolat', hex:'#3a2317'},
  {id:'champagne', name:'Champagne', hex:'#d7b37a'}
];
const femmeVariants = [
  {id:'champagne', name:'Champagne', hex:'#d7b37a'},
  {id:'argent', name:'Argent satiné', hex:'#d9d9d9'},
  {id:'nude', name:'Nude rosé', hex:'#d8b9a7'},
  {id:'camel', name:'Camel clair', hex:'#b98b50'},
  {id:'noir', name:'Noir élégant', hex:'#15110e'}
];
const defaultProducts = [
  {id:1,universe:'homme',name:'HÉRITAGE',img:'heritage.jpg',tag:'BEST SELLER',price:29.90,desc:'Symbole d’héritage, de valeurs transmises et de caractère discret.',reviews:128,stock:20,black:false,variants:defaultVariants},
  {id:2,universe:'homme',name:'VOYAGEUR',img:'voyageur.jpg',tag:'NOUVEAU',price:29.90,desc:'Pour les esprits libres, les âmes aventurières et les styles affirmés.',reviews:96,stock:18,black:true,variants:defaultVariants},
  {id:3,universe:'homme',name:'FORCE',img:'force.jpg',tag:'',price:27.90,desc:'La puissance intérieure au quotidien, dans une pièce sobre et masculine.',reviews:84,stock:24,black:false,variants:defaultVariants},
  {id:4,universe:'homme',name:'ÉQUILIBRE',img:'equilibre.jpg',tag:'ÉDITION LIMITÉE',price:32.90,desc:'L’harmonie parfaite entre force, sérénité et élégance du cuir.',reviews:71,stock:12,black:true,variants:defaultVariants},
  {id:5,universe:'femme',name:'ÉLÉGANCE',img:'protecteur.jpg',tag:'BEST SELLER',price:28.90,desc:'Un bracelet délicat au caractère lumineux, pensé pour sublimer le poignet.',reviews:63,stock:15,black:false,variants:femmeVariants},
  {id:6,universe:'femme',name:'LUMIÈRE',img:'intemporel.jpg',tag:'NOUVEAU',price:27.90,desc:'Un modèle doux et intemporel, entre cuir fin, éclat champagne et féminité.',reviews:55,stock:22,black:false,variants:femmeVariants},
  {id:7,universe:'femme',name:'HARMONIE',img:'equilibre.jpg',tag:'ÉDITION LIMITÉE',price:32.90,desc:'Une pièce raffinée qui associe douceur, équilibre et détails précieux.',reviews:48,stock:14,black:true,variants:femmeVariants},
  {id:8,universe:'femme',name:'GRÂCE',img:'heritage.jpg',tag:'',price:29.90,desc:'Un bracelet élégant, minimaliste et facile à porter au quotidien.',reviews:42,stock:16,black:false,variants:femmeVariants}
];
function normalizeProducts(list){
  return list.map(p=>{
    if(!p.variants || !Array.isArray(p.variants) || !p.variants.length){
      p.variants = p.universe === 'femme' ? femmeVariants : defaultVariants;
    }
    return p;
  });
}
let products = normalizeProducts(JSON.parse(localStorage.getItem('kairo_products') || 'null') || defaultProducts);
let cart = JSON.parse(localStorage.getItem('kairo_cart') || '[]');
const selectedVariants = {};
const euro = n => Number(n||0).toLocaleString('fr-FR',{style:'currency',currency:'EUR'});
const currentUniverse = document.body.dataset.universe || 'all';
function saveCart(){ localStorage.setItem('kairo_cart', JSON.stringify(cart)); }
function shownProducts(){ return currentUniverse==='all' ? products : products.filter(p => p.universe===currentUniverse || p.universe==='mixte'); }
function getVariant(product, variantId){
  const variants = product.variants || (product.universe === 'femme' ? femmeVariants : defaultVariants);
  return variants.find(v=>v.id===variantId) || variants[0];
}
function renderProducts(){
  const grid=document.getElementById('productGrid'); if(!grid) return;
  grid.innerHTML=shownProducts().map(p=>{
    const active = selectedVariants[p.id] || (p.variants?.[0]?.id) || 'noir';
    const variant = getVariant(p, active);
    selectedVariants[p.id] = variant.id;
    const image = variant.img || p.img;
    const price = Number(variant.price ?? p.price);
    return `<article class="card" role="listitem" data-product-id="${p.id}">
    ${p.tag?`<div class="badge ${p.black?'black':''}">${p.tag}</div>`:''}
    <div class="pimg"><img class="product-image" src="assets/images/${image}" alt="Bracelet ${p.name} couleur ${variant.name}" loading="lazy"></div>
    <div class="card-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="price" data-price>${euro(price)}</div><div class="stars">★★★★★ <small>(${p.reviews||0})</small></div>
      <div class="variant-label">Couleur : <b data-variant-name>${variant.name}</b></div>
      <div class="colors" role="radiogroup" aria-label="Choisir la couleur du bracelet ${p.name}">${(p.variants||[]).map((v,idx)=>`<button type="button" class="color-dot ${v.id===variant.id?'active':''}" data-product="${p.id}" data-variant="${v.id}" aria-label="${v.name}" aria-pressed="${v.id===variant.id?'true':'false'}" style="--dot:${v.hex||'#15110e'}"></button>`).join('')}</div>
      <button class="btn-add" data-id="${p.id}">Ajouter au panier</button></div>
  </article>`;
  }).join('');
}
function selectVariant(productId, variantId){
  const product = products.find(p=>p.id===+productId); if(!product) return;
  const variant = getVariant(product, variantId); selectedVariants[product.id] = variant.id;
  const card = document.querySelector(`[data-product-id="${product.id}"]`); if(!card) return;
  const img = card.querySelector('.product-image');
  if(img){ img.src = `assets/images/${variant.img || product.img}`; img.alt = `Bracelet ${product.name} couleur ${variant.name}`; }
  const name = card.querySelector('[data-variant-name]'); if(name) name.textContent = variant.name;
  const price = card.querySelector('[data-price]'); if(price) price.textContent = euro(variant.price ?? product.price);
  card.querySelectorAll('.color-dot').forEach(btn=>{
    const isActive = btn.dataset.variant === variant.id;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}
function addToCart(id){
  const p=products.find(x=>x.id===+id); if(!p) return;
  const variant = getVariant(p, selectedVariants[p.id] || p.variants?.[0]?.id);
  const variantId = variant.id;
  const key = `${p.id}-${variantId}`;
  const item=cart.find(x=>x.key===key);
  const itemPrice = Number(variant.price ?? p.price);
  if(item)item.qty++;
  else cart.push({key,id:p.id,name:p.name,price:itemPrice,img:variant.img||p.img,universe:p.universe,variantId,variantName:variant.name,variantHex:variant.hex,qty:1});
  drawCart(); saveCart(); openCart();
}
function removeFromCart(key){ cart=cart.filter(i=>i.key!==key); drawCart(); saveCart(); }
function changeQty(key,qty){ const item=cart.find(i=>i.key===key); if(!item)return; item.qty=Math.max(1,qty); drawCart(); saveCart(); }
function drawCart(){
  const count=document.getElementById('cartCount'); if(count) count.textContent=cart.reduce((s,i)=>s+i.qty,0);
  const items=document.getElementById('cartItems'); if(!items) return;
  if(!cart.length) items.innerHTML='<p>Votre panier est vide.</p>'; else items.innerHTML=cart.map(i=>`<div class="cart-item"><div><strong>${i.name}</strong><small>${i.universe==='femme'?'Femme':'Homme'} — ${i.variantName||'Couleur standard'}</small><div class="cart-controls"><button class="qty-decrease" data-key="${i.key}">−</button><input class="qty-input" data-key="${i.key}" value="${i.qty}" aria-label="Quantité"><button class="qty-increase" data-key="${i.key}">+</button><button class="remove-item" data-key="${i.key}">Supprimer</button></div></div><b>${euro(i.price*i.qty)}</b></div>`).join('');
  const total=document.getElementById('cartTotal'); if(total) total.textContent=euro(cart.reduce((s,i)=>s+i.price*i.qty,0));
}
function openCart(){const p=document.getElementById('cartPanel'); if(p){p.classList.add('open');p.setAttribute('aria-hidden','false');document.getElementById('cartToggle')?.setAttribute('aria-expanded','true');}}
function closeCart(){const p=document.getElementById('cartPanel'); if(p){p.classList.remove('open');p.setAttribute('aria-hidden','true');document.getElementById('cartToggle')?.setAttribute('aria-expanded','false');}}
document.addEventListener('click',e=>{
  const color=e.target.closest('.color-dot'); if(color) return selectVariant(color.dataset.product, color.dataset.variant);
  const add=e.target.closest('.btn-add'); if(add)return addToCart(add.dataset.id);
  const rem=e.target.closest('.remove-item'); if(rem)return removeFromCart(rem.dataset.key);
  const inc=e.target.closest('.qty-increase'); if(inc){const it=cart.find(i=>i.key===inc.dataset.key); return changeQty(inc.dataset.key,(it?it.qty:1)+1)}
  const dec=e.target.closest('.qty-decrease'); if(dec){const it=cart.find(i=>i.key===dec.dataset.key); return changeQty(dec.dataset.key,Math.max(1,(it?it.qty:1)-1))}
  if(e.target.id==='cartToggle') return openCart(); if(e.target.id==='closeCart') return closeCart(); if(e.target.id==='checkout') alert('Paiement Stripe à connecter : la partie visuelle est prête.');
});
document.addEventListener('input',e=>{if(e.target.classList.contains('qty-input')) changeQty(e.target.dataset.key,parseInt(e.target.value,10)||1);});
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeCart();});
document.addEventListener('DOMContentLoaded',()=>{renderProducts();drawCart();});
