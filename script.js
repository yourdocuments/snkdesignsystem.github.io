/* =========================================================
   SNK DESIGN AGENCY
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     ELEMENTS
     ========================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const header = document.getElementById("header");

  const navLinks = document.querySelectorAll(".nav-link");

  const allAnchors = document.querySelectorAll(
    'a[href^="#"]'
  );


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

      navMenu.classList.toggle("active");

      menuToggle.classList.toggle("active");

      const isOpen =
        navMenu.classList.contains("active");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });

  }


  /* =========================================================
     CLOSE MOBILE MENU AFTER CLICK
     ========================================================= */

  navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

      if (navMenu) {
        navMenu.classList.remove("active");
      }

      if (menuToggle) {
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    });

  });


  /* =========================================================
     CLOSE MENU WHEN CLICKING OUTSIDE
     ========================================================= */

  document.addEventListener("click", function (event) {

    if (!navMenu || !menuToggle) {
      return;
    }

    const clickedInsideMenu =
      navMenu.contains(event.target);

    const clickedMenuButton =
      menuToggle.contains(event.target);

    if (
      !clickedInsideMenu &&
      !clickedMenuButton
    ) {

      navMenu.classList.remove("active");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });


  /* =========================================================
     HEADER SCROLL EFFECT
     ========================================================= */

  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 30) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  const sections =
    document.querySelectorAll("section[id]");


  function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
      window.scrollY + 200;


    sections.forEach(function (section) {

      const sectionTop =
        section.offsetTop;

      const sectionHeight =
        section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
          sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navLinks.forEach(function (link) {

      link.classList.remove("active");

      const linkTarget =
        link.getAttribute("href");


      if (
        linkTarget ===
        "#" + currentSection
      ) {

        link.classList.add("active");

      }

    });

  }


  updateActiveNavigation();


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );


  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  allAnchors.forEach(function (anchor) {

    anchor.addEventListener(
      "click",
      function (event) {

        const targetId =
          this.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(targetId);


        if (!target) {

          return;

        }


        event.preventDefault();


        const headerHeight =
          header
            ? header.offsetHeight
            : 0;


        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;


        window.scrollTo({

          top: targetPosition,

          behavior: "smooth"

        });

      }
    );

  });


  /* =========================================================
     ESCAPE KEY — CLOSE MOBILE MENU
     ========================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key !== "Escape") {
        return;
      }


      if (navMenu) {

        navMenu.classList.remove(
          "active"
        );

      }


      if (menuToggle) {

        menuToggle.classList.remove(
          "active"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  /* =========================================================
     BUTTON RIPPLE EFFECT
     ========================================================= */

  const buttons =
    document.querySelectorAll(
      ".btn, .nav-cta"
    );


  buttons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        button.classList.remove(
          "clicked"
        );


        void button.offsetWidth;


        button.classList.add(
          "clicked"
        );

      }
    );

  });


  /* =========================================================
     SERVICE CARD HOVER
     ========================================================= */

  const serviceCards =
    document.querySelectorAll(
      ".service-card"
    );


  serviceCards.forEach(function (card) {

    card.addEventListener(
      "mouseenter",
      function () {

        card.classList.add(
          "is-hovered"
        );

      }
    );


    card.addEventListener(
      "mouseleave",
      function () {

        card.classList.remove(
          "is-hovered"
        );

      }
    );

  });


  /* =========================================================
     WORK CARD HOVER
     ========================================================= */

  const workCards =
    document.querySelectorAll(
      ".work-card"
    );


  workCards.forEach(function (card) {

    card.addEventListener(
      "mouseenter",
      function () {

        card.classList.add(
          "is-hovered"
        );

      }
    );


    card.addEventListener(
      "mouseleave",
      function () {

        card.classList.remove(
          "is-hovered"
        );

      }
    );

  });


  /* =========================================================
     CURRENT YEAR
     ========================================================= */

  const currentYear =
    document.querySelector(
      ".current-year"
    );


  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* =========================================================
     PAGE LOADED
     ========================================================= */

  document.body.classList.add(
    "page-loaded"
  );


  console.log(
    "SNK Design Agency website loaded successfully."
  );

});
