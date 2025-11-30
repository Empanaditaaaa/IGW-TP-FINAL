// js/checkout.js
(function(){

  // 1) Cargar carrito desde localStorage (clave compartida 'lp_cart')
  const CART_KEY = 'lp_cart';
  let state = [];

  function readStorage(){
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.warn('No se pudo leer el carrito:', err);
      return [];
    }
  }

  // inicializar estado
  state = readStorage();

  const cartList = document.getElementById('cartList');
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping'); // puede ser nulo si no existe en la plantilla
  const totalEl = document.getElementById('total');
  const finalizeBtn = document.getElementById('finalizeBtn');
  const buyerForm = document.getElementById('buyerForm');

  function format(n){ return '$' + n.toFixed(2); }

  function parsePrice(p){
    if (!p && p !== 0) return 0;
    if (typeof p === 'number') return p;
    const s = String(p);
    const m = s.match(/([0-9]+(?:[.,][0-9]+)?)/);
    if (!m) return 0;
    return parseFloat(m[1].replace(/,/g, '.'));
  }

  function renderList(){
    cartList.innerHTML = '';

    if (state.length === 0) {
      cartList.innerHTML = `
        <div style="padding:20px;font-size:12px;text-align:center;color:#d8cce6">
          El carrito está vacío.<br>Vuelve a la tienda y selecciona juegos.
        </div>`;
      subtotalEl.textContent = "$0.00";
      if (shippingEl) shippingEl.textContent = "$0.00";
      totalEl.textContent = "$0.00";
      return;
    }

    state.forEach((row, idx) => {
      const div = document.createElement('div');
      div.className = 'cart-row';
      const imgSrc = row.img || row.image || row.thumb || '';
      // mostrar cantidad como texto fijo y un botón "Quitar"
      div.innerHTML = `
        <div class="cart-thumb"><img src="${imgSrc}" alt="${row.title}"></div>
        <div class="cart-info">
          <div class="cart-title">${row.title}</div>
          <div class="cart-meta">Precio: ${format(parsePrice(row.price))}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
          <div style="font-size:12px;color:#d8cce6">x${row.qty || 1}</div>
          <button class="remove-btn" data-idx="${idx}" style="padding:6px 10px;border:3px solid #000;background:var(--orange);cursor:pointer;font-family:'Press Start 2P';">Quitar</button>
          <div class="price">${format(parsePrice(row.price) * (row.qty || 1))}</div>
        </div>
      `;
      cartList.appendChild(div);
    });

    // Botones Quitar
    cartList.querySelectorAll('.remove-btn').forEach(b => b.addEventListener('click', (e) => {
      const i = Number(e.currentTarget.dataset.idx);
      // confirmar antes de quitar (pequeña protección UX)
      const title = state[i] ? state[i].title : 'este item';
      if (!confirm(`Quitar "${title}" del carrito?`)) return;
      state.splice(i, 1);
      saveCart();
      renderTotals();
      renderList();
    }));
  }

  function renderTotals(){
    if (state.length === 0) {
      subtotalEl.textContent = "$0.00";
      if (shippingEl) shippingEl.textContent = "$0.00";
      totalEl.textContent = "$0.00";
      return;
    }

    const subtotal = state.reduce((s,i) => s + parsePrice(i.price) * (i.qty||1), 0);
    const shipping = subtotal > 30 ? 0 : 2.99;
    const total = subtotal + shipping;

    subtotalEl.textContent = format(subtotal);
    if (shippingEl) shippingEl.textContent = format(shipping);
    totalEl.textContent = format(total);
  }

  function saveCart(){
    try{ localStorage.setItem(CART_KEY, JSON.stringify(state));
    }catch(e){ console.warn('saveCart error', e); }
  }

  // responder a cambios en otras pestañas/ventanas
  window.addEventListener('storage', (e)=>{
    if (e.key === CART_KEY) {
      state = readStorage();
      renderList();
      renderTotals();
    }
  });

  renderList();
  renderTotals();

  finalizeBtn.addEventListener('click', (e) => {
    if (state.length === 0)
      return alert('Tu carrito está vacío. Agrega juegos desde la página principal.');

    const form = new FormData(buyerForm);
    if (!form.get('name') || !form.get('email') || !form.get('phone'))
      return alert('Completa los datos del comprador (nombre, email, teléfono).');

    finalizeBtn.disabled = true;
    finalizeBtn.textContent = 'Procesando...';

    setTimeout(() => {
      alert('Pago realizado con éxito. Se envió un comprobante a: ' + form.get('email'));

      // limpiar carrito
      state = [];
      saveCart();
      renderList();
      renderTotals();

      finalizeBtn.textContent = 'Finalizar Pago';
      finalizeBtn.disabled = false;
    }, 900);
  });

})();

// Payment button selection: gold neon border when selected
(function setupPaymentSelection(){
  function init(){
    const visa = document.querySelector('.visa-btn');
    const paypal = document.querySelector('.paypal-btn');
    const buttons = [visa, paypal].filter(Boolean);
    if (buttons.length === 0) return;

    function clearSelected(){ buttons.forEach(b => b.classList.remove('selected')); }

    function getMethodFromBtn(b){
      if (!b) return null;
      if (b.classList.contains('visa-btn')) return 'visa';
      if (b.classList.contains('paypal-btn')) return 'paypal';
      return 'card';
    }

    function setSelectedByMethod(method){
      clearSelected();
      const target = buttons.find(b => getMethodFromBtn(b) === method) || buttons[0];
      if (target) target.classList.add('selected');
    }

    buttons.forEach(b => {
      // ensure button has position context for transform (in case inline styles exist)
      b.style.position = b.style.position || 'relative';
      b.addEventListener('click', (ev) => {
        ev.preventDefault();
        clearSelected();
        b.classList.add('selected');
        const method = getMethodFromBtn(b);
        try{ localStorage.setItem('lp_payment_method', method); }catch(e){}
      });
    });

    // initialize from localStorage
    try{
      const saved = localStorage.getItem('lp_payment_method');
      if (saved) setSelectedByMethod(saved);
      else setSelectedByMethod(getMethodFromBtn(buttons[0]));
    }catch(e){ setSelectedByMethod(getMethodFromBtn(buttons[0])); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();