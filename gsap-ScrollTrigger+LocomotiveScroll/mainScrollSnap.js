import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scroll = new (function () {
    let sections;
    let tops;
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

        tlYellowBoxes = gsap
            .timeline({
                scrollTrigger: {
                    trigger: "#section2",
                    markers: true,
                    start: "-10px top",
                    end: "+=100%",
                    onEnterBack: () => tlYellowBoxes.reverse(),
                },
            })
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
        let sectionsArray = gsap.utils.toArray(sections);

        tops = sectionsArray.map((section) =>
            ScrollTrigger.create({ trigger: section, start: "top top" })
        );

        sectionsArray.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: () => (section.offsetHeight < win.w ? "top top" : "bottom bottom"),
                pin: true,
                pinSpacing: false,
            });
        });

        scrollTrigger3 = ScrollTrigger.create({
            snap: {
                snapTo: (progress, self) => {
                    let panelStarts = tops.map((st) => st.start), // array of all the positions, on each scroll, start pos can be change
                        snapScroll = gsap.utils.snap(panelStarts, self.scroll()); // find the closest one
                    console.log("snap = " + self.scroll());

                    return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll);
                    //snap require progress value, conver top pos into normalized progress between 0 & 1
                },
                duration: 0.5,
            },
        });

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
    };
})();

scroll.init();
