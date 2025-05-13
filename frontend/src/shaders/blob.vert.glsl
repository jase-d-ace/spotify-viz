#version 300 es
precision highp float;

// ES3 attributes
in vec3 position;
in vec2 uv;

// ES3 uniforms (three.js no longer injects these for you)
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

// pass to fragment
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
