import * as THREE from 'three'
import { EventEmitter } from 'events'
import Experience from '../experience'
import GSAP from 'gsap'

export default class Environment extends EventEmitter{
    constructor(){
        super()
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.resources=this.experience.resources

        this.setSunlight()
    }
    setSunlight(){
        this.sunLight=new THREE.DirectionalLight('#ffffff',3)
        this.sunLight.castShadow=true
        this.sunLight.shadow.camera.far=20
        this.sunLight.shadow.mapSize.set(2048,2048)
        this.sunLight.shadow.normalBias=0.05
        this.sunLight.position.set(-1.7,7,3)
        this.scene.add(this.sunLight)

        this.ambientLight=new THREE.AmbientLight("#fff",1)
        this.scene.add(this.ambientLight)
    }
    switchTheme(theme){
        if(theme==="dark"){
            GSAP.to(this.sunLight.color,{
                b:0.68,
                g:0.23,
                r:0.17
            })
            GSAP.to(this.ambientLight.color,{
                b:0.68,
                g:0.23,
                r:0.17
            })
            GSAP.to(this.sunLight,{
                intensity:0.78,
            })
            GSAP.to(this.ambientLight,{
                intensity:0.78,
            })
        }
        else{
            GSAP.to(this.sunLight.color,{
                r:255/255,
                g:255/255,
                b:255/255
            })
            GSAP.to(this.ambientLight.color,{
                r:255/255,
                g:255/255,
                b:255/255
            })
            GSAP.to(this.sunLight,{
                intensity:3,
            })
            GSAP.to(this.ambientLight,{
                intensity:3,
            })
        }
    }
    resize(){}
    update(){}
}