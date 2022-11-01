import * as THREE from 'three'
import type { BoxGeometry, Intersection } from 'three'
import vertexShader from './shader.vert'
import fragmentShader from './shader.frag'
import type { Engine } from '../engine/Engine'

export class Box extends THREE.Mesh {
  constructor(engine: Engine) {
    const geometry = new THREE.BoxGeometry(1, 1, 1)

    // prettier-ignore
    const colors = new Float32Array([
      0.0, 1.0, 0.0, // right
      0.0, 1.0, 0.0, // right
      0.0, 1.0, 0.0, // right
      0.0, 1.0, 0.0, // right
      0.0, 1.0, 0.0, // left
      0.0, 1.0, 0.0, // left
      0.0, 1.0, 0.0, // left
      0.0, 1.0, 0.0, // left
      1.0, 0.0, 0.0, // top
      1.0, 0.0, 0.0, // top
      1.0, 0.0, 0.0, // top
      1.0, 0.0, 0.0, // top
      1.0, 0.0, 0.0, // bottom
      1.0, 0.0, 0.0, // bottom
      1.0, 0.0, 0.0, // bottom
      1.0, 0.0, 0.0, // bottom
      0.0, 0.0, 1.0, // front
      0.0, 0.0, 1.0, // front
      0.0, 0.0, 1.0, // front
      0.0, 0.0, 1.0, // front
      0.0, 0.0, 1.0, // back
      0.0, 0.0, 1.0, // back
      0.0, 0.0, 1.0, // back
      0.0, 0.0, 1.0, // back
    ])

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    setOpacityAttribute(geometry)

    const material = new THREE.ShaderMaterial({
      vertexColors: true,
      vertexShader,
      fragmentShader,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
      uniforms: {
        uCheckerboard: { value: engine.resources.getItem('checkerboard') },
      },
    })

    engine.rayCaster.on('move', (intersections: Intersection[]) => {
      if (
        intersections.length > 0 &&
        intersections[0].object instanceof THREE.Mesh
      ) {
        const selectedGeometry = intersections[0].object.geometry

        // the faceIndex selected by the raycaster returns only one triangle of the cube's side
        // based on this faceIndex, we can figure out its neighbor
        const faceIndex = intersections[0].faceIndex!
        const neighborIndex =
          faceIndex % 2 === 0 ? faceIndex + 1 : faceIndex - 1

        // from the faceIndex and neighborIndex, we can get the corresponding vertexIndex
        const selectedIndices = []
        const indexBuffer = selectedGeometry.index
        selectedIndices.push(indexBuffer.array[faceIndex * 3])
        selectedIndices.push(indexBuffer.array[faceIndex * 3 + 1])
        selectedIndices.push(indexBuffer.array[faceIndex * 3 + 2])
        selectedIndices.push(indexBuffer.array[neighborIndex * 3])
        selectedIndices.push(indexBuffer.array[neighborIndex * 3 + 1])
        selectedIndices.push(indexBuffer.array[neighborIndex * 3 + 2])

        // clear the opacity attribute before setting it for the side
        setOpacityAttribute(geometry)

        // set the opacity attribute for the vertices of the selected side
        for (let selectedIndex of selectedIndices) {
          selectedGeometry.attributes['opacity'].array[selectedIndex] = 1
        }

        // signal to three.js that the opacity attribute has changed
        selectedGeometry.attributes['opacity'].needsUpdate = true
      } else {
        // no intersection, clear the opacity attribute
        setOpacityAttribute(geometry)
      }
    })

    super(geometry, material)
  }
}

function setOpacityAttribute(geometry: BoxGeometry) {
  const opacity = new Float32Array(
    Array(geometry.attributes['position'].count).fill(0, 0)
  )
  geometry.setAttribute('opacity', new THREE.BufferAttribute(opacity, 1))
}
