document.getElementById("menu-toggle").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("-translate-x-full");
});
// Close sidebar when clicking outside of it
document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("menu-toggle");
  if (!sidebar.contains(event.target) && !toggle.contains(event.target)) {
    sidebar.classList.add("-translate-x-full");
  }
});
// Sidebar navigation
document.querySelectorAll("#sidebar nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelectorAll("main section").forEach((section) => {
      section.classList.add("hidden");
    });
    document
      .getElementById(this.getAttribute("data-section"))
      .classList.remove("hidden");
    if (window.innerWidth < 1024) {
      sidebar.classList.add("-translate-x-full");
    }
  });
});
// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll("#carousel .carousel-item");
const totalSlides = slides.length;
document.getElementById("next").addEventListener("click", () => {
  slides[currentSlide].classList.add("hidden");
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.remove("hidden");
});
document.getElementById("prev").addEventListener("click", () => {
  slides[currentSlide].classList.add("hidden");
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  slides[currentSlide].classList.remove("hidden");
});

// Validasi dan pengiriman form contact
document.getElementById("contact").addEventListener("submit", function (event) {
  event.preventDefault();
  const emailField = document.getElementById("email");
  const phoneField = document.getElementById("phone");
  const notification = document.getElementById("form-notification");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|id|co.id|org)$/;
  const phonePattern = /^\d{10,12}$/;

  if (!emailPattern.test(emailField.value)) {
    notification.textContent =
      "Email tidak valid. Harus diakhiri dengan .com, .id, .co.id, atau .org.";
    notification.style.color = "red";
    notification.classList.remove("hidden");
    return;
  }

  if (!phonePattern.test(phoneField.value)) {
    notification.textContent =
      "Nomor telepon harus berisi 10 sampai 12 digit angka.";
    notification.style.color = "red";
    notification.classList.remove("hidden");
    return;
  }

  const isSuccess = true; // Simulasi hasil pengiriman

  if (isSuccess) {
    notification.textContent = "Pesan berhasil dikirim!";
    notification.style.color = "green";
    notification.classList.remove("hidden");
    setTimeout(() => notification.classList.add("hidden"), 3000);
    document.getElementById("myForm").reset();
  } else {
    notification.textContent = "Pesan gagal dikirim. Coba lagi.";
    notification.style.color = "red";
    notification.classList.remove("hidden");
  }
});

// Event Listener untuk course card dan form pendaftaran
document.addEventListener("DOMContentLoaded", function () {
  const courseCards = document.querySelectorAll(".course-card");
  const registrationForm = document.getElementById("registration-form");
  const submitButton = document.getElementById("submit-button");
  const backButton = document.getElementById("back-button");
  const continueCourseButtons = document.querySelectorAll(".continue-course");
  const formInputs = document.querySelectorAll(
    "#course-form input, #course-form select, #course-form textarea"
  );

  document.querySelectorAll(".continue-course").forEach((button) => {
    button.addEventListener("click", function () {
      courseCards.forEach((card) => card.classList.add("hidden"));
      registrationForm.classList.remove("hidden");
    });
  });

  backButton.addEventListener("click", function () {
    registrationForm.classList.add("hidden");
    courseCards.forEach((card) => card.classList.remove("hidden"));
  });

  formInputs.forEach((input) => {
    input.addEventListener("input", function () {
      let isFormValid = true;
      formInputs.forEach((input) => {
        if (input.value.trim() === "") {
          isFormValid = false;
        }
      });
      submitButton.disabled = !isFormValid;
    });
  });

  document
    .getElementById("course-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const paymentMethod = document.getElementById("payment-method").value;

      const paymentUrls = {
        GoPay: "https://gopay.co.id",
        LinkAja: "https://linkaja.id",
        PayPal: "https://paypal.com"
      };

      window.open(paymentUrls[paymentMethod], "_blank");

      alert("Pembayaran berhasil kami terima!");
      this.reset();
      submitButton.disabled = true;
      registrationForm.classList.add("hidden");
      courseCards.forEach((card) => card.classList.remove("hidden"));
    });
});

// Event Listener untuk navigasi course
const courseLinks = {
  "computer-course-link": "computer-course-card",
  "web-course-link": "web-course-card",
  "android-course-link": "android-course-card"
};

Object.keys(courseLinks).forEach((linkId) => {
  document.getElementById(linkId).addEventListener("click", function () {
    document
      .querySelectorAll(".course-card")
      .forEach((card) => card.classList.add("hidden"));
    document.getElementById(courseLinks[linkId]).classList.remove("hidden");
  });
});
