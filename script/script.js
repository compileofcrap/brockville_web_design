document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    // Toggle menu when clicking the hamburger button
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents document click listener from firing immediately
        navLinks.classList.toggle('active');
    });

    // 1. Close menu when any navigation link is clicked
    navItems.forEach(link => {
        link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        });
    });

    // 2. Close menu when clicking outside of the menu or hamburger button
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navLinks.contains(e.target);
        const isClickOnHamburger = hamburgerBtn.contains(e.target);

        if (!isClickInsideMenu && !isClickOnHamburger && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        }
    });









    // const menuToggle =
    //     document.querySelector(".menu-toggle");

    // const primaryNavigation =
    //     document.querySelector(".primary-navigation");


    // if (menuToggle && primaryNavigation) {

    //     menuToggle.addEventListener("click", () => {

    //         const isOpen =
    //             primaryNavigation.classList.toggle("is-open");


    //         menuToggle.setAttribute(
    //             "aria-expanded",
    //             String(isOpen)
    //         );


    //         menuToggle.setAttribute(
    //             "aria-label",
    //             isOpen
    //                 ? "Close navigation"
    //                 : "Open navigation"
    //         );

    //     });


        /* Close menu when a navigation link is clicked */

        // primaryNavigation
        //     .querySelectorAll("a")
        //     .forEach((link) => {

        //         link.addEventListener("click", () => {

        //             primaryNavigation.classList.remove(
        //                 "is-open"
        //             );

        //             menuToggle.setAttribute(
        //                 "aria-expanded",
        //                 "false"
        //             );

        //             menuToggle.setAttribute(
        //                 "aria-label",
        //                 "Open navigation"
        //             );

        //         });

        //     });

    //}



    // /* =====================================================
    //    EXAMPLES CAROUSEL
    //    ===================================================== */

    const carousel =
        document.querySelector("[data-carousel]");


    if (!carousel) {
        return;
    }


    const track =
        carousel.querySelector(".carousel-track");


    const slides =
        Array.from(
            carousel.querySelectorAll(".example-card")
        );


    const previousButton =
        carousel.querySelector(".previous");


    const nextButton =
        carousel.querySelector(".next");


    const dotsContainer =
        carousel.querySelector(".carousel-dots");


    let currentIndex = 0;



    // /* =====================================================
    //    CREATE DOTS
    //    ===================================================== */

    slides.forEach((slide, index) => {

        const dot =
            document.createElement("button");


        dot.type = "button";

        dot.className =
            "carousel-dot";


        dot.setAttribute(
            "aria-label",
            `Go to example ${index + 1}`
        );


        dot.addEventListener("click", () => {

            currentIndex = index;

            updateCarousel();

        });


        dotsContainer.appendChild(dot);

    });


    const dots =
        Array.from(
            dotsContainer.children
        );



    // /* =====================================================
    //    UPDATE CAROUSEL
    //    ===================================================== */

    function updateCarousel() {

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;


        dots.forEach((dot, index) => {

            const active =
                index === currentIndex;


            dot.classList.toggle(
                "active",
                active
            );


            dot.setAttribute(
                "aria-current",
                active
                    ? "true"
                    : "false"
            );

        });

    }



    // /* =====================================================
    //    PREVIOUS
    //    ===================================================== */

    previousButton.addEventListener(
        "click",
        () => {

            currentIndex =
                (
                    currentIndex -
                    1 +
                    slides.length
                ) %
                slides.length;


            updateCarousel();

        }
    );



    // /* =====================================================
    //    NEXT
    //    ===================================================== */

    nextButton.addEventListener(
        "click",
        () => {

            currentIndex =
                (
                    currentIndex +
                    1
                ) %
                slides.length;


            updateCarousel();

        }
    );



    // /* =====================================================
    //    KEYBOARD SUPPORT
    //    ===================================================== */

    carousel.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "ArrowLeft") {

                currentIndex =
                    (
                        currentIndex -
                        1 +
                        slides.length
                    ) %
                    slides.length;


                updateCarousel();

            }


            if (event.key === "ArrowRight") {

                currentIndex =
                    (
                        currentIndex +
                        1
                    ) %
                    slides.length;


                updateCarousel();

            }

        }
    );



    // /* =====================================================
    //    INITIALIZE
    //    ===================================================== */

    updateCarousel();

    // /* =====================================================
    //    Form Script for forminit
    //    ===================================================== */

    const forminit = new Forminit();
    const FORM_ID = '5i1tik9kfy4'; // ← Replace with your Form ID

    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Show loading state
        status.textContent = 'Sending...';
        status.className = 'status-loading';
        button.disabled = true;
        button.textContent = 'Sending...';

        const formData = new FormData(form);
        const { data, error } = await forminit.submit(FORM_ID, formData);

        button.disabled = false;
        button.textContent = 'Send Message';

        if (error) {
        status.textContent = error.message;
        status.className = 'status-error';
        return;
        }

        // Success
        status.textContent = 'Message sent successfully!';
        status.className = 'status-success';
        form.reset();
    });



});