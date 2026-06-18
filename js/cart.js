// ===================================================
// INVENTARISASI & BADGE KERANJANG BELANJA
// ===================================================
// PERBAIKAN 1: Fitur Self-Healing untuk membersihkan data rusak di localStorage
let rawCart = JSON.parse(localStorage.getItem("cart")) || [];
let cart = rawCart.filter((item) => item && item.name && item.price); // Hanya simpan item yang valid

// Jika ada data rusak yang dihapus, langsung perbarui localStorage
if (cart.length !== rawCart.length) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartBadge() {
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) {
    cartCountEl.innerText = cart.length;
  }
}
updateCartBadge();

// ===================================================
// RENDER NAVBAR DINAMIS & HIGHLIGHT HALAMAN AKTIF
// ===================================================
function renderNavbar() {
  const navMenu = document.getElementById("navMenu");
  if (!navMenu) return;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const existingAuth = navMenu.querySelectorAll(".auth-link");
  existingAuth.forEach((el) => el.remove());

  if (currentUser) {
    navMenu.insertAdjacentHTML(
      "beforeend",
      `
            <li class="auth-link">
                <a href="history.html" style="font-weight: 600;">
                    <i class="fas fa-history"></i>
                </a>
            </li>
            <li class="auth-link" style="font-weight: 600; color: #2e7d32; cursor: default; display: flex; align-items: center; gap: 5px;">
                <i class="fas fa-user"></i> Halo, ${currentUser.nama}
            </li>
            <li class="auth-link">
                <a href="#" onclick="logoutUser(event)" style="color: red !important; font-weight: 600;">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </li>
        `,
    );
  } else {
    navMenu.insertAdjacentHTML(
      "beforeend",
      `
            <li class="auth-link">
                <a href="login.html" style="font-weight: 600;">
                    <i class="fas fa-sign-in-alt"></i> Login
                </a>
            </li>
        `,
    );
  }

  let currentPath = window.location.pathname.split("/").pop();
  if (currentPath === "" || currentPath === "index") {
    currentPath = "index.html";
  }

  const navLinks = navMenu.querySelectorAll("li a");
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (currentPath === linkHref) {
      link.classList.add("active-link");
    } else if (linkHref !== "#") {
      link.classList.remove("active-link");
    }
  });
}

function logoutUser(e) {
  e.preventDefault();
  if (confirm("Apakah Anda yakin ingin logout dari Lambanapu Mart?")) {
    localStorage.removeItem("currentUser");
    window.location.reload();
  }
}

// ===================================================
// RENDER PRODUK DAN METODE PENGAMBILAN OTOMATIS
// ===================================================
function renderCartPage() {
  const cartContainer =
    document.getElementById("cartItems") ||
    document.querySelector(".shopping-cart > div:first-child") ||
    document.querySelector(".shopping-cart");

  // PERBAIKAN 2: Hapus pengecekan nama file "cart.html" agar lebih fleksibel
  // Cukup pastikan elemen HTML tempat menaruh produknya tersedia di halaman tersebut.
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; background: #fff; border-radius: 15px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <i class="fas fa-shopping-basket" style="font-size: 50px; color: #ccc; margin-bottom: 15px;"></i>
                <p style="color: #666; font-size: 16px;">Keranjang belanja Anda masih kosong.</p>
                <a href="products.html" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #2e7d32; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Belanja Sekarang</a>
            </div>
        `;
    updateSummaryDOM(0);
    return;
  }

  let cartHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    // PERBAIKAN 3: Konversi paksa ke angka agar tidak error jika format data kacau
    const itemPrice = Number(item.price) || 0;
    const itemQty = Number(item.qty) || 1;
    const itemTotal = itemPrice * itemQty;

    subtotal += itemTotal;

    cartHTML += `
            <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; padding: 15px; border-bottom: 1px solid #eee; background: #fff; margin-bottom: 10px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${item.image || "https://via.placeholder.com/80"}" style="width: 65px; height: 65px; object-fit: cover; border-radius: 8px;">
                    <div>
                        <h4 style="margin: 0 0 5px 0; color: #333; font-size: 16px;">${item.name}</h4>
                        <p style="margin: 0; color: #2e7d32; font-weight: 600; font-size: 14px;">Rp ${itemPrice.toLocaleString("id-ID")} <span style="color:#888; font-weight:400;">x ${itemQty}</span></p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-weight: 700; color: #333; font-size: 15px;">Rp ${itemTotal.toLocaleString("id-ID")}</span>
                    <button onclick="removeCartItem(${index})" style="background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 16px; padding: 5px;">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
  });

  const oldElements = cartContainer.querySelectorAll(
    ".cart-item, div[style*='text-align: center']",
  );
  oldElements.forEach((el) => el.remove());
  cartContainer.insertAdjacentHTML("afterbegin", cartHTML);
  updateSummaryDOM(subtotal);
}

// PERBAIKAN & PENAMBAHAN INPUTAN ALAMAT DINAMIS
// ===================================================
// PEMBARUAN TAMPILAN PENGIRIMAN & RINGKASAN HARGA
// ===================================================
function updateSummaryDOM(subtotal) {
  // 1. Tangkap elemen HTML menggunakan ID yang pasti
  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");

  const deliveryContainer = document.getElementById("deliveryContainer");
  const addressContainer = document.getElementById("addressContainer");

  // Jika keranjang kosong, setel semua ke 0 dan sembunyikan form
  if (subtotal === 0) {
    if (subtotalEl) subtotalEl.innerText = "Rp 0";
    if (shippingEl) shippingEl.innerText = "Rp 0";
    if (totalEl) totalEl.innerText = "Rp 0";
    if (addressContainer) addressContainer.style.display = "none";
    return;
  }

  // 2. Munculkan opsi pengantaran & Update label teks berdasarkan subtotal
  if (deliveryContainer) {
    deliveryContainer.style.display = "block";

    // Cari teks di sebelah tombol radio 'delivery' untuk ubah teks promonya
    const deliveryLabel = document.querySelector(
      'input[name="delivery"][value="delivery"]',
    ).nextElementSibling.nextSibling;
    if (subtotal >= 50000) {
      deliveryLabel.textContent = " (Gratis Ongkir 🎉)";
    } else {
      deliveryLabel.textContent = " (Ongkir Rp 15.000)";
    }
  }

  // 3. Cek pilihan radio button saat ini
  const selectedDelivery = document.querySelector(
    'input[name="delivery"]:checked',
  );
  const deliveryMethod = selectedDelivery ? selectedDelivery.value : "pickup";

  let shipping = 0;

  // 4. Logika Buka/Tutup Form Alamat & Penentuan Harga Ongkir
  if (deliveryMethod === "delivery") {
    if (addressContainer) addressContainer.style.display = "block"; // Munculkan form alamat
    shipping = subtotal < 50000 ? 15000 : 0;
  } else {
    if (addressContainer) addressContainer.style.display = "none"; // Sembunyikan form alamat
    shipping = 0;
  }

  // 5. Tulis harga langsung ke dalam DOM
  const total = subtotal + shipping;

  if (subtotalEl)
    subtotalEl.innerText = "Rp " + subtotal.toLocaleString("id-ID");
  if (shippingEl)
    shippingEl.innerText = "Rp " + shipping.toLocaleString("id-ID");
  if (totalEl) totalEl.innerText = "Rp " + total.toLocaleString("id-ID");
}

// Event Listener agar setiap kali Radio Button diklik, fungsi hitung harga berjalan otomatis
document.addEventListener("DOMContentLoaded", () => {
  const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
  deliveryRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      // Hitung subtotal
      let currentSubtotal = 0;
      cart.forEach((item) => {
        currentSubtotal += (Number(item.price) || 0) * (Number(item.qty) || 1);
      });
      // Panggil ulang update UI
      updateSummaryDOM(currentSubtotal);
    });
  });
});

function setPricesInDOM(subtotal, shipping, total) {
  const allPrices = document.querySelectorAll("div, span, p, td");
  allPrices.forEach((el) => {
    if (el.innerText === "Rp 0" || el.innerText.startsWith("Rp ")) {
      if (
        el.previousElementSibling &&
        el.previousElementSibling.innerText.includes("Subtotal")
      ) {
        el.innerText = "Rp " + subtotal.toLocaleString("id-ID");
      } else if (
        el.previousElementSibling &&
        el.previousElementSibling.innerText.includes("Ongkir")
      ) {
        el.innerText = "Rp " + shipping.toLocaleString("id-ID");
      } else if (
        el.previousElementSibling &&
        el.previousElementSibling.innerText.includes("Total")
      ) {
        el.innerText = "Rp " + total.toLocaleString("id-ID");
      }
    }
  });
}

function removeCartItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartPage();
}

// ===================================================
// PROTEKSI CHECKOUT: VALIDASI DATA DAN DATA FINAL
// ===================================================
function checkout() {
  const currentUserStr = localStorage.getItem("currentUser");
  if (!currentUserStr) {
    alert(
      "Maaf, Anda harus daftar akun atau login terlebih dahulu untuk melakukan checkout pesanan!",
    );
    window.location.href = "login.html";
    return;
  }

  if (cart.length === 0) {
    alert("Keranjang belanja Anda masih kosong!");
    return;
  }

  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += (Number(item.price) || 0) * (Number(item.qty) || 1);
  });

  const selectedDelivery = document.querySelector(
    'input[name="delivery"]:checked',
  );
  const deliveryMethod = selectedDelivery ? selectedDelivery.value : "pickup";

  let shipping = 0;
  let infoPengiriman = "Ambil Sendiri di Toko";

  if (deliveryMethod === "delivery") {
    // Gunakan ID asli dari file cart.html Anda
    const alamatInput = document.getElementById("alamat");
    const namaInput = document.getElementById("nama");
    const teleponInput = document.getElementById("telepon");

    if (!alamatInput || alamatInput.value.trim() === "") {
      alert("Silakan isi alamat pengiriman lengkap Anda terlebih dahulu!");
      if (alamatInput) alamatInput.focus();
      return;
    }

    // Gabungkan nama, telepon, dan alamat menjadi satu informasi utuh
    infoPengiriman = `${namaInput ? namaInput.value : ""} - ${teleponInput ? teleponInput.value : ""} (${alamatInput.value.trim()})`;
  }

  if (subtotal < 50000) {
    if (deliveryMethod === "delivery") {
      shipping = 15000;
    }
  }

  let total = subtotal + shipping;

  const selectedPayment = document.querySelector(
    'input[name="payment"]:checked',
  );
  const paymentMethod = selectedPayment
    ? selectedPayment.value
    : "Transfer Bank";

  const currentUser = JSON.parse(currentUserStr);

  const orderDetails = {
    idOrder: "LMBN-" + Date.now(),
    tanggal: new Date().toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    username: currentUser.username,
    nama: currentUser.nama,
    alamat: infoPengiriman,
    deliveryMethod:
      deliveryMethod === "delivery"
        ? "Diantar ke Rumah"
        : "Ambil Sendiri di Toko",
    paymentMethod: paymentMethod,
    items: [...cart],
    subtotal: subtotal,
    shipping: shipping,
    total: total,
    status: "Sedang Diproses",
  };

  let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
  orderHistory.unshift(orderDetails);
  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

  localStorage.setItem("latestOrder", JSON.stringify(orderDetails));

  // ===================================================
  // LOGIKA BARU: PENGURANGAN STOK PRODUK
  // ===================================================
  // 1. Ambil data master produk dari localStorage
  let masterProducts =
    JSON.parse(localStorage.getItem("productsInventory")) || [];

  // 2. Looping setiap barang yang ada di keranjang
  cart.forEach((cartItem) => {
    // Cari index produk di master data berdasarkan ID
    const productIndex = masterProducts.findIndex((p) => p.id === cartItem.id);

    // Jika ketemu, kurangi stoknya dengan qty pesanan
    if (productIndex > -1) {
      masterProducts[productIndex].stock -= cartItem.qty;

      // Safety net: Pastikan stok tidak menjadi minus
      if (masterProducts[productIndex].stock < 0) {
        masterProducts[productIndex].stock = 0;
      }
    }
  });

  // 3. Simpan kembali data produk yang stoknya sudah berkurang ke localStorage
  localStorage.setItem("productsInventory", JSON.stringify(masterProducts));
  // ===================================================

  // Bersihkan data keranjang belanja saat ini
  localStorage.removeItem("cart");

  alert("Mempersiapkan rincian pembayaran Anda...");
  window.location.href = "payment.html";
}

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderCartPage();
});
