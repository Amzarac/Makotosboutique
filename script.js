const categories=[
  ["Women's Fashion","assets/womens-fashion.jpg","Women's fashion"],
  ["Casual Wear","assets/casual-wear.jpg","Women's fashion"],
  ["Ladies Tops","assets/ladies-tops.jpg","Women's fashion"],
  ["Lingerie","assets/lingerie.jpg","Women's fashion"],
  ["Bags & Accessories","assets/bags.jpg","Accessories"],
  ["Baby Wear","assets/baby-wear.jpg","Baby"],
  ["Baby Gear","assets/baby-gear.jpg","Baby"],
  ["Baby Furniture","assets/baby-furniture.jpg","Home"]
];

const products=[
  {id:1,name:"Elegant Pink Mai Dress",cat:"Women's Fashion",img:"assets/womens-fashion.jpg",desc:"A graceful statement look inspired by Makoto's women's collection.",price:"Contact for Price",rating:"★★★★★"},
  {id:2,name:"Sporty Chic Tracksuit",cat:"Women's Fashion",img:"assets/casual-wear.jpg",desc:"Comfortable casual styling for everyday movement and relaxed days.",price:"Contact for Price",rating:"★★★★★"},
  {id:3,name:"Classic Button Top",cat:"Women's Fashion",img:"assets/ladies-tops.jpg",desc:"A polished top for work, events and effortless everyday style.",price:"Contact for Price",rating:"★★★★★"},
  {id:4,name:"Baby Walker",cat:"Baby",img:"assets/baby-gear.jpg",desc:"A playful baby gear option from the Makoto collection.",price:"Contact for Price",rating:"★★★★★"},
  {id:5,name:"Lace Lingerie Set",cat:"Women's Fashion",img:"assets/lingerie.jpg",desc:"Elegant lingerie styling presented in the Makoto visual collection.",price:"Contact for Price",rating:"★★★★★"},
  {id:6,name:"Statement Handbag",cat:"Accessories",img:"assets/bags.jpg",desc:"A polished accessory to complete your look.",price:"Contact for Price",rating:"★★★★★"},
  {id:7,name:"Baby Essentials Set",cat:"Baby",img:"assets/baby-wear.jpg",desc:"Soft baby wear for everyday comfort.",price:"Contact for Price",rating:"★★★★★"},
  {id:8,name:"Nursery Furniture",cat:"Home",img:"assets/baby-furniture.jpg",desc:"Nursery-inspired furniture and home pieces.",price:"Contact for Price",rating:"★★★★★"}
];

const reviews=[
  ["Aminata K.","The quality is amazing. I love my dress so much.","AK"],
  ["Sarah B.","A beautiful place for baby essentials. Everything feels thoughtfully selected.","SB"],
  ["Mariama J.","Great customer service and beautiful collections.","MJ"]
];

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const categoryGrid=$("#categoryGrid"), productGrid=$("#productGrid"), reviewGrid=$("#reviewGrid"), bookingProduct=$("#bookingProduct");

function renderCategories(){
  categoryGrid.innerHTML=categories.map(c=>`<article class="category-card" data-cat="${c[2]}"><img src="${c[1]}" alt="${c[0]}"><div><b>${c[0]}</b><span>Explore →</span></div></article>`).join("");
  $$(".category-card").forEach(card=>card.addEventListener("click",()=>filterProducts(card.dataset.cat)));
}

function renderProducts(filter="All",query=""){
  let list=products.filter(p=>(filter==="All"||p.cat===filter||((filter==="Home")&&p.cat==="Home")) && (!query || `${p.name} ${p.cat} ${p.desc}`.toLowerCase().includes(query.toLowerCase())));
  productGrid.innerHTML=list.length?list.map(p=>`<article class="product-card">
    <div class="product-img"><img src="${p.img}" alt="${p.name}"><span class="badge">Featured</span><button class="heart" aria-label="Favorite ${p.name}">♡</button></div>
    <div class="product-info"><span class="cat">${p.cat}</span><h3>${p.name}</h3><div class="rating">${p.rating}</div><div class="price">${p.price}</div><button class="primary-btn view-product" data-id="${p.id}">Request Item</button></div>
  </article>`).join(""):`<div style="grid-column:1/-1;text-align:center;padding:50px;color:#776d74">No products found. Try another search or category.</div>`;
  $$(".view-product").forEach(b=>b.addEventListener("click",()=>openProduct(+b.dataset.id)));
}

function renderReviews(){
  reviewGrid.innerHTML=reviews.map(r=>`<article class="review-card"><div class="review-top"><div><div class="avatar">${r[2]}</div></div><div class="rating">★★★★★</div></div><p>“${r[1]}”</p><small>${r[0]} • Sample/demo review</small></article>`).join("");
}

function populateBooking(){
  bookingProduct.innerHTML='<option value="">Choose a product</option>'+products.map(p=>`<option>${p.name}</option>`).join("");
}

let activeFilter="All";
function filterProducts(f){
  activeFilter=f;
  $$(".filter-chip").forEach(b=>b.classList.toggle("active",b.dataset.filter===f));
  renderProducts(f);
  $("#shop").scrollIntoView({behavior:"smooth"});
}

$$(".filter-chip").forEach(b=>b.addEventListener("click",()=>filterProducts(b.dataset.filter)));

function openProduct(id){
  const p=products.find(x=>x.id===id); if(!p)return;
  $("#modalContent").innerHTML=`<div class="modal-product"><img src="${p.img}" alt="${p.name}"><div><span class="eyebrow">${p.cat}</span><h2>${p.name}</h2><div class="rating">${p.rating}</div><p>${p.desc}</p><p><b>${p.price}</b></p><p>This catalog uses an inquiry-first model. Contact Makoto to confirm availability, final price, sizes and colors.</p><div class="hero-actions"><a class="primary-btn" href="#booking" onclick="closeModal();setTimeout(()=>document.getElementById('bookingProduct').value='${p.name.replace(/'/g,"\\'")}',100)">Request This Item</a><a class="whatsapp-btn" target="_blank" rel="noopener" href="https://wa.me/231777830212?text=${encodeURIComponent("Hello Makoto Clothing Boutique, I am interested in "+p.name+". Please let me know the current price and availability.")}">Ask on WhatsApp</a></div></div></div>`;
  $("#productModal").classList.add("open"); $("#productModal").setAttribute("aria-hidden","false");
}

function closeModal(){ $$(".modal").forEach(m=>{m.classList.remove("open");m.setAttribute("aria-hidden","true")}); }

$("#modalClose").addEventListener("click",closeModal); $("#videoClose").addEventListener("click",closeModal);
$$(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal()}));

$$(".video-card").forEach(v=>v.addEventListener("click",()=>{$("#videoTitle").textContent=v.dataset.videoTitle;$("#videoModal").classList.add("open");}));

$("#searchOpen").addEventListener("click",()=>{$("#searchOverlay").classList.add("open");$("#searchInput").focus()});
$("#searchClose").addEventListener("click",()=>$("#searchOverlay").classList.remove("open"));
$("#searchOverlay").addEventListener("click",e=>{if(e.target.id==="searchOverlay")$("#searchOverlay").classList.remove("open")});
$("#searchInput").addEventListener("input",e=>{
  const q=e.target.value.trim();
  const results=products.filter(p=>(p.name+" "+p.cat+" "+p.desc).toLowerCase().includes(q.toLowerCase())).slice(0,6);
  $("#searchResults").innerHTML=q?results.map(p=>`<div class="search-result" data-id="${p.id}"><img src="${p.img}" alt=""><div><b>${p.name}</b><small>${p.cat}</small></div></div>`).join(""):'<p style="color:#786d74;font-size:12px">Start typing to search the Makoto collection.</p>';
  $$(".search-result").forEach(x=>x.addEventListener("click",()=>{$("#searchOverlay").classList.remove("open");openProduct(+x.dataset.id)}));
});

$("#bookingForm").addEventListener("submit",e=>{
  e.preventDefault(); const fd=new FormData(e.target);
  const msg=`Hello Makoto Clothing Boutique, I submitted an item request.%0A%0AName: ${fd.get("name")}%0APhone: ${fd.get("phone")}%0AProduct: ${fd.get("product")}%0AQuantity: ${fd.get("quantity")}%0ASize: ${fd.get("size")||"Not specified"}%0AColor: ${fd.get("color")||"Not specified"}%0ANotes: ${fd.get("notes")||"None"}`;
  showToast("Request received. Continue on WhatsApp to confirm.");
  window.open("https://wa.me/231777830212?text="+msg,"_blank");
  e.target.reset();
});
$("#bookingWhatsapp").addEventListener("click",()=>{
  const f=new FormData($("#bookingForm"));
  if(!f.get("name")||!f.get("phone")||!f.get("product")){showToast("Please enter your name, phone and product first.");return;}
  const msg=`Hello Makoto Clothing Boutique, I would like to request an item.%0A%0AName: ${f.get("name")}%0APhone: ${f.get("phone")}%0AProduct: ${f.get("product")}%0AQuantity: ${f.get("quantity")}%0ASize: ${f.get("size")||"Not specified"}%0AColor: ${f.get("color")||"Not specified"}%0ANotes: ${f.get("notes")||"None"}`;
  window.open("https://wa.me/231777830212?text="+msg,"_blank");
});

$$("[data-jump-filter]").forEach(a=>a.addEventListener("click",()=>{setTimeout(()=>filterProducts(a.dataset.jumpFilter),250)}));

$("#menuBtn").addEventListener("click",()=>{const n=$("#nav");n.classList.toggle("open");$("#menuBtn").setAttribute("aria-expanded",n.classList.contains("open"))});
$$(".nav a").forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));

window.addEventListener("scroll",()=>$("#siteHeader").classList.toggle("scrolled",scrollY>20));

function showToast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>x.classList.remove("show"),3200)}

$("#year").textContent=new Date().getFullYear();
renderCategories();renderProducts();renderReviews();populateBooking();
