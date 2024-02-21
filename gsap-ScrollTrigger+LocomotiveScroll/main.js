import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scroll = new (function () {
    let sections;
    let section1;
    let section2;
    let section3;
    let box1;
    let box2;
    let box3;
    let scrollTrigger1;
    let scrollTrigger2;
    let scrollTrigger3;
    let scrollTrigger4;
    let tlBoxes;
    let tlSection;
    let tlYellowBoxes;
    let win;

    //Init____________________________________________
    this.init = () => {
        sections = document.querySelectorAll("section");
        win = {
            w: window.innerWidth,
            h: window.innerHeight,
        };
        box1 = document.querySelector("#box1");
        box2 = document.querySelector("#box2");
        box3 = document.querySelector("#box3");
        section1 = document.querySelector("#section1");
        section2 = document.querySelector("#section2");
        section3 = document.querySelector("#section3");
        this.setupTimeLine();

        window.addEventListener("load", () => {
            this.setupScrollTrigger();
        });
    };

    this.setupTimeLine = () => {
        tlBoxes = gsap.timeline();

        let random = gsap.utils.random(-360, 360);

        tlBoxes
            .to(box1, { x: -100, rotation: random })
            .to(box2, { y: 100, rotation: random })
            .to(box3, { x: -300, y: -100, rotation: random });

        tlSection = gsap.timeline();

        tlSection.to(section1, { y: "70px" }).to(section2, { yPercent: -200 });

        tlYellowBoxes = gsap.timeline();
        tlYellowBoxes
            .to("#box4", { y: -200, ease: "elastic", duration: 3 }, 0)
            .to("#box5", { y: 100, ease: "elastic", duration: 1 }, 0)
            .to("#box6", { rotation: 720, duration: 3, ease: "power3" }, 0)
            .from(
                ".line-1",
                {
                    scaleX: 0,
                    transformOrigin: "left center",
                    ease: "none",
                    duration: 3,
                    scrub: true,
                },
                0
            );
    };

    this.setupScrollTrigger = () => {
        scrollTrigger1 = ScrollTrigger.create({
            animation: tlBoxes,
            trigger: "#box1",
            markers: true,
            toggleActions: "play pause reverse pause",
            start: "top top",
            endTrigger: "#box2",
            end: "bottom top",
            // onToggle: () => gsap.to(box3, { x: 600, rotation: 360, duration: 3 }),
        });
        scrollTrigger2 = ScrollTrigger.create({
            animation: tlSection,
            trigger: sections,
            markers: true,
            pin: true,
            anticipatePin: 1,
            pinSpacing: false,
            start: "top top",
            end: "+=4000",
            scrub: true,
        });

        scrollTrigger3 = ScrollTrigger.create({
            trigger: "#section2",
            markers: true,
            pin: true,
            scrub: true,
            start: "top top",
            end: "+=100%",
        });
        scrollTrigger4 = ScrollTrigger.create({
            animation: tlYellowBoxes,
            trigger: "#section2",
            start: "top top",
            end: "+=100%",
        });
    };
})();

scroll.init();
