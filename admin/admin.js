const ADMIN_PASSWORD='admin123';
const defaultVariants=[
  {id:'noir',name:'Noir',hex:'#15110e',img:'voyageur.jpg'},
  {id:'marron',name:'Marron',hex:'#6b3f22',img:'heritage.jpg'},
  {id:'cognac',name:'Cognac',hex:'#b4773d',img:'force.jpg'},
  {id:'chocolat',name:'Chocolat',hex:'#3a2317',img:'equilibre.jpg'},
  {id:'champagne',name:'Champagne',hex:'#d7b37a',img:'intemporel.jpg'}
];
const femmeVariants=[
  {id:'champagne',name:'Champagne',hex:'#d7b37a',img:'protecteur.jpg'},
  {id:'argent',name:'Argent satiné',hex:'#d9d9d9',img:'intemporel.jpg'},
  {id:'nude',name:'Nude rosé',hex:'#d8b9a7',img:'heritage.jpg'},
  {id:'camel',name:'Camel clair',hex:'#b98b50',img:'force.jpg'},
  {id:'noir',name:'Noir élégant',hex:'#15110e',img:'equilibre.jpg'}
];
const defaultProducts=[
{id:1,universe:'homme',name:'HÉRITAGE',img:'heritage.jpg',tag:'BEST SELLER',price:29.90,desc:'Symbole d’héritage, de valeurs transmises et de caractère discret.',reviews:128,stock:20,variants:defaultVariants},
{id:2,universe:'homme',name:'VOYAGEUR',img:'voyageur.jpg',tag:'NOUVEAU',price:29.90,desc:'Pour les esprits libres, les âmes aventurières et les styles affirmés.',reviews:96,black:true,stock:18,variants:defaultVariants},
{id:3,universe:'homme',name:'FORCE',img:'force.jpg',price:27.90,desc:'La puissance intérieure au quotidien, dans une pièce sobre et masculine.',reviews:84,stock:24,variants:defaultVariants},
{id:4,universe:'homme',name:'ÉQUILIBRE',img:'equilibre.jpg',tag:'ÉDITION LIMITÉE',price:32.90,desc:'L’harmonie parfaite entre force, sérénité et élégance du cuir.',reviews:71,black:true,stock:12,variants:defaultVariants},
{id:5,universe:'femme',name:'ÉLÉGANCE',img:'protecteur.jpg',tag:'BEST SELLER',price:28.90,desc:'Un bracelet délicat au caractère lumineux, pensé pour sublimer le poignet.',reviews:63,stock:15,variants:femmeVariants},
{id:6,universe:'femme',name:'LUMIÈRE',img:'intemporel.jpg',tag:'NOUVEAU',price:27.90,desc:'Un modèle doux et intemporel, entre cuir fin, éclat champagne et féminité.',reviews:55,stock:22,variants:femmeVariants},
{id:7,universe:'femme',name:'HARMONIE',img:'equilibre.jpg',tag:'ÉDITION LIMITÉE',price:32.90,desc:'Une pièce raffinée qui associe douceur, équilibre et détails précieux.',reviews:48,stock:14,variants:femmeVariants},
{id:8,universe:'femme',name:'GRÂCE',img:'heritage.jpg',price:29.90,desc:'Un bracelet élégant, minimaliste et facile à porter au quotidien.',reviews:42,stock:16,variants:femmeVariants}
];
let products=JSON.parse(localStorage.getItem('kairo_products')||'null')||defaultProducts;
const $=id=>document.getElementById(id);
function slug(s){return String(s||'couleur').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'couleur'}
function variantsToText(vars){return (vars||[]).map(v=>`${v.name||''}|${v.hex||'#15110e'}|${v.img||''}${v.price!==undefined&&v.price!==''?`|${v.price}`:''}`).join('\n')}
function textToVariants(txt, fallbackImg, fallbackPrice){
  const lines=String(txt||'').split('\n').map(l=>l.trim()).filter(Boolean);
  if(!lines.length) return [];
  return lines.map((line,idx)=>{const [name,hex,img,price]=line.split('|').map(x=>(x||'').trim());return {id:slug(name||`couleur-${idx+1}`),name:name||`Couleur ${idx+1}`,hex:hex||'#15110e',img:img||fallbackImg||'heritage.jpg',price:price===''||price===undefined?undefined:Number(String(price).replace(',','.'))||fallbackPrice};});
}
function save(){localStorage.setItem('kairo_products',JSON.stringify(products));render();}
function login(){if($('password').value===ADMIN_PASSWORD){$('login').classList.add('hidden');$('adminPanel').classList.remove('hidden');render();}else $('loginError').textContent='Mot de passe incorrect';}
function clearForm(){['pid','name','price','stock','img','tag','reviews','desc','variants'].forEach(id=>$(id).value=''); $('universe').value='homme';}
function fill(p){$('pid').value=p.id;$('name').value=p.name;$('universe').value=p.universe||'homme';$('price').value=p.price;$('stock').value=p.stock||0;$('img').value=p.img;$('tag').value=p.tag||'';$('reviews').value=p.reviews||0;$('desc').value=p.desc||'';$('variants').value=variantsToText(p.variants||[]);scrollTo({top:0,behavior:'smooth'});}
function remove(id){if(confirm('Supprimer ce produit ?')){products=products.filter(p=>p.id!==id);save();}}
function saveProduct(){
  const id=+$('pid').value||Date.now(); const price=+$('price').value||0; const img=$('img').value||'heritage.jpg';
  let variants=textToVariants($('variants').value,img,price);
  if(!variants.length) variants=JSON.parse(JSON.stringify($('universe').value==='femme'?femmeVariants:defaultVariants));
  const p={id,universe:$('universe').value,name:$('name').value||'Nouveau modèle',price,stock:+$('stock').value||0,img,tag:$('tag').value,desc:$('desc').value,reviews:+$('reviews').value||0,variants};
  p.black = String(p.tag||'').toLowerCase().includes('édition') || p.universe==='femme' && String(p.name||'').toLowerCase().includes('harmonie');
  const i=products.findIndex(x=>x.id===id); if(i>-1)products[i]=p; else products.push(p); clearForm(); save();
}
function resetStorage(){if(confirm('Réinitialiser les produits par défaut ?')){products=JSON.parse(JSON.stringify(defaultProducts));localStorage.removeItem('kairo_products');localStorage.removeItem('kairo_cart');save();}}
function render(){
  const list=$('adminList'); if(!list)return;
  list.innerHTML=products.map(p=>`<article><img src="../assets/images/${p.img}" onerror="this.style.display='none'"><div><b>${p.name}</b><p>${p.desc||''}</p><small>${(p.universe||'homme').toUpperCase()} — ${Number(p.price||0).toFixed(2)} € — Stock ${p.stock||0} — ${p.tag||'Sans badge'} — ${(p.variants||[]).length} couleur(s)</small><div class="variant-preview">${(p.variants||[]).map(v=>`<i title="${v.name}" style="background:${v.hex||'#15110e'}"></i>`).join('')}</div></div><div class="admin-actions"><button data-edit="${p.id}">Modifier</button><button class="danger" data-remove="${p.id}">Supprimer</button></div></article>`).join('');
}
document.addEventListener('click',e=>{const edit=e.target.closest('[data-edit]'); if(edit){const p=products.find(x=>x.id===+edit.dataset.edit); if(p)fill(p); return;} const del=e.target.closest('[data-remove]'); if(del)return remove(+del.dataset.remove);});
$('loginBtn').addEventListener('click',login);$('password').addEventListener('keydown',e=>{if(e.key==='Enter')login();});$('saveBtn').addEventListener('click',saveProduct);$('resetBtn').addEventListener('click',clearForm);$('resetStorageBtn').addEventListener('click',resetStorage);
