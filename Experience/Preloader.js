import { EventEmitter } from "events"
import Experience from "./experience";


export default class Preloader extends EventEmitter{
    constructor(){
        super()
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.times;
        this.camera = this.experience.camera;
        this.world=this.experience.world

        this.world.on("worldready",()=>{
            // this.playIntro()
        })
    }
}