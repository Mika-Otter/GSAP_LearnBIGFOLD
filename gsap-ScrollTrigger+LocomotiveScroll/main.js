import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scroll = new (function () {
    let sections;
    let box1;
    let box2;
    let box3;
    let scrollTrigger1;
    let scrollTrigger2;
    let tl;
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
        this.setupScrollTrigger();
    };

    this.setupTimeLine = () => {
        tl = new gsap.timeline();
    };

    this.setupScrollTrigger = () => {
        scrollTrigger1 = ScrollTrigger.create({
            animation: tl,
            trigger: "#box1",
            markers: true,
            start: "top top",
            endTrigger: "#box2",
            end: "bottom top",
            onToggle: () => gsap.to(box3, { x: 600, rotation: 360, duration: 3 }),
            onUpdate: (self) => {
                console.log(
                    "progress:",
                    self.progress.toFixed(3),
                    "direction:",
                    self.direction,
                    "velocity",
                    self.getVelocity()
                );
            },
        });
    };
})();

scroll.init();

// gsap.to("#box1", { x: 300, duration: 3, markers: true });
