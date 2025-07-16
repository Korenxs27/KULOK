// Contoh validasi form Checkout
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = form.querySelector("input[name='email']").value;
      const phone = form.querySelector("input[name='phone']").value;

      if (!email || !phone) {
        alert("Mohon lengkapi semua data sebelum checkout.");
        return;
      }

      alert("Checkout berhasil! Data akan dikirim ke admin.");
      // Di sini nanti bisa kamu ganti untuk fetch ke backend PHP
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Fungsi 1: Klik tombol Cart (keranjang) arahkan ke Product.html
  const cartButtons = document.querySelectorAll("button");
  cartButtons.forEach((btn) => {
    if (btn.textContent.trim().toLowerCase().includes("cart")) {
      btn.addEventListener("click", () => {
        window.location.href = "Product.html";
      });
    }
  });

  // Fungsi 2: Di halaman Checkout.html, klik input placeholder → munculkan notifikasi
  if (window.location.pathname.includes("Checkout.html")) {
    const inputs = document.querySelectorAll("input[Place Order]");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        alert("Pesanan siap dikirim");
      });
    });
  }
});
setTimeout(() => {
  const modal = document.getElementById("posterModal");
  if (modal) modal.style.display = "none";
}, 8000);
