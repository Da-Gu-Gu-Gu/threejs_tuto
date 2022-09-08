import Experience from "../experience";
import * as THREE from "three";
import GSAP from "gsap";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.times;
    this.camera = this.experience.camera;

    this.progress = 0;
    this.dummyVector = new THREE.Vector3(0, 0, 0);

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.position = new THREE.Vector3(0, 0, 0);
    this.lookAtPosition = new THREE.Vector3(0, 0, 0);

    this.directionalVector = new THREE.Vector3(0, 0, 0);
    this.staticVector = new THREE.Vector3(0, 1, 0);
    this.crossVector = new THREE.Vector3(0, 0, 0);

    this.setPath();
    this.onWheel();
  }

 

  setPath() {
    this.curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(5, 1, 3),
        new THREE.Vector3(-5, 0.4, 3),
        new THREE.Vector3(-5, 1.5, -3),
        new THREE.Vector3(5, 1.2, -3),
      
      ],
      true
    );

    this.curve.getPoint(this.progress, this.dummyVector);
    this.camera.orthorgraphicCamera.position.copy(this.dummyVector);

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);
  }

  onWheel() {
    window.addEventListener("wheel", (e) => {
      if (e.deltaY > 0) {
        this.lerp.target += 0.1;
        this.back = false;
      } else {
        this.lerp.target -= 0.1;
        this.back = true;
      }
    });
  }

  resize() {}
  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.curve.getPointAt(this.lerp.current % 1, this.position);
    this.camera.orthorgraphicCamera.position.copy(this.position);

    this.directionalVector.subVectors(
      this.curve.getPointAt((this.lerp.current % 1) + 0.000001),
      this.position
    );

    this.directionalVector.normalize()
    this.crossVector.crossVectors(
        this.directionalVector,
        this.staticVector,
    )
    this.crossVector.multiplyScalar(100000)
    this.camera.orthorgraphicCamera.lookAt(0,0,0)

    // this.lerp.target=GSAP.utils.clamp(0,1,this.lerp.target)
    // this.lerp.current=GSAP.utils.clamp(0,1,this.lerp.current)
    // if(this.back){
    //     this.lerp.target-=0.0001
    // }
    // else{
    //     this.lerp.target+=0.0001
    // }

    // this.curve.getPointAt( this.lerp.current+0.00001,this.lookAtPosition)

    // this.camera.orthorgraphicCamera.position.copy(this.position)
    // this.camera.orthorgraphicCamera.lookAt(this.lookAtPosition)
  }
}
