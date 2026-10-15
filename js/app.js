const SUPABASE_URL = "https://tojdxzcxpqyeaaqoysuy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvamR4emN4cHF5ZWFhcW95c3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NTI2ODAsImV4cCI6MjEwNjQyODY4MH0.oK287ZVt1qergcbYHdVxuqn7mNVaKGiP6Kx_ANoWA6A";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


/*const products = [
  { id: 1, name: "Dell Laptop", category: "Computers", price: 3499, stock: 10 },
  { id: 2, name: "HP Desktop", category: "Computers", price: 2899, stock: 7 },
  { id: 3, name: "Lenovo ThinkPad", category: "Computers", price: 4299, stock: 12 },

  { id: 4, name: "Wireless Mouse", category: "Accessories", price: 129, stock: 25 },
  { id: 5, name: "Mechanical Keyboard", category: "Accessories", price: 349, stock: 18 },
  { id: 6, name: "USB-C Hub", category: "Accessories", price: 199, stock: 30 },

  { id: 7, name: "Smartphone", category: "Phones", price: 2499, stock: 0 },
  { id: 8, name: "iPhone 15", category: "Phones", price: 2999, stock: 8 },
  { id: 9, name: "Samsung Galaxy S24", category: "Phones", price: 3199, stock: 14 },

  { id: 10, name: "iPad Air", category: "Tablets", price: 2399, stock: 9 },
  { id: 11, name: "Samsung Galaxy Tab", category: "Tablets", price: 1899, stock: 11 },
  { id: 12, name: "Lenovo Tab P12", category: "Tablets", price: 1499, stock: 6 },

  { id: 13, name: "Dell 24-inch Monitor", category: "Monitors", price: 699, stock: 15 },
  { id: 14, name: "LG UltraWide Monitor", category: "Monitors", price: 1299, stock: 5 },
  { id: 15, name: "Samsung 27-inch Monitor", category: "Monitors", price: 999, stock: 13 },

  { id: 16, name: "Sony WH-1000XM5", category: "Headphones", price: 1299, stock: 10 },
  { id: 17, name: "AirPods Pro", category: "Headphones", price: 899, stock: 20 },
  { id: 18, name: "JBL Tune 760NC", category: "Headphones", price: 399, stock: 16 },

  { id: 19, name: "Apple Watch Series 9", category: "Smartwatches", price: 1599, stock: 7 },
  { id: 20, name: "Samsung Galaxy Watch 6", category: "Smartwatches", price: 999, stock: 12 },
  { id: 21, name: "Huawei Watch GT 4", category: "Smartwatches", price: 799, stock: 9 },

  { id: 22, name: "Canon EOS R50", category: "Cameras", price: 2899, stock: 4 },
  { id: 23, name: "Sony Alpha A6400", category: "Cameras", price: 3299, stock: 6 },
  { id: 24, name: "GoPro HERO12", category: "Cameras", price: 1499, stock: 10 },

  { id: 25, name: "PlayStation 5", category: "Gaming", price: 2099, stock: 5 },
  { id: 26, name: "Xbox Series X", category: "Gaming", price: 1999, stock: 8 },
  { id: 27, name: "Nintendo Switch OLED", category: "Gaming", price: 1399, stock: 12 },
];
*/

function renderProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<p>No products match your search.</p>";
    return;
  }
  list.forEach(prod => {
    const stockLabel = prod.stock === 0 ? "Out of Stock"
      : prod.stock <= 5 ? "Low Stock" : "In Stock";
    container.innerHTML += `
      <div class="product">
        <h3>${prod.name}</h3>
        <p>AED ${prod.price.toLocaleString()}</p>
        <p class="stock">${stockLabel}</p>
        <button ${prod.stock === 0 ? "disabled" : ""}>Add to Cart</button>
      </div>`;
  });
}

async function loadProducts() {
  const { data: products, error } = await supabaseClient
    .from("product")
    .select("*, category(category_name)")
    .order("name");
 
  if (error) {
    document.getElementById("product-list").innerHTML =
      `<p>Could not load products: ${error.message}</p>`;
    return;
  }
  renderProducts(products);
}

loadProducts()

document.getElementById("search-box").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(term)));
});

document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.category;
    renderProducts(cat === "All" ? products : products.filter(p => p.category === cat));
  });
});

document.getElementById("sort-select").addEventListener("change", e => {
  let sorted = [...products];
  if (e.target.value === "low-high") sorted.sort((a, b) => a.price - b.price);
  if (e.target.value === "high-low") sorted.sort((a, b) => b.price - a.price);
  renderProducts(sorted);
});



