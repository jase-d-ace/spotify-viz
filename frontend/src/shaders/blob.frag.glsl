#version 300 es
precision highp float;

#pragma glslify: noise = require('glsl-noise/simplex/3d')

// uniforms from JS
uniform float u_time;
uniform vec3 u_colors[4];

// interpolated from vertex
in vec2 vUv;

// ES3‐style output
out vec4 fragColor;

void main() {
  vec2 pos = vUv * 2.0 - 1.0;
  float r = length(pos);
  float n = noise(vec3(pos * 2.0, u_time * 0.2));
  float mask = smoothstep(0.5 + n * 0.2, 0.49 + n * 0.2, r);

  vec3 col = mix(u_colors[0], u_colors[1], mask);
  col = mix(col, u_colors[int(mod(u_time, 4.0))], 0.3);

  fragColor = vec4(col, 1.0);
}
