import Experience from "./experience"
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

export default class Camera{
    constructor(){
        this.experience=new Experience()
        this.sizes=this.experience.sizes
        this.scene=this.experience.scene
        this.canvas=this.experience.canvas

        this.createPerspectiveCamera()
        this.createOrthorgraphicCamera()
        this.setOrbitControls()
    }
    createPerspectiveCamera(){
        this.perspectiveCamera=new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000)
       
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.x=5.4
        this.perspectiveCamera.position.y=1
        this.perspectiveCamera.position.z=3.6
      
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
            this.helper=new THREE.CameraHelper(this.orthorgraphicCamera)
            this.scene.add(this.helper)

            const size=10
            const divisions=10
            const gridHelper=new THREE.GridHelper(size,divisions)
            this.scene.add(gridHelper)

            // const axeHelper=new THREE.AxesHelper(size)
            // this.scene.add(axeHelper)

      
    }

    setOrbitControls(){
        this.controls=new OrbitControls(this.perspectiveCamera,this.canvas)
        this.controls.enableDamping=true
        this.controls.enableZoom=true
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
    update(){
        // console.log(this.perspectiveCamera.position)
        this.controls.update()
        this.helper.matrixWorldNeedsUpdate=true
        this.helper.position.copy(this.orthorgraphicCamera.position)
        this.helper.rotation.copy(this.orthorgraphicCamera.rotation)
    }
}