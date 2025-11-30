// Carrito: renderiza el carrito leído desde localStorage (clave 'lp_cart').
(function(){
  const CART_KEY = 'lp_cart';
  const cartItemsEl = document.getElementById('cartItems');
  const cartPlaceholder = document.getElementById('cartPlaceholder');
  const totalBox = document.getElementById('totalBox');
  const totalPriceEl = document.getElementById('totalPrice');
  const buyBtn = document.getElementById('buyBtn');

  function readCart(){
    try{ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }catch(e){ console.warn('readCart error', e); return []; }
  }
  function writeCart(arr){ try{ localStorage.setItem(CART_KEY, JSON.stringify(arr)); }catch(e){ console.warn('writeCart error', e);} }

  function parsePrice(p){
    if(!p) return 0;
    if(typeof p === 'number') return p;
    const m = String(p).match(/\$\s*([0-9.,]+)/);
    return m ? parseFloat(m[1].replace(/,/g,'')) : 0;
  }

  function render(){
    if(!cartItemsEl || !cartPlaceholder || !totalBox || !totalPriceEl) return;
    const items = readCart();
    console.log('carrito.render items:', items);
    cartItemsEl.innerHTML = '';
    if(!items || items.length === 0){
      cartItemsEl.hidden = true;
      cartPlaceholder.hidden = false;
      totalBox.hidden = true;
      totalPriceEl.textContent = '$0.00';
      return;
    }

    cartItemsEl.hidden = false;
    cartPlaceholder.hidden = true;
    totalBox.hidden = false;

    let total = 0;
    items.forEach(it => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '12px';
      li.style.padding = '8px 0';

      const img = document.createElement('img');
      img.src = it.image || it.img || it.thumb || 'https://via.placeholder.com/96x54.png?text=IMG';
      img.alt = it.title || 'Juego'; img.width = 96; img.height = 54; img.style.imageRendering = 'pixelated';

      const info = document.createElement('div');
      info.style.flex = '1';
      info.innerHTML = `<div style="font-weight:bold">${it.title||''}</div><div style="font-size:12px;color:#bbb">${it.platform||''}</div><div style="margin-top:4px">${it.price||''}</div>`;

      const qty = document.createElement('div'); qty.textContent = `x${it.qty||1}`;

      const remove = document.createElement('button'); remove.textContent = 'Quitar'; remove.className = 'pixel-btn remove-btn';
      remove.addEventListener('click', ()=>{ removeItem(it.id); });

      li.appendChild(img); li.appendChild(info); li.appendChild(qty); li.appendChild(remove);
      cartItemsEl.appendChild(li);

      total += parsePrice(it.price) * (it.qty||1);
    });

    totalPriceEl.textContent = '$' + total.toFixed(2);
  }

  function removeItem(id){
    const items = readCart();
    const filtered = items.filter(i=>String(i.id)!==String(id));
    writeCart(filtered);
    render();
  }

  if(buyBtn){
    buyBtn.addEventListener('click', (e)=>{
      const items = readCart();
      if(!items || items.length===0){ alert('No hay items en el carrito.'); return; }
      // Redirigir a la página de checkout para completar el pago
      window.location.href = 'checkout.html';
    });
  }

  // re-render when storage changes (other tabs) and on load
  window.addEventListener('storage', (e)=>{ if(e.key==='lp_cart') render(); });
  document.addEventListener('DOMContentLoaded', render);

  // expose for debugging
  window.lpRenderCart = render;

})();
