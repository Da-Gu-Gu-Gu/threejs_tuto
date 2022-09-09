import Experience from "../experience";
import * as THREE from 'three'

export default class Floor {
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene

        this.setFloor()
    }
    setFloor(){
        this.geometry=new THREE.PlaneGeometry(30,30)
        this.material=new THREE.MeshStandardMaterial({
            color:0xffffff,
            side:THREE.BackSide
        })
        this.plane=new THREE.Mesh(this.geometry,this.material)
        this.scene.add(this.plane)
        this.plane.castShadow=true
        this.plane.receiveShadow=true
        this.plane.rotation.x=Math.PI/2
        this.plane.position.z=0
    }
    resize(){}
    update(){}
}