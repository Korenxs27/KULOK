// --- General Modal Functions ---
function showCustomModal(title, message) {
  const modal = document.getElementById("custom-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");

  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.classList.add("open");
}

function hideCustomModal() {
  const modal = document.getElementById("custom-modal");
  modal.classList.remove("open");
}

document
  .getElementById("modal-close-button")
  .addEventListener("click", hideCustomModal);

// --- Hamburger Menu / Sidebar Functionality ---
const hamburgerMenu = document.getElementById("hamburger-menu");
const mobileNav = document.getElementById("mobile-nav");
const sidebarOverlay = document.getElementById("sidebar-overlay");

function toggleSidebar() {
  mobileNav.classList.toggle("open");
  sidebarOverlay.classList.toggle("open");
}

hamburgerMenu.addEventListener("click", toggleSidebar);
sidebarOverlay.addEventListener("click", toggleSidebar); // Close sidebar when clicking overlay

// Close sidebar when a navigation link is clicked
document.querySelectorAll("#mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileNav.classList.contains("open")) {
      toggleSidebar();
    }
  });
});

// --- Product Carousel Functionality ---
const productCarousel = document.getElementById("product-carousel");
const prevProductBtn = document.getElementById("prev-product");
const nextProductBtn = document.getElementById("next-product");

const scrollAmount = 300; // Approx. width of card (288px) + gap (24px)

prevProductBtn.addEventListener("click", () => {
  productCarousel.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});

nextProductBtn.addEventListener("click", () => {
  productCarousel.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});

// --- Product Detail Popup Functionality ---
const productDetailModal = document.getElementById("product-detail-modal");
const productModalCloseButton = document.getElementById(
  "product-modal-close-button"
);
const modalProductImage = document.getElementById("modal-product-image");
const modalProductName = document.getElementById("modal-product-name");
const modalProductSize = document.getElementById("modal-product-size");
const modalProductPrice = document.getElementById("modal-product-price");
const modalProductDescription = document.getElementById(
  "modal-product-description"
);

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    const name = card.dataset.name;
    const size = card.dataset.size;
    const price = card.dataset.price;
    const image = card.dataset.image;

    modalProductImage.src = image;
    modalProductName.textContent = name;
    modalProductSize.textContent = size;
    modalProductPrice.textContent = price;
    // You can customize the description based on product data if available
    modalProductDescription.textContent = `Nikmati kelezatan ${name} kami. Dibuat dengan bahan-bahan premium, kue ini memiliki ukuran ${size} dan sangat cocok untuk merayakan momen spesial Anda.`;

    productDetailModal.classList.add("open");
  });
});

productModalCloseButton.addEventListener("click", () => {
  productDetailModal.classList.remove("open");
});

// Close product detail modal when clicking outside
productDetailModal.addEventListener("click", (event) => {
  if (event.target === productDetailModal) {
    productDetailModal.classList.remove("open");
  }
});

// --- Newsletter Subscription Handler ---
document
  .getElementById("subscribe-button")
  .addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default form submission
    const emailInput = document.querySelector('footer input[type="email"]');
    const email = emailInput.value;
    if (email) {
      console.log(`Email subscribed: ${email}`);
      showCustomModal(
        "Berhasil!",
        "Terima kasih telah berlangganan newsletter kami!"
      );
      emailInput.value = ""; // Clear input
    } else {
      showCustomModal("Peringatan", "Mohon masukkan alamat email Anda.");
    }
  });

// --- Contact Form Submission Handler ---
document
  .querySelector("#contact-section form")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (name && email && subject && message) {
      console.log("Contact Form Submitted:", {
        name,
        email,
        subject,
        message,
      });
      showCustomModal(
        "Pesan Terkirim",
        "Terima kasih! Pesan Anda telah kami terima dan akan segera kami balas."
      );
      // Clear form fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
    } else {
      showCustomModal(
        "Peringatan",
        "Mohon lengkapi semua kolom formulir kontak."
      );
    }
  });

// --- Search Overlay Functionality ---
const searchIconButton = document.getElementById("search-icon-button");
const searchOverlay = document.getElementById("search-overlay");
const searchCloseButton = document.getElementById("search-close-button");
const searchInputField = document.getElementById("search-input-field");
const executeSearchButton = document.getElementById("execute-search-button");
const searchResultsDiv = document.getElementById("search-results");

searchIconButton.addEventListener("click", (event) => {
  event.preventDefault();
  searchOverlay.classList.add("open");
  searchResultsDiv.innerHTML =
    '<p class="text-gray-600">Hasil pencarian akan muncul di sini.</p>'; // Reset results
  searchInputField.value = ""; // Clear input
  searchInputField.focus(); // Focus input field
});

searchCloseButton.addEventListener("click", () => {
  searchOverlay.classList.remove("open");
});

// Close search overlay when clicking outside
searchOverlay.addEventListener("click", (event) => {
  if (event.target === searchOverlay) {
    searchOverlay.classList.remove("open");
  }
});

executeSearchButton.addEventListener("click", executeSearch);
searchInputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    executeSearch();
  }
});

// Data for search (can be expanded)
const searchableContent = [
  {
    type: "tentang",
    text: "Ann's Bakehouse & Creamery didirikan pada tahun 2014. Kami memprioritaskan keunggulan layanan dan kebutuhan pelanggan kami dengan membangun tim pengiriman dan tim layanan pelanggan yang paling efektif untuk mencapai tujuan kami menjadi toko kue online layanan satu-klik-jauh yang paling andal di Jakarta.",
  },
  {
    type: "produk",
    name: "Apple Mille Feuille",
    size: "Square 20 x 20 cm",
    price: "Rp 610.000",
    description: "Kue puff pastry renyah dengan isian apel yang lezat.",
  },
  {
    type: "produk",
    name: "Cheese Mille Feuille",
    size: "Square 20 x 20 cm",
    price: "Rp 546.000",
    description: "Mille Feuille gurih dengan keju premium.",
  },
  {
    type: "produk",
    name: "Chocolate Salted Caramel Fudge",
    size: "Round 20 cm",
    price: "Rp 734.000",
    description: "Kue cokelat kaya rasa dengan sentuhan karamel asin.",
  },
  {
    type: "produk",
    name: "Mille Feuille",
    size: "Square 20 x 20 cm",
    price: "Rp 546.000",
    description: "Kue klasik Mille Feuille dengan krim lembut.",
  },
  {
    type: "produk",
    name: "Red Velvet Cake",
    size: "Round 20 cm",
    price: "Rp 650.000",
    description: "Kue Red Velvet lembut dengan cream cheese frosting.",
  },
  {
    type: "produk",
    name: "Black Forest Cake",
    size: "Round 20 cm",
    price: "Rp 580.000",
    description: "Kue Black Forest tradisional dengan ceri dan cokelat.",
  },
  {
    type: "layanan",
    text: "Kemitraan Korporat: Kami menyederhanakan pemberian hadiah korporat dengan pilihan yang disempurnakan dan hak istimewa pengemasan eksklusif.",
  },
  {
    type: "layanan",
    text: "Katering Acara: Dari pertemuan intim hingga perayaan besar, layanan katering kami akan menciptakan pengalaman yang tak terlupakan.",
  },
  {
    type: "kontak",
    text: "Alamat: Jl. Sambas I No.4, Kramat Pela, Kec. Kby. Baru, Jakarta Selatan. Telepon/WhatsApp: +62 811-114-960. Email: info@anns.co.id",
  },
  {
    type: "jam_operasional",
    text: "Jam Operasional Toko Sambas: Senin - Minggu: 07.15 - 21.00 (GMT+7)",
  },
  {
    type: "jam_operasional",
    text: "Jam Operasional Toko Kesehatan: Senin - Minggu: 11.00 - 19.00 (GMT+7)",
  },
  {
    type: "jam_operasional",
    text: "Jam Operasional Toko Plaza Senayan: Senin - Minggu: 10.00 - 22.00 (GMT+7)",
  },
  {
    type: "platform",
    text: "Kami tersedia di platform: Tokopedia, Shopee, GoFood, GrabFood.",
  },
];

function executeSearch() {
  const query = searchInputField.value.toLowerCase();
  searchResultsDiv.innerHTML = ""; // Clear previous results

  if (query.length < 2) {
    searchResultsDiv.innerHTML =
      '<p class="text-gray-600">Silakan masukkan minimal 2 karakter untuk pencarian.</p>';
    return;
  }

  const results = searchableContent.filter((item) => {
    if (item.name && item.name.toLowerCase().includes(query)) return true;
    if (item.description && item.description.toLowerCase().includes(query))
      return true;
    if (item.text && item.text.toLowerCase().includes(query)) return true;
    if (item.price && item.price.toLowerCase().includes(query)) return true;
    if (item.size && item.size.toLowerCase().includes(query)) return true;
    return false;
  });

  if (results.length > 0) {
    results.forEach((item) => {
      const resultElement = document.createElement("div");
      resultElement.classList.add(
        "p-3",
        "border-b",
        "border-gray-200",
        "last:border-b-0"
      );
      if (item.type === "produk") {
        resultElement.innerHTML = `
                            <h4 class="font-semibold text-gray-800">${
                              item.name
                            } (${item.size})</h4>
                            <p class="text-stone-700">${item.price}</p>
                            <p class="text-gray-600 text-sm">${
                              item.description || ""
                            }</p>
                        `;
      } else {
        resultElement.innerHTML = `<p class="text-gray-700">${item.text}</p>`;
      }
      searchResultsDiv.appendChild(resultElement);
    });
  } else {
    searchResultsDiv.innerHTML =
      '<p class="text-gray-600">Tidak ada hasil ditemukan untuk pencarian Anda.</p>';
  }
}

// --- Chatbot Functionality ---
const chatbotButton = document.getElementById("chatbot-button");
const chatbotContainer = document.getElementById("chatbot-container");
const closeChatbotButton = document.getElementById("close-chatbot");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const chatSendButton = document.getElementById("chat-send-button");
const chatLoading = document.getElementById("chat-loading");

let chatHistory = []; // To store chat history for LLM

// Website content as context for the chatbot
const websiteContent = `
            Ann's Bakehouse & Creamery didirikan pada tahun 2014. Kami memprioritaskan keunggulan layanan dan kebutuhan pelanggan kami dengan membangun tim pengiriman dan tim layanan pelanggan yang paling efektif untuk mencapai tujuan kami menjadi toko kue online layanan satu-klik-jauh yang paling andal di Jakarta.

            Produk kami meliputi:
            - Apple Mille Feuille (Square 20 x 20 cm): Rp 610.000
            - Cheese Mille Feuille (Square 20 x 20 cm): Rp 546.000
            - Chocolate Salted Caramel Fudge (Round 20 cm): Rp 734.000
            - Mille Feuille (Square 20 x 20 cm): Rp 546.000
            - Red Velvet Cake (Round 20 cm): Rp 650.000
            - Black Forest Cake (Round 20 cm): Rp 580.000

            Kami juga menawarkan:
            - Kemitraan Korporat: Kami menyederhanakan pemberian hadiah korporat dengan pilihan yang disempurnakan dan hak istimewa pengemasan eksklusif.
            - Katering Acara: Dari pertemuan intim hingga perayaan besar, layanan katering kami akan menciptakan pengalaman yang tak terlupakan.

            Informasi Kontak:
            - Alamat: Jl. Sambas I No.4, Kramat Pela, Kec. Kby. Baru, Jakarta Selatan
            - Telepon/WhatsApp: +62 811-114-960
            - Email: info@anns.co.id

            Jam Operasional Toko:
            - Sambas: Senin - Minggu: 07.15 - 21.00 (GMT+7)
            - Kesehatan: Senin - Minggu: 11.00 - 19.00 (GMT+7)
            - Plaza Senayan: Senin - Minggu: 10.00 - 22.00 (GMT+7)

            Kami tersedia di platform: Tokopedia, Shopee, GoFood, GrabFood.
        `;

chatbotButton.addEventListener("click", () => {
  chatbotContainer.classList.toggle("open");
});

closeChatbotButton.addEventListener("click", () => {
  chatbotContainer.classList.remove("open");
});

chatSendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (userMessage === "") return;

  // Display user message
  appendMessage(userMessage, "user");
  chatInput.value = "";
  chatLoading.style.display = "block"; // Show typing indicator
  chatBody.scrollTop = chatBody.scrollHeight; // Scroll to bottom

  // Add user message to history
  chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

  // Construct prompt for LLM with context
  const prompt = `Anda adalah asisten chatbot yang ramah dan informatif untuk website Ann's Bakehouse & Creamery. Jawab pertanyaan pengguna berdasarkan informasi yang diberikan di bawah ini. Jika informasi tidak tersedia, katakan bahwa Anda tidak memiliki informasi tersebut.

            Konten Website:
            ${websiteContent}

            Pertanyaan Pengguna: ${userMessage}`;

  try {
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };
    const apiKey = ""; // Canvas will provide this at runtime
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    chatLoading.style.display = "none"; // Hide typing indicator

    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      const botResponse = result.candidates[0].content.parts[0].text;
      appendMessage(botResponse, "bot");
      chatHistory.push({ role: "model", parts: [{ text: botResponse }] }); // Add bot response to history
    } else {
      appendMessage(
        "Maaf, saya tidak dapat memproses permintaan Anda saat ini. Silakan coba lagi.",
        "bot"
      );
    }
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    chatLoading.style.display = "none"; // Hide typing indicator
    appendMessage(
      "Terjadi kesalahan saat berkomunikasi dengan AI. Mohon coba lagi nanti.",
      "bot"
    );
  }
  chatBody.scrollTop = chatBody.scrollHeight; // Scroll to bottom after bot response
}

function appendMessage(text, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", sender);
  messageElement.textContent = text;
  chatBody.appendChild(messageElement);
}
let scene, camera, renderer, controls, model;
let autoRotate = false;

const container = document.getElementById("three-container");
const canvas = document.getElementById("three-canvas");

function init3D() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 3);

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(light);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(3, 10, 10);
  scene.add(dirLight);

  // Load .glb
  const loader = new THREE.GLTFLoader();
  loader.load("img/cake.glb", function (gltf) {
    model = gltf.scene;
    model.position.set(0, 0, 0);
    scene.add(model);
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (autoRotate && model) model.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}

document.getElementById("zoomInBtn").addEventListener("click", () => {
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  camera.position.addScaledVector(dir, -0.3);
});

document.getElementById("zoomOutBtn").addEventListener("click", () => {
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  camera.position.addScaledVector(dir, 0.3);
});

document.getElementById("autoRotateBtn").addEventListener("click", () => {
  autoRotate = !autoRotate;
  document.getElementById("autoRotateBtn").textContent = autoRotate
    ? "Hentikan Rotasi"
    : "Rotasi Otomatis";
});

window.addEventListener("load", init3D);
function init3DModel(canvasId, modelPath) {
  const canvas = document.getElementById(canvasId);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 3);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(light);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(3, 10, 10);
  scene.add(dirLight);

  const loader = new THREE.GLTFLoader();
  let model;
  loader.load(modelPath, function (gltf) {
    model = gltf.scene;
    scene.add(model);
  });

  function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // Resize
  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}

function init3DSlider() {
  init3DModel("three-canvas-1", "img/KULOK.glb");
  init3DModel("three-canvas-2", "img/cake2.glb"); // <-- Ganti dengan model ke-2

  let currentSlide = 0;
  const slider = document.getElementById("three-slider");
  const slides = slider.children.length;

  document.getElementById("slider-next").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  });

  document.getElementById("slider-prev").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides) % slides;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  });
}

window.addEventListener("load", init3DSlider);

window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
document.addEventListener("DOMContentLoaded", () => {
  const animatedSections = document.querySelectorAll(
    "section.animate-on-scroll"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedSections.forEach((section) => {
    observer.observe(section);
  });
});
