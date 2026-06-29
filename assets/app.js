const products=[
{id:1,name:'HÉRITAGE',img:'heritage.jpg',tag:'BEST SELLER',price:29.90,desc:"Symbole d’héritage et de valeurs transmises.",reviews:128},
{id:2,name:'VOYAGEUR',img:'voyageur.jpg',tag:'NOUVEAU',price:29.90,desc:'Pour les esprits libres et les âmes aventurières.',reviews:96,black:true},
{id:3,name:'FORCE',img:'force.jpg',price:27.90,desc:'La puissance intérieure au quotidien.',reviews:84},
{id:4,name:'ÉQUILIBRE',img:'equilibre.jpg',tag:'ÉDITION LIMITÉE',price:32.90,desc:"L’harmonie parfaite entre force et sérénité.",reviews:71,black:true},
{id:5,name:'PROTECTEUR',img:'protecteur.jpg',price:28.90,desc:'Un talisman moderne pour vous accompagner.',reviews:63},
{id:6,name:'INTEMPOREL',img:'intemporel.jpg',price:27.90,desc:'Un classique qui traverse le temps.',reviews:55}
];
let cart=[];const euro=n=>n.toLocaleString('fr-FR',{style:'currency',currency:'EUR'});
function render(){document.getElementById('productGrid').innerHTML=products.map(p=>`<article class="card">${p.tag?`<div class="badge ${p.black?'black':''}">${p.tag}</div>`:''}<div class="pimg"><img src="assets/${p.img}" alt="${p.name}"></div><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${euro(p.price)}</div><div class="stars">★★★★★ <small>(${p.reviews})</small></div><div class="colors"><i></i><i></i><i></i><i></i><i></i></div><button class="add" onclick="add(${p.id})">AJOUTER AU PANIER</button></article>`).join('')}
function add(id){let p=products.find(x=>x.id===id), it=cart.find(x=>x.id===id); it?it.qty++:cart.push({...p,qty:1}); drawCart(); openCart()}
function drawCart(){document.getElementById('cartCount').textContent=cart.reduce((s,i)=>s+i.qty,0);document.getElementById('cartItems').innerHTML=cart.length?cart.map(i=>`<div class="cart-item"><span>${i.name} × ${i.qty}</span><b>${euro(i.price*i.qty)}</b></div>`).join(''):'<p>Votre panier est vide.</p>';document.getElementById('cartTotal').textContent=euro(cart.reduce((s,i)=>s+i.qty*i.price,0))}
function openCart(){document.getElementById('cartPanel').classList.add('open')}function closeCart(){document.getElementById('cartPanel').classList.remove('open')}render();drawCart();