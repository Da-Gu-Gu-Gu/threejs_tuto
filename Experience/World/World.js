import Experience from '../experience'
import * as THREE from 'three'

import Room from './Room'
import Environment from './Environment'
import Controls from './Controls'

export default class World{
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.sizes=this.experience.sizes
        this.camera=this.experience.camera
        this.canvas=this.experience.canvas
        this.resources=this.experience.resources

     
         this.resources.on("ready",()=>{
        this.room=new Room()
        this.environment=new Environment()
        this.controls=new Controls()
    })

        // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
       


        // const cube=new THREE.Mesh(geometry,material)
        // cube.position.set(0,10,3)
        // this.scene.add(cube)
        
    }

    setRenderer(){
     
    }

    resize(){
        
    }
    update(){
        if(this.controls){
            this.controls.update()
        }
    }
        

}