import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const scroll = new (function () {
    let sections;
    let tops;
    let section1;
    let section2;
    let section3;

    let canSnap;

    let box1;
    let box2;
    let box3;
    let scrollTrigger1;
    let scrollTrigger2;
    let scrollTrigger3;
    let scrollTrigger4;
    let scrollTrigger5;
    let tlBoxes;
    let tlSection2;
    let tlYellowBoxes;
    let win;
    let lenis;

    //Init____________________________________________
    this.init = () => {
        canSnap = true;
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
        this.setUpTimelineSection2();
        window.addEventListener("load", () => {
            this.setupScrollTrigger();
        });

        lenis = new Lenis();
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    };

    this.setUpTimelineYellow = () => {
        let box6 = document.querySelector("#box6");
        tlYellowBoxes = gsap
            .timeline({
                scrollTrigger: {
                    trigger: "#section2",
                    // markers: true,
                    start: "-1px top",
                    end: "+=100%",
                    onEnter: () => lenis.stop(),
                    onEnterBack: () => tlYellowBoxes.restart(),
                },

                onComplete: () => {
                    lenis.start();
                    box6.style.display = box6.style.display === "none" ? "initial" : "none";
                },
            })
            .set(document.body, { overflow: "hidden" })
            .to("#box4", { y: -200, ease: "elastic", duration: 3 }, 0)
            .to("#box5", { y: 100, ease: "elastic", duration: 1 }, 0)
            .to("#box6", { rotation: 720, duration: 3, ease: "power3" }, 0)
            .from(
                ".line-1",
                {
                    opacity: 1,
                    scaleX: 0,
                    transformOrigin: "left center",
                    ease: "none",
                    duration: 3,
                    scrub: true,
                },
                0
            )
            .to(".line-1", { opacity: 1, duration: 3 }, "<")
            .to(".line-1", { duration: 3 })
            .set(document.body, {
                overflow: "auto",
            });
    };

    this.setupTimeLine = () => {
        tlBoxes = gsap.timeline();

        let random = gsap.utils.random(-360, 360);

        tlBoxes
            .to(box1, { x: -100, rotation: random })
            .to(box2, { y: 100, rotation: random })
            .to(box3, { x: -300, y: -100, rotation: random });
    };

    this.setUpTimelineSection2 = () => {
        tlSection2 = gsap
            .timeline()
            .fromTo(".testBox", { y: 0, rotation: 0 }, { y: 600, rotation: 360 });
    };

    this.setupScrollTrigger = () => {
        let sectionsArray = gsap.utils.toArray(sections);

        tops = sectionsArray.map((section) =>
            ScrollTrigger.create({ trigger: section, start: "top top" })
        );

        sectionsArray.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: () => (section.offsetHeight < win.h ? "top top" : "bottom bottom"),
                pin: true,
                pinSpacing: false,
            });
        });

        scrollTrigger3 = ScrollTrigger.create({
            snap: {
                snapTo: (progress, self) => {
                    if (canSnap) {
                        let panelStarts = tops.map((st) => st.start), // array of all the positions, on each scroll, start pos can be change
                            snapScroll = gsap.utils.snap(panelStarts, lenis.animatedScroll); // find the closest one
                        console.log(panelStarts);

                        return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll);
                    }
                    //snap require progress value, conver top pos into normalized progress between 0 & 1
                },
                duration: 0.4,
                ease: "power2",
            },
        });

        let isLoaded = false;
        scrollTrigger2 = ScrollTrigger.create({
            animation: tlYellowBoxes,
            trigger: section2,
            // markers: true,
            start: "-50px top",
            end: "bottom bottom",
            onEnter: () => {
                if (!isLoaded) {
                    this.setUpTimelineYellow();
                    isLoaded = true;
                } else tlYellowBoxes.restart();
            },
        });

        scrollTrigger1 = ScrollTrigger.create({
            animation: tlBoxes,
            trigger: "#box1",
            // markers: true,
            start: "top top",
            end: "bottom top",
        });

        scrollTrigger4 = ScrollTrigger.create({
            animation: tlSection2,
            trigger: ".testBox",
            onEnter: () => {
                canSnap = false;
            },
            // markers: true,
            pin: true,
            scrub: 1,
            start: "top 100px",
            end: "+=1500 bottom",
        });

        scrollTrigger5 = ScrollTrigger.create({
            trigger: ".s3__p2",
            start: "top top",
            markers: true,
            onEnter: () => (canSnap = true),
        });
    };
})();

scroll.init();
