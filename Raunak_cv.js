/* =========================================================
   ELEMENTS
========================================================= */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );


const panelTriggers =
    document.querySelectorAll(
        ".panel-trigger"
    );


const panels =
    document.querySelectorAll(
        ".content-panel"
    );


/* =========================================================
   OPEN PANEL
========================================================= */

function openPanel(panelName) {

    const targetPanel =
        document.getElementById(
            panelName
        );


    if (!targetPanel) {
        return;
    }


    /* REMOVE ACTIVE PANELS */

    panels.forEach(
        panel => {

            panel.classList.remove(
                "active"
            );

        }
    );


    /* REMOVE ACTIVE NAV */

    navItems.forEach(
        item => {

            item.classList.remove(
                "active"
            );

        }
    );


    /* OPEN SELECTED PANEL */

    targetPanel.classList.add(
        "active"
    );


    /* RESET PANEL SCROLL */

    targetPanel.scrollTop = 0;


    /* ACTIVATE MATCHING NAV */

    const activeNav =
        document.querySelector(
            `.nav-item[data-panel="${panelName}"]`
        );


    if (activeNav) {

        activeNav.classList.add(
            "active"
        );

    }


    /* MOBILE / TABLET SCROLL */

    if (
        window.innerWidth <= 960
    ) {

        const contentCard =
            document.querySelector(
                ".content-card"
            );


        if (contentCard) {

            setTimeout(
                () => {

                    contentCard.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                },
                100
            );

        }

    }

}


/* =========================================================
   NAVIGATION CLICK
========================================================= */

navItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                openPanel(
                    item.dataset.panel
                );

            }
        );

    }
);


/* =========================================================
   PROFILE CONTACT BUTTON
========================================================= */

panelTriggers.forEach(
    trigger => {

        trigger.addEventListener(
            "click",
            () => {

                openPanel(
                    trigger.dataset.panel
                );

            }
        );

    }
);


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingText =
    document.getElementById(
        "typingText"
    );


const roles = [

    "Web Developer",
    "Backend Developer",
    "Data Developer",
    "Data Analyst"

];


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typingAnimation() {

    if (!typingText) {
        return;
    }


    const currentRole =
        roles[
            roleIndex
        ];


    if (!deleting) {

        characterIndex++;


        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;


            setTimeout(
                typingAnimation,
                1400
            );


            return;

        }

    }

    else {

        characterIndex--;


        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (
            characterIndex === 0
        ) {

            deleting = false;


            roleIndex =
                (
                    roleIndex + 1
                )
                %
                roles.length;

        }

    }


    const speed =
        deleting
            ? 40
            : 75;


    setTimeout(
        typingAnimation,
        speed
    );

}


typingAnimation();


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    document.getElementById(
        "cursorGlow"
    );


if (cursorGlow) {

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        }
    );


    function animateGlow() {

        glowX +=
            (
                mouseX - glowX
            )
            * 0.09;


        glowY +=
            (
                mouseY - glowY
            )
            * 0.09;


        cursorGlow.style.left =
            `${glowX}px`;


        cursorGlow.style.top =
            `${glowY}px`;


        requestAnimationFrame(
            animateGlow
        );

    }


    animateGlow();

}


/* =========================================================
   DOWNLOAD / PRINT CV
========================================================= */

const downloadCV =
    document.getElementById(
        "downloadCV"
    );


if (downloadCV) {

    downloadCV.addEventListener(
        "click",
        () => {

            window.print();

        }
    );

}


/* =========================================================
   COPYRIGHT YEAR
========================================================= */

const yearElement =
    document.getElementById(
        "year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date()
            .getFullYear();

}


/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "ArrowDown" &&
            event.key !== "ArrowRight" &&
            event.key !== "ArrowUp" &&
            event.key !== "ArrowLeft"
        ) {
            return;
        }


        const activeNav =
            document.querySelector(
                ".nav-item.active"
            );


        if (!activeNav) {
            return;
        }


        const navigationArray =
            Array.from(
                navItems
            );


        let currentIndex =
            navigationArray.indexOf(
                activeNav
            );


        if (
            event.key === "ArrowDown" ||
            event.key === "ArrowRight"
        ) {

            currentIndex =
                (
                    currentIndex + 1
                )
                %
                navigationArray.length;

        }


        if (
            event.key === "ArrowUp" ||
            event.key === "ArrowLeft"
        ) {

            currentIndex =
                (
                    currentIndex - 1
                    +
                    navigationArray.length
                )
                %
                navigationArray.length;

        }


        openPanel(
            navigationArray[
                currentIndex
            ].dataset.panel
        );

    }
);


/* =========================================================
   DEFAULT PANEL
========================================================= */

openPanel("about");