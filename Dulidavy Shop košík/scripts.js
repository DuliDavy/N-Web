const products = [
    { id: 1, name: "Bezdrátová sluchátka", price: 1200, image: "https://via.placeholder.com/200x150?text=Sluchátka" },
    { id: 2, name: "Smartwatch", price: 1990, image: "https://via.placeholder.com/200x150?text=Smartwatch" },
    { id: 3, name: "Kožená peněženka", price: 850, image: "https://via.placeholder.com/200x150?text=Peněženka" },
  ];
  
  let cart = [];
  
  function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} Eu</p>
        <button onclick="addToCart(${product.id})">Přidat do košíku</button>
      `;
      productList.appendChild(productCard);
    });
  }
  
  function addToCart(productId) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      const product = products.find(p => p.id === productId);
      cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    displayCartItems();
  }
  
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCartItems();
  }
  
  function updateQuantity(productId, newQuantity) {
    const item = cart.find(p => p.id === productId);
    if (item && newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      removeFromCart(productId);
    }
    updateCartCount();
    displayCartItems();
  }
  
  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
  }
  
  function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  
  function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
  
    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Košík je prázdný.</p>';
      document.getElementById('cart-total').innerText = '0 Kč';
      return;
    }
  
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <span>${item.name} - ${item.price} Kč</span>
        <div>
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
          <button onclick="removeFromCart(${item.id})">Odebrat</button>
        </div>
      `;
      cartItems.appendChild(div);
    });
  
    document.getElementById('cart-total').innerText = calculateTotal() + ' Kč';
  }
  
  // MODÁLNÍ KOŠÍK
  const cartModal = document.getElementById('cart-modal');
  const closeCartBtn = document.getElementById('close-cart');
  const cartButton = document.getElementById('cart-button');
  
  cartButton.addEventListener('click', () => {
    cartModal.style.display = 'block';
    displayCartItems();
  });
  
  closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });
  
  window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });
  
  // OBJEDNAT
  document.getElementById('order-button').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Košík je prázdný.');
      return;
    }
    alert('Děkujeme za objednávku!');
    cart = [];
    updateCartCount();
    displayCartItems();
    cartModal.style.display = 'none';
  });
  
  displayProducts();
  