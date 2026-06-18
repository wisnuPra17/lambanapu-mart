// ===================================================
// DATA INVENTARIS PRODUK LAMBANAPU MART
// ===================================================
const initialProducts = [
  {
    id: 1,
    name: "Daun Kemangi",
    category: "sayur",
    price: 5000,
    stock: 50,
    image: "assets/images/produk/kemangi.jpeg",
  },
  {
    id: 2,
    name: "Terong",
    category: "sayur",
    price: 7000,
    stock: 40,
    image: "assets/images/produk/terong.jpeg",
  },
  {
    id: 3,
    name: "Sayur Sawi",
    category: "sayur",
    price: 6000,
    stock: 40,
    image: "assets/images/produk/sawi.jpeg",
  },
  {
    id: 4,
    name: "Kangkung",
    category: "sayur",
    price: 5000,
    stock: 60,
    image: "assets/images/produk/kangkung.jpg",
  },
  {
    id: 5,
    name: "Bunga Pepaya",
    category: "sayur",
    price: 8000,
    stock: 30,
    image: "assets/images/produk/bunga pepaya.jpeg",
  },
  {
    id: 6,
    name: "Daun Ubi",
    category: "sayur",
    price: 5000,
    stock: 50,
    image: "assets/images/produk/daun singkong.jpeg",
  },
  {
    id: 7,
    name: "Kacang Panjang",
    category: "sayur",
    price: 9000,
    stock: 35,
    image: "assets/images/produk/kacang panjang.jpeg",
  },
  {
    id: 8,
    name: "Kacang Hijau",
    category: "sayur",
    price: 12000,
    stock: 20,
    image: "assets/images/produk/kacang hijau.jpeg",
  },
  {
    id: 9,
    name: "Bayam",
    category: "sayur",
    price: 5000,
    stock: 40,
    image: "assets/images/produk/bayam.jpeg",
  },
  {
    id: 10,
    name: "Patola",
    category: "sayur",
    price: 7000,
    stock: 25,
    image: "assets/images/produk/patola.jpg",
  },
  {
    id: 11,
    name: "Pisang Merah",
    category: "buah",
    price: 20000,
    stock: 30,
    image: "assets/images/produk/pisang merah.jpg",
  },
  {
    id: 12,
    name: "Buah Sukun",
    category: "buah",
    price: 15000,
    stock: 20,
    image: "assets/images/produk/sukun.jpg",
  },
  {
    id: 13,
    name: "Buah Nangka",
    category: "buah",
    price: 35000,
    stock: 15,
    image: "assets/images/produk/nangka.jpeg",
  },
  {
    id: 14,
    name: "Kelapa",
    category: "buah",
    price: 12000,
    stock: 40,
    image: "assets/images/produk/kelapa.jpeg",
  },
  {
    id: 15,
    name: "Jeruk Nipis",
    category: "buah",
    price: 18000,
    stock: 35,
    image: "assets/images/produk/jeruk nipis.jpeg",
  },
  {
    id: 16,
    name: "Mangga",
    category: "buah",
    price: 25000,
    stock: 20,
    image: "assets/images/produk/mangga.jpeg",
  },
  {
    id: 17,
    name: "Buah Paria",
    category: "buah",
    price: 10000,
    stock: 30,
    image: "assets/images/produk/pria.jpeg",
  },
  {
    id: 18,
    name: "Bawang Merah",
    category: "rempah",
    price: 30000,
    stock: 20,
    image: "assets/images/produk/bawang merah.jpeg",
  },
  {
    id: 19,
    name: "Lombok",
    category: "rempah",
    price: 25000,
    stock: 25,
    image: "assets/images/produk/lombok.jpeg",
  },
  {
    id: 20,
    name: "Lengkuas",
    category: "rempah",
    price: 15000,
    stock: 20,
    image: "assets/images/produk/lengkuas.jpg",
  },
  {
    id: 21,
    name: "Sirih",
    category: "rempah",
    price: 10000,
    stock: 30,
    image: "assets/images/produk/daun sirih.jpeg",
  },
  {
    id: 22,
    name: "Pinang",
    category: "rempah",
    price: 12000,
    stock: 20,
    image: "assets/images/produk/pinang.jpg",
  },
  {
    id: 23,
    name: "Jagung Manis",
    category: "pertanian",
    price: 15000,
    stock: 50,
    image: "assets/images/produk/jagung manis.jpeg",
  },
  {
    id: 24,
    name: "Padi",
    category: "pertanian",
    price: 80000,
    stock: 15,
    image: "assets/images/produk/padi.jpeg",
  },
  {
    id: 25,
    name: "Labu Jepang",
    category: "pertanian",
    price: 18000,
    stock: 25,
    image: "assets/images/produk/labu jepang.jpg",
  },
  {
    id: 26,
    name: "Budidaya Ikan Air Tawar",
    category: "peternakan",
    price: 50000,
    stock: 10,
    image: "assets/images/produk/ikan air tawar.jpg",
  },
  {
    id: 27,
    name: "Kambing",
    category: "peternakan",
    price: 2500000,
    stock: 5,
    image: "assets/images/produk/kambing.jpeg",
  },
  {
    id: 28,
    name: "Kain Tenun Kambera",
    category: "kerajinan",
    price: 5000000,
    stock: 10,
    image: "assets/images/produk/kain tenun.jpeg",
  },
  {
    id: 29,
    name: "Gedeg",
    category: "kerajinan",
    price: 80000,
    stock: 20,
    image: "assets/images/produk/gedeg.jpg",
  },
  {
    id: 30,
    name: "Tirai Bambu",
    category: "kerajinan",
    price: 120000,
    stock: 15,
    image: "assets/images/produk/tirai bambu.jpg",
  },
  {
    id: 32,
    name: "Bambu",
    category: "kerajinan",
    price: 30000,
    stock: 40,
    image: "assets/images/produk/bambu.jpeg",
  },
  {
    id: 33,
    name: "Pasir Kali",
    category: "material",
    price: 150000,
    stock: 50,
    image: "assets/images/produk/pasir kali.jpeg",
  },
  {
    id: 34,
    name: "Batu Kerikil",
    category: "material",
    price: 120000,
    stock: 50,
    image: "assets/images/produk/batu kerikil.jpeg",
  },
];
// PERBAIKAN: Menggunakan variabel 'products' global yang sudah dibuat di js/cart.js. Load dari localStorage. Jika kosong, gunakan initialProducts lalu simpan.
let products = JSON.parse(localStorage.getItem("productsInventory"));

if (!products || products.length === 0) {
  products = initialProducts;
  localStorage.setItem("productsInventory", JSON.stringify(products));
}

// PERBAIKAN: Menggunakan variabel 'cart' global yang sudah dibuat di js/cart.js
// (Menghapus baris deklarasi ulang 'let cart = ...')
const grid = document.getElementById("productsGrid");

// Fungsi Menampilkan Produk Berdasarkan Kategori
function renderProducts(category = "all") {
  if (!grid) return;
  grid.innerHTML = "";

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  filtered.forEach((product) => {
    grid.innerHTML += `
                <div class="product-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="price">Rp ${product.price.toLocaleString("id-ID")}</div>
                        <div class="stock">Stok : ${product.stock}</div>
                        <div class="qty-box">
                            <button class="qty-btn" onclick="changeQty(${product.id},-1)">-</button>
                            <input type="text" value="1" id="qty-${product.id}" class="qty-value" readonly>
                            <button class="qty-btn" onclick="changeQty(${product.id},1)">+</button>
                        </div>
                        <button class="add-cart" onclick="addToCart(${product.id})">
                            Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            `;
  });
}

// Fungsi Mengatur Jumlah Kuantitas (+ / -)
function changeQty(id, val) {
  // 1. Cari produk berdasarkan id untuk mengetahui maksimal stok
  const product = products.find((p) => p.id === id);
  if (!product) return;

  let input = document.getElementById(`qty-${id}`);
  if (!input) return;

  let qty = parseInt(input.value);
  qty += val;

  // 2. Validasi batas bawah (minimal 1)
  if (qty < 1) {
    qty = 1;
  }
  // 3. Validasi batas atas (maksimal sesuai stok)
  else if (qty > product.stock) {
    qty = product.stock;
    alert(
      `Maksimal pesanan untuk ${product.name} adalah ${product.stock} item.`,
    );
  }

  input.value = qty;
}

// Fungsi Memasukkan Produk ke Dalam Keranjang Belanja
// Fungsi Memasukkan Produk ke Dalam Keranjang Belanja
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const qtyInput = document.getElementById(`qty-${id}`);
  const qty = qtyInput ? parseInt(qtyInput.value) : 1;

  let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingIndex = currentCart.findIndex((item) => item.id === id);

  // 1. Hitung total kuantitas yang akan ada di keranjang jika ditambah
  let predictedTotalQty = qty;
  if (existingIndex > -1) {
    predictedTotalQty += currentCart[existingIndex].qty;
  }

  // 2. Validasi: Tolak jika total di keranjang nantinya melebihi stok
  if (predictedTotalQty > product.stock) {
    alert(
      `Maaf, stok ${product.name} tidak mencukupi. Sisa stok: ${product.stock}.`,
    );
    return; // Hentikan eksekusi, jangan masukkan ke localStorage
  }

  // 3. Lanjutkan jika stok aman
  if (existingIndex > -1) {
    currentCart[existingIndex].qty += qty;
  } else {
    currentCart.push({
      ...product,
      qty,
    });
  }

  localStorage.setItem("cart", JSON.stringify(currentCart));

  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) {
    cartCountEl.innerText = currentCart.length;
  }

  const modal = document.getElementById("cartModal");
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeModal() {
  const modal = document.getElementById("cartModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Logika Pengendali Tombol Kategori Sidebar
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");

  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".category-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.category);
    });
  });
});
