const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const reveals = document.querySelectorAll(".reveal");
const offerLinks = document.querySelectorAll("[data-offer]");
const offerSelect = document.querySelector("#offer-select");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      "stroke-width": 1.7,
    },
  });
}

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Ouvrir le menu");
  mainNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
  mainNav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
    closeMenu();
    menuButton.focus();
  }
});

window.matchMedia("(min-width: 821px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 40),
  { passive: true },
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

reveals.forEach((element) => revealObserver.observe(element));

offerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    offerSelect.value = link.dataset.offer;
  });
});

document.querySelectorAll(".accordion details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".accordion details").forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});

form.addEventListener("submit", (event) => {
  const isLocalPreview =
    window.location.protocol === "file:" ||
    ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const submitButton = form.querySelector('button[type="submit"]');

  if (isLocalPreview) {
    event.preventDefault();
    formStatus.textContent =
      "Le formulaire sera actif après le déploiement du site sur Netlify.";
    return;
  }

  submitButton.disabled = true;
  form.setAttribute("aria-busy", "true");
  formStatus.textContent = "Envoi de votre demande…";
});

document.querySelector("#year").textContent = new Date().getFullYear();
