// carrito.js - renderiza el carrito desde localStorage (lp_cart)
(function(){
  const CART_KEY = 'lp_cart';
  const list = document.getElementById('cartItems');
  const placeholder = document.getElementById('cartPlaceholder');
  const totalPriceEl = document.getElementById('totalPrice');

  function readCart(){
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch(e){ return []; }
  }

  function formatPrice(raw){
    // raw may be like 'Precio: $10.49' or '$10.49' - try to extract number
    if (!raw) return '$0.00';
    const m = raw.match(/\$\s*([0-9.,]+)/);
    const val = m ? parseFloat(m[1].replace(/,/g,'')) : NaN;
    if (isNaN(val)) return raw;
    return '$' + val.toFixed(2);
  }

  function render(){
    const items = readCart();
    if (!list || !placeholder || !totalPriceEl) return;
    list.innerHTML = '';
    if (!items || items.length === 0) {
      placeholder.hidden = false;
      list.hidden = true;
      totalPriceEl.textContent = '$0.00';
      return;
    }
    placeholder.hidden = true;
    list.hidden = false;
    let total = 0;
    items.forEach(it => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '12px';
      li.style.padding = '8px 0';

      const img = document.createElement('img');
      img.src = it.image || 'https://via.placeholder.com/96x54.png?text=IMG';
      img.alt = it.title || 'Juego';
      img.width = 96; img.height = 54;
      img.style.imageRendering = 'pixelated';

      const info = document.createElement('div');
      info.style.flex = '1';
      info.innerHTML = `<div style="font-weight:bold">${it.title}</div><div style="font-size:12px;color:#bbb">${it.price}</div>`;

      const qty = document.createElement('div');
      qty.textContent = `x${it.qty||1}`;

      const remove = document.createElement('button');
      remove.textContent = 'Quitar';
      remove.className = 'pixel-btn remove-btn';
      remove.addEventListener('click', ()=>{
        removeItem(it.id);
      });

      li.appendChild(img);
      li.appendChild(info);
      li.appendChild(qty);
      li.appendChild(remove);
      list.appendChild(li);

      // compute total
      const m = (it.price||'').match(/\$\s*([0-9.,]+)/);
      const p = m ? parseFloat(m[1].replace(/,/g,'')) : 0;
      total += (p * (it.qty||1));
    });
    totalPriceEl.textContent = '$' + (total.toFixed(2));
  }

  function removeItem(id){
    let items = readCart();
    items = items.filter(i=>i.id !== id);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    render();
  }

  // render on load
  document.addEventListener('DOMContentLoaded', render);
  // also expose for manual calls
  window.lpRenderCart = render;
})();
