import * as THREE from 'three'
import { EventEmitter } from 'events'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export default class Resources extends EventEmitter{
    constructor(assets){
        super()
        this.assets=assets
        this.items={}
        this.queue=this.assets.length
        this.loaded=0
        this.setLoader()
        this.startLoading()
    }

    setLoader(){
        this.loaders={}
        this.loaders.gltfLoader=new GLTFLoader()
        // this.loaders.dracoLoader=new DRACOLoader()
        // this.loaders.dracoLoader.setDecoderPath("/draco")
        // this.loaders.gltfLoader

    }
    startLoading(){
        for(const asset of this.assets){
            if(asset.type==="glbModel"){
                this.loaders.gltfLoader.load(asset.path,(file)=>{
                    this.singleAssetLoaded(asset,file)
                })
            }
        }
    }

    singleAssetLoaded(asset,file){
        this.items[asset.name]=file
        this.loaded++
        console.log('loading')
        if(this.loaded===this.queue){
            console.log('loaded')
            this.emit('ready')
        }
    }
}