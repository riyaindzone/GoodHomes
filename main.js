document.addEventListener("DOMContentLoaded", () => {
    // ======== Utility Function: Debounce for Performance ========
    // Prevents functions from running too often during scroll events
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // ======== Scroll Animations (Improved) ========
    const animatedElements = document.querySelectorAll(
        ".fade-in-element, .slide-in-left, .slide-in-right"
    );

    function handleScroll() {
        animatedElements.forEach((el, index) => {
            // Check if the element is already visible to avoid unnecessary checks/re-animations
            if (el.classList.contains("is-visible")) {
                return;
            }

            const rect = el.getBoundingClientRect();
            // Trigger animation when 120px of the element is above the bottom of the viewport
            const isVisible = rect.top < window.innerHeight - 120 && rect.bottom > 0;

            if (isVisible) {
                // Apply a slight stagger delay for a smoother cascading effect
                setTimeout(() => {
                    el.classList.add("is-visible");
                    // Note: 'animate' class handling is now redundant if you rely solely on is-visible/CSS animations
                    // but is kept here just in case your CSS uses it specifically.
                }, index * 100); // Reduced delay for a tighter stagger
            }
            // IMPORTANT: Removed the 'else' block that removed 'is-visible' to prevent replaying animations
        });
    }

    // ======== Mobile Menu Toggle and Auto-Close ========
    const menuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileNavLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

    if (menuButton && mobileMenu) {
        // Toggle menu visibility
        const toggleMenu = () => {
            mobileMenu.classList.toggle("open");
        };

        menuButton.addEventListener("click", toggleMenu);

        // Close menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (mobileMenu.classList.contains("open")) {
                    mobileMenu.classList.remove("open");
                }
            });
        });
    }

    // ======== Active Navigation Highlight (Improved) ========
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function activateNavLink() {
        let currentSection = "";
        
        // Find the section currently closest to the top of the viewport
        sections.forEach((section) => {
            // Adjust the offset for a more accurate highlight when the section is near the top
            const sectionTop = section.offsetTop - 100; // Use a smaller offset
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

    // Combine scroll handlers into one debounced function for efficiency
    const combinedScrollHandler = debounce(() => {
        handleScroll();
        activateNavLink();
    }, 10); // Debounce delay of 10ms is fast enough for smooth user experience

    window.addEventListener("scroll", combinedScrollHandler);
    
    // Initial calls to check state on page load
    combinedScrollHandler();

    // ======== Initialize Lucide Icons ========
    lucide.createIcons();
});