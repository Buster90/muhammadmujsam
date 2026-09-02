/**
 * Muhammad Mujasam — Portfolio Main Controller
 * Handles UI interactions, themes, animations, modals, and dynamic components
 */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light Mode)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const htmlRoot = document.documentElement;

  // Retrieve stored theme or default to dark
  const storedTheme = localStorage.getItem("portfolio_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "dark"); // Default dark per prompt

  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlRoot.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio_theme", theme);
  }

  // ------------------------------------------------------------------------
  // 2. Sticky Header & Scrollspy
  // ------------------------------------------------------------------------
  const siteHeader = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add("scrolled");
    } else {
      siteHeader?.classList.remove("scrolled");
    }

    // Scrollspy for active nav link
    let currentSectionId = "";
    sections.forEach((sec) => {
      const sectionTop = sec.offsetTop - 120;
      const sectionHeight = sec.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // ------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // ------------------------------------------------------------------------
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileBackdrop = document.getElementById("mobile-backdrop");
  const mobileLinks = document.querySelectorAll(".mobile-drawer .nav-link");

  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer?.classList.contains("open");
    if (isOpen) {
      mobileDrawer?.classList.add("open");
      mobileBackdrop?.classList.add("open");
      mobileToggle?.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      mobileDrawer?.classList.remove("open");
      mobileBackdrop?.classList.remove("open");
      mobileToggle?.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  mobileToggle?.addEventListener("click", () => toggleMobileMenu());
  mobileBackdrop?.addEventListener("click", () => toggleMobileMenu(false));

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMobileMenu(false));
  });

  // ------------------------------------------------------------------------
  // 4. Interactive Hero Smartphone Mockup
  // ------------------------------------------------------------------------
  const appTabBtns = document.querySelectorAll(".app-tab-btn");
  const appViews = document.querySelectorAll(".phone-app-view");

  appTabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      const targetViewId = tabBtn.getAttribute("data-tab-target");

      appTabBtns.forEach((btn) => btn.classList.remove("active"));
      appViews.forEach((view) => view.classList.remove("active"));

      tabBtn.classList.add("active");
      const targetView = document.getElementById(targetViewId);
      if (targetView) targetView.classList.add("active");
    });
  });

  // Interactive Task item checkboxes inside phone preview
  const phoneCheckboxes = document.querySelectorAll(".task-checkbox");
  const phoneProgressBar = document.querySelector(".progress-bar-fill");
  const phoneProgressVal = document.querySelector(".progress-val");

  phoneCheckboxes.forEach((box) => {
    box.addEventListener("click", () => {
      box.classList.toggle("checked");
      if (box.classList.contains("checked")) {
        box.innerHTML = "✓";
        box.style.background = "#10b981";
        box.style.borderColor = "#10b981";
        box.style.color = "#ffffff";
        box.closest(".task-item-card").querySelector(".task-name").style.textDecoration = "line-through";
        box.closest(".task-item-card").querySelector(".task-name").style.opacity = "0.6";
      } else {
        box.innerHTML = "";
        box.style.background = "";
        box.style.borderColor = "";
        box.style.color = "";
        box.closest(".task-item-card").querySelector(".task-name").style.textDecoration = "none";
        box.closest(".task-item-card").querySelector(".task-name").style.opacity = "1";
      }

      // Update progress calculation
      const total = phoneCheckboxes.length;
      const checkedCount = document.querySelectorAll(".task-checkbox.checked").length;
      const pct = Math.round((checkedCount / total) * 100);
      if (phoneProgressBar) phoneProgressBar.style.width = `${pct}%`;
      if (phoneProgressVal) phoneProgressVal.textContent = `${pct}%`;
    });
  });

  // ------------------------------------------------------------------------
  // 5. Animated Statistics Counters
  // ------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll(".stat-number");
  let animatedStats = false;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          statNumbers.forEach((stat) => {
            const targetVal = parseFloat(stat.getAttribute("data-target"));
            const isDecimal = targetVal % 1 !== 0;
            const duration = 1600; // ms
            const frameRate = 30;
            const totalSteps = duration / frameRate;
            let step = 0;

            const counter = setInterval(() => {
              step++;
              const progress = step / totalSteps;
              const currentVal = targetVal * Math.min(progress, 1);

              stat.textContent = isDecimal ? currentVal.toFixed(1) : Math.round(currentVal);

              if (step >= totalSteps) {
                stat.textContent = isDecimal ? targetVal.toFixed(1) : targetVal;
                clearInterval(counter);
              }
            }, frameRate);
          });
        }
      });
    },
    { threshold: 0.25 }
  );

  const statsContainer = document.querySelector(".stats-column");
  if (statsContainer) statsObserver.observe(statsContainer);

  // ------------------------------------------------------------------------
  // 6. Technical Skills Category Filter
  // ------------------------------------------------------------------------
  const skillFilterBtns = document.querySelectorAll(".filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      skillFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      skillCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "flex";
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 7. Modals (Project Details & Resume)
  // ------------------------------------------------------------------------
  const projectModal = document.getElementById("project-modal");
  const resumeModal = document.getElementById("resume-modal");

  // Project Modal Triggers
  const projectBtns = document.querySelectorAll(".view-project-btn");
  projectBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute("data-project-id");
      openProjectModal(projectId);
    });
  });

  function openProjectModal(projectId) {
    const data = typeof PROJECTS_DATA !== "undefined" ? PROJECTS_DATA[projectId] : null;
    if (!data || !projectModal) return;

    const modalTitle = document.getElementById("modal-project-title");
    const modalCategory = document.getElementById("modal-project-category");
    const modalAward = document.getElementById("modal-project-award");
    const modalOverview = document.getElementById("modal-project-overview");
    const modalFeaturesList = document.getElementById("modal-project-features");
    const modalTechStack = document.getElementById("modal-project-tech");
    const modalArch = document.getElementById("modal-project-arch");
    const modalGithubLink = document.getElementById("modal-github-link");

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;

    if (modalAward) {
      if (data.award) {
        modalAward.style.display = "inline-flex";
        modalAward.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          ${data.award}
        `;
      } else {
        modalAward.style.display = "none";
      }
    }

    if (modalOverview) modalOverview.textContent = data.overview;

    if (modalFeaturesList) {
      modalFeaturesList.innerHTML = data.features
        .map(
          (f) => `
          <li class="project-feature-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${f}</span>
          </li>
        `
        )
        .join("");
    }

    if (modalTechStack) {
      modalTechStack.innerHTML = data.technologies
        .map((t) => `<span class="tech-pill">${t}</span>`)
        .join("");
    }

    if (modalArch) modalArch.textContent = data.architecture || "Clean, scalable modern architecture.";

    if (modalGithubLink) {
      modalGithubLink.href = data.githubUrl || "https://github.com/muhammadmujasam";
    }

    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Resume Modal Triggers
  const resumeBtns = document.querySelectorAll(".resume-trigger-btn");
  resumeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Print Resume Handler
  const printResumeBtn = document.getElementById("print-resume-btn");
  if (printResumeBtn) {
    printResumeBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Close modals
  const modalCloseBtns = document.querySelectorAll(".modal-close-btn");
  modalCloseBtns.forEach((btn) => {
    btn.addEventListener("click", () => closeModal());
  });

  const modalOverlays = document.querySelectorAll(".modal-overlay");
  modalOverlays.forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  function closeModal() {
    modalOverlays.forEach((modal) => modal.classList.remove("active"));
    document.body.style.overflow = "";
  }

  // ------------------------------------------------------------------------
  // 8. Scroll Reveal Animations
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});
