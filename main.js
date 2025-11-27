document.addEventListener("DOMContentLoaded", () => {
    // ======== Utility Function: Debounce for Performance ========
    const debounce = (func, delay) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // ======== Elements & Selectors ========
    const animatedElements = document.querySelectorAll(
        ".fade-in-element, .slide-in-left, .slide-in-right"
    );
    const menuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = menuButton ? menuButton.querySelector('i') : null;
    const mobileNavLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    // --- 1. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                setTimeout(() => {
                    el.classList.add("is-visible");
                }, index * 100);
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // --- 2. Mobile Menu Toggle ---
    if (menuButton && mobileMenu && menuIcon) {
        const toggleMenu = () => {
            mobileMenu.classList.toggle("open");
            menuIcon.setAttribute(
                "data-lucide",
                mobileMenu.classList.contains("open") ? "x" : "menu"
            );
            lucide.createIcons();
        };

        menuButton.addEventListener("click", toggleMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (mobileMenu.classList.contains("open")) {
                    mobileMenu.classList.remove("open");
                    menuIcon.setAttribute("data-lucide", "menu");
                    lucide.createIcons();
                }
            });
        });
    }

    // --- 3. Active Navigation Highlight ---
    function activateNavLink() {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active-nav");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active-nav");
            }
        });
    }

    const combinedScrollHandler = debounce(activateNavLink, 10);
    window.addEventListener("scroll", combinedScrollHandler);
    combinedScrollHandler();

    // --- 4. Initialize Lucide Icons ---
    if (typeof lucide !== "undefined" && lucide.createIcons) {
        lucide.createIcons();
    }

    // --- 5. Removed all popup form status alerts ---
    // No popup, no URL cleanup, no alerts.
});
