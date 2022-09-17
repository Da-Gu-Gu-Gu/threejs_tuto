import * as THREE from "three";
import Sizes from "./utils/Sizes";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./utils/Time";
import World from "./World/World";
import Resources from "./utils/Resources";
import assets from "./utils/assets";
import Theme from "./Theme";
import Preloader from "./Preloader";

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
    this.resources=new Resources(assets)
    this.theme=new Theme()
    this.world=new World()
    this.preloader=new Preloader()


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
    this.world.update()
  }

  resize(){
    this.camera.resize()
    this.render.resize()
  }
}
