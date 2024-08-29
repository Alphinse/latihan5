// Add JS here
document.querySelectorAll(".detail-btn").forEach((button) => {
    button.addEventListener("click", function () {
      // Ambil data dari card yang diklik
      const card = this.parentElement;
      const imageSrc = card.querySelector("img").src;
      const name = card.querySelector("h3").textContent;
      const email = card.querySelector("p").textContent;
      const job = name.split(" ")[0]; // Contoh pekerjaan, bisa disesuaikan
      const skills = "Contoh keahlian"; // Bisa ditambahkan data skills jika ada
  
      // Tampilkan form dengan data dari card
      document.getElementById("detail-image").src = imageSrc;
      document.getElementById("detail-name").textContent = `Nama: ${name}`;
      document.getElementById("detail-email").textContent = `Email: ${email}`;
      document.getElementById("detail-job").textContent = `Pekerjaan: ${job}`;
      document.getElementById(
        "detail-skills"
      ).textContent = `Keahlian: ${skills}`;
  
      // Sembunyikan semua card dan tampilkan form
      document.querySelectorAll(".card").forEach((card) => {
        card.classList.add("hidden");
      });
      document.getElementById("form-container").classList.remove("hidden");
    });
  });
  
  // Tombol kembali untuk menampilkan kembali semua card dan sembunyikan form
  document.getElementById("back-btn").addEventListener("click", function () {
    document.getElementById("form-container").classList.add("hidden");
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("hidden");
    });
  });
  
  // Menu Toggle untuk Mobile
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const contentSections = document.querySelectorAll("main > section");
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
  });
  document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
      sidebar.classList.add("-translate-x-full");
    }
  });
  // Navigasi untuk menampilkan satu section saja
  const navLinks = sidebar.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionToShow = event.target.getAttribute("data-section");
      contentSections.forEach((section) => {
        if (section.id === sectionToShow) {
          section.classList.remove("hidden");
          section.classList.add("visible");
        } else {
          section.classList.remove("visible");
          section.classList.add("hidden");
        }
      });
      if (window.innerWidth < 1024) {
        sidebar.classList.add("-translate-x-full");
      }
    });
  });
  
  // Carousel Functionality
  const carouselItems = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;
  document.getElementById("next").addEventListener("click", () => {
    updateCarousel(1);
  });
  document.getElementById("prev").addEventListener("click", () => {
    updateCarousel(-1);
  });
  
  function updateCarousel(direction) {
    carouselItems[currentIndex].classList.remove("visible");
    carouselItems[currentIndex].classList.add("hidden");
    currentIndex =
      (currentIndex + direction + carouselItems.length) % carouselItems.length;
    carouselItems[currentIndex].classList.remove("hidden");
    carouselItems[currentIndex].classList.add("visible");
  }
  // Automatic Slide Change
  setInterval(() => {
    updateCarousel(1);
  }, 5000); // Ganti slide setiap 5 detik
  
  document.getElementById("contact").addEventListener("submit", function (event) {
      event.preventDefault();
  
      const emailField = document.getElementById("email");
      const phoneField = document.getElementById("phone");
      const notification = document.getElementById("form-notification");
  
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|id|co.id|org)$/;
      const phonePattern = /^\d{10,12}$/;
  
      if (!emailPattern.test(emailField.value)) {
          notification.textContent = "Email tidak valid. Harus diakhiri dengan .com, .id, .co.id, atau .org.";
          notification.style.color = "red";
          notification.classList.remove('hidden');
          return;
      }
  
      if (!phonePattern.test(phoneField.value)) {
          notification.textContent = "Nomor telepon harus berisi 10 sampai 12 digit angka.";
          notification.style.color = "red";
          notification.classList.remove('hidden');
          return;
      }
  
      // Simulasi pengiriman data ke Google Sheets atau server
      const isSuccess = true; // Ubah ini sesuai hasil pengiriman sebenarnya
  
      if (isSuccess) {
          notification.textContent = "Pesan berhasil dikirim!";
          notification.style.color = "green";
          notification.classList.remove('hidden');
  
          setTimeout(() => notification.classList.add('hidden'), 3000);
          document.getElementById("myForm").reset();
      } else {
          notification.textContent = 'Pesan gagal dikirim. Coba lagi.';
          notification.style.color = 'red';
          notification.classList.remove('hidden');
      }
  });
  