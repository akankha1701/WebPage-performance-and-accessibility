/* =========================================================
   AKANKHA INTERACTIVE PORTFOLIO - JAVASCRIPT
   DOM manipulation, event handling, validation and animation
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll("main section[id]")];
    const backToTop = document.getElementById("backToTop");
    const year = document.getElementById("year");

    // ---------- Current year ----------
    year.textContent = new Date().getFullYear();

    // ---------- Mobile navigation ----------
    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });

    // ---------- Dark mode with localStorage ----------
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark") {
        body.classList.add("dark");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        const dark = body.classList.contains("dark");
        themeToggle.textContent = dark ? "☀️" : "🌙";
        localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
    });

    // ---------- Typing effect (disabled for reduced-motion preference) ----------
    const typingText = document.getElementById("typingText");
    const phrases = ["Responsive Websites", "Interactive UIs", "Clean Web Experiences"];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const phrase = phrases[phraseIndex];
        typingText.textContent = deleting
            ? phrase.substring(0, charIndex--)
            : phrase.substring(0, charIndex++);

        let delay = deleting ? 55 : 90;

        if (!deleting && charIndex === phrase.length + 1) {
            deleting = true;
            delay = 1400;
        } else if (deleting && charIndex < 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            charIndex = 0;
            delay = 350;
        }

        setTimeout(typeEffect, delay);
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) typeEffect();
    else typingText.textContent = phrases[0];

    // ---------- Scroll reveal + skill bar animation ----------
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");

            entry.target.querySelectorAll(".skill-bar span").forEach(bar => {
                bar.style.width = bar.dataset.width;
            });

            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    // ---------- Active navigation based on visible section ----------
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(section => sectionObserver.observe(section));

    // ---------- Back to top ----------
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 450);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ---------- Project detail modal ----------
    const projectData = {
        portfolio: {
            type: "WEB DESIGN",
            title: "Portfolio Website",
            description: "A personal portfolio page originally created with HTML and CSS. This internship upgrade adds JavaScript-driven interactions without changing the core purpose of the page.",
            features: ["Responsive layout", "Dark mode", "Scroll reveal animations", "Interactive navigation"]
        },
        todo: {
            type: "JAVASCRIPT",
            title: "To-Do List",
            description: "A simple task-management interface designed around everyday task creation and organization.",
            features: ["DOM manipulation", "Event handling", "Dynamic task updates", "User-friendly interface"]
        },
        responsive: {
            type: "RESPONSIVE",
            title: "Responsive Website",
            description: "A webpage designed to adapt its layout across desktop, tablet and mobile screen sizes.",
            features: ["CSS media queries", "Flexible grid layout", "Mobile-first considerations", "Cross-device UI"]
        }
    };

    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalType = document.getElementById("modalType");
    const modalDescription = document.getElementById("modalDescription");
    const modalFeatures = document.getElementById("modalFeatures");
    const modalClose = document.getElementById("modalClose");

    let lastFocusedElement = null;
    function openModal(projectKey) {
        const project = projectData[projectKey];
        if (!project) return;

        lastFocusedElement = document.activeElement;
        modalType.textContent = project.type;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalFeatures.replaceChildren();
        project.features.forEach(feature => {
            const item = document.createElement("div");
            item.textContent = `✓  ${feature}`;
            modalFeatures.appendChild(item);
        });

        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        body.classList.add("modal-open");
        modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        body.classList.remove("modal-open");
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    document.querySelectorAll(".project-card").forEach(card => {
        card.querySelector(".project-btn").addEventListener("click", () => {
            openModal(card.dataset.project);
        });
    });

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", event => {
        if (event.target.hasAttribute("data-close-modal")) closeModal();
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && modal.classList.contains("show")) closeModal();
    });

    // ---------- Contact form validation ----------
    const form = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    function setError(input, message) {
        const group = input.closest(".form-group");
        group.classList.toggle("invalid", Boolean(message));
        group.querySelector(".error-message").textContent = message;
    }

    function validateForm() {
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");
        let valid = true;

        if (name.value.trim().length < 2) {
            setError(name, "Please enter your name.");
            valid = false;
        } else setError(name, "");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            setError(email, "Please enter a valid email.");
            valid = false;
        } else setError(email, "");

        if (subject.value.trim().length < 3) {
            setError(subject, "Please enter a subject.");
            valid = false;
        } else setError(subject, "");

        if (message.value.trim().length < 10) {
            setError(message, "Message should contain at least 10 characters.");
            valid = false;
        } else setError(message, "");

        return valid;
    }

    form.addEventListener("submit", event => {
        event.preventDefault();
        formStatus.className = "form-status";

        if (!validateForm()) {
            formStatus.textContent = "Please correct the highlighted fields.";
            formStatus.classList.add("error");
            return;
        }

        formStatus.textContent = "Message validated successfully! This demo form is ready to connect to a backend/email service.";
        formStatus.classList.add("success");
        form.reset();
    });

    // Validate fields as the user types after the first submit attempt.
    form.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", () => {
            if (formStatus.classList.contains("error")) validateForm();
        });
    });
});
