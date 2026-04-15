var w0=`:root {
  --vapor-pink: #ff71ce;
  --vapor-blue: #01cdfe;
  --vapor-green: #05ffa1;
  --vapor-purple: #b967ff;
  --vapor-yellow: #fffb96;
}

/* Global Fix to prevent Spicetify scrollbars when active */
body:has(#vapor-lyrics-mount-root) .main-view-container__scroll-node,
body:has(#vapor-lyrics-mount-root) .main-view-container__scroll-node-child {
  overflow: hidden !important;
}

#vapor-lyrics-app-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
}

.vapor-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #000000;
  z-index: -1;
  background-size: cover;
  background-position: center;
  transition: background-image 1s ease;
}

.static-cover {
  filter: blur(50px) brightness(0.4) saturate(1.5);
  transform: scale(1.1);
}

.vapor-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px;
  color: white;
  font-family: "Outfit", "Inter", sans-serif;
  box-sizing: border-box;
}

.vapor-header {
  margin-bottom: 40px;
  text-align: center;
}

.vapor-title {
  font-size: 3rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 12px;
  background: linear-gradient(to bottom, var(--vapor-pink), var(--vapor-blue));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(255, 113, 206, 0.5));
  margin: 0;
}

.vapor-lyrics-container {
  flex: 1;
  overflow: hidden;
  /* Soft fade-out at top and bottom for a floating, cinematic feel */
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
  background: rgba(0, 0, 0, 0.5);
}

/* The Dreamlike Scroll */
.vapor-lyrics-scroll {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50vh 0;
  will-change: transform;
  transform-style: preserve-3d;
  transition: none;
}

.vapor-lyrics-scroll.multi-active .vapor-lyric-line.v-active {
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 0.2em 0.8em;
  margin: 0.4em 0;
}

.vapor-lyric-line {
  flex-shrink: 0;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.5;
  margin: 0.7em 0;
  text-align: inherit;
  max-width: 80%;
  
  background: linear-gradient(to bottom, #ffffff 50%, #ffffff 50%);
  background-size: 100% 200%;
  background-position: bottom;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.25;
  filter: blur(var(--line-blur, 0px));
  transform: translate3d(0,0,0) scale(var(--line-scale, 0.92));
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), 
              background-position 0.5s ease-out,
              opacity 0.5s ease,
              filter 0.5s ease;
  will-change: transform, background-position, opacity, filter;
}

/* Line entrance animation when a lyric becomes active */
@keyframes vapor-line-enter {
  0%   { opacity: 0.25; transform: translate3d(0, 4px, 0) scale(0.95); }
  100% { opacity: 1;    transform: translate3d(0, 0,  0) scale(1.03); }
}

.vapor-lyric-line.v-active {
  background-position: top;
  opacity: 1;
  --line-scale: 1.04;
  --line-blur: 0px !important;
  transform: translate3d(0,0,0) scale(var(--line-scale));
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
  animation: vapor-line-enter 0.4s cubic-bezier(0.23, 1, 0.32, 1) both;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), 
              background-position var(--line-duration, 0.5s) linear,
              opacity 0.4s ease;
}

.vapor-lyric-line.v-played {
  background-position: top;
  opacity: 0.6;
  transform: translate3d(0, -2px, 0) scale(0.92);
  filter: none;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 0.5s ease;
}

/* Vocal Roles */
.vapor-lyric-line.role-background {
  font-style: italic;
  font-weight: 500;
  opacity: 0.15;
  font-size: 0.8em !important;
}

.vapor-lyric-line.v-active.role-background {
  opacity: 0.85;
  color: var(--vapor-blue) !important;
  -webkit-text-fill-color: var(--vapor-blue);
  filter: drop-shadow(0 0 10px var(--vapor-blue));
}

.vapor-lyric-line.v-played.role-background {
  opacity: 0.4;
  color: var(--vapor-blue) !important;
  -webkit-text-fill-color: var(--vapor-blue);
}



.vapor-lyric-line.v-active.role-duet {
  filter: drop-shadow(0 0 12px rgba(0, 200, 230, 0.5));
}

.vapor-lyric-line.placeholder {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.2; }
  50% { opacity: 0.5; }
  100% { opacity: 0.2; }
}

.vapor-debug-status {
  position: relative;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.5;
  font-family: monospace;
  cursor: pointer;
  background: rgba(0,0,0,0.5);
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.2s ease;
  z-index: 2000;
  flex-shrink: 0;
}

.vapor-debug-status:hover {
  opacity: 1;
  background: rgba(0,0,0,0.8);
  border-color: var(--vapor-pink);
}

.floating-controls {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
  z-index: 2000;
}

.vapor-settings-toggle {
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease;
  opacity: 0.5;
  flex-shrink: 0;
}

.vapor-settings-toggle:hover {
  opacity: 1;
  background: rgba(0,0,0,0.8);
  border-color: var(--vapor-blue);
  transform: rotate(45deg);
}

.vapor-settings-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: rgba(10, 10, 20, 0.95);
  border: 2px solid var(--vapor-blue);
  border-radius: 12px;
  z-index: 3000;
  box-shadow: 0 0 30px rgba(1, 205, 254, 0.4);
  font-family: inherit;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.vapor-settings-overlay header {
  padding: 12px 20px;
  background: var(--vapor-blue);
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vapor-settings-overlay h2 {
  font-size: 14px;
  margin: 0;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.vapor-settings-overlay .settings-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-item.toggle {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.setting-item label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--vapor-blue);
  font-weight: bold;
}

.setting-item input[type="range"] {
  appearance: none;
  background: rgba(255,255,255,0.1);
  height: 4px;
  border-radius: 2px;
}

.setting-item input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--vapor-pink);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px var(--vapor-pink);
}

.button-group {
  display: flex;
  gap: 5px;
}

.button-group button {
  flex: 1;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  padding: 6px;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.button-group button.active {
  background: var(--vapor-pink);
  color: black;
  border-color: var(--vapor-pink);
  font-weight: bold;
}

.setting-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  appearance: none;
  border: 1px solid var(--vapor-blue);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

.setting-item input[type="checkbox"]:checked {
  background: var(--vapor-blue);
}

.setting-item input[type="checkbox"]:checked::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 12px;
  font-weight: bold;
}

.reset-button {
  margin-top: 10px;
  background: none;
  border: 1px solid #ff4b2b;
  color: #ff4b2b;
  padding: 10px;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
}

.reset-button:hover {
  background: #ff4b2b;
  color: white;
  box-shadow: 0 0 15px rgba(255, 75, 43, 0.5);
}

.vapor-debug-overlay {
  position: fixed;
  bottom: 80px;
  left: 20px;
  width: 450px;
  max-height: 400px;
  background: rgba(5, 5, 10, 0.95);
  border: 2px solid var(--vapor-pink);
  border-radius: 8px;
  z-index: 2001;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(255, 113, 206, 0.3);
  font-family: "Courier New", monospace;
  overflow: hidden;
  user-select: text !important;
  cursor: text;
}

.vapor-debug-overlay header {
  padding: 8px 12px;
  background: var(--vapor-pink);
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vapor-debug-overlay h2 {
  font-size: 12px;
  margin: 0;
  font-weight: 900;
  letter-spacing: 1px;
}

.vapor-debug-overlay button {
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.vapor-debug-overlay .debug-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  font-size: 10px;
  line-height: 1.4;
  color: #05ffa1;
  display: flex;
  flex-direction: column-reverse; /* Newest at top */
}

.vapor-debug-overlay .debug-line {
  margin-bottom: 4px;
  word-break: break-all;
  border-bottom: 1px solid rgba(5, 255, 161, 0.1);
  padding-bottom: 2px;
}

.vapor-syllable {
  display: inline-block;
  transform-origin: center center;
  white-space: pre;
  will-change: transform, filter;

  /* Exact Spicy Lyrics Gradient Emulation */
  --vocal-notsung-opacity: 0.45;
  background-image: linear-gradient(
    90deg,
    #ffffff 0%,
    #ffffff var(--gradient-pos, 0%),
    rgba(255, 255, 255, var(--vocal-notsung-opacity)) var(--gradient-pos, 0%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
}

/* Word-Sync Line Override */
.vapor-lyric-line.word-synced {
  background: none !important;
  -webkit-text-fill-color: initial !important;
}

/* Future Lines */
.vapor-lyric-line.word-synced .vapor-syllable {
  --vocal-notsung-opacity: 0.35;
  transform: scale(0.95);
  --gradient-pos: 0%;
}

/* Active Line */
.vapor-lyric-line.v-active.word-synced .vapor-syllable {
  --vocal-notsung-opacity: 0.55;
  transform: scale(1);
}

/* Current Word Being Sung */
.vapor-lyric-line.v-active.word-synced .vapor-syllable.active-syllable {
  transform: scale(1.05);
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Completed Word inside Active Line */
.vapor-lyric-line.v-active.word-synced .vapor-syllable.synced {
  --gradient-pos: 100%;
}

/* Fully Played Past Lines */
.vapor-lyric-line.v-played.word-synced .vapor-syllable {
  --vocal-notsung-opacity: 0.65;
  --gradient-pos: 0% !important;
  transform: scale(0.95);
  /* Override to a flat semi-transparent white */
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.65) 0%,
    rgba(255, 255, 255, 0.65) 100%
  );
}
`;class N0{canvas;gl;halfFloatExt=null;halfFloatLinearExt=null;blurProgram;blendProgram;tintProgram;warpProgram;outputProgram;positionBuffer;texCoordBuffer;sourceTexture;blurFBO1;blurFBO2;currentAlbumFBO;nextAlbumFBO;warpFBO;animationId=null;lastFrameTime=0;accumulatedTime=0;isPlaying=!1;isTransitioning=!1;transitionStartTime=0;_transitionDuration;_warpIntensity;_blurPasses;_animationSpeed;_targetAnimationSpeed;_saturation;_tintColor;_tintIntensity;_dithering;_scale;hasImage=!1;attribs;uniforms;constructor(o,x={}){this.canvas=o;let b=o.getContext("webgl",{preserveDrawingBuffer:!0});if(!b)throw Error("WebGL not supported");this.gl=b,this.halfFloatExt=b.getExtension("OES_texture_half_float"),this.halfFloatLinearExt=b.getExtension("OES_texture_half_float_linear"),this._warpIntensity=x.warpIntensity??1,this._blurPasses=x.blurPasses??8,this._animationSpeed=x.animationSpeed??1,this._targetAnimationSpeed=this._animationSpeed,this._transitionDuration=x.transitionDuration??1000,this._saturation=x.saturation??1.5,this._tintColor=x.tintColor??[0.157,0.157,0.235],this._tintIntensity=x.tintIntensity??0.15,this._dithering=x.dithering??0.008,this._scale=x.scale??1,this.blurProgram=this.createProgram(`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,`
  precision highp float;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform float u_offset;
  varying vec2 v_texCoord;

  void main() {
    highp vec2 texelSize = 1.0 / u_resolution;
    highp vec4 color = vec4(0.0);

    color += texture2D(u_texture, v_texCoord + vec2(-u_offset, -u_offset) * texelSize);
    color += texture2D(u_texture, v_texCoord + vec2(u_offset, -u_offset) * texelSize);
    color += texture2D(u_texture, v_texCoord + vec2(-u_offset, u_offset) * texelSize);
    color += texture2D(u_texture, v_texCoord + vec2(u_offset, u_offset) * texelSize);

    gl_FragColor = color * 0.25;
  }
`),this.blendProgram=this.createProgram(`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,`
  precision highp float;
  uniform sampler2D u_texture1;
  uniform sampler2D u_texture2;
  uniform float u_blend;
  varying vec2 v_texCoord;

  void main() {
    vec4 color1 = texture2D(u_texture1, v_texCoord);
    vec4 color2 = texture2D(u_texture2, v_texCoord);
    gl_FragColor = mix(color1, color2, u_blend);
  }
`),this.tintProgram=this.createProgram(`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,`
  precision highp float;
  uniform sampler2D u_texture;
  uniform vec3 u_tintColor;
  uniform float u_tintIntensity;
  varying vec2 v_texCoord;

  void main() {
    vec4 color = texture2D(u_texture, v_texCoord);
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // darkMask: 1.0 for black, 0.0 for luma >= 0.5
    float darkMask = 1.0 - smoothstep(0.0, 0.5, luma);

    // Blend dark areas toward tint color
    color.rgb = mix(color.rgb, u_tintColor, darkMask * u_tintIntensity);

    gl_FragColor = color;
  }
`),this.warpProgram=this.createProgram(`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,`
  precision highp float;
  uniform sampler2D u_texture;
  uniform float u_time;
  uniform float u_intensity;
  varying vec2 v_texCoord;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = v_texCoord;
    float t = u_time * 0.05;

    vec2 center = uv - 0.5;
    float centerWeight = 1.0 - smoothstep(0.0, 0.7, length(center));

    // Large-scale movement (slow, big blobs)
    float n1 = snoise(uv * 0.35 + vec2(t, t * 0.7));
    float n2 = snoise(uv * 0.35 + vec2(-t * 0.8, t * 0.5) + vec2(50.0, 50.0));

    // Medium-scale detail (adds organic movement)
    float n3 = snoise(uv * 0.9 + vec2(t * 1.2, -t) + vec2(100.0, 0.0));
    float n4 = snoise(uv * 0.9 + vec2(-t, t * 1.1) + vec2(0.0, 100.0));

    // Combine two octaves
    vec2 warp = vec2(
      n1 * 0.65 + n3 * 0.35,
      n2 * 0.65 + n4 * 0.35
    ) * centerWeight;

    vec2 warpedUV = uv + warp * u_intensity;
    warpedUV = clamp(warpedUV, 0.0, 1.0);

    gl_FragColor = texture2D(u_texture, warpedUV);
  }
`),this.outputProgram=this.createProgram(`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,`
  precision highp float;
  uniform sampler2D u_texture;
  uniform float u_saturation;
  uniform float u_dithering;
  uniform float u_time;
  uniform float u_scale;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;

  highp float hash(highp vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.zyx + 31.32);
    return fract((p.x + p.y) * p.z);
  }

  void main() {
    vec2 uv = (v_texCoord - 0.5) / u_scale + 0.5;
    uv = clamp(uv, 0.0, 1.0);

    vec4 color = texture2D(u_texture, uv);

    vec2 center = v_texCoord - 0.5;
    float vignette = 1.0 - dot(center, center) * 0.3;
    color.rgb *= vignette;

    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = mix(vec3(gray), color.rgb, u_saturation);

    highp vec2 pixelPos = floor(v_texCoord * u_resolution);
    highp float noise = hash(vec3(pixelPos, floor(u_time * 60.0)));
    color.rgb += (noise - 0.5) * u_dithering;

    gl_FragColor = color;
  }
`),this.attribs={position:b.getAttribLocation(this.blurProgram,"a_position"),texCoord:b.getAttribLocation(this.blurProgram,"a_texCoord")},this.uniforms={blur:{resolution:b.getUniformLocation(this.blurProgram,"u_resolution"),texture:b.getUniformLocation(this.blurProgram,"u_texture"),offset:b.getUniformLocation(this.blurProgram,"u_offset")},blend:{texture1:b.getUniformLocation(this.blendProgram,"u_texture1"),texture2:b.getUniformLocation(this.blendProgram,"u_texture2"),blend:b.getUniformLocation(this.blendProgram,"u_blend")},warp:{texture:b.getUniformLocation(this.warpProgram,"u_texture"),time:b.getUniformLocation(this.warpProgram,"u_time"),intensity:b.getUniformLocation(this.warpProgram,"u_intensity")},tint:{texture:b.getUniformLocation(this.tintProgram,"u_texture"),tintColor:b.getUniformLocation(this.tintProgram,"u_tintColor"),tintIntensity:b.getUniformLocation(this.tintProgram,"u_tintIntensity")},output:{texture:b.getUniformLocation(this.outputProgram,"u_texture"),saturation:b.getUniformLocation(this.outputProgram,"u_saturation"),dithering:b.getUniformLocation(this.outputProgram,"u_dithering"),time:b.getUniformLocation(this.outputProgram,"u_time"),scale:b.getUniformLocation(this.outputProgram,"u_scale"),resolution:b.getUniformLocation(this.outputProgram,"u_resolution")}},this.positionBuffer=this.createBuffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),this.texCoordBuffer=this.createBuffer(new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),this.sourceTexture=this.createTexture(),this.blurFBO1=this.createFramebuffer(128,128,!0),this.blurFBO2=this.createFramebuffer(128,128,!0),this.currentAlbumFBO=this.createFramebuffer(128,128,!0),this.nextAlbumFBO=this.createFramebuffer(128,128,!0),this.warpFBO=this.createFramebuffer(1,1,!0),this.resize()}get warpIntensity(){return this._warpIntensity}set warpIntensity(o){this._warpIntensity=Math.max(0,Math.min(1,o))}get blurPasses(){return this._blurPasses}set blurPasses(o){let x=Math.max(1,Math.min(40,Math.floor(o)));if(x!==this._blurPasses){if(this._blurPasses=x,this.hasImage)this.reblurCurrentImage()}}get animationSpeed(){return this._targetAnimationSpeed}set animationSpeed(o){this._targetAnimationSpeed=Math.max(0.1,Math.min(5,o))}get transitionDuration(){return this._transitionDuration}set transitionDuration(o){this._transitionDuration=Math.max(0,Math.min(5000,o))}get saturation(){return this._saturation}set saturation(o){this._saturation=Math.max(0,Math.min(3,o))}get tintColor(){return this._tintColor}set tintColor(o){let x=o.map((k)=>Math.max(0,Math.min(1,k)));if(x.some((k,J)=>k!==this._tintColor[J])){if(this._tintColor=x,this.hasImage)this.reblurCurrentImage()}}get tintIntensity(){return this._tintIntensity}set tintIntensity(o){let x=Math.max(0,Math.min(1,o));if(x!==this._tintIntensity){if(this._tintIntensity=x,this.hasImage)this.reblurCurrentImage()}}get dithering(){return this._dithering}set dithering(o){this._dithering=Math.max(0,Math.min(0.1,o))}get scale(){return this._scale}set scale(o){this._scale=Math.max(0.01,Math.min(4,o))}setOptions(o){if(o.warpIntensity!==void 0)this.warpIntensity=o.warpIntensity;if(o.blurPasses!==void 0)this.blurPasses=o.blurPasses;if(o.animationSpeed!==void 0)this.animationSpeed=o.animationSpeed;if(o.transitionDuration!==void 0)this.transitionDuration=o.transitionDuration;if(o.saturation!==void 0)this.saturation=o.saturation;if(o.tintColor!==void 0)this.tintColor=o.tintColor;if(o.tintIntensity!==void 0)this.tintIntensity=o.tintIntensity;if(o.dithering!==void 0)this.dithering=o.dithering;if(o.scale!==void 0)this.scale=o.scale}getOptions(){return{warpIntensity:this._warpIntensity,blurPasses:this._blurPasses,animationSpeed:this._targetAnimationSpeed,transitionDuration:this._transitionDuration,saturation:this._saturation,tintColor:this._tintColor,tintIntensity:this._tintIntensity,dithering:this._dithering,scale:this._scale}}loadImage(o){return new Promise((x,b)=>{let k=new Image;k.crossOrigin="anonymous",k.onload=()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,k),this.processNewImage(),x()},k.onerror=()=>b(Error(`Failed to load image: ${o}`)),k.src=o})}loadImageElement(o){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,o),this.processNewImage()}loadImageData(o,x,b){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,x,b,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,o instanceof Uint8ClampedArray?new Uint8Array(o.buffer):o),this.processNewImage()}loadFromImageData(o){this.loadImageData(o.data,o.width,o.height)}async loadBlob(o){let x=await createImageBitmap(o);this.loadImageElement(x),x.close()}loadBase64(o){let x=o.startsWith("data:")?o:`data:image/png;base64,${o}`;return this.loadImage(x)}async loadArrayBuffer(o,x="image/png"){let b=new Blob([o],{type:x});return this.loadBlob(b)}loadGradient(o,x=135){let k=document.createElement("canvas");k.width=512,k.height=512;let J=k.getContext("2d");if(!J)return;let N=x*Math.PI/180,K=256-Math.cos(N)*512,Q=256-Math.sin(N)*512,v=256+Math.cos(N)*512,z=256+Math.sin(N)*512,q=J.createLinearGradient(K,Q,v,z);o.forEach((B,W)=>{q.addColorStop(W/(o.length-1),B)}),J.fillStyle=q,J.fillRect(0,0,512,512),this.loadImageElement(k)}processNewImage(){[this.currentAlbumFBO,this.nextAlbumFBO]=[this.nextAlbumFBO,this.currentAlbumFBO],this.blurSourceInto(this.nextAlbumFBO),this.hasImage=!0,this.isTransitioning=!0,this.transitionStartTime=performance.now()}reblurCurrentImage(){this.blurSourceInto(this.nextAlbumFBO)}blurSourceInto(o){let x=this.gl;x.useProgram(this.tintProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.blurFBO1.framebuffer),x.viewport(0,0,128,128),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,this.sourceTexture),x.uniform1i(this.uniforms.tint.texture,0),x.uniform3fv(this.uniforms.tint.tintColor,this._tintColor),x.uniform1f(this.uniforms.tint.tintIntensity,this._tintIntensity),x.drawArrays(x.TRIANGLES,0,6),x.useProgram(this.blurProgram),this.setupAttributes(),x.uniform2f(this.uniforms.blur.resolution,128,128),x.uniform1i(this.uniforms.blur.texture,0);let b=this.blurFBO1,k=this.blurFBO2;for(let J=0;J<this._blurPasses;J++)x.bindFramebuffer(x.FRAMEBUFFER,k.framebuffer),x.viewport(0,0,128,128),x.bindTexture(x.TEXTURE_2D,b.texture),x.uniform1f(this.uniforms.blur.offset,J+0.5),x.drawArrays(x.TRIANGLES,0,6),[b,k]=[k,b];x.bindFramebuffer(x.FRAMEBUFFER,o.framebuffer),x.viewport(0,0,128,128),x.bindTexture(x.TEXTURE_2D,b.texture),x.uniform1f(this.uniforms.blur.offset,0),x.drawArrays(x.TRIANGLES,0,6)}resize(){let o=this.canvas.width,x=this.canvas.height;if(this.warpFBO)this.deleteFramebuffer(this.warpFBO);this.warpFBO=this.createFramebuffer(o,x,!0)}start(){if(this.isPlaying)return;this.isPlaying=!0,this.lastFrameTime=performance.now(),requestAnimationFrame(this.renderLoop)}stop(){if(this.isPlaying=!1,this.animationId!==null)cancelAnimationFrame(this.animationId),this.animationId=null}renderFrame(o){let x=performance.now();if(o!==void 0)this.render(o,x);else{let b=(x-this.lastFrameTime)/1000;this.lastFrameTime=x,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=b*this._animationSpeed,this.render(this.accumulatedTime,x)}}dispose(){this.stop();let o=this.gl;o.deleteProgram(this.blurProgram),o.deleteProgram(this.blendProgram),o.deleteProgram(this.tintProgram),o.deleteProgram(this.warpProgram),o.deleteProgram(this.outputProgram),o.deleteBuffer(this.positionBuffer),o.deleteBuffer(this.texCoordBuffer),o.deleteTexture(this.sourceTexture),this.deleteFramebuffer(this.blurFBO1),this.deleteFramebuffer(this.blurFBO2),this.deleteFramebuffer(this.currentAlbumFBO),this.deleteFramebuffer(this.nextAlbumFBO),this.deleteFramebuffer(this.warpFBO)}renderLoop=(o)=>{if(!this.isPlaying)return;let x=(o-this.lastFrameTime)/1000;this.lastFrameTime=o,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=x*this._animationSpeed,this.render(this.accumulatedTime,o),this.animationId=requestAnimationFrame(this.renderLoop)};render(o,x=performance.now()){let b=this.gl,k=this.canvas.width,J=this.canvas.height,N=1;if(this.isTransitioning){let Q=x-this.transitionStartTime;if(N=Math.min(1,Q/this._transitionDuration),N>=1)this.isTransitioning=!1}let K;if(this.isTransitioning&&N<1)b.useProgram(this.blendProgram),this.setupAttributes(),b.bindFramebuffer(b.FRAMEBUFFER,this.blurFBO1.framebuffer),b.viewport(0,0,128,128),b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,this.currentAlbumFBO.texture),b.uniform1i(this.uniforms.blend.texture1,0),b.activeTexture(b.TEXTURE1),b.bindTexture(b.TEXTURE_2D,this.nextAlbumFBO.texture),b.uniform1i(this.uniforms.blend.texture2,1),b.uniform1f(this.uniforms.blend.blend,N),b.drawArrays(b.TRIANGLES,0,6),K=this.blurFBO1.texture,b.useProgram(this.warpProgram),this.setupAttributes(),b.bindFramebuffer(b.FRAMEBUFFER,this.warpFBO.framebuffer),b.viewport(0,0,k,J),b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,K),b.uniform1i(this.uniforms.warp.texture,0),b.uniform1f(this.uniforms.warp.time,o),b.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),b.drawArrays(b.TRIANGLES,0,6),b.useProgram(this.outputProgram),this.setupAttributes(),b.bindFramebuffer(b.FRAMEBUFFER,null),b.viewport(0,0,k,J),b.bindTexture(b.TEXTURE_2D,this.warpFBO.texture),b.uniform1i(this.uniforms.output.texture,0),b.uniform1f(this.uniforms.output.saturation,this._saturation),b.uniform1f(this.uniforms.output.dithering,this._dithering),b.uniform1f(this.uniforms.output.time,o),b.uniform1f(this.uniforms.output.scale,this._scale),b.uniform2f(this.uniforms.output.resolution,k,J),b.drawArrays(b.TRIANGLES,0,6);else b.useProgram(this.warpProgram),this.setupAttributes(),b.bindFramebuffer(b.FRAMEBUFFER,this.warpFBO.framebuffer),b.viewport(0,0,k,J),b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,this.nextAlbumFBO.texture),b.uniform1i(this.uniforms.warp.texture,0),b.uniform1f(this.uniforms.warp.time,o),b.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),b.drawArrays(b.TRIANGLES,0,6),b.useProgram(this.outputProgram),this.setupAttributes(),b.bindFramebuffer(b.FRAMEBUFFER,null),b.viewport(0,0,k,J),b.bindTexture(b.TEXTURE_2D,this.warpFBO.texture),b.uniform1i(this.uniforms.output.texture,0),b.uniform1f(this.uniforms.output.saturation,this._saturation),b.uniform1f(this.uniforms.output.dithering,this._dithering),b.uniform1f(this.uniforms.output.time,o),b.uniform1f(this.uniforms.output.scale,this._scale),b.uniform2f(this.uniforms.output.resolution,k,J),b.drawArrays(b.TRIANGLES,0,6)}setupAttributes(){let o=this.gl;o.bindBuffer(o.ARRAY_BUFFER,this.positionBuffer),o.enableVertexAttribArray(this.attribs.position),o.vertexAttribPointer(this.attribs.position,2,o.FLOAT,!1,0,0),o.bindBuffer(o.ARRAY_BUFFER,this.texCoordBuffer),o.enableVertexAttribArray(this.attribs.texCoord),o.vertexAttribPointer(this.attribs.texCoord,2,o.FLOAT,!1,0,0)}createShader(o,x){let b=this.gl,k=b.createShader(o);if(!k)throw Error("Failed to create shader");if(b.shaderSource(k,x),b.compileShader(k),!b.getShaderParameter(k,b.COMPILE_STATUS)){let J=b.getShaderInfoLog(k);throw b.deleteShader(k),Error(`Shader compile error: ${J}`)}return k}createProgram(o,x){let b=this.gl,k=this.createShader(b.VERTEX_SHADER,o),J=this.createShader(b.FRAGMENT_SHADER,x),N=b.createProgram();if(!N)throw Error("Failed to create program");if(b.attachShader(N,k),b.attachShader(N,J),b.linkProgram(N),!b.getProgramParameter(N,b.LINK_STATUS)){let K=b.getProgramInfoLog(N);throw b.deleteProgram(N),Error(`Program link error: ${K}`)}return b.deleteShader(k),b.deleteShader(J),N}createBuffer(o){let x=this.gl,b=x.createBuffer();if(!b)throw Error("Failed to create buffer");return x.bindBuffer(x.ARRAY_BUFFER,b),x.bufferData(x.ARRAY_BUFFER,o,x.STATIC_DRAW),b}createTexture(){let o=this.gl,x=o.createTexture();if(!x)throw Error("Failed to create texture");return o.bindTexture(o.TEXTURE_2D,x),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),x}createFramebuffer(o,x,b=!1){let k=this.gl,J=this.createTexture(),K=b&&this.halfFloatExt&&this.halfFloatLinearExt?this.halfFloatExt.HALF_FLOAT_OES:k.UNSIGNED_BYTE;k.texImage2D(k.TEXTURE_2D,0,k.RGBA,o,x,0,k.RGBA,K,null);let Q=k.createFramebuffer();if(!Q)throw Error("Failed to create framebuffer");return k.bindFramebuffer(k.FRAMEBUFFER,Q),k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,J,0),{framebuffer:Q,texture:J}}deleteFramebuffer(o){this.gl.deleteFramebuffer(o.framebuffer),this.gl.deleteTexture(o.texture)}}var C0={syncOffset:0,fontScale:1,visualEffect:"kawarp",textAlign:"center",showDebugOnStart:!1,showHeader:!0,useNativeSpotify:!0,devMode:!1},X0=(o)=>{let x=o.split(`
`),b=[],k=/\[(\d+):(\d+(?:\.\d+)?)\]/;x.forEach((K)=>{let Q=K.match(k);if(Q){let v=(parseInt(Q[1])*60+parseFloat(Q[2]))*1000,z=K.replace(k,"").trim();if(z.includes("<")){let q=[],B=z.split(/(<\d+:\d+(?:\.\d+)?>)/g).filter((h)=>h.length>0),W=v,Z="";B.forEach((h)=>{let T=h.match(/<(\d+):(\d+(?:\.\d+)?)>/);if(T)W=(parseInt(T[1])*60+parseFloat(T[2]))*1000;else Z+=h,q.push({startTime:W,word:h})});let Y="main";if(Z.trim().startsWith("(")&&Z.trim().endsWith(")"))Y="background";else if(Z.includes(": "))Y="duet";b.push({startTime:v,words:Z.trim(),syllables:q,role:Y})}else if(z){let q="main";if(z.startsWith("(")&&z.endsWith(")"))q="background";else if(z.includes(": "))q="duet";b.push({startTime:v,words:z,role:q})}}else if(K.trim().length>0&&!K.includes("[by:")&&!K.includes("[ar:")){let v="main",z=K.trim();if(z.startsWith("(")&&z.endsWith(")"))v="background";b.push({startTime:0,words:z,role:v})}});let N=((K)=>{let Q=[];return K.forEach((v)=>{if((v.words.includes("(")||v.words.includes(")"))&&!(v.words.trim().startsWith("(")&&v.words.trim().endsWith(")"))&&v.syllables){let B=v.syllables.filter((Z)=>!Z.word.trim().includes("(")).map((Z)=>({...Z})),W=v.syllables.filter((Z)=>Z.word.trim().includes("(")).map((Z)=>({...Z,word:Z.word.replace(/[()]/g,"").trim()}));if(B.length>0)Q.push({...v,words:B.map((Z)=>Z.word).join("").trim(),syllables:B,role:v.role==="duet"?"duet":"main"});if(W.length>0)Q.push({...v,words:W.map((Z)=>Z.word).join("").trim(),syllables:W,role:"background",agent:void 0})}else{let B={...v};if(v.words.includes("(")){if(B.words=v.words.replace(/[()]/g,"").trim(),v.syllables)B.syllables=v.syllables.map((W)=>({...W,word:W.word.replace(/[()]/g,"").trim()}));B.role="background",B.agent=void 0}Q.push(B)}}),Q.sort((v,z)=>v.startTime-z.startTime)})(b);return N.forEach((K)=>{if(K.syllables)for(let Q=0;Q<K.syllables.length;Q++){let v=K.syllables[Q];if(Q<K.syllables.length-1)v.duration=K.syllables[Q+1].startTime-v.startTime;else v.duration=Math.max(200,(K.endTime||v.startTime+1000)-v.startTime)}}),N},D0=(o)=>{try{let b=new DOMParser().parseFromString(o,"text/xml"),k=[],J=(v)=>{if(!v)return 0;let z=v.split(":").map(parseFloat);if(z.length===3)return(z[0]*3600+z[1]*60+z[2])*1000;if(z.length===2)return(z[0]*60+z[1])*1000;return z[0]*1000},N=b.getElementsByTagName("p");for(let v=0;v<N.length;v++){let z=N[v],q=J(z.getAttribute("begin")),B=z.getAttribute("ttm:agent")||"v1",W=z.getAttribute("ttm:role")||"",Z=[],Y="",h=(O,t)=>{if(O.nodeType===Node.TEXT_NODE){let L=O.textContent||"";if(L.trim().length>0)Y+=L,Z.push({startTime:q,word:L})}else if(O.nodeType===Node.ELEMENT_NODE){let L=O;if(L.tagName==="span"){let s=J(L.getAttribute("begin"))||q,f0=L.getAttribute("ttm:role")||"",q0=t||f0==="background"||f0==="x-bg",v0="";for(let $=0;$<L.childNodes.length;$++){let u=L.childNodes[$];if(u.nodeType===Node.TEXT_NODE)v0+=u.textContent;else if(u.nodeType===Node.ELEMENT_NODE&&u.tagName==="span")v0+=u.textContent}let i=v0;if(q0&&!i.startsWith("("))i=`(${i})`;if(!i.endsWith(" ")&&!i.endsWith("-")&&O.nextSibling){let u=O.nextSibling.textContent||"";if(u.length>0&&!u.startsWith(" ")&&!u.startsWith("-"))i+=" "}Z.push({startTime:s,word:i}),Y+=i}else if(L.tagName==="br")Y+=" ";else for(let s=0;s<L.childNodes.length;s++)h(L.childNodes[s],t)}},T=W==="background"||W==="x-bg"||z.textContent?.trim().startsWith("(")&&z.textContent?.trim().endsWith(")");if(z.getElementsByTagName("span").length>0)for(let O=0;O<z.childNodes.length;O++)h(z.childNodes[O],T);else if(Y=z.textContent?.trim()||"",T&&!Y.startsWith("("))Y=`(${Y})`;if(Y.trim())k.push({startTime:q,endTime:J(z.getAttribute("end"))||q+5000,words:Y.trim(),syllables:Z.length>0?Z:void 0,role:T?"background":B==="v2"?"duet":"main",agent:B})}for(let v=0;v<k.length;v++){let z=k[v];if(v<k.length-1)z.endTime=k[v+1].startTime;else z.endTime=z.startTime+5000}let Q=((v)=>{let z=[];return v.forEach((q)=>{if((q.words.includes("(")||q.words.includes(")"))&&!(q.words.trim().startsWith("(")&&q.words.trim().endsWith(")"))&&q.syllables){let Z=q.syllables.filter((h)=>!h.word.trim().includes("(")).map((h)=>({...h})),Y=q.syllables.filter((h)=>h.word.trim().includes("(")).map((h)=>({...h,word:h.word.replace(/[()]/g,"").trim()}));if(Z.length>0){let h=Z.map((T)=>T.word).join("").trim();z.push({...q,words:h,syllables:Z,role:q.role==="duet"?"duet":"main"})}if(Y.length>0){let h=Y.map((T)=>T.word).join("").trim();z.push({...q,words:h,syllables:Y,role:"background",agent:void 0})}}else{let Z={...q};if(q.words.includes("(")){if(Z.words=q.words.replace(/[()]/g,"").trim(),q.syllables)Z.syllables=q.syllables.map((Y)=>({...Y,word:Y.word.replace(/[()]/g,"").trim()}));Z.role="background",Z.agent=void 0}z.push(Z)}}),z.sort((q,B)=>q.startTime-B.startTime)})(k);return Q.forEach((v)=>{if(v.syllables)for(let z=0;z<v.syllables.length;z++){let q=v.syllables[z];if(z<v.syllables.length-1)q.duration=v.syllables[z+1].startTime-q.startTime;else if(v.endTime)q.duration=Math.max(200,v.endTime-q.startTime);else q.duration=400}}),console.log(`[Vapor] DOM Parser: Captured ${Q.length} lines (Post-separated)`),Q}catch(x){return console.error("[Vapor] TTML Parsing failed:",x),[]}},I0=()=>{let o=Spicetify.React,{useEffect:x,useState:b,useRef:k}=o,J=b,[N,K]=J([]),[Q,v]=J([]),[z,q]=J(!1),[B,W]=J("Establishing signal..."),[Z,Y]=J(""),[h,T]=J(0),l=k(0),O=k(!1),t=k(null),[L,s]=J([]),[f0,q0]=J(!1),[v0,i]=J(!1),[$,u]=J(()=>{let p=Spicetify.LocalStorage.get("vapor-lyrics-settings");if(p)try{let X=JSON.parse(p);return{...C0,...X}}catch(X){}return C0}),y0=k($);x(()=>{y0.current=$,Spicetify.LocalStorage.set("vapor-lyrics-settings",JSON.stringify($))},[$]),x(()=>{if($.showDebugOnStart)q0(!0)},[]);let z0=k([]),S=k(null),K0=k(null),H0=k(null),b0=k(null),Z0=k(null),F0=k([]),x0=k(0),P0=()=>{try{return JSON.parse(Spicetify.LocalStorage.get("vapor-manual-store")||"{}")}catch{return{}}},Y0=(p,X)=>{let P=P0();P[p]=X,Spicetify.LocalStorage.set("vapor-manual-store",JSON.stringify(P))},f=(p,X="info")=>{let C=`[${new Date().toLocaleTimeString().split(" ")[0]}] ${p}`;if(s((V)=>[C,...V].slice(0,50)),X==="error")console.error(p);else if(X==="warn")console.warn(p);else console.log(p)},h0=async()=>{let p=Spicetify.Player.data,X=p?.track||p?.item||Spicetify.Player.track||{},P=X?.metadata||{},C=P.title||P.name||X.title||X.name||"",V=P.artist_name||P.artist||X.artist||"",I=P.image_xlarge_url||P.image_large_url||P.image_url||"";if(I.startsWith("spotify:image:"))I=`https://i.scdn.co/image/${I.split(":")[2]}`;if(Y(I),!C||C.length<1)C=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackTitle")?.textContent||"",V=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-subtitles"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackArtists")?.textContent||"";if(!C||C.trim().length===0){W("Signal Lost: Searching Metadata..."),q(!1);return}let n=C.split("(")[0].split("-")[0].split(" feat.")[0].split(" ft.")[0].trim(),F=V.split(",")[0].split("&")[0].trim();q(!0);let D=`Syncing: ${F} - ${n}`;if(W(D),s([]),f(`Starting Fetch for ${F} - ${n}`),f(`Metadata: ${C} | ${V} | ${X.uri}`),Z0.current){f("Applying Session-Manual lyrics","success"),K(Z0.current),z0.current=Z0.current,W("Signal Active (Manual Session)"),q(!1);return}let j=P0();if(X.uri&&j[X.uri]){f("Applying Persistent-Manual lyrics","success"),K(j[X.uri]),z0.current=j[X.uri],W("Signal Active (Manual Persistent)"),q(!1);return}let m=async()=>{f("Resolving Apple Music mapping...");let y=X.uri?.split(":")[2],H=X.metadata?.isrc,d="";if(H){f(`Direct ISRC lookup: ${H}`);let G=`https://lyrics.paxsenix.org/apple-music/search?q=${H}`;try{let _=await Spicetify.CosmosAsync.get(G,null,{"User-Agent":"Metrolist/13.4.0",Accept:"application/json"});if(_?.message||_?.error)f(`AM Search Error: ${_.message||_.error}`,"error");let U=_?.results||_?.data||_?.items;if(Array.isArray(_))U=_;if(U&&U.length>0)d=U[0].id,f(`Match found via ISRC: ${d} (${U[0].name})`,"success")}catch(_){f(`ISRC Search Exception: ${_}`,"warn")}}if(!d){f("Trying Songlink mapping...");try{let G=`https://api.song.link/v1-alpha.1/links?url=spotify:track:${y}`,_=await Spicetify.CosmosAsync.get(G),U=_?.linksByPlatform?.appleMusic;if(U)d=U.entityUniqueId.split("::")[1],f(`Songlink mapped Apple Music ID: ${d}`,"success");else if(_?.statusCode===429)f("Songlink 429: Too Many Requests.","warn")}catch(G){f("Songlink mapping failed, trying fuzzy search...","warn")}}if(!d){f(`Attempting Fuzzy Search: ${F} - ${n}`);let G=`https://lyrics.paxsenix.org/apple-music/search?q=${encodeURIComponent(F+" "+n)}`,_;try{_=await Spicetify.CosmosAsync.get(G,null,{"User-Agent":"Metrolist/13.4.0",Accept:"application/json"})}catch(w){f("Fuzzy Search fetch failed.","error")}if(_?.message||_?.error)f(`Fuzzy Search Error: ${_.message||_.error}`,"error");f(`Search Response keys: ${_?Object.keys(_).join(", "):"null"}`);let U=_?.results||_?.data||_?.items;if(Array.isArray(_)&&_.length>0)U=_;if(U&&U.length>0)d=U[0].id,f(`Fuzzy Search found ID: ${d} (${U[0].name})`,"success")}if(d){let G=`https://lyrics.paxsenix.org/apple-music/lyrics?id=${d}&ttml=true`;f(`Final Target AM ID: ${d}`),f("Requesting TTML from Paxsenix...");let _="",U=(w)=>{f(`Response Length: ${w.length} chars`);try{let A=JSON.parse(w);if(f(`Parsed JSON metadata: ${Object.keys(A).join(", ")}`),typeof A==="string")return A;if(A.ttml)return A.ttml;if(A.lyrics)return A.lyrics;if(A.data?.lyrics)return A.data.lyrics}catch(A){f("Response is likely raw TTML/XML string.")}return w};try{let w=await Spicetify.CosmosAsync.get(G,null,{"User-Agent":"Metrolist/13.4.0"});_=typeof w==="string"?w:w.ttml||w.lyrics||w.data?.lyrics||JSON.stringify(w),_=U(_)}catch(w){f(`Paxsenix fetch failed: ${w}`,"error")}if(_&&_.includes("<tt")){let w=D0(_);if(w.length>0)return f("Successfully parsed AM TTML","success"),{parsed:w,source:"Apple Music TTML"}}else if(_)f("Text found but doesn't look like TTML. Samples: "+_.substring(0,50),"warn")}throw f("Apple Music: No results or failed mapping.","warn"),Error("No Apple Music match")},E=async()=>{f("Attempting Musixmatch (Paxsenix)...");let y=`https://lyrics.paxsenix.org/musixmatch/lyrics?t=${encodeURIComponent(n)}&a=${encodeURIComponent(F)}&type=word`,H="";try{let G=await fetch(y,{headers:{"User-Agent":"Metrolist/13.4.0",Accept:"application/json"}});if(!G.ok)throw Error("MXM Fetch Error");H=await G.text();try{let _=JSON.parse(H);if(typeof _==="string")H=_;else if(_.lyrics)H=_.lyrics;else if(_.text)H=_.text}catch(_){}}catch(G){let _=await Spicetify.CosmosAsync.get(y,null,{"User-Agent":"Metrolist/13.4.0",Accept:"application/json"});H=typeof _==="string"?_:_.lyrics||_.text||JSON.stringify(_)}let d=X0(H);if(d.length>0)return f("Successfully parsed MXM Word-Sync","success"),{parsed:d,source:"Musixmatch Word-Sync"};throw f("Musixmatch: No match found.","warn"),Error("No MXM word match")},R=async()=>{f("Attempting LRCLIB...");let y=await Spicetify.CosmosAsync.get(`https://lrclib.net/api/search?artist_name=${encodeURIComponent(F)}&track_name=${encodeURIComponent(n)}`);if(y&&y.length>0){let H=y[0],d=H.syncedLyrics||H.plainLyrics||"",G=X0(d);if(G.length>0)return f("Successfully parsed LRCLIB","success"),{parsed:G,source:"LRCLIB"}}throw f("LRCLIB: No results.","warn"),Error("No LRCLIB match")},r=async()=>{f("Attempting Lyrics.ovh...");try{let y=`https://api.lyrics.ovh/v1/${encodeURIComponent(F)}/${encodeURIComponent(n)}`,H=await fetch(y);if(!H.ok)throw Error(`HTTP ${H.status}`);let d=await H.json();if(d.lyrics){let G=X0(d.lyrics);if(G.length>0)return f("Successfully parsed Lyrics.ovh","success"),{parsed:G,source:"Lyrics.ovh"}}}catch(y){f(`Lyrics.ovh failed: ${y}`,"warn")}throw Error("No Lyrics.ovh match")},M=async()=>{f("Attempting NetEase...");let y=`https://lyrics.paxsenix.org/netease/search?q=${encodeURIComponent(F+" "+n)}`;try{let d=(await Spicetify.CosmosAsync.get(y,null,{"User-Agent":"Spicetify/1.0 (https://github.com/spicetify/spicetify-cli)"}))?.result?.songs?.[0]?.id;if(!d)throw f("NetEase: No search results.","warn"),Error("No NetEase match");f(`Found NetEase Match: ${d}. Fetching lyrics...`);let G=`https://music.cyrvoid.com/lyric?id=${d}`,_=await fetch(G).then((e)=>e.json()),U=_?.lrc?.lyric||"",w=_?.yrc?.lyric||"";if(!U&&!w)f("NetEase: No lyrics returned for this ID.","warn");let _0=w?((e)=>{let k0=[];e.split(`
`).forEach((c)=>{let a=c.match(/\[(\d+),(\d+)\](.*)/);if(a){let o0=parseInt(a[1]),U0=a[3]||"",Q0=[],B0="",E0=/\((\d+),(\d+),\d+\)([^\(]*)/g,V0;while((V0=E0.exec(U0))!==null){let M0=parseInt(V0[1]),W0=V0[3]||"";Q0.push({startTime:o0+M0,word:W0}),B0+=W0}k0.push({startTime:o0,words:Q0.length>0?B0:U0,syllables:Q0.length>0?Q0:void 0})}});for(let c=0;c<k0.length;c++){let a=k0[c];a.endTime=c<k0.length-1?k0[c+1].startTime:a.startTime+5000}return k0.forEach((c)=>{if(c.syllables)for(let a=0;a<c.syllables.length;a++){let o0=c.syllables[a];if(a<c.syllables.length-1)o0.duration=c.syllables[a+1].startTime-o0.startTime;else o0.duration=Math.max(200,(c.endTime||o0.startTime+1000)-o0.startTime)}}),k0})(w):X0(U);if(_0.length>0)return f("NetEase parsed successfully.","success"),{parsed:_0,source:w?"NetEase Word-Sync":"NetEase"};throw f("NetEase: Parse failed.","error"),Error("NetEase parse failed")}catch(H){throw f(`NetEase fetch failed: ${H}`,"error"),H}},$0=async()=>{f("Attempting Spotify Native...");let y=X.uri?.split(":")[2];if(!y)throw Error("No track ID");let H;try{H=await Spicetify.CosmosAsync.get(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${y}`),f(`Spotify Sync Type: ${H?.lyrics?.syncType}`,H?.lyrics?.lines?"info":"warn")}catch(d){throw f("Spotify Native API Failed.","warn"),Error("Spotify Color-Lyrics API Error")}if(H&&H.lyrics&&H.lyrics.lines){let d=H.lyrics.lines.map((G)=>{let _=G.syllables?G.syllables.map((U)=>({startTime:parseInt(U.startTimeMs||"0"),word:U.word||U.character||U.text||""})):void 0;return{startTime:parseInt(G.startTimeMs||"0"),words:G.words||"",syllables:_&&_.length>0?_:void 0}});if(d.length>0)return{parsed:d,source:H.lyrics.syncType==="SYLLABLE_SYNCED"?"Spotify Word-Sync":"Spotify"}}throw Error("No Spotify match")},G0=async()=>{f("Attempting Spotify Lyrics API (Proxy)...");let y=X.uri?.split(":")[2];if(!y)throw Error("No track ID");let H=`https://spotify-lyric-api-984e7b4face0.herokuapp.com/?trackid=${y}`;try{let d=await fetch(H);if(f(`Proxy Status: ${d.status}`),!d.ok)throw Error(`HTTP ${d.status}`);let G=await d.json();if(G&&!G.error&&(G.lines||G.lyrics?.lines)){let _=G.lines||G.lyrics.lines,U=G.syncType||G.lyrics?.syncType,w=_.map((A)=>{let _0=A.syllables?A.syllables.map((e)=>({startTime:parseInt(e.startTimeMs||"0"),word:e.word||e.character||e.text||""})):void 0;return{startTime:parseInt(A.startTimeMs||"0"),words:A.words||"",syllables:_0&&_0.length>0?_0:void 0}});if(w.length>0)return{parsed:w,source:U==="SYLLABLE_SYNCED"?"Spotify Proxy Word-Sync":"Spotify Proxy"}}else if(G.error)f(`Proxy API reported error: ${G.message||"Unknown"}`,"warn")}catch(d){f(`Spotify Proxy Exception: ${d}`,"error")}throw Error("Spotify Proxy failed")},p0=!1,J0=!1,g=(y)=>{if(p0)return;if(y.source==="Apple Music TTML"||y.source==="Musixmatch Word-Sync"||y.source==="Spotify Word-Sync")p0=!0;J0=!0,K(y.parsed),z0.current=y.parsed,W(`Signal Active (${y.source}) [${y.parsed.length} lines]`),f(`Applied source: ${y.source}`,"success")},d0=[$0().then(g).catch(()=>{}),G0().then(g).catch(()=>{}),m().then(g).catch(()=>{}),E().then(g).catch(()=>{}),M().then(g).catch(()=>{}),R().then(g).catch(()=>{}),r().then(g).catch(()=>{})];Promise.allSettled(d0).then(()=>{if(!J0)f("No providers found any lyrics.","error"),W("Database record empty for this track."),K([]),z0.current=[];q(!1)})};x(()=>{let p,X=()=>{let P=Spicetify.Player.getProgress()+y0.current.syncOffset,C=z0.current;if(C.length>0){let V=[];for(let F=0;F<C.length;F++){let D=C[F],j=D.endTime||(F<C.length-1?C[F+1].startTime:D.startTime+5000);if(P>=D.startTime&&P<j)V.push(F)}let I=F0.current;if(V.length!==I.length||V.some((F,D)=>F!==I[D]))F0.current=V,v(V);try{if(V.length>0&&S.current){let F=S.current.parentElement;if(F&&!O.current){let m=F.clientHeight,E=null,R=V.length>1;if(R!==S.current.classList.contains("multi-active"))S.current.classList.toggle("multi-active",R);if(V.length===1){let r=S.current.children[V[0]];if(r)E=-(r.offsetTop-m/2+r.clientHeight/2)}else{let r=S.current.children[V[0]],M=S.current.children[V[V.length-1]];if(r&&M)E=-(r.offsetTop+(M.offsetTop+M.clientHeight-r.offsetTop)/2-m/2)}if(E!==null&&Math.abs(E-x0.current)>0.1){let M=x0.current+(E-x0.current)*0.12;x0.current=M,l.current=M,S.current.style.transform=`translate3d(0, ${M}px, 0)`}}let D=S.current.children,j=V.length>0?V[0]:-1;for(let m=0;m<D.length;m++){let E=D[m];if(!E)continue;let R=j>=0?Math.abs(m-j):10;if(V.includes(m))E.style.setProperty("--line-blur","0px"),E.style.setProperty("--line-scale","1.04");else{let r=Math.min(R*1.5,8),M=Math.max(0.85,1-R*0.03);E.style.setProperty("--line-blur",`${r}px`),E.style.setProperty("--line-scale",`${M}`)}if(V.includes(m)&&E.classList.contains("word-synced")){let r=E.querySelectorAll(".vapor-syllable");r.forEach((M,$0)=>{let G0=M.getAttribute("data-time");if(G0===null)return;let p0=parseInt(G0),J0=r[$0+1],g=J0?parseInt(J0.getAttribute("data-time")||"0"):p0+800;if(P>=p0)if(M.classList.add("synced"),P<g){let d0=Math.max(1,g-p0),y=Math.min(100,Math.max(0,(P-p0)/d0*100));M.style.setProperty("--gradient-pos",`${y}%`),M.classList.add("active-syllable")}else M.style.setProperty("--gradient-pos","100%"),M.classList.remove("active-syllable");else M.classList.remove("synced","active-syllable"),M.style.setProperty("--gradient-pos","0%")})}}}else{if(S.current){let F=S.current.children;for(let D=0;D<F.length;D++){let j=F[D];if(j)j.style.setProperty("--line-blur","0px"),j.style.setProperty("--line-scale","1")}}if(O.current){if(Math.abs(l.current-x0.current)>0.5)x0.current=l.current,T(l.current)}}}catch(F){console.error("[Vapor] Animation loop threw an error:",F)}}p=requestAnimationFrame(X)};return p=requestAnimationFrame(X),()=>cancelAnimationFrame(p)},[]),x(()=>{let p=(C,V=!1)=>{let I=Spicetify.Player.data?.track?.uri||Spicetify.Player.track?.uri||"unknown";if(V||C||I!==K0.current)K0.current=I,v([]),T(0),x0.current=0,h0()},X="vapor-lyrics-styles";if(!document.getElementById("vapor-lyrics-styles")){let C=document.createElement("style");C.id="vapor-lyrics-styles",C.innerHTML=w0,document.head.appendChild(C)}Spicetify.Player.addEventListener("songchange",p);let P=setInterval(()=>p(null,!1),3000);return p(null,!0),()=>{clearInterval(P),Spicetify.Player.removeEventListener("songchange",p)}},[]),x(()=>{if(!H0.current)return;if($.visualEffect==="kawarp"){if(!b0.current)b0.current=new N0(H0.current),b0.current.start();if(Z)b0.current.loadImage(Z).catch((p)=>console.log("Kawarp load error:",p))}else if(b0.current)b0.current.dispose(),b0.current=null},[$.visualEffect,Z]);let j0=N.some((p)=>p.syllables&&p.syllables.length>0)?"center":$.textAlign;return o.createElement("div",{id:"vapor-lyrics-app-container",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",zIndex:100}},[o.createElement("div",{className:`vapor-background ${$.visualEffect==="static"?"static-cover":""}`,key:"bg",style:$.visualEffect==="static"?{backgroundImage:`url(${Z})`}:{}},[o.createElement("canvas",{key:"canvas",ref:H0,style:{width:"100%",height:"100%",position:"absolute",top:0,left:0,display:$.visualEffect==="kawarp"?"block":"none"}})]),o.createElement("div",{className:"vapor-content",key:"content"},[$.showHeader&&o.createElement("header",{className:"vapor-header",key:"header"},[o.createElement("h1",{className:"vapor-title",key:"title"},"ＶＡＰＯＲ  ＬＹＲＩＣＳ")]),o.createElement("main",{className:"vapor-lyrics-container",key:"main",onWheel:(p)=>{if(O.current=!0,l.current-=Number(p.deltaY)*0.8,t.current)clearTimeout(t.current);t.current=setTimeout(()=>{O.current=!1},4000)},onMouseDown:(p)=>{O.current=!0;let X=p.clientY,P=l.current,C=(I)=>{l.current=P+(I.clientY-X)},V=()=>{if(window.removeEventListener("mousemove",C),window.removeEventListener("mouseup",V),t.current)clearTimeout(t.current);t.current=setTimeout(()=>{O.current=!1},4000)};window.addEventListener("mousemove",C),window.addEventListener("mouseup",V)}},[o.createElement("div",{className:"vapor-lyrics-scroll",key:"scroll",ref:S,style:{textAlign:"center",alignItems:"stretch",padding:"50vh 3rem"}},z?[o.createElement("p",{className:"vapor-lyric-line v-active",key:"l"},"Establishing aesthetic uplink...")]:N.length>0?N.map((p,X)=>{let P=N[X+1],C=P?P.startTime-p.startTime:p.endTime?p.endTime-p.startTime:3000,V="";if(Q.includes(X))V="v-active";else if(Q.length>0&&X<Q[0])V="v-played";let I=p.syllables&&p.syllables.length>0,n=p.role||"main",F=p.agent||"v1",D="left";if(n==="background")D="right";else if(F==="v1")D="left";else if(F==="v2")D="right";else D="center";return o.createElement("p",{className:`vapor-lyric-line ${V} ${I?"word-synced":""} role-${n} agent-${F}`,key:X,style:{"--line-duration":`${C}ms`,fontSize:`${2.2*$.fontScale}rem`,textAlign:D,alignSelf:D==="left"?"flex-start":D==="right"?"flex-end":"center",transformOrigin:D}},I?p.syllables.map((j,m)=>{let E=j.word;if(!E.endsWith(" ")&&!E.endsWith("-")&&m<p.syllables.length-1){let R=p.syllables[m+1];if(R&&!R.word.startsWith(" ")&&!R.word.startsWith("-"))E+=" "}return o.createElement("span",{className:`vapor-syllable ${V==="v-played"?"synced":""}`,key:m,"data-time":j.startTime,style:{"--syl-duration":`${j.duration||400}ms`}},E)}):p.words)}):[o.createElement("div",{key:"no-lyrics",style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px",opacity:0.4,paddingTop:"6vh"}},[o.createElement("div",{key:"icon",style:{fontSize:"3rem"}},"♩"),o.createElement("p",{key:"msg",className:"vapor-lyric-line",style:{margin:0,fontSize:"1.2rem",fontWeight:500}},B.startsWith("Establishing")?"Searching for lyrics...":"No lyrics available for this track"),B.includes("Signal Active")===!1&&o.createElement("p",{key:"sub",style:{fontSize:"0.75rem",opacity:0.6,margin:0,fontFamily:"monospace",letterSpacing:"1px"}},B)])])]),o.createElement("div",{className:"floating-controls",key:"controls"},[$.devMode&&o.createElement("div",{className:"vapor-debug-status",key:"st",onClick:()=>q0(!f0)},[o.createElement("span",{key:"s"},B),o.createElement("span",{key:"h",style:{opacity:0.5,marginLeft:8}},"(Click for Debug)")]),o.createElement("div",{className:"vapor-settings-toggle",key:"sett",onClick:()=>i(!v0)},"⚙")]),$.devMode&&f0&&o.createElement("div",{className:"vapor-debug-overlay",key:"dbg",onClick:(p)=>p.stopPropagation()},[o.createElement("header",{key:"h"},[o.createElement("h2",{key:"t"},"Terminal Uplink"),o.createElement("div",{key:"btns",style:{display:"flex",gap:"8px"}},[o.createElement("button",{key:"cp",onClick:()=>{let p=L.join(`
`);navigator.clipboard.writeText(p),W("Logs Copied!"),setTimeout(()=>W(B),2000)},style:{fontSize:"10px",padding:"2px 6px"}},"COPY ALL"),o.createElement("button",{key:"b",onClick:()=>q0(!1)},"✖")])]),o.createElement("div",{className:"debug-list",key:"l"},L.map((p,X)=>o.createElement("div",{key:X,className:"debug-line"},p)))]),v0&&o.createElement("div",{className:"vapor-settings-overlay",key:"set-over",onClick:(p)=>p.stopPropagation()},[o.createElement("header",{key:"h"},[o.createElement("h2",{key:"t"},"System Configuration"),o.createElement("button",{key:"b",onClick:()=>i(!1)},"✖")]),o.createElement("div",{className:"settings-content",key:"c"},[o.createElement("div",{className:"setting-item",key:"sync"},[o.createElement("label",{key:"l"},`Sync Offset: ${$.syncOffset}ms`),o.createElement("input",{key:"i",type:"range",min:-2000,max:2000,step:50,value:$.syncOffset,onChange:(p)=>u({...$,syncOffset:parseInt(p.target.value)})})]),o.createElement("div",{className:"setting-item",key:"font"},[o.createElement("label",{key:"l"},`Font Scale: ${$.fontScale.toFixed(1)}x`),o.createElement("input",{key:"i",type:"range",min:0.5,max:2,step:0.1,value:$.fontScale,onChange:(p)=>u({...$,fontScale:parseFloat(p.target.value)})})]),o.createElement("div",{className:"setting-item",key:"align"},[o.createElement("label",{key:"l"},"Line-Sync Alignment"),o.createElement("div",{className:"button-group",key:"g"},["left","center","right"].map((p)=>o.createElement("button",{key:p,className:$.textAlign===p?"active":"",onClick:()=>u({...$,textAlign:p})},p.toUpperCase())))]),o.createElement("div",{className:"setting-item",key:"vis"},[o.createElement("label",{key:"l"},"Visual Uplink"),o.createElement("div",{className:"button-group",key:"g"},["kawarp","static","none"].map((p)=>o.createElement("button",{key:p,className:$.visualEffect===p?"active":"",onClick:()=>u({...$,visualEffect:p})},p.toUpperCase())))]),o.createElement("div",{className:"setting-item toggle",key:"dbg-start"},[o.createElement("label",{key:"l"},"Auto-show Debug Terminal"),o.createElement("input",{key:"i",type:"checkbox",checked:$.showDebugOnStart,onChange:(p)=>u({...$,showDebugOnStart:p.target.checked})})]),o.createElement("div",{className:"setting-item toggle",key:"show-hdr"},[o.createElement("label",{key:"l"},"Show Header Title"),o.createElement("input",{key:"i",type:"checkbox",checked:$.showHeader,onChange:(p)=>u({...$,showHeader:p.target.checked})})]),o.createElement("div",{className:"setting-item toggle",key:"dev-mode"},[o.createElement("label",{key:"l"},"Developer Mode"),o.createElement("input",{key:"i",type:"checkbox",checked:$.devMode,onChange:(p)=>u({...$,devMode:p.target.checked})})]),$.devMode&&o.createElement("div",{key:"import-tools",style:{display:"flex",flexDirection:"column",gap:"8px",border:"1px solid rgba(255,255,255,0.1)",padding:"10px",borderRadius:"8px",marginBottom:"10px"}},[o.createElement("p",{key:"t",style:{margin:"0 0 5px 0",fontSize:"12px",opacity:0.7}},"Aesthetic Uplink Tools"),o.createElement("button",{key:"import-f",className:"dev-button",style:{background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",padding:"8px",cursor:"pointer",display:"block"},onClick:()=>{let p=document.createElement("input");p.type="file",p.accept=".ttml,.xml,.lrc,.txt",p.onchange=async()=>{let X=p.files?.[0];if(!X)return;let P=await X.text(),C=X.name.endsWith(".ttml")||X.name.endsWith(".xml")?D0(P):X0(P);if(C.length>0){if(confirm("Make this persistent for this song?")){let I=K0.current||Spicetify.Player.data?.track?.uri;if(I)Y0(I,C);else alert("Error: No track URI found.")}else Z0.current=C;K(C),z0.current=C,W("Manual Uplink Established")}else alert("Failed to extract lyrics from file.")},p.click()}},"IMPORT LYRIC FILE")]),o.createElement("button",{key:"reset",className:"reset-button",onClick:()=>{if(confirm("Reset all settings to defaults?"))u(C0)}},"FACTORY RESET")])])])])};(function o(){let{Playbar:x,Platform:b,ReactDOM:k,React:J,CosmosAsync:N}=Spicetify;if(!x||!b||!k||!J||!N){setTimeout(o,500);return}function K(){let Q=document.querySelector(".main-view-container__scroll-node"),v=document.querySelector(".main-view-container__scroll-node-child")||document.querySelector("main");if(!v)return;if(Q)Q.style.overflow="hidden";let z=document.getElementById("vapor-lyrics-mount-root");if(!z)z=document.createElement("div"),z.id="vapor-lyrics-mount-root",v.innerHTML="",v.appendChild(z);k.render(J.createElement(I0),z)}if(b.History.listen(({pathname:Q})=>{if(Q.includes("vapor-lyrics"))setTimeout(K,100);else{let v=document.getElementById("vapor-lyrics-mount-root");if(v)v.remove();let z=document.querySelector(".main-view-container__scroll-node");if(z)z.style.overflow=""}}),b.History.location.pathname.includes("vapor-lyrics"))K();new x.Button("Vapor Lyrics",'<svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 1h-1v11h1V1zM5 1H4v11h1V1zM15 4h-1v5h1V4zM2 4H1v5h1V4zM9 0H7v14h2V0z"></path></svg>',()=>{if(b.History.location.pathname.includes("vapor-lyrics"))b.History.goBack();else b.History.push("/vapor-lyrics")},!1,!1)})();
