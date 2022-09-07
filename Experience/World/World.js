import Experience from '../experience'
import * as THREE from 'three'

import Room from './Room'

export default class World{
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
       
        const cube=new THREE.Mesh(geometry,material)
        cube.position.set(0,10,3)
        this.scene.add(cube)
        
    }

    setRenderer(){
     
    }

    resize(){
        
    }
    update(){}
        

}