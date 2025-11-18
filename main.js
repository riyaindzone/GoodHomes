document.addEventListener("DOMContentLoaded", () => {
    // ======== Utility Function: Debounce for Performance ========
    // Prevents functions from running too often during scroll events
    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
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

    // --- 1. Scroll Animations (Modern: Intersection Observer) ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const el = entry.target;

                // Apply a slight stagger delay for a smoother cascading effect
                // using the element's position in the node list as a delay factor.
                setTimeout(() => {
                    el.classList.add("is-visible");
                }, index * 100); 

                // Stop observing once the element is visible (prevents re-animation)
                observer.unobserve(el); 
            }
        });
    }, observerOptions);

    // Start observing all animated elements
    animatedElements.forEach(el => observer.observe(el));


    // --- 2. Mobile Menu Toggle and Auto-Close ---
    if (menuButton && mobileMenu && menuIcon) {
        // Toggle menu visibility and icon
        const toggleMenu = () => {
            mobileMenu.classList.toggle("open");
            
            // Toggle Icon Logic using Lucide data attribute
            if (mobileMenu.classList.contains("open")) {
                menuIcon.setAttribute('data-lucide', 'x'); 
            } else {
                menuIcon.setAttribute('data-lucide', 'menu'); 
            }
            // Re-create icons to apply the change (necessary for Lucide)
            lucide.createIcons();
        };

        menuButton.addEventListener("click", toggleMenu);

        // Close menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (mobileMenu.classList.contains("open")) {
                    mobileMenu.classList.remove("open");
                    // Reset icon after closing
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // --- 3. Active Navigation Highlight ---
    function activateNavLink() {
        let currentSection = "";
        
        // Find the section currently closest to the top of the viewport
        sections.forEach((section) => {
            // Adjust offset for accurate highlight when section is near the top
            const sectionTop = section.offsetTop - 100; 
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        // Apply active class to the corresponding link
        navLinks.forEach((link) => {
            link.classList.remove("active-nav");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active-nav");
            }
        });
    }

    // --- 4. Event Listeners & Initial Calls ---
    // Combine scroll handlers (only for nav activation since animation uses IntersectionObserver)
    const combinedScrollHandler = debounce(activateNavLink, 10);

    window.addEventListener("scroll", combinedScrollHandler);
    
    // Initial calls to check state on page load
    combinedScrollHandler();

    // ======== Initialize Lucide Icons ========
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
});