varying vec3 vColor;
varying vec2 vUv;
varying float vOpacity;

uniform sampler2D uCheckerboard;

void main() {
    float textureColor = texture2D(uCheckerboard, vUv).r;
    float opacity = textureColor > 0.5 ? 0.8 : 0.2;

    opacity += vOpacity > 0.0 ? 0.2 : 0.0;

    gl_FragColor = vec4(vColor, 1.0 * opacity);
}
