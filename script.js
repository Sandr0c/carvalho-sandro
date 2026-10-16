/* =========================================
   1. MENU DE NAVIGATION MOBILE
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");

    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );

    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Fermer le menu après avoir cliqué sur un lien.

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// Fermer le menu avec la touche Échap.

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// Fermer le menu si la fenêtre est agrandie.

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});


/* =========================================
   2. THÈME CLAIR / THÈME SOMBRE
========================================= */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("portfolio-theme");

// Restaurer le thème enregistré.

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}

function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-theme");

    themeIcon.className = isDark
        ? "fas fa-sun"
        : "fas fa-moon";

    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Activer le thème clair"
            : "Activer le thème sombre"
    );
}

updateThemeButton();

// Changer de thème au clic.

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();
});


/* =========================================
   3. ANNÉE AUTOMATIQUE DANS LE FOOTER
========================================= */

const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();


/* =========================================
   4. ANIMATIONS AU DÉFILEMENT
========================================= */

// Ajouter la classe reveal aux éléments à animer.

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-card, " +
    ".skill-card, " +
    ".project-card, " +
    ".timeline-item, " +
    ".contact-information, " +
    ".contact-form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

// Observer les éléments visibles à l'écran.

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    // Afficher directement le contenu si les animations
    // ne sont pas prises en charge ou doivent être réduites.

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =========================================
   5. LIEN ACTIF DANS LE MENU
========================================= */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const sectionId = entry.target.id;

                    navLinks.forEach((link) => {

                        const isActive =
                            link.getAttribute("href") === `#${sectionId}`;

                        link.classList.toggle("active", isActive);

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* =========================================
   6. FORMULAIRE DE CONTACT
========================================= */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", (event) => {

    // Empêcher l'envoi classique du formulaire.

    event.preventDefault();

    // Récupérer les informations saisies.

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Vérifier que les champs sont renseignés.

    if (!name || !email || !subject || !message) {

        formMessage.textContent =
            "Merci de remplir tous les champs.";

        return;
    }

    // Remplace cette adresse par ton adresse e-mail.

    const destination = "ton.adresse@email.com";

    // Construire le contenu de l'e-mail.

    const emailSubject = encodeURIComponent(subject);

    const emailBody = encodeURIComponent(
        `Bonjour,\n\n` +
        `Nom : ${name}\n` +
        `E-mail : ${email}\n\n` +
        `Message :\n${message}\n\n` +
        `Envoyé depuis mon e-portfolio.`
    );

    const mailtoLink =
        `mailto:${destination}` +
        `?subject=${emailSubject}` +
        `&body=${emailBody}`;

    formMessage.textContent =
        "Ouverture de ton application de messagerie...";

    // Ouvrir le logiciel de messagerie du visiteur.

    window.location.href = mailtoLink;

});
