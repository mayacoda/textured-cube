import * as THREE from 'three'
import { RenderEngine } from './RenderEngine'
import { RenderLoop } from './RenderLoop'
import { DebugUI } from './interface/DebugUI'
import { Sizes } from './Sizes'
import { Camera } from './Camera'
import { Resources } from './Resources'
import { Experience, ExperienceConstructor } from './Experience'
import { Loader } from './interface/Loader'
import { Raycaster } from './Raycaster'

export class Engine {
  public readonly camera!: Camera
  public readonly scene!: THREE.Scene
  public readonly renderEngine!: RenderEngine
  public readonly time!: RenderLoop
  public readonly debug!: DebugUI
  public readonly sizes!: Sizes
  public readonly canvas!: HTMLCanvasElement
  public readonly resources!: Resources
  public readonly rayCaster!: Raycaster
  public readonly experience!: Experience
  private readonly loader!: Loader

  constructor({
    canvas,
    experience,
  }: {
    canvas: HTMLCanvasElement
    experience: ExperienceConstructor
  }) {
    if (!canvas) {
      throw new Error('No canvas provided')
    }

    this.canvas = canvas
    this.sizes = new Sizes(this)
    this.debug = new DebugUI()
    this.time = new RenderLoop(this)
    this.scene = new THREE.Scene()
    this.camera = new Camera(this)
    this.renderEngine = new RenderEngine(this)
    this.experience = new experience(this)
    this.resources = new Resources(this.experience.resources)
    this.rayCaster = new Raycaster(this)
    this.loader = new Loader()

    this.resources.on('loaded', () => {
      this.experience.init()
      this.loader.complete()
    })

    this.resources.on('progress', (progress: number) => {
      this.loader.setProgress(progress)
    })
  }

  update(delta: number) {
    if (!this.loader.isComplete) return
    this.camera.update()
    this.renderEngine.update()
    this.experience.update(delta)
    this.debug.update()
    this.rayCaster.update()
  }

  resize() {
    this.camera.resize()
    this.renderEngine.resize()
    if (this.experience.resize) {
      this.experience.resize()
    }
  }
}
