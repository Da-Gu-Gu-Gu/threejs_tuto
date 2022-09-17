import Experience from "../experience";
import * as THREE from 'three'

export default class Floor {
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene

        this.setFloor()
        this.setCircles()
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
        this.plane.position.y=-1
    }
    setCircles(){
        const geometry = new THREE.CircleGeometry( 5, 64 );
        const material = new THREE.MeshStandardMaterial( { color: 0xe5a1aa } );
        this.circle = new THREE.Mesh( geometry, material );
        this.circle.receiveShadow=true
        this.circle.position.y=-0.29
        this.circle.scale.set(0,0,0)
        this.scene.add(this.circle)

        const material2 = new THREE.MeshStandardMaterial( { color: 0x7AD0AC } );
        this.circle2 = new THREE.Mesh( geometry, material2 );
        this.circle2.receiveShadow=true
        this.circle2.position.y=-0.28
        this.circle2.scale.set(0,0,0)
        this.scene.add(this.circle2)

        const material3 = new THREE.MeshStandardMaterial( { color: 0x8395CD} );
        this.circle3 = new THREE.Mesh( geometry, material3 );
        this.circle3.receiveShadow=true
        this.circle3.position.y=-0.27
        this.circle3.scale.set(0,0,0)
        this.scene.add(this.circle3)

        this.circle.rotation.x=this.circle2.rotation.x=this.circle3.rotation.x=Math.PI
    }
    resize(){}
    update(){}
}