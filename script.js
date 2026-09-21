/* =========================================================
   SNK DESIGN AGENCY
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const mobileButton =
    document.getElementById("mobileMenuButton");

  const mainNav =
    document.getElementById("mainNav");

  const siteHeader =
    document.getElementById("siteHeader");

  const navLinks =
    document.querySelectorAll(".nav-link");


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  if (mobileButton && mainNav) {

    mobileButton.addEventListener("click", function () {

      const isOpen =
        mainNav.classList.toggle("mobile-open");

      mobileButton.classList.toggle(
        "active",
        isOpen
      );

      mobileButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    /* Close menu after clicking navigation */

    navLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        mainNav.classList.remove("mobile-open");

        mobileButton.classList.remove("active");

        mobileButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =======================================================
     HEADER SCROLL EFFECT
     ======================================================= */

  function handleHeaderScroll() {

    if (!siteHeader) {
      return;
    }

    if (window.scrollY > 40) {

      siteHeader.classList.add("scrolled");

    } else {

      siteHeader.classList.remove("scrolled");

    }

  }


  window.addEventListener(
    "scroll",
    handleHeaderScroll
  );

  handleHeaderScroll();


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const sections =
    document.querySelectorAll("section[id]");


  function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(function (section) {

      const sectionTop =
        section.offsetTop - 170;

      const sectionBottom =
        sectionTop + section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionBottom
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navLinks.forEach(function (link) {

      link.classList.remove("active");

      const href =
        link.getAttribute("href");

      if (
        href === "#" + currentSection
      ) {

        link.classList.add("active");

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation
  );

  updateActiveNavigation();


  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(function (anchor) {

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
          siteHeader
            ? siteHeader.offsetHeight
            : 0;

        const targetPosition =
          target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

      }
    );

  });


  /* =======================================================
     ESC KEY — CLOSE MOBILE MENU
     ======================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key !== "Escape") {
        return;
      }

      if (mainNav) {
        mainNav.classList.remove("mobile-open");
      }

      if (mobileButton) {

        mobileButton.classList.remove("active");

        mobileButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  /* =======================================================
     CLOSE MENU WHEN CLICKING OUTSIDE
     ======================================================= */

  document.addEventListener(
    "click",
    function (event) {

      if (!mainNav || !mobileButton) {
        return;
      }

      const clickedInsideNav =
        mainNav.contains(event.target);

      const clickedButton =
        mobileButton.contains(event.target);

      if (
        !clickedInsideNav &&
        !clickedButton
      ) {

        mainNav.classList.remove(
          "mobile-open"
        );

        mobileButton.classList.remove(
          "active"
        );

        mobileButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const yearElements =
    document.querySelectorAll(
      "[data-current-year]"
    );

  yearElements.forEach(function (element) {

    element.textContent =
      new Date().getFullYear();

  });


  /* =======================================================
     CONSOLE
     ======================================================= */

  console.log(
    "SNK Design Agency — Website Loaded Successfully."
  );

});
