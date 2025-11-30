// script.js - Interacciones: carrusel, filtrado, preview
(() => {
  const offersCarousel = document.getElementById('offersCarousel');
  const offersNav = document.getElementById('offersNav');
  const slides = Array.from(offersCarousel.querySelectorAll('.slide'));
  let current = 0;

  // crear indicadores
  slides.forEach((s,i)=>{
    const b=document.createElement('button');
    b.addEventListener('click',()=>{goTo(i)});
    if(i===0) b.classList.add('active');
    offersNav.appendChild(b);
  });
  const navButtons = Array.from(offersNav.children);

  function goTo(i){
    current = i % slides.length;
    offersCarousel.style.transform = `translateX(-${100*current}%)`;
    navButtons.forEach((b,idx)=>b.classList.toggle('active', idx===current));
  }

  // autoplay
  setInterval(()=>{ goTo((current+1)%slides.length); }, 3500);

  // Datos de ejemplo de catálogo (pueden incluir `img` con ruta o dataURL)
  let games = [
    {img: 'https://images5.alphacoders.com/889/889405.jpg', title:'The Forest', platform:'PC, Consolas', genre:'Aventura / Supervivencia', color:'#ff2d6f', price: '$10.49'},
    {id: 'halo', img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1708091/header.jpg?t=1763578010', title:'Halo Infinite (Campaña)', platform:'PC, Consolas', genre:'Acción', color:'#5be2a1', price: '$14.99'},
    {img: 'https://hb.imgix.net/45c7791532040cbf1aa3cbb6c7bc55eddc71fe4a.jpeg?auto=compress,format&fit=crop&h=353&w=616&s=47ce3445cad514943fd822bbe021f9a2', title:'DOOM', platform:'DISPONIBLE EN TODAS LAS PLATAFORMAS', genre:'Acción', color:'#d28bff', price: '$19.99'},
    {img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/capsule_616x353.jpg?t=1745368462', title:'Half Life', platform:'PC, Consolas', genre:'Aventura', color:'#ffd166', price: '$9.99'},
    {img: 'https://gaming-cdn.com/images/products/13664/616x353/counter-strike-2-pc-juego-steam-cover.jpg?v=1695885435', title:'Counter Strike 2', platform:'PC', genre:'Estrategia', color:'#4dd0e1', price: '$24.99'},
    {img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/440/capsule_616x353.jpg?t=1757348372', title:'Team Fortress 2', platform:'PC', genre:'Acción', color:'#ffd1b3', price: '$4.99'},
    {img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/500/header.jpg', title:'Left 4 Dead', platform:'PC, Consolas', genre:'Acción', color:'#b3ffcf', price: '$7.50'},
  ];

  // Persistencia: si hay catálogo guardado en localStorage, úsalo (permite conservar imágenes subidas)
  try{
    const saved = localStorage.getItem('catalogGames');
    if(saved){
      const parsed = JSON.parse(saved);
      if(Array.isArray(parsed) && parsed.length>0){
        games = parsed;
      }
    }
  }catch(e){ console.warn('No se pudo leer localStorage catalogGames', e); }

  function saveGames(){
    try{ localStorage.setItem('catalogGames', JSON.stringify(games)); }catch(e){ console.warn('No se pudo guardar catálogo', e); }
  }

  const catalogList = document.getElementById('catalogList');
  const previewBox = document.getElementById('previewBox');
  const searchInput = document.getElementById('searchInput');
  const filterSelect = document.getElementById('filterSelect');
  const cartCount = document.getElementById('cartCount');
  const CART_KEY = 'lp_cart';

  function readCart(){
    try{ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }catch(e){ return []; }
  }
  function writeCart(arr){
    try{ localStorage.setItem(CART_KEY, JSON.stringify(arr)); }catch(e){}
  }
  function isInCart(id){ return readCart().some(it=>it.id===id); }
  function addToCart(item){ const c = readCart(); if(!c.some(it=>it.id===item.id)){ c.push(item); writeCart(c); } }
  function removeFromCart(id){ const c = readCart().filter(it=>it.id!==id); writeCart(c); }

  let cart = readCart().length;

  function makeSVG(title,color,width=400,height=240){
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
      <rect width='100%' height='100%' fill='${color}' />
      <g font-family='"Press Start 2P", monospace' fill='#020817' font-size='18' text-anchor='middle'>
        <text x='50%' y='50%' dy='-6' fill='#ffffff' opacity='0.95'>${title}</text>
        <text x='50%' y='65%' font-size='12' fill='#030814' opacity='0.65'>Pixel Edition</text>
      </g>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function slugify(text){
    return String(text).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  }

  function renderCatalog(list){
    catalogList.innerHTML='';
    list.forEach((g,idx)=>{
      const card=document.createElement('div');
      card.className='card';
      // si g.img existe usarla, si no usar SVG placeholder
      // asegurar un id único para el juego
      g.id = g.id || slugify(g.title || ('game-' + idx));
      const thumbSrc = g.img ? g.img : makeSVG(g.title,g.color,320,200);
      card.innerHTML=`
        <div class='thumb' data-img='${thumbSrc}'>
          <img class='thumb-img' src='${thumbSrc}' alt='${g.title} thumbnail' />
        </div>
        <div class='card-info'>
          <div class='card-title'>${g.title}</div>
          <div class='card-meta'>${g.genre} • ${g.platform}</div>
        </div>
        <div style='display:flex;flex-direction:column;gap:6px'>
          <div style='display:flex;gap:6px'>
            <button class='add-btn'>AÑADIR🛒</button>
            <button class='buy-btn'>COMPRAR💳</button>
          </div>
        </div>
      `;
      // make card clickable: navegar a la ficha del juego (por ahora todas apuntan a `product.html`)
      card.setAttribute('role','button');
      card.setAttribute('tabindex','0');
      card.style.cursor = 'pointer';
      card.addEventListener('click', ()=>{
        // mapeo declarativo de páginas por juego (usa g.id generado por slugify)
        const pageMap = {
          'halo': 'product2.html',
          'doom': 'product3.html',
          'half-life': 'product4.html',
          'counter-strike-2': 'product5.html',
          'team-fortress-2': 'product6.html',
          'left-4-dead': 'product7.html'
        };
        try{
          const target = pageMap[g.id] || 'product.html';
          window.location.href = target + '?game=' + encodeURIComponent(g.id);
        }catch(e){
          window.location.href = 'product.html?game=' + encodeURIComponent(g.id);
        }
      });
      card.addEventListener('keypress', (ev)=>{ if(ev.key==='Enter' || ev.key===' ') { ev.preventDefault(); card.click(); } });

      // hover preview
      const thumb = card.querySelector('.thumb');
      thumb.addEventListener('mouseenter', ()=>{
        const src=thumb.dataset.img;
        previewBox.innerHTML = `<img src='${src}' style='max-width:100%;border:6px solid #000;image-rendering:pixelated'/>`;
      });
      thumb.addEventListener('click', ()=>{
        // también mostrar al click en pantallas táctiles
        const src=thumb.dataset.img;
        previewBox.innerHTML = `<img src='${src}' style='max-width:100%;border:6px solid #000;image-rendering:pixelated'/>`;
      });

      // add to cart (evita que el click dispare la navegación del card)
      const addBtn = card.querySelector('.add-btn');
      const gid = g.id;
      addBtn.dataset.id = gid;
      if(isInCart(gid)){
        addBtn.textContent = 'EN CARRITO';
        addBtn.classList.add('in-cart');
      }
      addBtn.addEventListener('click', (e)=>{
        e.stopPropagation();
        if(isInCart(gid)){
          // quitar del carrito
          removeFromCart(gid);
          cart = readCart().length;
          cartCount.textContent = cart;
          addBtn.textContent = 'AÑADIR';
          addBtn.classList.remove('in-cart');
          card.style.transform='translateY(4px)'; setTimeout(()=>card.style.transform='',120);
          return;
        }
        // agregar al carrito (incluye precio si está definido)
        addToCart({ id: gid, title: g.title, img: thumbSrc, price: g.price || '$0.00' });
        cart = readCart().length;
        cartCount.textContent = cart;
        addBtn.textContent = 'EN CARRITO';
        addBtn.classList.add('in-cart');
        /* feedback pequeño */
        card.style.transform='translateY(-4px)'; setTimeout(()=>card.style.transform='',120);
      });

      // boton COMPRAR: añade al carrito (si no está) y navega a carrito.html
      const buyBtn = card.querySelector('.buy-btn');
      if(buyBtn){
        buyBtn.addEventListener('click', (e)=>{
          e.stopPropagation();
          if(!isInCart(gid)){
            addToCart({ id: gid, title: g.title, img: thumbSrc });
            cart = readCart().length;
            cartCount.textContent = cart;
            // sincronizar el botón AÑADIR
            addBtn.textContent = 'EN CARRITO';
            addBtn.classList.add('in-cart');
          }
          // llevar al carrito para completar la compra
          window.location.href = 'carrito.html';
        });
      }

      // Nota: las miniaturas se generan desde código (makeSVG) o desde `g.img` si existe.

      catalogList.appendChild(card);
    });
  }

  // filtro y busqueda
  function applyFilters(){
    const q = searchInput.value.trim().toLowerCase();
    const f = filterSelect.value;
    const filtered = games.filter(g=>{
      const matchQ = !q || g.title.toLowerCase().includes(q) || g.genre.toLowerCase().includes(q);
      const matchF = !f || g.platform===f;
      return matchQ && matchF;
    });
    renderCatalog(filtered);
  }

  searchInput.addEventListener('input', ()=>applyFilters());
  filterSelect.addEventListener('change', ()=>applyFilters());
  searchInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') applyFilters(); });

  // inicializar
  renderCatalog(games);
  // setear contador inicial y comportamiento del botón del header
  cartCount.textContent = cart;
  const cartBtn = document.getElementById('cartBtn');
  if(cartBtn){
    cartBtn.addEventListener('click', ()=>{ window.location.href = 'carrito.html'; });
  }

  previewBox.textContent = 'Pasa el cursor sobre un juego para ver su imagen';

})();
