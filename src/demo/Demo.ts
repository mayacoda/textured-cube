import { Engine } from '../engine/Engine'
import * as THREE from 'three'
import { Box } from './Box'
import { Experience } from '../engine/Experience'
import { Resource } from '../engine/Resources'

export class Demo implements Experience {
  resources: Resource[] = [
    {
      name: 'checkerboard',
      type: 'texture',
      path: 'checkerboard.png',
    },
  ]
  box!: Box

  constructor(private engine: Engine) {}

  init() {
    this.engine.scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    const box = new Box(this.engine)
    box.castShadow = true
    this.box = box

    this.engine.scene.add(box)
  }

  resize() {}

  update(delta: number) {
    this.box.rotation.y += delta * 0.5
  }
}
