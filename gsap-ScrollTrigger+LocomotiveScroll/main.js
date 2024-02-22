import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scroll = new (function () {
    let box1;
    let box2;
    let box3;
    let box4;
    let tl;
    let win;
    let play;
    let pause;
    let reverse;
    let restart;
    let test;
    let scrollTrigger1;

    this.init = () => {
        win = {
            w: window.innerWidth,
            h: window.innerHeight,
        };
        box1 = document.querySelector("#box1");
        box2 = document.querySelector("#box2");
        box3 = document.querySelector("#box3");
        box4 = document.querySelector("#box4first");
        play = document.querySelector("#btnPlay");
        pause = document.querySelector("#btnPause");
        reverse = document.querySelector("#btnReverse");
        restart = document.querySelector("#btnRestart");
        test = document.querySelector("#btnTest");

        play.onclick = () => tl.play();
        pause.onclick = () => tl.pause();
        reverse.onclick = () => tl.reverse();
        restart.onclick = () => tl.restart();
        test.onclick = () => tl.play("test");

        window.addEventListener("load", () => {
            this.setUpScrollTrigger();
        });
    };

    this.setUpTimeline = () => {
        tl = gsap
            .timeline()
            .set(document.body, { overflow: "hidden" })
            .from(box1, { opacity: 0, duration: 1 })
            .from(box2, { x: -200, duration: 3, ease: "power3.inOut" })
            .add("test")
            .to(box2, { width: 200, height: 200, duration: 3 }, "<")
            .from(box3, { y: -200, duration: 2 })
            .from(box4, { y: 100, x: -200, duration: 2 })
            .set(document.body, { overflow: "auto" });
    };

    this.setUpScrollTrigger = () => {
        scrollTrigger1 = ScrollTrigger.create({
            trigger: box1,
            animation: tl,
            markers: true,
            start: "top top",
            end: "bottom top",
            onEnter: () => this.setUpTimeline(),
        });
    };
})();

scroll.init();
