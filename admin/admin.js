
const ADMIN_PASSWORD='admin123';
const defaultProducts=[
{id:1,universe:'homme',name:'HÉRITAGE',img:'heritage.jpg',tag:'BEST SELLER',price:29.90,desc:'Symbole d’héritage, de valeurs transmises et de caractère discret.',reviews:128,stock:20},
{id:2,universe:'homme',name:'VOYAGEUR',img:'voyageur.jpg',tag:'NOUVEAU',price:29.90,desc:'Pour les esprits libres, les âmes aventurières et les styles affirmés.',reviews:96,black:true,stock:18},
{id:3,universe:'homme',name:'FORCE',img:'force.jpg',price:27.90,desc:'La puissance intérieure au quotidien, dans une pièce sobre et masculine.',reviews:84,stock:24},
{id:4,universe:'homme',name:'ÉQUILIBRE',img:'equilibre.jpg',tag:'ÉDITION LIMITÉE',price:32.90,desc:'L’harmonie parfaite entre force, sérénité et élégance du cuir.',reviews:71,black:true,stock:12},
{id:5,universe:'femme',name:'ÉLÉGANCE',img:'protecteur.jpg',tag:'BEST SELLER',price:28.90,desc:'Un bracelet délicat au caractère lumineux, pensé pour sublimer le poignet.',reviews:63,stock:15},
{id:6,universe:'femme',name:'LUMIÈRE',img:'intemporel.jpg',tag:'NOUVEAU',price:27.90,desc:'Un modèle doux et intemporel, entre cuir fin, éclat champagne et féminité.',reviews:55,stock:22},
{id:7,universe:'femme',name:'HARMONIE',img:'equilibre.jpg',tag:'ÉDITION LIMITÉE',price:32.90,desc:'Une pièce raffinée qui associe douceur, équilibre et détails précieux.',reviews:48,stock:14},
{id:8,universe:'femme',name:'GRÂCE',img:'heritage.jpg',price:29.90,desc:'Un bracelet élégant, minimaliste et facile à porter au quotidien.',reviews:42,stock:16}
];
let products=JSON.parse(localStorage.getItem('kairo_products')||'null')||defaultProducts;
const $=id=>document.getElementById(id); function save(){localStorage.setItem('kairo_products',JSON.stringify(products));render();}
function login(){if($('password').value===ADMIN_PASSWORD){$('login').classList.add('hidden');$('adminPanel').classList.remove('hidden');render();}else $('loginError').textContent='Mot de passe incorrect';}
function clearForm(){['pid','name','price','stock','img','tag','reviews','desc'].forEach(id=>$(id).value=''); $('universe').value='homme';}
function fill(p){$('pid').value=p.id;$('name').value=p.name;$('universe').value=p.universe||'homme';$('price').value=p.price;$('stock').value=p.stock||0;$('img').value=p.img;$('tag').value=p.tag||'';$('reviews').value=p.reviews||0;$('desc').value=p.desc||'';scrollTo({top:0,behavior:'smooth'});}
function remove(id){if(confirm('Supprimer ce produit ?')){products=products.filter(p=>p.id!==id);save();}}
function saveProduct(){const id=+$('pid').value||Date.now();const p={id,universe:$('universe').value,name:$('name').value||'Nouveau modèle',price:+$('price').value||0,stock:+$('stock').value||0,img:$('img').value||'heritage.jpg',tag:$('tag').value,desc:$('desc').value,reviews:+$('reviews').value||0};const i=products.findIndex(x=>x.id===id); if(i>-1)products[i]=p; else products.push(p); clearForm(); save();}
function render(){const list=$('adminList'); list.innerHTML=products.map(p=>`<article><img src="../assets/images/${p.img}" onerror="this.style.display='none'"><div><b>${p.name}</b><p>${p.desc}</p><small>${(p.universe||'homme').toUpperCase()} — ${p.price.toFixed(2)} € — Stock ${p.stock||0} — ${p.tag||'Sans badge'}</small></div><div class="admin-actions"><button onclick='fill(${JSON.stringify(p).replace(/'/g,"&apos;")})'>Modifier</button><button class="danger" onclick="remove(${p.id})">Supprimer</button></div></article>`).join('');}
$('loginBtn').addEventListener('click',login);$('password').addEventListener('keydown',e=>{if(e.key==='Enter')login();});$('saveBtn').addEventListener('click',saveProduct);$('resetBtn').addEventListener('click',clearForm);
