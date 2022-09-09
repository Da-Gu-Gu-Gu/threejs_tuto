import Experience from '../experience'
import * as THREE from 'three'

import Room from './Room'
import Environment from './Environment'
import Controls from './Controls'
import Floor from './Floor'

export default class World{
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.sizes=this.experience.sizes
        this.camera=this.experience.camera
        this.canvas=this.experience.canvas
        this.resources=this.experience.resources
        this.theme=this.experience.theme
     
         this.resources.on("ready",()=>{
        this.room=new Room()
        this.environment=new Environment()
        this.controls=new Controls()
        this.floor=new Floor()
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