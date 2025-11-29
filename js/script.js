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
    {title:'The Forest', platform:'PC, Consolas', genre:'Aventura / Supervivencia', color:'#ff2d6f'},
    {title:'Halo', platform:'PC, Consolas', genre:'Acción', color:'#5be2a1'},
    {title:'DOOM', platform:'DISPONIBLE EN TODAS LAS PLATAFORMAS', genre:'Acción', color:'#d28bff'},
    {title:'Half Life', platform:'PC, Consolas', genre:'Aventura', color:'#ffd166'},
    {title:'Conter Strike', platform:'PC', genre:'Estrategia', color:'#4dd0e1'},
    {title:'Team Fortress 2', platform:'PC', genre:'Acción', color:'#ffd1b3'},
    {title:'Left 4 Dead', platform:'PC, Consolas', genre:'Acción', color:'#b3ffcf'},
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
  let cart = 0;

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

  function renderCatalog(list){
    catalogList.innerHTML='';
    list.forEach((g,idx)=>{
      const card=document.createElement('div');
      card.className='card';
      // si g.img existe usarla, si no usar SVG placeholder
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
          <button class='add-btn'>AÑADIR</button>
          <input type='file' accept='image/*' class='img-uploader' style='display:none' />
          <button class='upload-btn' title='Cargar miniatura'>📁</button>
        </div>
      `;
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

      // add to cart
      card.querySelector('.add-btn').addEventListener('click', ()=>{
        cart++; cartCount.textContent = cart;
        // feedback pequeño
        card.style.transform='translateY(-4px)';
        setTimeout(()=>card.style.transform='',120);
      });

      // upload image: botón y input
      const uploader = card.querySelector('.img-uploader');
      const uploadBtn = card.querySelector('.upload-btn');
      uploadBtn.addEventListener('click', (e)=>{ e.stopPropagation(); uploader.click(); });
      uploader.addEventListener('change', (ev)=>{
        const file = ev.target.files && ev.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = function(loadEvent){
          const dataUrl = loadEvent.target.result;
          // actualizar datos del juego (g es cerradura de este bucle)
          g.img = dataUrl;
          // actualizar DOM miniatura y preview
          const imgEl = card.querySelector('.thumb-img');
          imgEl.src = dataUrl;
          card.querySelector('.thumb').dataset.img = dataUrl;
          previewBox.innerHTML = `<img src='${dataUrl}' style='max-width:100%;border:6px solid #000;image-rendering:pixelated'/>`;
          saveGames();
        };
        reader.readAsDataURL(file);
      });

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
  previewBox.textContent = 'Pasa el cursor sobre un juego para ver su imagen';

})();
