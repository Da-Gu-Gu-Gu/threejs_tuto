import Experience from "../experience"
import * as THREE from 'three'
export default class Room{
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.resources=this.experience.resources
        this.room=this.resources.items.model
        this.actualRoom=this.room.scene

        this.setModel()
        console.log(this.room)
        console.log(this.actualRoom)
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
    resize(){}
    update(){}
}