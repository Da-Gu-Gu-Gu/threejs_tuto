import * as THREE from "three";
import Sizes from "./utils/Sizes";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./utils/Time";
import World from "./World/World";

export default class Experience {
    static instance
  constructor(canvas) {

    if(Experience.instance){
        return Experience.instance
    }
    Experience.instance=this
    this.canvas = canvas;
    this.scene=new THREE.Scene()
    this.sizes=new Sizes()
    this.camera=new Camera()
    this.render=new Renderer()
    this.times=new Time()
    this.world=new World()

    console.log(this.scene)
  
    this.sizes.on("resize",()=>{
        this.resize()
    })

    this.times.on("update",()=>{
        this.update()
    })
  }
  update(){
    this.camera.update()
    this.render.update()
  }

  resize(){
    this.camera.resize()
    this.render.resize()
  }
}
