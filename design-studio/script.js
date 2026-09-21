/* =========================================================
   SNK DESIGN AGENCY — DESIGN STUDIO
   design-studio/script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     CONFIG
  ======================================================== */

  const STORAGE_KEY = "snk_design_studio_v1";

  const POSTER_WIDTH = 1300;
  const POSTER_HEIGHT = 1300;


  /* =======================================================
     DEFAULT DOCTORS
  ======================================================== */

  const defaultDoctors = [
    {
      id: 1,
      name: "ডা. মোঃ আব্দুল্লাহ",
      degree: "MBBS, FCPS",
      specialty: "মেডিসিন বিশেষজ্ঞ",
      time: "সন্ধ্যা ৫টা — রাত ৯টা",
      variant: "blue",
      image: ""
    },
    {
      id: 2,
      name: "ডা. ফারজানা আক্তার",
      degree: "MBBS, DGO",
      specialty: "গাইনি ও প্রসূতি রোগ বিশেষজ্ঞ",
      time: "বিকাল ৪টা — রাত ৮টা",
      variant: "green",
      image: ""
    },
    {
      id: 3,
      name: "ডা. মোঃ রাকিব হাসান",
      degree: "MBBS, MD",
      specialty: "হৃদরোগ ও মেডিসিন বিশেষজ্ঞ",
      time: "সন্ধ্যা ৬টা — রাত ১০টা",
      variant: "purple",
      image: ""
    },
    {
      id: 4,
      name: "ডা. নুসরাত জাহান",
      degree: "MBBS, FCPS",
      specialty: "চর্ম ও যৌন রোগ বিশেষজ্ঞ",
      time: "বিকাল ৩টা — সন্ধ্যা ৭টা",
      variant: "orange",
      image: ""
    },
    {
      id: 5,
      name: "ডা. মোঃ সাইফুল ইসলাম",
      degree: "MBBS, BCS",
      specialty: "শিশু রোগ বিশেষজ্ঞ",
      time: "সন্ধ্যা ৫টা — রাত ৮টা",
      variant: "blue",
      image: ""
    },
    {
      id: 6,
      name: "ডা. সামিয়া রহমান",
      degree: "MBBS, FCPS",
      specialty: "নাক, কান ও গলা বিশেষজ্ঞ",
      time: "বিকাল ৫টা — রাত ৯টা",
      variant: "rose",
      image: ""
    },
    {
      id: 7,
      name: "ডা. মাহমুদুল হাসান",
      degree: "MBBS, MS",
      specialty: "সার্জারি বিশেষজ্ঞ",
      time: "সন্ধ্যা ৬টা — রাত ৯টা",
      variant: "green",
      image: ""
    },
    {
      id: 8,
      name: "ডা. তানজিলা আক্তার",
      degree: "MBBS, MD",
      specialty: "শ্বাসকষ্ট, অ্যাজমা ও বক্ষব্যাধি",
      time: "বিকাল ৪টা — রাত ৮টা",
      variant: "purple",
      image: ""
    }
  ];


  /* =======================================================
     DEFAULT STATE
  ======================================================== */

  const defaultState = {
    backgroundColor: "#081426",

    backgroundImage: "",

    coverImage: "",

    logoImage: "",

    logoTitle: "ROYAL SPECIALIZED HOSPITAL",

    miniTitle: "বিশেষজ্ঞ চিকিৎসকবৃন্দ",

    mainTitle: "OUR SPECIALIST DOCTORS",

    address:
      "Sreemangal Road, Berirpar, Moulvibazar",

    phone:
      "+880 1XXXXXXXXX",

    website:
      "www.example.com",

    facebook:
      "facebook.com/example",

    doctors:
      defaultDoctors.map(doctor => ({ ...doctor }))
  };


  let state = loadState();

  let zoom = 0.55;

  let toastTimer = null;


  /* =======================================================
     ELEMENT HELPERS
  ======================================================== */

  const $ = (id) => document.getElementById(id);

  const qs = (selector, parent = document) =>
    parent.querySelector(selector);

  const qsa = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  /* =======================================================
     DOM REFERENCES
  ======================================================== */

  const editorPanel = $("editorPanel");
  const editorOverlay = $("editorOverlay");

  const openEditorBtn = $("openEditorBtn");
  const closeEditorBtn = $("closeEditorBtn");

  const poster = $("poster");
  const posterWrapper = $("posterWrapper");
  const previewStage = $("previewStage");

  const posterBackground = $("posterBackground");
  const posterCover = $("posterCover");
  const posterLogo = $("posterLogo");

  const posterMiniTitle = $("posterMiniTitle");
  const posterMainTitle = $("posterMainTitle");

  const posterDoctorGrid = $("posterDoctorGrid");

  const posterAddress = $("posterAddress");
  const posterPhone = $("posterPhone");
  const posterWebsite = $("posterWebsite");
  const posterFacebook = $("posterFacebook");

  const doctorEditorList = $("doctorEditorList");
  const doctorCount = $("doctorCount");

  const zoomValue = $("zoomValue");


  /* =======================================================
     INIT
  ======================================================== */

  init();


  function init() {

    bindSectionToggles();

    bindEditorInputs();

    bindDoctorActions();

    bindColorPresets();

    bindZoomControls();

    bindMobileEditor();

    bindExport();

    bindSaveOpen();

    bindReset();

    renderAll();

    requestAnimationFrame(() => {
      fitPreview();
    });
  }


  /* =======================================================
     LOAD STATE
  ======================================================== */

  function loadState() {

    try {

      const saved =
        localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return cloneDefaultState();
      }

      const parsed =
        JSON.parse(saved);

      return normalizeState(parsed);

    } catch (error) {

      console.warn(
        "Could not load Design Studio data.",
        error
      );

      return cloneDefaultState();
    }
  }


  function cloneDefaultState() {

    return JSON.parse(
      JSON.stringify(defaultState)
    );
  }


  function normalizeState(data) {

    const safe =
      data && typeof data === "object"
        ? data
        : {};

    return {
      ...cloneDefaultState(),
      ...safe,

      doctors:
        Array.isArray(safe.doctors) &&
        safe.doctors.length
          ? safe.doctors.map((doctor, index) => ({
              ...defaultDoctors[index % defaultDoctors.length],
              ...doctor,
              id:
                doctor.id ??
                Date.now() + index
            }))
          : cloneDefaultState().doctors
    };
  }


  /* =======================================================
     SAVE STATE
  ======================================================== */

  function persistState() {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );

    } catch (error) {

      console.warn(
        "Could not save Design Studio state.",
        error
      );

      showToast(
        "Browser storage is full.",
        "error"
      );
    }
  }


  /* =======================================================
     SECTION TOGGLES
  ======================================================== */

  function bindSectionToggles() {

    qsa(".section-toggle").forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const targetId =
            button.dataset.section;

          const content =
            $(targetId);

          if (!content) return;

          const isActive =
            content.classList.contains("active");

          button.classList.toggle(
            "active",
            !isActive
          );

          content.classList.toggle(
            "active",
            !isActive
          );
        }
      );
    });
  }


  /* =======================================================
     EDITOR INPUTS
  ======================================================== */

  function bindEditorInputs() {

    bindTextInput(
      "logoTitle",
      "logoTitle"
    );

    bindTextInput(
      "miniTitle",
      "miniTitle"
    );

    bindTextInput(
      "mainTitle",
      "mainTitle"
    );

    bindTextInput(
      "addressText",
      "address"
    );

    bindTextInput(
      "phoneText",
      "phone"
    );

    bindTextInput(
      "websiteText",
      "website"
    );

    bindTextInput(
      "facebookText",
      "facebook"
    );


    /* Background color */

    const backgroundColor =
      $("backgroundColor");

    const backgroundColorText =
      $("backgroundColorText");


    if (backgroundColor) {

      backgroundColor.addEventListener(
        "input",
        () => {

          state.backgroundColor =
            normalizeHex(
              backgroundColor.value
            );

          if (backgroundColorText) {
            backgroundColorText.value =
              state.backgroundColor;
          }

          updatePosterBackground();

          persistState();
        }
      );
    }


    if (backgroundColorText) {

      backgroundColorText.addEventListener(
        "change",
        () => {

          const value =
            normalizeHex(
              backgroundColorText.value
            );

          if (!isValidHex(value)) {

            showToast(
              "Invalid color code.",
              "error"
            );

            backgroundColorText.value =
              state.backgroundColor;

            return;
          }

          state.backgroundColor = value;

          if (backgroundColor) {
            backgroundColor.value = value;
          }

          updatePosterBackground();

          persistState();
        }
      );
    }


    /* Background image */

    const backgroundImage =
      $("backgroundImage");

    if (backgroundImage) {

      backgroundImage.addEventListener(
        "change",
        event => {

          const file =
            event.target.files?.[0];

          if (!file) return;

          readImageFile(
            file,
            dataUrl => {

              state.backgroundImage =
                dataUrl;

              updatePosterBackground();

              persistState();

              showToast(
                "Background image added.",
                "success"
              );
            }
          );

          event.target.value = "";
        }
      );
    }


    /* Remove background */

    const removeBackgroundBtn =
      $("removeBackgroundBtn");

    if (removeBackgroundBtn) {

      removeBackgroundBtn.addEventListener(
        "click",
        () => {

          state.backgroundImage = "";

          updatePosterBackground();

          persistState();

          showToast(
            "Background image removed.",
            "success"
          );
        }
      );
    }


    /* Logo */

    const logoUpload =
      $("logoUpload");

    if (logoUpload) {

      logoUpload.addEventListener(
        "change",
        event => {

          const file =
            event.target.files?.[0];

          if (!file) return;

          readImageFile(
            file,
            dataUrl => {

              state.logoImage =
                dataUrl;

              updatePosterLogo();

              persistState();

              showToast(
                "Logo updated.",
                "success"
              );
            }
          );

          event.target.value = "";
        }
      );
    }


    /* Cover */

    const coverUpload =
      $("coverUpload");

    if (coverUpload) {

      coverUpload.addEventListener(
        "change",
        event => {

          const file =
            event.target.files?.[0];

          if (!file) return;

          readImageFile(
            file,
            dataUrl => {

              state.coverImage =
                dataUrl;

              updatePosterCover();

              persistState();

              showToast(
                "Cover image added.",
                "success"
              );
            }
          );

          event.target.value = "";
        }
      );
    }
  }


  function bindTextInput(elementId, stateKey) {

    const element =
      $(elementId);

    if (!element) return;

    element.addEventListener(
      "input",
      () => {

        state[stateKey] =
          element.value;

        updateTextFields();

        persistState();
      }
    );
  }


  /* =======================================================
     FILE READER
  ======================================================== */

  function readImageFile(file, callback) {

    if (!file.type.startsWith("image/")) {

      showToast(
        "Please select an image file.",
        "error"
      );

      return;
    }

    const reader =
      new FileReader();

    reader.onload = event => {

      callback(
        event.target.result
      );
    };

    reader.onerror = () => {

      showToast(
        "Could not read image.",
        "error"
      );
    };

    reader.readAsDataURL(file);
  }


  /* =======================================================
     DOCTOR ACTIONS
  ======================================================== */

  function bindDoctorActions() {

    const addDoctorBtn =
      $("addDoctorBtn");

    if (addDoctorBtn) {

      addDoctorBtn.addEventListener(
        "click",
        addDoctor
      );
    }


    doctorEditorList.addEventListener(
      "input",
      handleDoctorInput
    );

    doctorEditorList.addEventListener(
      "change",
      handleDoctorInput
    );

    doctorEditorList.addEventListener(
      "click",
      handleDoctorClick
    );
  }


  function addDoctor() {

    const newDoctor = {

      id:
        Date.now(),

      name:
        "নতুন চিকিৎসক",

      degree:
        "MBBS",

      specialty:
        "বিশেষজ্ঞ চিকিৎসক",

      time:
        "সন্ধ্যা ৫টা — রাত ৯টা",

      variant:
        "blue",

      image:
        ""
    };


    state.doctors.push(
      newDoctor
    );

    renderDoctors();

    persistState();

    showToast(
      "New doctor added.",
      "success"
    );
  }


  function handleDoctorInput(event) {

    const item =
      event.target.closest(
        ".doctor-editor-item"
      );

    if (!item) return;

    const id =
      Number(item.dataset.id);

    const doctor =
      state.doctors.find(
        item => Number(item.id) === id
      );

    if (!doctor) return;


    const field =
      event.target.dataset.field;

    if (field) {

      doctor[field] =
        event.target.value;

      renderPosterDoctors();

      persistState();
    }
  }


  function handleDoctorClick(event) {

    const removeButton =
      event.target.closest(
        ".remove-doctor"
      );

    if (removeButton) {

      const item =
        removeButton.closest(
          ".doctor-editor-item"
        );

      if (!item) return;

      const id =
        Number(item.dataset.id);

      removeDoctor(id);

      return;
    }


    const imageButton =
      event.target.closest(
        ".doctor-image-upload"
      );

    if (imageButton) {

      const item =
        imageButton.closest(
          ".doctor-editor-item"
        );

      if (!item) return;

      const input =
        qs(
          ".doctor-image-input",
          item
        );

      input?.click();
    }
  }


  function removeDoctor(id) {

    if (state.doctors.length <= 1) {

      showToast(
        "At least one doctor is required.",
        "error"
      );

      return;
    }


    const confirmed =
      window.confirm(
        "Remove this doctor?"
      );

    if (!confirmed) return;


    state.doctors =
      state.doctors.filter(
        doctor =>
          Number(doctor.id) !== id
      );


    renderDoctors();

    persistState();

    showToast(
      "Doctor removed.",
      "success"
    );
  }


  /* =======================================================
     RENDER DOCTOR EDITOR
  ======================================================== */

  function renderDoctors() {

    if (!doctorEditorList) return;

    doctorEditorList.innerHTML =
      state.doctors
        .map(
          (doctor, index) =>
            createDoctorEditorItem(
              doctor,
              index
            )
        )
        .join("");


    doctorCount.textContent =
      `${state.doctors.length} doctor${
        state.doctors.length === 1
          ? ""
          : "s"
      }`;


    qsa(
      ".doctor-image-input",
      doctorEditorList
    ).forEach(input => {

      input.addEventListener(
        "change",
        event => {

          const item =
            event.target.closest(
              ".doctor-editor-item"
            );

          if (!item) return;

          const id =
            Number(item.dataset.id);

          const doctor =
            state.doctors.find(
              d =>
                Number(d.id) === id
            );

          const file =
            event.target.files?.[0];

          if (!doctor || !file) return;

          readImageFile(
            file,
            dataUrl => {

              doctor.image =
                dataUrl;

              renderDoctors();

              renderPosterDoctors();

              persistState();

              showToast(
                "Doctor photo updated.",
                "success"
              );
            }
          );

          event.target.value = "";
        }
      );
    });
  }


  function createDoctorEditorItem(
    doctor,
    index
  ) {

    const imageStatus =
      doctor.image
        ? "Photo uploaded"
        : "No photo";


    return `
      <div
        class="doctor-editor-item"
        data-id="${escapeAttribute(doctor.id)}"
      >

        <div class="doctor-editor-item-head">

          <strong>
            Doctor ${index + 1}
          </strong>

          <button
            type="button"
            class="remove-doctor"
            title="Remove doctor"
            aria-label="Remove doctor"
          >
            ×
          </button>

        </div>


        <input
          type="text"
          data-field="name"
          value="${escapeAttribute(doctor.name)}"
          placeholder="Doctor name"
        >


        <input
          type="text"
          data-field="degree"
          value="${escapeAttribute(doctor.degree)}"
          placeholder="Degree"
        >


        <textarea
          data-field="specialty"
          placeholder="Specialty"
        >${escapeHtml(doctor.specialty)}</textarea>


        <input
          type="text"
          data-field="time"
          value="${escapeAttribute(doctor.time)}"
          placeholder="Chamber time"
        >


        <select data-field="variant">

          <option
            value="blue"
            ${doctor.variant === "blue" ? "selected" : ""}
          >
            Blue Card
          </option>

          <option
            value="green"
            ${doctor.variant === "green" ? "selected" : ""}
          >
            Green Card
          </option>

          <option
            value="purple"
            ${doctor.variant === "purple" ? "selected" : ""}
          >
            Purple Card
          </option>

          <option
            value="orange"
            ${doctor.variant === "orange" ? "selected" : ""}
          >
            Orange Card
          </option>

          <option
            value="rose"
            ${doctor.variant === "rose" ? "selected" : ""}
          >
            Rose Card
          </option>

        </select>


        <div class="doctor-upload-row">

          <button
            type="button"
            class="secondary-btn doctor-image-upload"
          >
            Upload Photo
          </button>

          <span class="doctor-image-status">
            ${escapeHtml(imageStatus)}
          </span>

        </div>


        <input
          type="file"
          class="doctor-image-input"
          accept="image/*"
          hidden
        >

      </div>
    `;
  }


  /* =======================================================
     COLOR PRESETS
  ======================================================== */

  function bindColorPresets() {

    qsa(
      "[data-preset]"
    ).forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const preset =
            button.dataset.preset;

          applyColorPreset(
            preset
          );
        }
      );
    });
  }


  const colorPresets = {

    royal: {
      background:
        "#081426"
    },

    emerald: {
      background:
        "#06251e"
    },

    purple: {
      background:
        "#1b1035"
    },

    sunset: {
      background:
        "#35150d"
    },

    rose: {
      background:
        "#34101d"
    },

    snk: {
      background:
        "#101700"
    }
  };


  function applyColorPreset(name) {

    const preset =
      colorPresets[name];

    if (!preset) return;

    state.backgroundColor =
      preset.background;

    const backgroundColor =
      $("backgroundColor");

    const backgroundColorText =
      $("backgroundColorText");


    if (backgroundColor) {
      backgroundColor.value =
        preset.background;
    }

    if (backgroundColorText) {
      backgroundColorText.value =
        preset.background;
    }


    updatePosterBackground();

    persistState();

    qsa("[data-preset]").forEach(
      button => {

        button.classList.toggle(
          "selected",
          button.dataset.preset === name
        );
      }
    );


    showToast(
      `${capitalize(name)} palette applied.`,
      "success"
    );
  }


  /* =======================================================
     ZOOM
  ======================================================== */

  function bindZoomControls() {

    const zoomOutBtn =
      $("zoomOutBtn");

    const zoomInBtn =
      $("zoomInBtn");

    const fitPreviewBtn =
      $("fitPreviewBtn");


    zoomOutBtn?.addEventListener(
      "click",
      () => {
        setZoom(
          Math.max(
            0.25,
            zoom - 0.05
          )
        );
      }
    );


    zoomInBtn?.addEventListener(
      "click",
      () => {
        setZoom(
          Math.min(
            1,
            zoom + 0.05
          )
        );
      }
    );


    fitPreviewBtn?.addEventListener(
      "click",
      fitPreview
    );


    previewStage?.addEventListener(
      "wheel",
      event => {

        if (!event.ctrlKey) return;

        event.preventDefault();

        const delta =
          event.deltaY > 0
            ? -0.03
            : 0.03;

        setZoom(
          Math.max(
            0.25,
            Math.min(
              1,
              zoom + delta
            )
          )
        );
      },
      {
        passive: false
      }
    );


    window.addEventListener(
      "resize",
      debounce(
        () => {

          if (
            window.innerWidth <= 900
          ) {
            fitPreview();
          }
        },
        150
      )
    );
  }


  function setZoom(value) {

    zoom =
      Math.round(
        value * 100
      ) / 100;

    posterWrapper.style.transform =
      `scale(${zoom})`;

    zoomValue.textContent =
      `${Math.round(zoom * 100)}%`;

    updatePreviewSpacer();
  }


  function fitPreview() {

    if (!previewStage) return;


    const stageWidth =
      previewStage.clientWidth;

    const stageHeight =
      previewStage.clientHeight;


    if (
      stageWidth <= 0 ||
      stageHeight <= 0
    ) {
      return;
    }


    const padding =
      window.innerWidth <= 640
        ? 30
        : 70;


    const availableWidth =
      Math.max(
        100,
        stageWidth - padding
      );

    const availableHeight =
      Math.max(
        100,
        stageHeight - padding
      );


    const calculatedZoom =
      Math.min(
        availableWidth / POSTER_WIDTH,
        availableHeight / POSTER_HEIGHT
      );


    setZoom(
      Math.max(
        0.2,
        Math.min(
          1,
          calculatedZoom
        )
      )
    );
  }


  function updatePreviewSpacer() {

    if (!posterWrapper) return;

    posterWrapper.style.width =
      `${POSTER_WIDTH * zoom}px`;

    posterWrapper.style.height =
      `${POSTER_HEIGHT * zoom}px`;
  }


  /* =======================================================
     MOBILE EDITOR
  ======================================================== */

  function bindMobileEditor() {

    openEditorBtn?.addEventListener(
      "click",
      openEditor
    );

    closeEditorBtn?.addEventListener(
      "click",
      closeEditor
    );

    editorOverlay?.addEventListener(
      "click",
      closeEditor
    );


    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape"
        ) {

          closeEditor();

          closeModal(
            $("exportModal")
          );

          closeModal(
            $("fileModal")
          );
        }
      }
    );
  }


  function openEditor() {

    editorPanel?.classList.add(
      "mobile-open"
    );

    editorOverlay?.classList.add(
      "active"
    );

    document.body.style.overflow =
      "hidden";
  }


  function closeEditor() {

    editorPanel?.classList.remove(
      "mobile-open"
    );

    editorOverlay?.classList.remove(
      "active"
    );

    document.body.style.overflow =
      "hidden";
  }


  /* =======================================================
     EXPORT
  ======================================================== */

  function bindExport() {

    const exportTopBtn =
      $("exportTopBtn");

    exportTopBtn?.addEventListener(
      "click",
      () => {

        openModal(
          $("exportModal")
        );
      }
    );


    qsa(
      "[data-export]"
    ).forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const format =
            button.dataset.export;

          closeModal(
            $("exportModal")
          );

          exportPoster(
            format
          );
        }
      );
    });


    $("closeExportModal")
      ?.addEventListener(
        "click",
        () => {
          closeModal(
            $("exportModal")
          );
        }
      );
  }


  async function exportPoster(
    format
  ) {

    if (
      typeof html2canvas ===
      "undefined"
    ) {

      showToast(
        "Export library is still loading.",
        "error"
      );

      return;
    }


    showToast(
      "Preparing your design...",
      "success"
    );


    try {

      const canvas =
        await html2canvas(
          poster,
          {
            width:
              POSTER_WIDTH,

            height:
              POSTER_HEIGHT,

            scale: 1,

            useCORS: true,

            allowTaint: false,

            backgroundColor:
              state.backgroundColor,

            logging: false
          }
        );


      if (
        format === "png"
      ) {

        downloadCanvas(
          canvas,
          "snk-design-studio.png",
          "image/png"
        );

      } else if (
        format === "jpg"
      ) {

        const jpgCanvas =
          document.createElement(
            "canvas"
          );

        jpgCanvas.width =
          POSTER_WIDTH;

        jpgCanvas.height =
          POSTER_HEIGHT;


        const ctx =
          jpgCanvas.getContext(
            "2d"
          );


        ctx.fillStyle =
          state.backgroundColor;

        ctx.fillRect(
          0,
          0,
          POSTER_WIDTH,
          POSTER_HEIGHT
        );


        ctx.drawImage(
          canvas,
          0,
          0
        );


        downloadCanvas(
          jpgCanvas,
          "snk-design-studio.jpg",
          "image/jpeg",
          0.94
        );

      } else if (
        format === "pdf"
      ) {

        exportPdf(
          canvas
        );

      }


      showToast(
        `${format.toUpperCase()} export completed.`,
        "success"
      );

    } catch (error) {

      console.error(
        "Export error:",
        error
      );

      showToast(
        "Export failed. Please try again.",
        "error"
      );
    }
  }


  function downloadCanvas(
    canvas,
    filename,
    type,
    quality
  ) {

    const link =
      document.createElement(
        "a"
      );

    link.download =
      filename;

    link.href =
      canvas.toDataURL(
        type,
        quality
      );

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();
  }


  function exportPdf(canvas) {

    /*
      Lightweight PDF generator.

      Creates a single-page PDF containing
      the exported poster image.
    */

    const imageData =
      canvas.toDataURL(
        "image/jpeg",
        0.92
      );


    const pdf =
      createSimplePdf(
        imageData,
        POSTER_WIDTH,
        POSTER_HEIGHT
      );


    const blob =
      new Blob(
        [pdf],
        {
          type:
            "application/pdf"
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        "a"
      );

    link.href =
      url;

    link.download =
      "snk-design-studio.pdf";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();


    setTimeout(
      () => {
        URL.revokeObjectURL(
          url
        );
      },
      1000
    );
  }


  /*
    Creates a minimal image PDF.

    This is intentionally dependency-free so
    the Design Studio can remain a single static
    GitHub Pages application.
  */

  function createSimplePdf(
    dataUrl,
    width,
    height
  ) {

    const base64 =
      dataUrl.split(",")[1];

    const binary =
      atob(base64);

    const imageBytes =
      new Uint8Array(
        binary.length
      );


    for (
      let i = 0;
      i < binary.length;
      i++
    ) {

      imageBytes[i] =
        binary.charCodeAt(i);
    }


    const encoder =
      new TextEncoder();


    const objects = [];


    function addObject(
      content
    ) {

      objects.push(
        content
      );

      return objects.length;
    }


    const catalogId =
      addObject(
        "<< /Type /Catalog /Pages 2 0 R >>"
      );


    const pagesId =
      addObject(
        "<< /Type /Pages /Kids [3 0 R] /Count 1 >>"
      );


    const pageId =
      addObject(
        `<<
          /Type /Page
          /Parent 2 0 R
          /MediaBox [0 0 ${width} ${height}]
          /Resources <<
            /XObject <<
              /Im0 5 0 R
            >>
          >>
          /Contents 4 0 R
        >>`
      );


    const imageObject =
      `<<
        /Length ${imageBytes.length}
        /Subtype /Image
        /Type /XObject
        /Width ${width}
        /Height ${height}
        /ColorSpace /DeviceRGB
        /BitsPerComponent 8
        /Filter /DCTDecode
      >>`;


    const contentStream =
      encoder.encode(
        `q
${width} 0 0 ${height} 0 0 cm
/Im0 Do
Q`
      );


    const chunks = [];


    const header =
      encoder.encode(
        "%PDF-1.4\n%\xFF\xFF\xFF\xFF\n"
      );


    chunks.push(
      header
    );


    const offsets = [0];

    let position =
      header.length;


    function pushBytes(
      bytes
    ) {

      chunks.push(
        bytes
      );

      position +=
        bytes.length;
    }


    /*
      Object 1
    */

    offsets[1] =
      position;

    const obj1 =
      encoder.encode(
        `1 0 obj\n${objects[0]}\nendobj\n`
      );

    pushBytes(obj1);


    /*
      Object 2
    */

    offsets[2] =
      position;

    const obj2 =
      encoder.encode(
        `2 0 obj\n${objects[1]}\nendobj\n`
      );

    pushBytes(obj2);


    /*
      Object 3
    */

    offsets[3] =
      position;

    const obj3 =
      encoder.encode(
        `3 0 obj\n${objects[2]}\nendobj\n`
      );

    pushBytes(obj3);


    /*
      Object 4
    */

    offsets[4] =
      position;

    const obj4 =
      encoder.encode(
        `4 0 obj
<< /Length ${contentStream.length} >>
stream
q
${width} 0 0 ${height} 0 0 cm
/Im0 Do
Q
endstream
endobj
`
      );

    pushBytes(obj4);


    /*
      Object 5
    */

    offsets[5] =
      position;


    const imageHeader =
      encoder.encode(
        `5 0 obj\n${imageObject}\nstream\n`
      );

    pushBytes(
      imageHeader
    );

    pushBytes(
      imageBytes
    );


    const imageFooter =
      encoder.encode(
        "\nendstream\nendobj\n"
      );

    pushBytes(
      imageFooter
    );


    const xrefPosition =
      position;


    let xref =
      "xref\n0 6\n";

    xref +=
      "0000000000 65535 f \n";


    for (
      let i = 1;
      i <= 5;
      i++
    ) {

      xref +=
        String(
          offsets[i]
        ).padStart(
          10,
          "0"
        ) +
        " 00000 n \n";
    }


    xref +=
      `trailer
<<
  /Size 6
  /Root ${catalogId} 0 R
>>
startxref
${xrefPosition}
%%EOF`;


    pushBytes(
      encoder.encode(xref)
    );


    /*
      Combine chunks.
    */

    let totalLength = 0;

    chunks.forEach(
      chunk => {
        totalLength +=
          chunk.length;
      }
    );


    const output =
      new Uint8Array(
        totalLength
      );


    let offset = 0;


    chunks.forEach(
      chunk => {

        output.set(
          chunk,
          offset
        );

        offset +=
          chunk.length;
      }
    );


    return output;
  }


  /* =======================================================
     SAVE / OPEN JSON
  ======================================================== */

  function bindSaveOpen() {

    const saveDesignBtn =
      $("saveDesignBtn");

    const openDesignBtn =
      $("openDesignBtn");


    saveDesignBtn?.addEventListener(
      "click",
      () => {

        $("fileModalTitle").textContent =
          "Save Design";

        $("fileModalDescription").textContent =
          "Save your current poster configuration.";

        $("saveDesignArea")
          ?.classList.remove(
            "hidden"
          );

        $("openDesignArea")
          ?.classList.add(
            "hidden"
          );

        openModal(
          $("fileModal")
        );
      }
    );


    openDesignBtn?.addEventListener(
      "click",
      () => {

        $("fileModalTitle").textContent =
          "Open Design";

        $("fileModalDescription").textContent =
          "Choose a previously saved JSON design.";

        $("saveDesignArea")
          ?.classList.add(
            "hidden"
          );

        $("openDesignArea")
          ?.classList.remove(
            "hidden"
          );

        openModal(
          $("fileModal")
        );
      }
    );


    $("downloadJsonBtn")
      ?.addEventListener(
        "click",
        downloadJson
      );


    $("jsonFileInput")
      ?.addEventListener(
        "change",
        handleJsonOpen
      );


    $("closeFileModal")
      ?.addEventListener(
        "click",
        () => {

          closeModal(
            $("fileModal")
          );
        }
      );
  }


  function downloadJson() {

    const data =
      JSON.stringify(
        state,
        null,
        2
      );


    const blob =
      new Blob(
        [data],
        {
          type:
            "application/json"
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        "a"
      );

    link.href =
      url;

    link.download =
      "snk-design-studio.json";


    document.body.appendChild(
      link
    );

    link.click();

    link.remove();


    URL.revokeObjectURL(
      url
    );


    closeModal(
      $("fileModal")
    );


    showToast(
      "Design JSON saved.",
      "success"
    );
  }


  function handleJsonOpen(event) {

    const file =
      event.target.files?.[0];

    if (!file) return;


    const reader =
      new FileReader();


    reader.onload = event => {

      try {

        const imported =
          JSON.parse(
            event.target.result
          );


        state =
          normalizeState(
            imported
          );


        persistState();

        renderAll();

        closeModal(
          $("fileModal")
        );


        showToast(
          "Design opened successfully.",
          "success"
        );


      } catch (error) {

        console.error(
          error
        );

        showToast(
          "Invalid JSON design file.",
          "error"
        );
      }
    };


    reader.onerror = () => {

      showToast(
        "Could not read JSON file.",
        "error"
      );
    };


    reader.readAsText(
      file
    );


    event.target.value = "";
  }


  /* =======================================================
     RESET
  ======================================================== */

  function bindReset() {

    const resetDesignBtn =
      $("resetDesignBtn");

    resetDesignBtn?.addEventListener(
      "click",
      () => {

        const confirmed =
          window.confirm(
            "Reset the entire design and restore the default poster?"
          );

        if (!confirmed) return;


        state =
          cloneDefaultState();


        persistState();

        renderAll();

        showToast(
          "Design reset successfully.",
          "success"
        );


        if (
          window.innerWidth <= 900
        ) {
          closeEditor();
        }
      }
    );
  }


  /* =======================================================
     RENDER ALL
  ======================================================== */

  function renderAll() {

    syncInputs();

    updateTextFields();

    updatePosterBackground();

    updatePosterCover();

    updatePosterLogo();

    renderDoctors();

    renderPosterDoctors();

    setZoom(
      zoom
    );
  }


  /* =======================================================
     SYNC INPUTS
  ======================================================== */

  function syncInputs() {

    const fields = {

      logoTitle:
        state.logoTitle,

      miniTitle:
        state.miniTitle,

      mainTitle:
        state.mainTitle,

      addressText:
        state.address,

      phoneText:
        state.phone,

      websiteText:
        state.website,

      facebookText:
        state.facebook
    };


    Object.entries(fields)
      .forEach(
        ([id, value]) => {

          const element =
            $(id);

          if (element) {
            element.value =
              value ?? "";
          }
        }
      );


    const backgroundColor =
      $("backgroundColor");

    const backgroundColorText =
      $("backgroundColorText");


    if (backgroundColor) {

      backgroundColor.value =
        state.backgroundColor;
    }


    if (backgroundColorText) {

      backgroundColorText.value =
        state.backgroundColor;
    }
  }


  /* =======================================================
     UPDATE TEXT
  ======================================================== */

  function updateTextFields() {

    posterMiniTitle.textContent =
      state.miniTitle ||
      "বিশেষজ্ঞ চিকিৎসকবৃন্দ";


    posterMainTitle.textContent =
      state.mainTitle ||
      "OUR SPECIALIST DOCTORS";


    posterAddress.textContent =
      state.address ||
      "Sreemangal Road, Berirpar, Moulvibazar";


    posterPhone.textContent =
      state.phone ||
      "+880 1XXXXXXXXX";


    posterWebsite.textContent =
      state.website ||
      "www.example.com";


    posterFacebook.textContent =
      state.facebook ||
      "facebook.com/example";
  }


  /* =======================================================
     POSTER BACKGROUND
  ======================================================== */

  function updatePosterBackground() {

    if (!posterBackground) return;


    poster.style.background =
      state.backgroundColor ||
      "#081426";


    if (
      state.backgroundImage
    ) {

      posterBackground.style.backgroundImage =
        `url("${state.backgroundImage}")`;

    } else {

      posterBackground.style.backgroundImage =
        "none";
    }


    const backgroundColor =
      state.backgroundColor ||
      "#081426";


    posterBackground.style.backgroundColor =
      backgroundColor;
  }


  /* =======================================================
     POSTER COVER
  ======================================================== */

  function updatePosterCover() {

    if (!posterCover) return;


    if (
      state.coverImage
    ) {

      posterCover.style.backgroundImage =
        `url("${state.coverImage}")`;

      posterCover.style.display =
        "block";

    } else {

      posterCover.style.backgroundImage =
        "none";

      posterCover.style.display =
        "none";
    }
  }


  /* =======================================================
     POSTER LOGO
  ======================================================== */

  function updatePosterLogo() {

    if (!posterLogo) return;


    if (
      state.logoImage
    ) {

      posterLogo.src =
        state.logoImage;

      posterLogo.alt =
        state.logoTitle ||
        "Organization Logo";

      return;
    }


    posterLogo.src =
      createDefaultLogoSvg(
        state.logoTitle ||
        "ROYAL SPECIALIZED HOSPITAL"
      );


    posterLogo.alt =
      state.logoTitle ||
      "Organization Logo";
  }


  /* =======================================================
     DEFAULT SVG LOGO
  ======================================================== */

  function createDefaultLogoSvg(
    title
  ) {

    const safeTitle =
      escapeXml(
        title
      );


    const svg = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="500"
        height="500"
        viewBox="0 0 500 500"
      >

        <rect
          width="500"
          height="500"
          rx="70"
          fill="#ffffff"
        />

        <circle
          cx="250"
          cy="170"
          r="88"
          fill="#081426"
        />

        <path
          d="M250 105
             L250 235
             M185 170
             L315 170"
          stroke="#b7ff00"
          stroke-width="24"
          stroke-linecap="round"
        />

        <text
          x="250"
          y="330"
          text-anchor="middle"
          font-family="Arial, sans-serif"
          font-size="28"
          font-weight="800"
          fill="#081426"
        >
          ${safeTitle}
        </text>

        <text
          x="250"
          y="370"
          text-anchor="middle"
          font-family="Arial, sans-serif"
          font-size="15"
          fill="#52606d"
        >
          SPECIALIZED HEALTHCARE
        </text>

      </svg>
    `;


    return (
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(svg)
    );
  }


  /* =======================================================
     POSTER DOCTORS
  ======================================================== */

  function renderPosterDoctors() {

    if (!posterDoctorGrid) return;


    posterDoctorGrid.innerHTML =
      state.doctors
        .map(
          (doctor, index) =>
            createPosterDoctorCard(
              doctor,
              index
            )
        )
        .join("");
  }


  function createPosterDoctorCard(
    doctor,
    index
  ) {

    const variant =
      [
        "blue",
        "green",
        "purple",
        "orange",
        "rose"
      ].includes(
        doctor.variant
      )
        ? doctor.variant
        : "blue";


    const photo =
      doctor.image ||
      createDoctorAvatar(
        doctor.name,
        index
      );


    return `
      <article
        class="poster-doctor-card variant-${variant}"
      >

        <div class="doctor-photo-wrap">

          <img
            class="doctor-photo"
            src="${photo}"
            alt="${escapeAttribute(doctor.name)}"
          >

        </div>


        <div class="doctor-content">

          <div class="doctor-name">
            ${escapeHtml(
              doctor.name ||
              "নতুন চিকিৎসক"
            )}
          </div>


          <div class="doctor-degree">
            ${escapeHtml(
              doctor.degree ||
              "MBBS"
            )}
          </div>


          <div class="doctor-specialty">
            ${escapeHtml(
              doctor.specialty ||
              "বিশেষজ্ঞ চিকিৎসক"
            )}
          </div>


          <div class="doctor-time">
            ${escapeHtml(
              doctor.time ||
              "চেম্বার সময়"
            )}
          </div>

        </div>

      </article>
    `;
  }


  /* =======================================================
     DOCTOR AVATAR
  ======================================================== */

  function createDoctorAvatar(
    name,
    index
  ) {

    const female =
      /ফারজানা|নুসরাত|সামিয়া|সামিয়া|তানজিলা|জাহান|আক্তার|রহমান/i
        .test(
          name || ""
        );


    const bg =
      female
        ? "#f3d7df"
        : "#dbe8f5";


    const shirt =
      female
        ? "#7d2d51"
        : "#214d78";


    const skin =
      "#d69a72";


    const hair =
      female
        ? "#291b22"
        : "#171717";


    const svg = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="400"
        height="400"
        viewBox="0 0 400 400"
      >

        <rect
          width="400"
          height="400"
          fill="${bg}"
        />

        <circle
          cx="200"
          cy="145"
          r="72"
          fill="${skin}"
        />

        <path
          d="
            M128 143
            C128 72,
            272 70,
            273 145
            C250 115,
            222 105,
            190 111
            C165 114,
            145 128,
            128 143
            Z
          "
          fill="${hair}"
        />

        <circle
          cx="174"
          cy="153"
          r="6"
          fill="#222"
        />

        <circle
          cx="226"
          cy="153"
          r="6"
          fill="#222"
        />

        <path
          d="
            M177 187
            C190 196,
            210 196,
            223 187
          "
          stroke="#713f2b"
          stroke-width="5"
          fill="none"
          stroke-linecap="round"
        />

        <path
          d="
            M110 390
            C115 280,
            145 242,
            200 242
            C255 242,
            285 280,
            290 390
            Z
          "
          fill="${shirt}"
        />

        <path
          d="
            M165 245
            L200 305
            L235 245
          "
          fill="#ffffff"
        />

        <path
          d="
            M200 305
            L200 390
          "
          stroke="#d4dce4"
          stroke-width="5"
        />

        <circle
          cx="254"
          cy="322"
          r="20"
          fill="#ffffff"
          stroke="#d1d7dc"
          stroke-width="3"
        />

        <path
          d="
            M244 322
            L264 322
            M254 312
            L254 332
          "
          stroke="#2c6fa3"
          stroke-width="4"
          stroke-linecap="round"
        />

      </svg>
    `;


    return (
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(svg)
    );
  }


  /* =======================================================
     MODAL HELPERS
  ======================================================== */

  function openModal(modal) {

    if (!modal) return;

    modal.classList.add(
      "show"
    );

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";
  }


  function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove(
      "show"
    );

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    if (
      !editorPanel?.classList.contains(
        "mobile-open"
      )
    ) {
      document.body.style.overflow =
        "hidden";
    }
  }


  qsa(".modal").forEach(
    modal => {

      modal.addEventListener(
        "click",
        event => {

          if (
            event.target === modal
          ) {

            closeModal(
              modal
            );
          }
        }
      );
    }
  );


  /* =======================================================
     TOAST
  ======================================================== */

  function showToast(
    message,
    type = "success"
  ) {

    const toast =
      $("toast");

    const toastMessage =
      $("toastMessage");


    if (
      !toast ||
      !toastMessage
    ) {
      return;
    }


    clearTimeout(
      toastTimer
    );


    toastMessage.textContent =
      message;


    toast.classList.remove(
      "success",
      "error"
    );


    toast.classList.add(
      type
    );


    toast.classList.add(
      "show"
    );


    toastTimer =
      setTimeout(
        () => {

          toast.classList.remove(
            "show"
          );

        },
        2600
      );
  }


  /* =======================================================
     UTILITIES
  ======================================================== */

  function normalizeHex(
    value
  ) {

    let color =
      String(
        value || ""
      )
        .trim()
        .replace(
          /^#/,
          ""
        );


    if (
      color.length === 3
    ) {

      color =
        color
          .split("")
          .map(
            char =>
              char + char
          )
          .join("");
    }


    return (
      "#" +
      color
        .slice(0, 6)
        .toUpperCase()
    );
  }


  function isValidHex(
    value
  ) {

    return /^#[0-9A-F]{6}$/i.test(
      value
    );
  }


  function capitalize(
    value
  ) {

    if (!value) return "";

    return (
      value.charAt(0)
        .toUpperCase() +
      value.slice(1)
    );
  }


  function escapeHtml(
    value
  ) {

    return String(
      value ?? ""
    )
      .replace(
        /&/g,
        "&amp;"
      )
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&#039;"
      );
  }


  function escapeAttribute(
    value
  ) {

    return escapeHtml(
      value
    );
  }


  function escapeXml(
    value
  ) {

    return String(
      value ?? ""
    )
      .replace(
        /&/g,
        "&amp;"
      )
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&apos;"
      );
  }


  function debounce(
    callback,
    delay
  ) {

    let timer;

    return (
      ...args
    ) => {

      clearTimeout(
        timer
      );

      timer =
        setTimeout(
          () => {
            callback(
              ...args
            );
          },
          delay
        );
    };
  }


  /* =======================================================
     INITIAL STORAGE
  ======================================================== */

  persistState();


  /* =======================================================
     OPTIONAL AUTO-SAVE
  ======================================================== */

  setInterval(
    () => {

      persistState();

    },
    10000
  );


  /* =======================================================
     CONSOLE
  ======================================================== */

  console.log(
    "%cSNK Design Studio",
    "font-size:20px;font-weight:800;color:#b7ff00;"
  );

  console.log(
    "Design Studio initialized successfully."
  );

});
