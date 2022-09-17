import Experience from "../experience";
import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import World from "./World";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.times;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;

    this.circle = this.experience.world.floor.circle;
    this.circle2 = this.experience.world.floor.circle2;
    this.circle3 = this.experience.world.floor.circle3;

    GSAP.registerPlugin(ScrollTrigger);
    this.room = this.experience.world.room.actualRoom;

    this.setSmoothScroll();
    this.setScrollTrigger();

    this.circle = this.experience.world.floor.circle;
    this.circle2 = this.experience.world.floor.circle2;
    this.circle3 = this.experience.world.floor.circle3;

    GSAP.registerPlugin(ScrollTrigger);
    this.room = this.experience.world.room.actualRoom;

    this.setSmoothScroll();
    this.setScrollTrigger();
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.3,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start,.gsap-marker-end,[asscroll]"
        ),
      });
    });
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll;
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      "(min-width:969px)": () => {
        this.room.scale.set(0.11, 0.11, 0.11);
        this.room.position.set(0, 0, 0);

        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        this.firstMoveTimeline.to(this.room.position, {
          x: () => {
            return this.sizes.width * 0.0012;
          },
        });

        //second section
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        this.secondMoveTimeline.to(
          this.room.position,
          {
            x: () => {
              return 1;
            },

            z: () => {
              return this.sizes.height * 0.0000042;
            },
          },
          "same"
        );
        this.secondMoveTimeline.to(
          this.room.scale,
          {
            x: 0.2,
            y: 0.2,
            z: 0.2,
          },
          "same"
        );

        // third section
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        this.thirdMoveTimeline.to(this.camera.orthorgraphicCamera.position, {
          y: 1.6,
          x: -2.1,
        });
      },
      "(max-width:968px)": () => {
        this.room.scale.set(0.07, 0.07, 0.07);
        this.room.position.set(0, 0, 0);

        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }).to(this.room.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1,
        });

        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.scale,
            {
              x: 0.2,
              y: 0.2,
              z: 0.2,
            },
            "same"
          )
          .to(
            this.room.position,
            {
              x: 1.5,
            },
            "same"
          );

        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      },
      all: () => {
        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((x) => {
          this.progressWrapper = x.querySelector(".progress-wrapper");
          this.progressBar = x.querySelector(".progress-bar");
          if (x.classList.contains("right")) {
            GSAP.to(x, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: x,
                start: "top bottom",
                end: "top top",
                markers: false,
                scrub: 0.5,
              },
            });
            GSAP.to(x, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: x,
                start: "bottom bottom",
                end: "bottom top",
                markers: false,
                scrub: 0.5,
              },
            });
          } else {
            GSAP.to(x, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: x,
                start: "top bottom",
                end: "top top",
                markers: false,
                scrub: 0.5,
              },
            });
            GSAP.to(x, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: x,
                start: "bottom bottom",
                end: "bottom top",
                markers: false,
                scrub: 0.5,
              },
            });
          }

          GSAP.from(this.progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: x,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
              pin: this.progressBar,
              pinSpacing: false,
            },
          });
        });

        //circle
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }).to(this.circle.scale, {
          x: 3,
          y: 3,
          z: 3,
        });

        //second section
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }).to(this.circle2.sale, {
          x: 3,
          y: 3,
          z: 3,
        });

        // third section
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }).to(this.circle3.scale, {
          x: 3,
          y: 3,
          z: 3,
        });
      },
    });
  }

  resize() {}
  update() {}
}
