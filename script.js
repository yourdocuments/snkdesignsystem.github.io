/* =====================================================
   SNK DESIGN AGENCY
   Main JavaScript
   Version: Next
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");

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


    /* Close menu after clicking link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        const icon = menuToggle.querySelector("i");

        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }

      });

    });

  }


  /* =====================================================
     CUSTOMER SEARCH & FILTER
  ===================================================== */

  const searchInput =
    document.querySelector("#customerSearch");

  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const customerCards =
    document.querySelectorAll(".customer-card");

  const noResults =
    document.querySelector(".no-results");

  let selectedCategory = "all";


  function filterCustomers() {

    const searchText = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

    let visibleCount = 0;


    customerCards.forEach(function (card) {

      const cardCategory =
        (card.getAttribute("data-category") || "")
        .toLowerCase();

      const cardText =
        card.textContent.toLowerCase();


      const categoryMatched =
        selectedCategory === "all" ||
        cardCategory === selectedCategory;


      const searchMatched =
        cardText.includes(searchText);


      if (categoryMatched && searchMatched) {

        card.style.display = "";

        setTimeout(function () {
          card.classList.add("visible");
        }, 10);

        visibleCount++;

      } else {

        card.classList.remove("visible");
        card.style.display = "none";

      }

    });


    if (noResults) {

      noResults.style.display =
        visibleCount === 0
          ? "block"
          : "none";

    }

  }


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      filterCustomers
    );

  }


  filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });


      button.classList.add("active");


      selectedCategory =
        (
          button.getAttribute("data-filter") ||
          "all"
        ).toLowerCase();


      filterCustomers();

    });

  });


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  function revealOnScroll() {

    const windowHeight =
      window.innerHeight;


    revealElements.forEach(function (element) {

      const elementTop =
        element.getBoundingClientRect().top;


      if (elementTop < windowHeight - 80) {

        element.classList.add("active");

      }

    });

  }


  if (revealElements.length > 0) {

    window.addEventListener(
      "scroll",
      revealOnScroll,
      { passive: true }
    );

    revealOnScroll();

  }


  /* =====================================================
     ACTIVE NAVIGATION
  ===================================================== */

  const sections =
    document.querySelectorAll("section[id]");


  const navigationLinks =
    document.querySelectorAll(
      '.nav-menu a[href^="#"]'
    );


  function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(function (section) {

      const sectionTop =
        section.offsetTop - 150;

      const sectionHeight =
        section.offsetHeight;


      if (
        window.scrollY >= sectionTop &&
        window.scrollY <
          sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navigationLinks.forEach(function (link) {

      link.classList.remove("active");


      const targetId =
        link.getAttribute("href");


      if (
        targetId === "#" + currentSection
      ) {

        link.classList.add("active");

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );


  updateActiveNavigation();


  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */

  const smoothLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  smoothLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetId =
          link.getAttribute("href");


        if (
          targetId &&
          targetId !== "#" &&
          document.querySelector(targetId)
        ) {

          event.preventDefault();


          const targetElement =
            document.querySelector(targetId);


          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }
    );

  });


  /* =====================================================
     THEME TOGGLE
  ===================================================== */

  const themeToggle =
    document.querySelector("#themeToggle");


  const savedTheme =
    localStorage.getItem("snk-theme");


  if (savedTheme === "dark") {

    document.documentElement
      .setAttribute(
        "data-theme",
        "dark"
      );

  }


  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      function () {

        const currentTheme =
          document.documentElement
            .getAttribute("data-theme");


        if (currentTheme === "dark") {

          document.documentElement
            .removeAttribute("data-theme");

          localStorage.setItem(
            "snk-theme",
            "light"
          );

        } else {

          document.documentElement
            .setAttribute(
              "data-theme",
              "dark"
            );

          localStorage.setItem(
            "snk-theme",
            "dark"
          );

        }

      }
    );

  }


  /* =====================================================
     BACK TO TOP BUTTON
  ===================================================== */

  const backToTop =
    document.querySelector("#backToTop");


  function toggleBackToTop() {

    if (!backToTop) return;


    if (window.scrollY > 500) {

      backToTop.classList.add("show");

    } else {

      backToTop.classList.remove("show");

    }

  }


  window.addEventListener(
    "scroll",
    toggleBackToTop,
    { passive: true }
  );


  if (backToTop) {

    backToTop.addEventListener(
      "click",
      function () {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =====================================================
     MODAL
  ===================================================== */

  const modal =
    document.querySelector(".modal");

  const modalClose =
    document.querySelector(".modal-close");


  function closeModal() {

    if (!modal) return;

    modal.classList.remove("active");

    document.body.classList.remove(
      "modal-open"
    );

  }


  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeModal
    );

  }


  if (modal) {

    modal.addEventListener(
      "click",
      function (event) {

        if (
          event.target === modal
        ) {

          closeModal();

        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("active")
      ) {

        closeModal();

      }

    }
  );


  /* =====================================================
     CUSTOMER CARD MODAL
  ===================================================== */

  const customerButtons =
    document.querySelectorAll(
      "[data-modal]"
    );


  customerButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        const modalId =
          button.getAttribute(
            "data-modal"
          );


        const targetModal =
          document.querySelector(
            modalId
          );


        if (targetModal) {

          targetModal.classList.add(
            "active"
          );

          document.body.classList.add(
            "modal-open"
          );

        }

      }
    );

  });


  /* =====================================================
     NOTIFICATION SYSTEM
  ===================================================== */

  function showNotification(
    message,
    type = "success"
  ) {

    let notification =
      document.querySelector(
        ".snk-notification"
      );


    if (!notification) {

      notification =
        document.createElement("div");

      notification.className =
        "snk-notification";

      document.body.appendChild(
        notification
      );

    }


    notification.textContent =
      message;


    notification.className =
      "snk-notification " + type;


    notification.classList.add(
      "show"
    );


    setTimeout(function () {

      notification.classList.remove(
        "show"
      );

    }, 3000);

  }


  /* =====================================================
     CONTACT FORM
  ===================================================== */

  const contactForm =
    document.querySelector(
      "#contactForm"
    );


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const name =
          contactForm.querySelector(
            '[name="name"]'
          );


        const email =
          contactForm.querySelector(
            '[name="email"]'
          );


        if (
          name &&
          name.value.trim() === ""
        ) {

          showNotification(
            "Please enter your name.",
            "error"
          );

          name.focus();

          return;

        }


        if (
          email &&
          email.value.trim() === ""
        ) {

          showNotification(
            "Please enter your email.",
            "error"
          );

          email.focus();

          return;

        }


        showNotification(
          "Your message has been received.",
          "success"
        );


        contactForm.reset();

      }
    );

  }


  /* =====================================================
     COPY BUTTON
  ===================================================== */

  const copyButtons =
    document.querySelectorAll(
      "[data-copy]"
    );


  copyButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      async function () {

        const text =
          button.getAttribute(
            "data-copy"
          );


        if (!text) return;


        try {

          await navigator.clipboard.writeText(
            text
          );


          showNotification(
            "Copied successfully!",
            "success"
          );

        } catch (error) {

          showNotification(
            "Copy failed.",
            "error"
          );

        }

      }
    );

  });


  /* =====================================================
     EXTERNAL LINKS
  ===================================================== */

  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );


  externalLinks.forEach(function (link) {

    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );

  });


  /* =====================================================
     CURRENT YEAR
  ===================================================== */

  const currentYear =
    document.querySelector(
      "#currentYear"
    );


  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* =====================================================
     PAGE LOADED
  ===================================================== */

  document.body.classList.add(
    "page-loaded"
  );


  /* =====================================================
     INITIAL CUSTOMER FILTER
  ===================================================== */

  filterCustomers();


});
