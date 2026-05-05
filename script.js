document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Sticky header shadow on scroll */
  const header = document.getElementById("siteHeader");
  const toggleHeaderShadow = () => {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", toggleHeaderShadow);
  toggleHeaderShadow();

  /* Mobile menu toggle */
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");

  const closeMenu = () => {
    nav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  /* Close mobile menu after clicking any nav link */
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  /* Smooth scroll (native via CSS, but offset-safe for anchors) */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    });
  });

  /* Fade-in on scroll (IntersectionObserver) */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach((el) => io.observe(el));
  } else {
    /* Fallback: reveal all immediately */
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* Contact Form Validation */
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const formSuccess = document.getElementById("formSuccess");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setError = (input, errorEl, message) => {
    input.classList.add("invalid");
    errorEl.textContent = message;
  };

  const clearError = (input, errorEl) => {
    input.classList.remove("invalid");
    errorEl.textContent = "";
  };

  /* Live clear on typing */
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
      const errEl = document.getElementById(`${input.id}Error`);
      clearError(input, errEl);
      formSuccess.textContent = "";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    formSuccess.textContent = "";

    /* Name */
    if (nameInput.value.trim().length < 2) {
      setError(
        nameInput,
        nameError,
        "Please enter your name (min 2 characters).",
      );
      isValid = false;
    } else clearError(nameInput, nameError);

    /* Email */
    if (!emailRegex.test(emailInput.value.trim())) {
      setError(emailInput, emailError, "Please enter a valid email address.");
      isValid = false;
    } else clearError(emailInput, emailError);

    /* Message */
    if (messageInput.value.trim().length < 10) {
      setError(
        messageInput,
        messageError,
        "Message should be at least 10 characters.",
      );
      isValid = false;
    } else clearError(messageInput, messageError);

    if (isValid) {
      /* No backend — simulate success */
      formSuccess.textContent =
        "✓ Thanks! Your message has been sent successfully.";
      form.reset();
    }
  });

  /* Active nav link highlight on scroll */
  const sections = document.querySelectorAll("main section[id]");
  const setActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach((l) => (l.style.color = ""));
        link.style.color = "var(--accent)";
      }
    });
  };
  window.addEventListener("scroll", setActiveLink);
});
