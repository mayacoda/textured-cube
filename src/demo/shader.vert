attribute float opacity;

varying vec3 vColor;
varying vec2 vUv;
varying float vOpacity;

void main() {
    vColor = color;
    vUv = uv;
    vOpacity = opacity;

    gl_Position = projectionMatrix  * viewMatrix * modelMatrix * vec4(position, 1.0);
}
