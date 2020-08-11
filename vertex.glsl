// Variable qualifiers that come with the msdf shader
attribute vec2 uv;
attribute vec4 position;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
varying vec2 vUv;
uniform float time;

void main() {
  vUv = uv;
  vec3 p = vec3(position.x, position.y, position.z);

  p.x += (abs(sin(p.y * 0.025 + time) * 0.5 + 0.5) * 15.);
  p.z += tan(time * 0.25) * 5.;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}