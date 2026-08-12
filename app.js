document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const loadingScreen =
        document.getElementById("loading-screen");

    const particlesContainer =
        document.getElementById("particles");

    const navbar =
        document.querySelector(".navbar");

    const scrollTop =
        document.getElementById("scrollTop");

    const sideProgress =
        document.querySelector(".side-progress");

    const sideItems =
        document.querySelectorAll(".side-item");

    const navLinks =
        document.querySelectorAll(".nav-links a");


    /* =====================================================
       LOADING
    ===================================================== */

    document.body.classList.add("loading");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loadingScreen.classList.add("loaded");

            document.body.classList.remove("loading");

        }, 2200);

    });


    /* =====================================================
       PARTÍCULAS
    ===================================================== */

    function createParticles() {

        if (!particlesContainer) {
            return;
        }

        const amount =
            window.innerWidth < 600
                ? 45
                : 105;

        particlesContainer.innerHTML = "";

        for (let i = 0; i < amount; i++) {

            const particle =
                document.createElement("span");

            particle.classList.add("particle");


            /* Tamaño */

            const size =
                Math.random() * 2.5 + .7;


            /* Duración */

            const duration =
                Math.random() * 12 + 10;


            /* Delay negativo */

            const delay =
                Math.random() * -20;


            /* Movimiento lateral */

            const drift =
                (
                    Math.random() * 140 - 70
                ).toFixed(1) + "px";


            /* Variables */

            particle.style.setProperty(
                "--particle-size",
                `${size}px`
            );

            particle.style.setProperty(
                "--particle-duration",
                `${duration}s`
            );

            particle.style.setProperty(
                "--particle-delay",
                `${delay}s`
            );

            particle.style.setProperty(
                "--particle-drift",
                drift
            );


            /* Posición */

            particle.style.left =
                `${Math.random() * 100}%`;


            /* Agregar */

            particlesContainer.appendChild(
                particle
            );

        }

    }

    createParticles();


    /* =====================================================
       RECREAR PARTÍCULAS AL CAMBIAR TAMAÑO
    ===================================================== */

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            createParticles();

        }, 300);

    });


    /* =====================================================
       NAVBAR AL HACER SCROLL
    ===================================================== */

    function updateNavbar() {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar
    );

    updateNavbar();


    /* =====================================================
       SCROLL TOP
    ===================================================== */

    function updateScrollTop() {

        if (window.scrollY > 500) {

            scrollTop.classList.add("visible");

        } else {

            scrollTop.classList.remove("visible");

        }

    }

    window.addEventListener(
        "scroll",
        updateScrollTop
    );


    scrollTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       BARRA LATERAL
    ===================================================== */

    function updateProgress() {

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {
            return;
        }

        const progress =
            (window.scrollY / documentHeight) * 100;

        sideProgress.style.height =
            `${progress}%`;

    }

    window.addEventListener(
        "scroll",
        updateProgress
    );

    updateProgress();


    /* =====================================================
       SECCIONES
    ===================================================== */

    const sections = [
        document.getElementById("inicio"),
        document.getElementById("sobre"),
        document.getElementById("dificultades"),
        document.getElementById("mecanicas"),
        document.getElementById("final")
    ];


    function updateActiveSection() {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * .35;

        let current =
            sections[0];

        sections.forEach(section => {

            if (!section) {
                return;
            }

            if (
                scrollPosition >=
                section.offsetTop
            ) {

                current = section;

            }

        });


        const currentId =
            current?.id;


        sideItems.forEach(item => {

            item.classList.remove("active");

            const href =
                item.getAttribute("href");

            if (
                href ===
                `#${currentId}`
            ) {

                item.classList.add("active");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href ===
                `#${currentId}`
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveSection
    );

    updateActiveSection();


    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       REVEAL DE ELEMENTOS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-header, " +
            ".about-text, " +
            ".info-card, " +
            ".difficulty-card, " +
            ".mechanic, " +
            ".final-box"
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

        }
    );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       EFECTO DE ENTRADA EN CARDS
    ===================================================== */

    document.querySelectorAll(
        ".info-card"
    ).forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    document.querySelectorAll(
        ".mechanic"
    ).forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 60}ms`;

        }
    );


    document.querySelectorAll(
        ".difficulty-card"
    ).forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    /* =====================================================
       PARALLAX SUAVE DEL HERO
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (!heroVisual) {
                return;
            }

            if (window.innerWidth < 750) {
                return;
            }

            const scroll =
                window.scrollY;

            if (scroll > window.innerHeight) {
                return;
            }

            const movement =
                scroll * .08;

            heroVisual.style.transform =
                `translateY(${movement}px)`;

        }
    );


    /* =====================================================
       EFECTO MOUSE SOBRE EL FRAME
    ===================================================== */

    const frame =
        document.querySelector(
            ".minecraft-frame"
        );


    if (frame) {

        frame.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) {
                    return;
                }

                const rect =
                    frame.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    ((x - centerX) /
                        centerX) * 3;

                const rotateX =
                    ((centerY - y) /
                        centerY) * 3;

                frame.style.transform =
                    `rotateY(${rotateY}deg)
                     rotateX(${rotateX}deg)
                     translateY(-5px)`;

            }
        );


        frame.addEventListener(
            "mouseleave",
            () => {

                frame.style.transform =
                    "rotateY(-5deg) rotateX(3deg)";

            }
        );

    }


    /* =====================================================
       FINAL
    ===================================================== */

    console.log(
        "%c PERMADEATHCORE ",
        "background:#42ff88;color:#061008;font-weight:bold;padding:8px;"
    );

    console.log(
        "Sistema cargado correctamente."
    );

});