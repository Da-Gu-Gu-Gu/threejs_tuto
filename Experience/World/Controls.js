import Experience from "../experience";
import * as THREE from "three";
import GSAP from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.times;
    this.camera = this.experience.camera;
    this.sizes=this.experience.sizes

    GSAP.registerPlugin(ScrollTrigger)
    this.room=this.experience.world.room.actualRoom
    this.setPath()


 

  }

 setPath(){
  this.timeline=new GSAP.timeline()
  this.timeline.to(this.room.position,{
    x:()=>{
      return this.sizes.width * 0.0012 
    },
    scrollTrigger:{
      trigger:'.first-move',
      markers:true,
      start:"top top",
      end:"bottom bottom",
      scrub:1,
      invalidateOnRefresh:true,
    },

  })
 }





  resize() {}
  update() {
 

  }
}
