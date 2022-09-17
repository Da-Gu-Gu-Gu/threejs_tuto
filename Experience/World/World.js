import Experience from '../experience'
import * as THREE from 'three'
import { EventEmitter } from 'events'

import Room from './Room'
import Environment from './Environment'
import Controls from './Controls'
import Floor from './Floor'

export default class World extends EventEmitter{
    constructor(){
        super()
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.sizes=this.experience.sizes
        this.camera=this.experience.camera
        this.canvas=this.experience.canvas
        this.resources=this.experience.resources
        this.theme=this.experience.theme
     
         this.resources.on("ready",()=>{
            this.floor=new Floor()
        this.room=new Room()
        this.environment=new Environment()
       
        this.controls=new Controls() 
        this.emit("worldready")
        
    })

    this.theme.on("switch",(theme)=>{
        this.switchTheme(theme)
    })



        
    }

    switchTheme(theme){
        if(this.environment){
            this.environment.switchTheme(theme)
        }
    }

    setRenderer(){
     
    }

    resize(){
        
    }
    update(){
        if(this.room){
            this.room.update()
        }
        if(this.controls){
            this.controls.update()
        }
    }
        

}