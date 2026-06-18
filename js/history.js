document.addEventListener("DOMContentLoaded", () => {
  renderHistoryPage();
});

function renderHistoryPage() {
  const historyContainer = document.getElementById("historyContainer");
  if (!historyContainer) return;

  const currentUserStr = localStorage.getItem("currentUser");
  if (!currentUserStr) {
    historyContainer.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-user-lock"></i>
                <p>Silakan login terlebih dahulu untuk melihat riwayat pesanan Anda.</p>
                <a href="login.html" class="btn-belanja">Login Sekarang</a>
            </div>
        `;
    return;
  }

  const currentUser = JSON.parse(currentUserStr);
  const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

  // Filter data agar hanya memunculkan pesanan milik akun yang sedang login saja
  const userOrders = orderHistory.filter(
    (order) => order.username === currentUser.username,
  );

  if (userOrders.length === 0) {
    historyContainer.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-receipt"></i>
                <p>Anda belum pernah melakukan pemesanan.</p>
                <a href="products.html" class="btn-belanja">Mulai Belanja</a>
            </div>
        `;
    return;
  }

  let historyHTML = "";

  userOrders.forEach((order) => {
    // Tentukan kelas CSS badge berdasarkan isi teks statusnya
    let badgeClass = "status-proses";
    if (order.status === "Dalam Pengiriman") badgeClass = "status-antar";
    if (order.status === "Selesai") badgeClass = "status-selesai";

    let itemsHTML = "";
    order.items.forEach((item) => {
      itemsHTML += `
                <div class="product-row">
                    <div class="product-info">
                        <img src="${item.image || "https://via.placeholder.com/80"}" class="product-img">
                        <div>
                            <div class="product-name">${item.name}</div>
                            <div class="product-qty">Jumlah: ${item.qty} pcs</div>
                        </div>
                    </div>
                    <div class="product-price">Rp ${(item.price * item.qty).toLocaleString("id-ID")}</div>
                </div>
            `;
    });

    historyHTML += `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <span class="order-id">${order.idOrder}</span>
                        <div class="order-date">${order.tanggal}</div>
                    </div>
                    <div>
                        <span class="status-badge ${badgeClass}">${order.status}</span>
                        <br>
                        <button class="btn-simulasi" onclick="simulasiUbahStatus('${order.idOrder}')">
                            <i class="fas fa-sync-alt"></i> Ubah Status (Simulasi)
                        </button>
                    </div>
                </div>
                
                <div class="order-body">
                    ${itemsHTML}
                </div>
                
                <div class="order-footer">
                    <div class="delivery-info">
                        <strong>Metode:</strong> ${order.deliveryMethod}<br>
                        <strong>Tujuan/Ket:</strong> ${order.alamat}
                    </div>
                    <div class="total-pay">
                        Total Bayar: <br><span>Rp ${order.total.toLocaleString("id-ID")}</span>
                    </div>
                </div>
            </div>
        `;
  });

  historyContainer.innerHTML = historyHTML;
}

// FUNGSI SIMULASI UNTUK MENGUBAH STATUS PESANAN DI SISI CLIENT
function simulasiUbahStatus(idOrder) {
  let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

  orderHistory = orderHistory.map((order) => {
    if (order.idOrder === idOrder) {
      if (order.status === "Sedang Diproses") {
        order.status = "Dalam Pengiriman";
      } else if (order.status === "Dalam Pengiriman") {
        order.status = "Selesai";
      } else {
        order.status = "Sedang Diproses";
      }
    }
    return order;
  });

  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
  renderHistoryPage(); // Gambar ulang halaman riwayat secara instan
}
