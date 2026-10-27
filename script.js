/* Mobile navigation */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});
navLinks.forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });

/* Light/dark theme */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
if (localStorage.getItem("portfolio-theme") === "dark") document.body.classList.add("dark-theme");

function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-theme");
    themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    themeToggle.setAttribute("aria-label", isDark ? "Enable light theme" : "Enable dark theme");
}
updateThemeButton();
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("portfolio-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    updateThemeButton();
});

/* Automatic footer year */
document.getElementById("current-year").textContent = new Date().getFullYear();

/* Accessible subtabs */
document.querySelectorAll(".portfolio-tabs").forEach(tabList => {
    const buttons = tabList.querySelectorAll(".portfolio-tab");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(item => {
                item.classList.remove("active");
                item.setAttribute("aria-selected", "false");
            });
            button.classList.add("active");
            button.setAttribute("aria-selected", "true");
            const section = tabList.parentElement;
            section.querySelectorAll(":scope > .tab-panel").forEach(panel => {
                const selected = panel.id === button.dataset.tab;
                panel.classList.toggle("active", selected);
                panel.hidden = !selected;
            });
        });
    });
});

/* Reveal animations */
const revealElements = document.querySelectorAll(".section-heading, .about-card, .project-card, .timeline-item");
revealElements.forEach(element => element.classList.add("reveal"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealElements.forEach(element => observer.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}

/* Active main navigation item */
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
            }
        });
    }, { rootMargin: "-25% 0px -60% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
}


/* English/French language switch */
const languageToggle = document.getElementById("language-toggle");
const translationMap = {"Career Project":"Projet professionnel","BUILDING MY FUTURE":"CONSTRUIRE MON AVENIR","A space to present my profile, reflect on professional experiences and explore international opportunities in computer science and industry.":"Un espace pour présenter mon profil, réfléchir à des expériences professionnelles et explorer des possibilités internationales en informatique et dans l’industrie.","My CV":"Mon CV","A concise overview of my education, technical skills, projects and experiences.":"Un aperçu de ma formation, de mes compétences techniques, de mes projets et de mes expériences.","Add my CV":"Ajouter mon CV","Replace this link with your CV PDF.":"Remplace ce lien par le PDF de ton CV.","My LinkedIn":"Mon LinkedIn","My professional profile and a way to connect with engineers and recruiters.":"Mon profil professionnel pour échanger avec des ingénieurs et des recruteurs.","Open LinkedIn":"Ouvrir LinkedIn","Elevator pitch":"Présentation vidéo","A short video to introduce myself, my interests in computer science and industry, and the kind of projects I would like to work on.":"Une courte vidéo pour me présenter, parler de mon intérêt pour l’informatique et l’industrie, et des projets sur lesquels j’aimerais travailler.","My elevator pitch video":"Ma vidéo de présentation","Add a video link or embed your video here.":"Ajoute ici un lien ou une vidéo intégrée.","PROFESSIONAL DISCOVERY":"DÉCOUVRIR LES MÉTIERS","My conversations with professionals":"Mes échanges avec des professionnels","Three short reflections on what I learned from professionals working in aerospace and the space industry.":"Trois synthèses de ce que j’ai appris auprès de professionnels de l’aéronautique et du spatial.","Airbus · Embedded systems":"Airbus · Systèmes embarqués","Pascal — Engineering across a career":"Pascal — Plusieurs évolutions de carrière","Pascal’s career at Airbus showed me that an engineer can move from technical design to system architecture, project management and innovation. His work on flight controls and system safety helped me understand how important reliability and certification are in aeronautics.":"Le parcours de Pascal chez Airbus m’a montré qu’un ingénieur peut passer de la conception à l’architecture système, à la gestion de projet ou à l’innovation. Son expérience sur les commandes de vol m’a fait comprendre l’importance de la fiabilité et de la certification en aéronautique.","What I take from it:":"Ce que j’en retiens :","I should keep building strong technical skills while staying open to different roles and learning how to work with a team.":"Je dois consolider mes compétences techniques tout en restant ouvert à différents métiers et en apprenant à travailler en équipe.","Thales Alenia Space · Cybersecurity":"Thales Alenia Space · Cybersécurité","Cryptographic equipment for satellites":"Des équipements cryptographiques pour les satellites","This professional explained how satellite communication equipment is specified, developed and tested. I learned that cybersecurity in the space industry also relies on electronics, rigorous testing and close coordination between teams. His move from testing to design showed me that a career can develop step by step.":"Ce professionnel m’a expliqué comment les équipements de communication des satellites sont définis, développés et testés. J’ai compris que la cybersécurité spatiale repose aussi sur l’électronique, des tests rigoureux et la coordination des équipes. Son passage des tests à la conception montre qu’une carrière évolue progressivement.","I’m interested in the link between computer science, security and complex industrial systems, where testing and quality are essential.":"Le lien entre informatique, sécurité et systèmes industriels complexes m’intéresse, notamment parce que les tests et la qualité y sont essentiels.","Space & defence · Configuration management":"Spatial & défense · Gestion de configuration","Amirouche — Keeping complex projects consistent":"Amirouche — Garantir la cohérence des projets","Amirouche’s role is to make sure technical information stays consistent throughout a product’s life cycle and that every change is properly tracked and validated. I discovered a less visible but important engineering role, connecting design offices, production, maintenance and clients.":"Amirouche veille à la cohérence des informations techniques pendant tout le cycle de vie d’un produit et au suivi des modifications. J’ai découvert un métier moins visible mais essentiel, qui fait le lien entre bureaux d’études, production, maintenance et clients.","A successful engineer needs more than technical knowledge: organisation, communication and teamwork also matter. I also learned that career paths can take unexpected directions.":"Un ingénieur a besoin de compétences techniques, mais aussi d’organisation, de communication et d’esprit d’équipe. J’ai aussi compris qu’un parcours professionnel peut prendre des directions inattendues.","INTERNATIONAL INDUSTRY":"INDUSTRIE INTERNATIONALE","Three international mobility project ideas":"Trois idées de projets de mobilité internationale","These are potential projects I could explore during my studies or an internship, combining computer science with industrial applications.":"Voici des pistes que je pourrais explorer pendant mes études ou un stage, à la croisée de l’informatique et des applications industrielles.","Project 01 · China":"Projet 01 · Chine","Smart manufacturing and industrial IoT in China":"Industrie connectée et IoT en Chine","Idea:":"Idée :","Study how connected sensors and industrial software are used to monitor production lines, detect anomalies and improve efficiency.":"Étudier comment les capteurs connectés et les logiciels industriels surveillent les chaînes de production, détectent les anomalies et améliorent l’efficacité.","What I could do:":"Ce que je pourrais faire :","Develop a small data-collection and dashboard prototype, then compare industrial practices and teamwork across cultures.":"Développer un prototype de collecte de données et un tableau de bord, puis comparer les pratiques industrielles et le travail en équipe dans différents contextes culturels.","IoT":"IoT","Data analysis":"Analyse de données","Intercultural skills":"Compétences interculturelles","Project 02 · Germany":"Projet 02 · Allemagne","Software for robotics and Industry 4.0":"Logiciel pour la robotique et l’industrie 4.0","Explore the software used to coordinate robots, sensors and production equipment in an international industrial environment.":"Découvrir les logiciels qui coordonnent robots, capteurs et équipements de production dans un environnement industriel international.","Contribute to a simulation or monitoring tool and learn how software engineers collaborate with automation and mechanical teams.":"Contribuer à un outil de simulation ou de supervision et comprendre comment les informaticiens collaborent avec les équipes d’automatisation et de mécanique.","Robotics":"Robotique","Automation":"Automatisation","Project 03 · Netherlands":"Projet 03 · Pays-Bas","Embedded systems for sustainable industry":"Systèmes embarqués pour une industrie durable","Work on an embedded software project that monitors energy use or equipment performance in an industrial system.":"Travailler sur un projet logiciel embarqué qui mesure la consommation énergétique ou les performances d’un équipement industriel.","Help collect and analyse sensor data, implement alerts and evaluate how software can support more efficient industrial processes.":"Participer à la collecte et à l’analyse de données de capteurs, mettre en place des alertes et étudier comment le logiciel peut améliorer l’efficacité industrielle.","Embedded software":"Logiciel embarqué","Sensors":"Capteurs","Sustainability":"Développement durable","Welcome":"Accueil","Engineering Course":"Parcours d’ingénieur","International Mobility":"Mobilité internationale","Sustainability & Civic Engagement":"Développement durable & engagement citoyen","Sport & Other Activities":"Sport & autres activités","Career Development":"Développement de carrière","WELCOME TO MY E-PORTFOLIO":"BIENVENUE SUR MON E-PORTFOLIO","Hello, I'm":"Bonjour, je suis","Engineering student at ENSEEIHT":"Élève ingénieur à l’ENSEEIHT","Welcome to my e-portfolio. Here, you can explore my engineering studies, projects and productions, international experiences, civic engagement, personal activities and professional goals.":"Bienvenue sur mon e-portfolio. Vous pourrez y découvrir mon parcours d’ingénieur, mes projets et productions, mes expériences internationales, mon engagement citoyen, mes activités personnelles et mes objectifs professionnels.","Explore my journey":"Découvrir mon parcours","Career development":"Mon projet professionnel","Scroll to discover":"Faites défiler pour découvrir","LEARNING & BUILDING":"APPRENDRE & CONSTRUIRE","My engineering studies":"Mon parcours d’ingénieur","This course allows me to strengthen my scientific foundations, learn engineering methods and work on practical problems.":"Cette formation me permet de consolider mes bases scientifiques, d’apprendre les méthodes de l’ingénieur et de travailler sur des problèmes concrets.","To complete: add your main courses, learning outcomes and milestones from each year.":"À compléter : ajoute les principaux enseignements, les compétences acquises et les étapes marquantes de chaque année.","Technical skills":"Compétences techniques","Computer science, algorithms, programming and problem solving.":"Informatique, algorithmique, programmation et résolution de problèmes.","To complete: list the languages, tools and technologies you have used.":"À compléter : indique les langages, outils et technologies que tu as utilisés.","Teamwork":"Travail en équipe","Group work helps me practise communication, organisation and collaborative problem solving.":"Le travail en groupe me permet de développer ma communication, mon organisation et ma capacité à résoudre des problèmes collectivement.","To complete: add examples of teamwork and your contribution.":"À compléter : ajoute des exemples de travail en équipe et précise ta contribution.","Course overview":"Vue d’ensemble","Projects":"Projets","Productions":"Productions","PROJECT 01":"PROJET 01","PROJECT 02":"PROJET 02","PROJECT 03":"PROJET 03","Project title":"Titre du projet","Describe the problem, your approach, the technologies used and the result.":"Présente le problème, ta démarche, les technologies utilisées et le résultat obtenu.","Explain the objective, your role, the work completed and what you learned.":"Explique l’objectif, ton rôle, le travail réalisé et ce que tu as appris.","Present a personal initiative, a technical challenge and the outcome.":"Présente une initiative personnelle, un défi technique et le résultat.","Programming":"Programmation","Problem solving":"Résolution de problèmes","Project management":"Gestion de projet","Initiative":"Initiative","Learning":"Apprentissage","Reports & documentation":"Rapports & documentation","Add reports, technical documents or written assignments that demonstrate your learning.":"Ajoute des rapports, documents techniques ou travaux écrits qui illustrent tes apprentissages.","Presentations & demonstrations":"Présentations & démonstrations","Add slides, posters, demos or links to work you are allowed to share.":"Ajoute des diapositives, affiches, démonstrations ou liens vers des travaux que tu peux partager.","OPENING UP TO THE WORLD":"S’OUVRIR AU MONDE","My language learning, intercultural experiences and opportunities to study or work internationally.":"Mon apprentissage des langues, mes expériences interculturelles et mes possibilités d’étudier ou de travailler à l’international.","Overview":"Vue d’ensemble","LV2 & languages":"LV2 & langues","Mobility experience":"Expérience de mobilité","International outlook":"Ouverture internationale","Describe what international mobility means for your engineering studies and future career.":"Explique ce que la mobilité internationale représente pour ton parcours d’ingénieur et ton avenir professionnel.","Languages & intercultural skills":"Langues & compétences interculturelles","Highlight language learning, communication and your ability to adapt to different cultural contexts.":"Mets en avant ton apprentissage des langues, ta communication et ta capacité à t’adapter à différents contextes culturels.","PCE":"PCE","Add the meaning of PCE in your programme, the related requirements, activities, evidence and progress.":"Précise la signification de PCE dans ta formation, les attendus, les activités réalisées, les justificatifs et ta progression.","LV2 and other languages":"LV2 et autres langues","List your second language (LV2), current level, certifications, goals and examples of progress.":"Indique ta deuxième langue (LV2), ton niveau actuel, tes certifications, tes objectifs et des exemples de progression.","Language evidence":"Justificatifs linguistiques","Add certificates, presentations, projects or other evidence of your language skills.":"Ajoute des certifications, présentations, projets ou autres preuves de tes compétences linguistiques.","Study abroad":"Étudier à l’étranger","Describe a past or planned exchange, internship, international project or other mobility opportunity.":"Décris un échange passé ou prévu, un stage, un projet international ou une autre possibilité de mobilité.","Preparation & goals":"Préparation & objectifs","Explain your destination preferences, preparation steps and what you hope to gain from the experience.":"Explique tes destinations préférées, les étapes de préparation et ce que tu souhaites retirer de cette expérience.","ACTING RESPONSIBLY":"AGIR DE MANIÈRE RESPONSABLE","Sustainability &":"Développement durable &","Civic Engagement":"Engagement citoyen","How I contribute to society and take environmental, ethical and social issues into account.":"Comment je contribue à la société et prends en compte les enjeux environnementaux, éthiques et sociaux.","Sustainability":"Développement durable","Describe projects, choices or learning related to environmental impact, responsible technology or sustainable development.":"Présente des projets, choix ou apprentissages liés à l’impact environnemental, aux technologies responsables ou au développement durable.","Civic engagement":"Engagement citoyen","Present volunteering, community involvement, student representation or other contributions to collective life.":"Présente ton bénévolat, ton implication dans la vie collective, la représentation étudiante ou d’autres contributions à la vie commune.","Ethics & responsibility":"Éthique & responsabilité","Explain how you consider ethical questions, accessibility, inclusion and the social impact of engineering.":"Explique comment tu prends en compte les questions éthiques, l’accessibilité, l’inclusion et l’impact social de l’ingénierie.","Evidence & reflection":"Preuves & réflexion","Add certificates, project summaries, photos or reflections that document your involvement.":"Ajoute des attestations, résumés de projets, photos ou réflexions qui témoignent de ton engagement.","BEYOND THE CLASSROOM":"AU-DELÀ DES COURS","Sport & Other":"Sport & autres","Activities":"activités","My interests outside my studies and the personal skills they help me develop.":"Mes centres d’intérêt en dehors des études et les compétences personnelles qu’ils m’aident à développer.","Sport & fitness":"Sport & forme physique","Describe the sports you practise, your routine, achievements and what sport teaches you about discipline and perseverance.":"Décris les sports que tu pratiques, ta routine, tes réussites et ce que le sport t’apprend sur la discipline et la persévérance.","Discipline":"Discipline","Team spirit":"Esprit d’équipe","Personal interests":"Centres d’intérêt","Share hobbies, creative activities or subjects you enjoy exploring in your free time.":"Présente tes loisirs, tes activités créatives ou les sujets que tu aimes explorer pendant ton temps libre.","Creativity":"Créativité","Curiosity":"Curiosité","Clubs & collective activities":"Clubs & activités collectives","Add student clubs, events or group activities, and explain your role and contribution.":"Ajoute les clubs étudiants, événements ou activités de groupe, puis explique ton rôle et ta contribution.","Collaboration":"Collaboration","LOOKING AHEAD":"SE PROJETER","Professional interests, goals and the steps I am taking towards them.":"Mes intérêts professionnels, mes objectifs et les étapes que je mets en place pour les atteindre.","Identify my interests":"Identifier mes intérêts","Clarify the engineering fields that interest me, explore career options and identify the skills I want to develop.":"Précise les domaines de l’ingénierie qui m’intéressent, explore les métiers possibles et identifie les compétences que je souhaite développer.","Build experience":"Acquérir de l’expérience","Projects, internships & networking":"Projets, stages & réseau professionnel","Gain practical experience through projects, internships, professional events and discussions with engineers.":"Acquiers de l’expérience grâce aux projets, stages, événements professionnels et échanges avec des ingénieurs.","Professional goal":"Objectif professionnel","Build my career plan":"Construire mon projet professionnel","Describe your target role or sector, the impact you hope to have and the milestones that will help you get there.":"Décris le poste ou le secteur que tu vises, l’impact que tu souhaites avoir et les étapes qui t’aideront à y parvenir.","Would you like to connect or learn more about my work?":"Envie d’échanger ou d’en savoir plus sur mon travail ?","Get in touch":"Me contacter","Engineering e-Portfolio":"E-portfolio d’ingénieur","MY PROFILE":"MON PROFIL","Engineering student":"Élève ingénieur","Computer science":"Informatique","NOW":"MAINTENANT","NEXT STEP":"PROCHAINE ÉTAPE","LONG TERM":"À LONG TERME","Explore":"Explorer","To complete:":"À compléter :"};
const reverseTranslationMap = Object.fromEntries(
    Object.entries(translationMap).map(([english, french]) => [french, english])
);
let currentLanguage = localStorage.getItem("portfolio-language") || "en";

function translateTextNodes(language) {
    const map = language === "fr" ? translationMap : reverseTranslationMap;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
        if (node.parentElement && (node.parentElement.closest("script, style, .language-toggle"))) return;
        const original = node.nodeValue;
        const trimmed = original.trim();
        if (!trimmed) return;
        const leading = original.match(/^\\s*/)?.[0] || "";
        const trailing = original.match(/\\s*$/)?.[0] || "";
        const key = trimmed;
        if (map[key]) node.nodeValue = leading + map[key] + trailing;
    });
    document.documentElement.lang = language;
    languageToggle.textContent = language === "en" ? "FR" : "EN";
    languageToggle.title = language === "en" ? "Passer en français" : "Switch to English";
    languageToggle.setAttribute("aria-label", language === "en" ? "Switch website language to French" : "Changer la langue du site en anglais");
}

function setLanguage(language) {
    currentLanguage = language;
    translateTextNodes(language);
    localStorage.setItem("portfolio-language", language);
}
languageToggle.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "fr" : "en"));
if (currentLanguage !== "en") setLanguage(currentLanguage);

