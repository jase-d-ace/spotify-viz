precision highp float;

// 3D Simplex Noise (Ashima)
// —————————————————————————————————
// Permutation polynomial: (34x^2 + x) mod 289
vec4 permute(vec4 x) {
  return mod((x * 34.0 + 1.0) * x, 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}
float snoise(vec3 v) {
  const vec2  C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  // x0 = x0 - 0 + 0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0 + 3.0*C.x = -0.5

  // Permutations
  i = mod(i, 289.0);
  vec4 p = permute(
    permute(
      permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0)
    )
    + i.x + vec4(0.0, i1.x, i2.x, 1.0)
  );

  // Gradients: 7x7 points over a cube, mapped onto a 3D gradient
  float n_ = 1.0 / 7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.y;
  vec4 y = y_ * ns.x + ns.y;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(
    vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3))
  );
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(
    dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)
  ), 0.0);
  m = m * m;
  return 42.0
    * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),
                       dot(p2, x2), dot(p3, x3)));
}
// —————————————————————————————————

uniform float u_time;
uniform vec3  u_colors[12];
uniform int   u_colorCount;
varying vec2  vUv;

#define PI 3.141592653589793

void main() {
  // 1) Polar coords + noise distortion
  vec2 pos       = vUv * 2.0 - 1.0;
  float r        = length(pos);
  float n        = snoise(vec3(pos * 2.0, u_time * 0.25));
  float distorted = clamp(r + n * 0.25, 0.0, 1.0);

  // 2) Compute a smooth, looping phase in [0,1]
  //    sin cycles -1→1 continuously, so we map into 0→1
  float speed = 0.05; // lower = slower color drift
  float phase = 0.5 + 0.5 * sin(u_time * 2.0 * PI * speed);

  // 3) Combine distortion + phase into a circular lookup
  //    - first normalize distorted → [0,1]
  //    - add the continuous phase
  //    - wrap back into [0,1] via fract
  float t       = fract(distorted + phase);

  // 4) Scale into [0 .. u_colorCount)
  float idxF    = t * float(u_colorCount);
  int   idx0    = int(floor(idxF));
  float frac    = fract(idxF);

  // 5) Wrap the second index around the ring
  int idx1      = (idx0 + 1) % u_colorCount;

  // 6) Blend between the two palette entries
  vec3 c0  = u_colors[idx0];
  vec3 c1  = u_colors[idx1];
  vec3 col = mix(c0, c1, frac);

  gl_FragColor = vec4(col, 1.0);
}