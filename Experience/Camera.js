import Experience from "./experience"
import * as THREE from 'three'

export default class Camera{
    constructor(){
        this.experience=new Experience()
        this.sizes=this.experience.sizes
        this.scene=this.experience.scene
        this.canvas=this.experience.canvas

        this.createPerspectiveCamera()
        this.createOrthorgraphicCamera()
    }
    createPerspectiveCamera(){
        this.perspectiveCamera=new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000)
       
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.z=10
        this.perspectiveCamera.position.y=10
    }
    createOrthorgraphicCamera(){
        this.frustrum=5
        this.orthorgraphicCamera=new THREE.OrthographicCamera(
         (-this.sizes.aspect*this.sizes.frustrum)/2,
         (this.sizes.aspect*this.sizes.frustrum)/2,
         this.sizes.frustrum/2,
       -this.sizes.frustrum/2,
       -100,
       100
        )
        this.scene.add(this.orthorgraphicCamera)
    }
    resize(){

        //update perspective
        this.perspectiveCamera.aspect=this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()

      //update orthorgraphicCamera
        this.orthorgraphicCamera.left=(-this.sizes.aspect*this.frustrum)/2
        this.orthorgraphicCamera.right=   (this.sizes.aspect*this.frustrum)/2
        this.orthorgraphicCamera.top= this.frustrum/2
        this.orthorgraphicCamera.bottom=-this.frustrum/2
        this.orthorgraphicCamera.updateProjectionMatrix()
    }
    update(){}
}