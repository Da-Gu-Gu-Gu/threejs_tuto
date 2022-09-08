import Experience from "../experience";
import * as THREE from "three";


export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.times;
    this.camera = this.experience.camera;


    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };



    this.setPath();

  }

 

  setPath() {

  }



  resize() {}
  update() {
 

  }
}
