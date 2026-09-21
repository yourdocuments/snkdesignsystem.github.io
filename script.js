/* =====================================================
   SNK DESIGN AGENCY
   Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     Mobile Menu
  ========================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      const icon = menuToggle.querySelector("i");

      if (navMenu.classList.contains("active")) {
        if (icon) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        }
      } else {
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }


  /* =========================
     Customer Search & Filter
  ========================= */

  const searchInput = document.querySelector("#customerSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const customerCards = document.querySelectorAll(".customer-card");
  const noResults = document.querySelector(".no-results");

  let selectedCategory = "all";

  function filterCustomers() {
    const searchText = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

    let visibleCount = 0;

    customerCards.forEach(function (card) {
      const cardCategory = (
        card.getAttribute("data-category") || ""
      ).toLowerCase();

      const cardText = card.textContent.toLowerCase();

      const categoryMatched =
        selectedCategory === "all" ||
        cardCategory === selectedCategory;

      const searchMatched =
        cardText.includes(searchText);

      if (categoryMatched && searchMatched) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResults) {
      noResults.style.display =
        visibleCount === 0 ? "block" : "none";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterCustomers);
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      selectedCategory = (
        button.getAttribute("data-filter") || "all"
      ).toLowerCase();

      filterCustomers();
    });
  });


  /* =========================
     Scroll Reveal Animation
  ========================= */

  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach(function (element) {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - 80) {
        element.classList.add("active");
      }
    });
  }

  if (revealElements.length > 0) {
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  }


  /* =========================
     Active Navigation
  ========================= */

  const sections = document.querySelectorAll("section[id]");
  const navigationLinks = document.querySelectorAll(
    '.nav-menu a[href^="#"]'
  );

  function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navigationLinks.forEach(function (link) {
      link.classList.remove("active");

      const targetId = link.getAttribute("href");

      if (targetId === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavigation);
  updateActiveNavigation();


  /* =========================
     Smooth Scroll
  ========================= */

  const smoothLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  smoothLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (
        targetId &&
        targetId !== "#" &&
        document.querySelector(targetId)
      ) {
        event.preventDefault();

        const targetElement = document.querySelector(targetId);

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* =========================
     Current Year
  ========================= */

  const currentYear = document.querySelector("#currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =========================
     External Links
  ========================= */

  const externalLinks = document.querySelectorAll(
    'a[target="_blank"]'
  );

  externalLinks.forEach(function (link) {
    link.setAttribute("rel", "noopener noreferrer");
  });

});
