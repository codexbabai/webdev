
const products = [
    { id: 1, name: "Fresh Apples", category: "Fruits", unit: "1 kg", price: 180, old: 210, emoji: "🍎", tag: "BESTSELLER" },
    { id: 2, name: "Bananas", category: "Fruits", unit: "1 dozen", price: 60, old: 75, emoji: "🍌" },
    { id: 3, name: "Sweet Oranges", category: "Fruits", unit: "1 kg", price: 95, old: 120, emoji: "🍊" },
    { id: 4, name: "Fresh Grapes", category: "Fruits", unit: "500 g", price: 85, old: 100, emoji: "🍇" },
    { id: 5, name: "Tomatoes", category: "Vegetables", unit: "1 kg", price: 35, old: 45, emoji: "🍅", tag: "DEAL" },
    { id: 6, name: "Broccoli", category: "Vegetables", unit: "1 piece", price: 55, old: 65, emoji: "🥦" },
    { id: 7, name: "Carrots", category: "Vegetables", unit: "500 g", price: 30, old: 40, emoji: "🥕" },
    { id: 8, name: "Potatoes", category: "Vegetables", unit: "1 kg", price: 32, old: 38, emoji: "🥔" },
    { id: 9, name: "Fresh Milk", category: "Dairy", unit: "1 litre", price: 62, old: 68, emoji: "🥛" },
    { id: 10, name: "Cheese Slices", category: "Dairy", unit: "200 g", price: 120, old: 140, emoji: "🧀" },
    { id: 11, name: "Farm Eggs", category: "Dairy", unit: "6 pieces", price: 48, old: 54, emoji: "🥚" },
    { id: 12, name: "Butter", category: "Dairy", unit: "100 g", price: 58, old: 65, emoji: "🧈" },
    { id: 13, name: "Potato Chips", category: "Snacks", unit: "Pack", price: 20, old: 25, emoji: "🥔" },
    { id: 14, name: "Chocolate Cookies", category: "Snacks", unit: "200 g", price: 75, old: 90, emoji: "🍪" },
    { id: 15, name: "Mixed Nuts", category: "Snacks", unit: "200 g", price: 160, old: 190, emoji: "🥜" },
    { id: 16, name: "Orange Juice", category: "Beverages", unit: "1 litre", price: 110, old: 130, emoji: "🧃" },
    { id: 17, name: "Whole Wheat Bread", category: "Bakery", unit: " loaf", price: 45, old: 50, emoji: "🍞" },
    { id: 18, name: "Croissants", category: "Bakery", unit: "2 pieces", price: 85, old: 100, emoji: "🥐" }
];
const categories = [{ name: "All", emoji: "🛍️" }, { name: "Fruits", emoji: "🍎" }, { name: "Vegetables", emoji: "🥦" }, { name: "Dairy", emoji: "🥛" }, { name: "Snacks", emoji: "🍪" }, { name: "Bakery", emoji: "🥐" }];
let activeCategory = "All", cart = {};
const money = n => "₹" + n.toLocaleString("en-IN");
function renderCategories() {
    document.getElementById("categoryList").innerHTML = categories.map(c => `<button class="category ${activeCategory === c.name ? 'active' : ''}" onclick="showCategory('${c.name}')"><span class="emoji">${c.emoji}</span><strong>${c.name === "All" ? "All groceries" : c.name}</strong></button>`).join("");
}
function renderProducts() {
    const q = document.getElementById("searchInput").value.trim().toLowerCase();
    let list = products.filter(p => (activeCategory === "All" || p.category === activeCategory) && (`${p.name} ${p.category}`.toLowerCase().includes(q)));
    const sort = document.getElementById("sortSelect").value;
    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    if (sort === "Name: A to Z") list.sort((a, b) => a.name.localeCompare(b.name));
    document.getElementById("resultCount").textContent = `Showing ${list.length} product${list.length === 1 ? "" : "s"}`;
    document.getElementById("productGrid").innerHTML = list.length ? list.map(p => `<article class="product"><div class="product-art">${p.emoji}</div>${p.tag ? `<span class="tag">${p.tag}</span>` : ""}<h3>${p.name}</h3><div class="unit">${p.unit} · ${p.category}</div><div class="price-row"><div><span class="price">${money(p.price)}</span><span class="old">${money(p.old)}</span></div><button class="add" onclick="addToCart(${p.id})">ADD +</button></div></article>`).join("") : `<div class="empty">No products found. Try another search.</div>`;
}
function showCategory(name) { activeCategory = name; renderCategories(); renderProducts(); document.getElementById("products").scrollIntoView({ behavior: "smooth" }); }
function scrollToProducts() { document.getElementById("products").scrollIntoView({ behavior: "smooth" }); }
function addToCart(id) { cart[id] = (cart[id] || 0) + 1; renderCart(); }
function changeQty(id, delta) { cart[id] = (cart[id] || 0) + delta; if (cart[id] <= 0) delete cart[id]; renderCart(); }
function renderCart() {
    const entries = Object.entries(cart); const count = entries.reduce((s, [, q]) => s + q, 0);
    document.getElementById("cartCount").textContent = count;
    document.getElementById("cartItems").innerHTML = entries.length ? entries.map(([id, q]) => { const p = products.find(x => x.id === Number(id)); return `<div class="cart-item"><span class="cart-emoji">${p.emoji}</span><div class="cart-info"><strong>${p.name}</strong><small>${money(p.price)} · ${p.unit}</small><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${q}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><strong>${money(p.price * q)}</strong></div>` }).join("") : `<div class="empty">Your cart is empty.<br>Start adding fresh groceries!</div>`;
    document.getElementById("cartTotal").textContent = money(entries.reduce((s, [id, q]) => s + products.find(p => p.id === Number(id)).price * q, 0));
}
function toggleCart(open) { document.getElementById("cartPanel").classList.toggle("open", open); document.getElementById("overlay").classList.toggle("show", open); }
document.getElementById("openCart").onclick = () => toggleCart(true);
document.getElementById("closeCart").onclick = () => toggleCart(false);
document.getElementById("overlay").onclick = () => toggleCart(false);
document.getElementById("searchInput").addEventListener("input", renderProducts);
document.getElementById("searchBtn").onclick = renderProducts;
document.getElementById("sortSelect").addEventListener("change", renderProducts);
document.getElementById("checkoutBtn").onclick = () => alert(Object.keys(cart).length ? "Thanks for trying FreshKart! This is a demo checkout." : "Your cart is empty. Add some groceries first.");
renderCategories(); renderProducts(); renderCart();
