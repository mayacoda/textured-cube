import Stats from 'three/examples/jsm/libs/stats.module'

let instance: DebugUI | null = null

export class DebugUI {
  stats!: Stats

  constructor() {
    if (instance) {
      return this
    }

    instance = this

    this.stats = Stats()
    document.body.appendChild(this.stats.dom)
  }

  update() {
    this.stats.update()
  }
}
