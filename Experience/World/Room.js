import Experience from "../experience"
import * as THREE from 'three'
import GSAP from "gsap";
export default class Room{
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.resources=this.experience.resources
        this.room=this.resources.items.model
        this.actualRoom=this.room.scene


        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
          };

        this.setModel()

        this.onMouseMove()
    }
    setModel(){

        this.actualRoom.children.forEach((child)=>{
       
            child.castShadow=true
            child.receiveShadow=true
            if(child instanceof THREE.Group){
                child.children.foreEach((groupchild)=>{
                    groupchild.castShadow=true
                    groupchild.receiveShadow=true
                })
            }

            // child.scale.set(0,0,0)

            // if(this.actualRoom.children[2].children[12]){
            //     console.log('twae p')
            //     this.actualRoom.children[2].children[12].material=new THREE.MeshPhysicalMaterial()
            //     this.actualRoom.children[2].children[12].material.roughness=0
            //     this.actualRoom.children[2].children[12].material.color.set(0x549dd2)
            //     this.actualRoom.children[2].children[12].material.ior=3
            //     this.actualRoom.children[2].children[12].material.transmission=1
            //     this.actualRoom.children[2].children[12].material.opacity=1
            // }

        
           
        })

        this.scene.add(this.actualRoom)
        this.actualRoom.scale.set(0.11,0.11,0.11)
    }


    onMouseMove(){
        window.addEventListener('mousemove',(e)=>{
         
            this.rotation=((e.clientX-window.innerWidth/2)*2)/window.innerWidth
            this.lerp.target=this.rotation
        })
    }
    resize(){}
    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease,
         
        )

        this.actualRoom.rotation.y=this.lerp.current
    }
}