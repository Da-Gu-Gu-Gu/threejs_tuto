import Experience from "../experience";
import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.times;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;

    GSAP.registerPlugin(ScrollTrigger);
    this.room = this.experience.world.room.actualRoom;
    this.setScrollTrigger();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      "(min-width:960px)": function () {},
      "(max-width:960px)": function () {},
    });
  }

  resize() {}
  update() {}
}
