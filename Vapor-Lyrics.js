var f0=`:root {\r
  --vapor-pink: #ff71ce;\r
  --vapor-blue: #01cdfe;\r
  --vapor-green: #05ffa1;\r
  --vapor-purple: #b967ff;\r
  --vapor-yellow: #fffb96;\r
}\r
\r
/* Global Fix to prevent Spicetify scrollbars when active */\r
body:has(#vapor-lyrics-mount-root) .main-view-container__scroll-node,\r
body:has(#vapor-lyrics-mount-root) .main-view-container__scroll-node-child {\r
  overflow: hidden !important;\r
}\r
\r
#vapor-lyrics-app-container {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  z-index: 100;\r
}\r
\r
.vapor-background {\r
  position: absolute;\r
  inset: 0;\r
  overflow: hidden;\r
  background: #000000;\r
  z-index: -1;\r
}\r
\r
.vapor-content {\r
  display: flex;\r
  flex-direction: column;\r
  height: 100%;\r
  padding: 40px;\r
  color: white;\r
  font-family: "Outfit", "Inter", sans-serif;\r
  box-sizing: border-box;\r
}\r
\r
.vapor-header {\r
  margin-bottom: 40px;\r
  text-align: center;\r
}\r
\r
.vapor-title {\r
  font-size: 3rem;\r
  font-weight: 800;\r
  text-transform: uppercase;\r
  letter-spacing: 12px;\r
  background: linear-gradient(to bottom, var(--vapor-pink), var(--vapor-blue));\r
  background-clip: text;\r
  -webkit-background-clip: text;\r
  -webkit-text-fill-color: transparent;\r
  filter: drop-shadow(0 0 10px rgba(255, 113, 206, 0.5));\r
  margin: 0;\r
}\r
\r
.vapor-lyrics-container {\r
  flex: 1;\r
  overflow: hidden;\r
  position: relative;\r
  mask-image: linear-gradient(to bottom, \r
    transparent 0%, \r
    black 15%, \r
    black 85%, \r
    transparent 100%\r
  );\r
}\r
\r
/* The Dreamlike Scroll */\r
.vapor-lyrics-scroll {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  padding: 50vh 0;\r
  will-change: transform;\r
  transform-style: preserve-3d;\r
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);\r
}\r
\r
.vapor-lyric-line {\r
  flex-shrink: 0;\r
  font-size: 2.2rem;\r
  font-weight: 700;\r
  line-height: 1.5;\r
  margin: 1.5rem 0;\r
  text-align: center;\r
  max-width: 80%;\r
  \r
  /* Top-to-Bottom Wipe Effect */\r
  background: linear-gradient(to bottom, #ffffff 50%, rgba(255, 255, 255, 0.25) 50%);\r
  background-size: 100% 200%;\r
  background-position: bottom;\r
  background-clip: text;\r
  -webkit-background-clip: text;\r
  -webkit-text-fill-color: transparent;\r
  \r
  filter: none;\r
  transform: translate3d(0,0,0) scale(0.85);\r
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), \r
              background-position 0.5s ease-out,\r
              opacity 0.5s ease;\r
  will-change: transform, background-position, opacity;\r
}\r
\r
.vapor-lyric-line.active {\r
  background-position: top;\r
  opacity: 1;\r
  transform: translate3d(0,0,0) scale(1.15);\r
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));\r
  /* Dynamic Karaoke Wipe Duration */\r
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), \r
              background-position var(--line-duration, 0.5s) linear,\r
              opacity 0.5s ease;\r
}\r
\r
.vapor-lyric-line.played {\r
  background-position: top;\r
  opacity: 0.35;\r
  transform: translate3d(0,0,0) scale(0.85);\r
  filter: none;\r
}\r
\r
.vapor-lyric-line.placeholder {\r
  animation: pulse 2s infinite;\r
}\r
\r
@keyframes pulse {\r
  0% { opacity: 0.2; }\r
  50% { opacity: 0.5; }\r
  100% { opacity: 0.2; }\r
}\r
\r
.vapor-debug-status {\r
  position: fixed;\r
  bottom: 20px;\r
  left: 20px;\r
  font-size: 11px;\r
  text-transform: uppercase;\r
  letter-spacing: 2px;\r
  opacity: 0.5;\r
  font-family: monospace;\r
  cursor: pointer;\r
  background: rgba(0,0,0,0.5);\r
  padding: 8px 12px;\r
  border-radius: 4px;\r
  border: 1px solid rgba(255,255,255,0.1);\r
  transition: all 0.2s ease;\r
  z-index: 2000;\r
}\r
\r
.vapor-debug-status:hover {\r
  opacity: 1;\r
  background: rgba(0,0,0,0.8);\r
  border-color: var(--vapor-pink);\r
}\r
\r
.vapor-debug-overlay {\r
  position: fixed;\r
  bottom: 80px;\r
  left: 20px;\r
  width: 450px;\r
  max-height: 400px;\r
  background: rgba(5, 5, 10, 0.95);\r
  border: 2px solid var(--vapor-pink);\r
  border-radius: 8px;\r
  z-index: 2001;\r
  display: flex;\r
  flex-direction: column;\r
  box-shadow: 0 0 20px rgba(255, 113, 206, 0.3);\r
  font-family: "Courier New", monospace;\r
  overflow: hidden;\r
  user-select: text !important;\r
  cursor: text;\r
}\r
\r
.vapor-debug-overlay header {\r
  padding: 8px 12px;\r
  background: var(--vapor-pink);\r
  color: black;\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
}\r
\r
.vapor-debug-overlay h2 {\r
  font-size: 12px;\r
  margin: 0;\r
  font-weight: 900;\r
  letter-spacing: 1px;\r
}\r
\r
.vapor-debug-overlay button {\r
  background: none;\r
  border: none;\r
  color: black;\r
  cursor: pointer;\r
  font-weight: bold;\r
  font-size: 16px;\r
}\r
\r
.vapor-debug-overlay .debug-list {\r
  flex: 1;\r
  overflow-y: auto;\r
  padding: 10px;\r
  font-size: 10px;\r
  line-height: 1.4;\r
  color: #05ffa1;\r
  display: flex;\r
  flex-direction: column-reverse; /* Newest at top */\r
}\r
\r
.vapor-debug-overlay .debug-line {\r
  margin-bottom: 4px;\r
  word-break: break-all;\r
  border-bottom: 1px solid rgba(5, 255, 161, 0.1);\r
  padding-bottom: 2px;\r
}\r
\r
/* Word Sync / Karaoke Aesthetics */\r
.vapor-syllable {\r
  display: inline-block;\r
  opacity: 0.25;\r
  transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1);\r
  filter: none;\r
  transform: scale(0.95);\r
  margin-right: 4px;\r
}\r
\r
.vapor-syllable.synced {\r
  opacity: 1;\r
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));\r
  transform: scale(1.1);\r
  color: #ffffff;\r
  -webkit-text-fill-color: initial;\r
}\r
\r
.vapor-lyric-line.active.word-synced {\r
  background: none;\r
  -webkit-text-fill-color: initial;\r
}\r
\r
\r
`;class h{canvas;gl;halfFloatExt=null;halfFloatLinearExt=null;blurProgram;blendProgram;tintProgram;warpProgram;outputProgram;positionBuffer;texCoordBuffer;sourceTexture;blurFBO1;blurFBO2;currentAlbumFBO;nextAlbumFBO;warpFBO;animationId=null;lastFrameTime=0;accumulatedTime=0;isPlaying=!1;isTransitioning=!1;transitionStartTime=0;_transitionDuration;_warpIntensity;_blurPasses;_animationSpeed;_targetAnimationSpeed;_saturation;_tintColor;_tintIntensity;_dithering;_scale;hasImage=!1;attribs;uniforms;constructor(k,z={}){this.canvas=k;let x=k.getContext("webgl",{preserveDrawingBuffer:!0});if(!x)throw Error("WebGL not supported");this.gl=x,this.halfFloatExt=x.getExtension("OES_texture_half_float"),this.halfFloatLinearExt=x.getExtension("OES_texture_half_float_linear"),this._warpIntensity=z.warpIntensity??1,this._blurPasses=z.blurPasses??8,this._animationSpeed=z.animationSpeed??1,this._targetAnimationSpeed=this._animationSpeed,this._transitionDuration=z.transitionDuration??1000,this._saturation=z.saturation??1.5,this._tintColor=z.tintColor??[0.157,0.157,0.235],this._tintIntensity=z.tintIntensity??0.15,this._dithering=z.dithering??0.008,this._scale=z.scale??1,this.blurProgram=this.createProgram(`
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
`),this.attribs={position:x.getAttribLocation(this.blurProgram,"a_position"),texCoord:x.getAttribLocation(this.blurProgram,"a_texCoord")},this.uniforms={blur:{resolution:x.getUniformLocation(this.blurProgram,"u_resolution"),texture:x.getUniformLocation(this.blurProgram,"u_texture"),offset:x.getUniformLocation(this.blurProgram,"u_offset")},blend:{texture1:x.getUniformLocation(this.blendProgram,"u_texture1"),texture2:x.getUniformLocation(this.blendProgram,"u_texture2"),blend:x.getUniformLocation(this.blendProgram,"u_blend")},warp:{texture:x.getUniformLocation(this.warpProgram,"u_texture"),time:x.getUniformLocation(this.warpProgram,"u_time"),intensity:x.getUniformLocation(this.warpProgram,"u_intensity")},tint:{texture:x.getUniformLocation(this.tintProgram,"u_texture"),tintColor:x.getUniformLocation(this.tintProgram,"u_tintColor"),tintIntensity:x.getUniformLocation(this.tintProgram,"u_tintIntensity")},output:{texture:x.getUniformLocation(this.outputProgram,"u_texture"),saturation:x.getUniformLocation(this.outputProgram,"u_saturation"),dithering:x.getUniformLocation(this.outputProgram,"u_dithering"),time:x.getUniformLocation(this.outputProgram,"u_time"),scale:x.getUniformLocation(this.outputProgram,"u_scale"),resolution:x.getUniformLocation(this.outputProgram,"u_resolution")}},this.positionBuffer=this.createBuffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),this.texCoordBuffer=this.createBuffer(new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),this.sourceTexture=this.createTexture(),this.blurFBO1=this.createFramebuffer(128,128,!0),this.blurFBO2=this.createFramebuffer(128,128,!0),this.currentAlbumFBO=this.createFramebuffer(128,128,!0),this.nextAlbumFBO=this.createFramebuffer(128,128,!0),this.warpFBO=this.createFramebuffer(1,1,!0),this.resize()}get warpIntensity(){return this._warpIntensity}set warpIntensity(k){this._warpIntensity=Math.max(0,Math.min(1,k))}get blurPasses(){return this._blurPasses}set blurPasses(k){let z=Math.max(1,Math.min(40,Math.floor(k)));if(z!==this._blurPasses){if(this._blurPasses=z,this.hasImage)this.reblurCurrentImage()}}get animationSpeed(){return this._targetAnimationSpeed}set animationSpeed(k){this._targetAnimationSpeed=Math.max(0.1,Math.min(5,k))}get transitionDuration(){return this._transitionDuration}set transitionDuration(k){this._transitionDuration=Math.max(0,Math.min(5000,k))}get saturation(){return this._saturation}set saturation(k){this._saturation=Math.max(0,Math.min(3,k))}get tintColor(){return this._tintColor}set tintColor(k){let z=k.map((f)=>Math.max(0,Math.min(1,f)));if(z.some((f,b)=>f!==this._tintColor[b])){if(this._tintColor=z,this.hasImage)this.reblurCurrentImage()}}get tintIntensity(){return this._tintIntensity}set tintIntensity(k){let z=Math.max(0,Math.min(1,k));if(z!==this._tintIntensity){if(this._tintIntensity=z,this.hasImage)this.reblurCurrentImage()}}get dithering(){return this._dithering}set dithering(k){this._dithering=Math.max(0,Math.min(0.1,k))}get scale(){return this._scale}set scale(k){this._scale=Math.max(0.01,Math.min(4,k))}setOptions(k){if(k.warpIntensity!==void 0)this.warpIntensity=k.warpIntensity;if(k.blurPasses!==void 0)this.blurPasses=k.blurPasses;if(k.animationSpeed!==void 0)this.animationSpeed=k.animationSpeed;if(k.transitionDuration!==void 0)this.transitionDuration=k.transitionDuration;if(k.saturation!==void 0)this.saturation=k.saturation;if(k.tintColor!==void 0)this.tintColor=k.tintColor;if(k.tintIntensity!==void 0)this.tintIntensity=k.tintIntensity;if(k.dithering!==void 0)this.dithering=k.dithering;if(k.scale!==void 0)this.scale=k.scale}getOptions(){return{warpIntensity:this._warpIntensity,blurPasses:this._blurPasses,animationSpeed:this._targetAnimationSpeed,transitionDuration:this._transitionDuration,saturation:this._saturation,tintColor:this._tintColor,tintIntensity:this._tintIntensity,dithering:this._dithering,scale:this._scale}}loadImage(k){return new Promise((z,x)=>{let f=new Image;f.crossOrigin="anonymous",f.onload=()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,f),this.processNewImage(),z()},f.onerror=()=>x(Error(`Failed to load image: ${k}`)),f.src=k})}loadImageElement(k){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,k),this.processNewImage()}loadImageData(k,z,x){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,z,x,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,k instanceof Uint8ClampedArray?new Uint8Array(k.buffer):k),this.processNewImage()}loadFromImageData(k){this.loadImageData(k.data,k.width,k.height)}async loadBlob(k){let z=await createImageBitmap(k);this.loadImageElement(z),z.close()}loadBase64(k){let z=k.startsWith("data:")?k:`data:image/png;base64,${k}`;return this.loadImage(z)}async loadArrayBuffer(k,z="image/png"){let x=new Blob([k],{type:z});return this.loadBlob(x)}loadGradient(k,z=135){let f=document.createElement("canvas");f.width=512,f.height=512;let b=f.getContext("2d");if(!b)return;let q=z*Math.PI/180,Z=256-Math.cos(q)*512,K=256-Math.sin(q)*512,B=256+Math.cos(q)*512,C=256+Math.sin(q)*512,I=b.createLinearGradient(Z,K,B,C);k.forEach((A,D)=>{I.addColorStop(D/(k.length-1),A)}),b.fillStyle=I,b.fillRect(0,0,512,512),this.loadImageElement(f)}processNewImage(){[this.currentAlbumFBO,this.nextAlbumFBO]=[this.nextAlbumFBO,this.currentAlbumFBO],this.blurSourceInto(this.nextAlbumFBO),this.hasImage=!0,this.isTransitioning=!0,this.transitionStartTime=performance.now()}reblurCurrentImage(){this.blurSourceInto(this.nextAlbumFBO)}blurSourceInto(k){let z=this.gl;z.useProgram(this.tintProgram),this.setupAttributes(),z.bindFramebuffer(z.FRAMEBUFFER,this.blurFBO1.framebuffer),z.viewport(0,0,128,128),z.activeTexture(z.TEXTURE0),z.bindTexture(z.TEXTURE_2D,this.sourceTexture),z.uniform1i(this.uniforms.tint.texture,0),z.uniform3fv(this.uniforms.tint.tintColor,this._tintColor),z.uniform1f(this.uniforms.tint.tintIntensity,this._tintIntensity),z.drawArrays(z.TRIANGLES,0,6),z.useProgram(this.blurProgram),this.setupAttributes(),z.uniform2f(this.uniforms.blur.resolution,128,128),z.uniform1i(this.uniforms.blur.texture,0);let x=this.blurFBO1,f=this.blurFBO2;for(let b=0;b<this._blurPasses;b++)z.bindFramebuffer(z.FRAMEBUFFER,f.framebuffer),z.viewport(0,0,128,128),z.bindTexture(z.TEXTURE_2D,x.texture),z.uniform1f(this.uniforms.blur.offset,b+0.5),z.drawArrays(z.TRIANGLES,0,6),[x,f]=[f,x];z.bindFramebuffer(z.FRAMEBUFFER,k.framebuffer),z.viewport(0,0,128,128),z.bindTexture(z.TEXTURE_2D,x.texture),z.uniform1f(this.uniforms.blur.offset,0),z.drawArrays(z.TRIANGLES,0,6)}resize(){let k=this.canvas.width,z=this.canvas.height;if(this.warpFBO)this.deleteFramebuffer(this.warpFBO);this.warpFBO=this.createFramebuffer(k,z,!0)}start(){if(this.isPlaying)return;this.isPlaying=!0,this.lastFrameTime=performance.now(),requestAnimationFrame(this.renderLoop)}stop(){if(this.isPlaying=!1,this.animationId!==null)cancelAnimationFrame(this.animationId),this.animationId=null}renderFrame(k){let z=performance.now();if(k!==void 0)this.render(k,z);else{let x=(z-this.lastFrameTime)/1000;this.lastFrameTime=z,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=x*this._animationSpeed,this.render(this.accumulatedTime,z)}}dispose(){this.stop();let k=this.gl;k.deleteProgram(this.blurProgram),k.deleteProgram(this.blendProgram),k.deleteProgram(this.tintProgram),k.deleteProgram(this.warpProgram),k.deleteProgram(this.outputProgram),k.deleteBuffer(this.positionBuffer),k.deleteBuffer(this.texCoordBuffer),k.deleteTexture(this.sourceTexture),this.deleteFramebuffer(this.blurFBO1),this.deleteFramebuffer(this.blurFBO2),this.deleteFramebuffer(this.currentAlbumFBO),this.deleteFramebuffer(this.nextAlbumFBO),this.deleteFramebuffer(this.warpFBO)}renderLoop=(k)=>{if(!this.isPlaying)return;let z=(k-this.lastFrameTime)/1000;this.lastFrameTime=k,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=z*this._animationSpeed,this.render(this.accumulatedTime,k),this.animationId=requestAnimationFrame(this.renderLoop)};render(k,z=performance.now()){let x=this.gl,f=this.canvas.width,b=this.canvas.height,q=1;if(this.isTransitioning){let K=z-this.transitionStartTime;if(q=Math.min(1,K/this._transitionDuration),q>=1)this.isTransitioning=!1}let Z;if(this.isTransitioning&&q<1)x.useProgram(this.blendProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.blurFBO1.framebuffer),x.viewport(0,0,128,128),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,this.currentAlbumFBO.texture),x.uniform1i(this.uniforms.blend.texture1,0),x.activeTexture(x.TEXTURE1),x.bindTexture(x.TEXTURE_2D,this.nextAlbumFBO.texture),x.uniform1i(this.uniforms.blend.texture2,1),x.uniform1f(this.uniforms.blend.blend,q),x.drawArrays(x.TRIANGLES,0,6),Z=this.blurFBO1.texture,x.useProgram(this.warpProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.warpFBO.framebuffer),x.viewport(0,0,f,b),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,Z),x.uniform1i(this.uniforms.warp.texture,0),x.uniform1f(this.uniforms.warp.time,k),x.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),x.drawArrays(x.TRIANGLES,0,6),x.useProgram(this.outputProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,null),x.viewport(0,0,f,b),x.bindTexture(x.TEXTURE_2D,this.warpFBO.texture),x.uniform1i(this.uniforms.output.texture,0),x.uniform1f(this.uniforms.output.saturation,this._saturation),x.uniform1f(this.uniforms.output.dithering,this._dithering),x.uniform1f(this.uniforms.output.time,k),x.uniform1f(this.uniforms.output.scale,this._scale),x.uniform2f(this.uniforms.output.resolution,f,b),x.drawArrays(x.TRIANGLES,0,6);else x.useProgram(this.warpProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.warpFBO.framebuffer),x.viewport(0,0,f,b),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,this.nextAlbumFBO.texture),x.uniform1i(this.uniforms.warp.texture,0),x.uniform1f(this.uniforms.warp.time,k),x.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),x.drawArrays(x.TRIANGLES,0,6),x.useProgram(this.outputProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,null),x.viewport(0,0,f,b),x.bindTexture(x.TEXTURE_2D,this.warpFBO.texture),x.uniform1i(this.uniforms.output.texture,0),x.uniform1f(this.uniforms.output.saturation,this._saturation),x.uniform1f(this.uniforms.output.dithering,this._dithering),x.uniform1f(this.uniforms.output.time,k),x.uniform1f(this.uniforms.output.scale,this._scale),x.uniform2f(this.uniforms.output.resolution,f,b),x.drawArrays(x.TRIANGLES,0,6)}setupAttributes(){let k=this.gl;k.bindBuffer(k.ARRAY_BUFFER,this.positionBuffer),k.enableVertexAttribArray(this.attribs.position),k.vertexAttribPointer(this.attribs.position,2,k.FLOAT,!1,0,0),k.bindBuffer(k.ARRAY_BUFFER,this.texCoordBuffer),k.enableVertexAttribArray(this.attribs.texCoord),k.vertexAttribPointer(this.attribs.texCoord,2,k.FLOAT,!1,0,0)}createShader(k,z){let x=this.gl,f=x.createShader(k);if(!f)throw Error("Failed to create shader");if(x.shaderSource(f,z),x.compileShader(f),!x.getShaderParameter(f,x.COMPILE_STATUS)){let b=x.getShaderInfoLog(f);throw x.deleteShader(f),Error(`Shader compile error: ${b}`)}return f}createProgram(k,z){let x=this.gl,f=this.createShader(x.VERTEX_SHADER,k),b=this.createShader(x.FRAGMENT_SHADER,z),q=x.createProgram();if(!q)throw Error("Failed to create program");if(x.attachShader(q,f),x.attachShader(q,b),x.linkProgram(q),!x.getProgramParameter(q,x.LINK_STATUS)){let Z=x.getProgramInfoLog(q);throw x.deleteProgram(q),Error(`Program link error: ${Z}`)}return x.deleteShader(f),x.deleteShader(b),q}createBuffer(k){let z=this.gl,x=z.createBuffer();if(!x)throw Error("Failed to create buffer");return z.bindBuffer(z.ARRAY_BUFFER,x),z.bufferData(z.ARRAY_BUFFER,k,z.STATIC_DRAW),x}createTexture(){let k=this.gl,z=k.createTexture();if(!z)throw Error("Failed to create texture");return k.bindTexture(k.TEXTURE_2D,z),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_S,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_T,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MIN_FILTER,k.LINEAR),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MAG_FILTER,k.LINEAR),z}createFramebuffer(k,z,x=!1){let f=this.gl,b=this.createTexture(),Z=x&&this.halfFloatExt&&this.halfFloatLinearExt?this.halfFloatExt.HALF_FLOAT_OES:f.UNSIGNED_BYTE;f.texImage2D(f.TEXTURE_2D,0,f.RGBA,k,z,0,f.RGBA,Z,null);let K=f.createFramebuffer();if(!K)throw Error("Failed to create framebuffer");return f.bindFramebuffer(f.FRAMEBUFFER,K),f.framebufferTexture2D(f.FRAMEBUFFER,f.COLOR_ATTACHMENT0,f.TEXTURE_2D,b,0),{framebuffer:K,texture:b}}deleteFramebuffer(k){this.gl.deleteFramebuffer(k.framebuffer),this.gl.deleteTexture(k.texture)}}var i=(k)=>{let z=k.split(`
`),x=[],f=/\[(\d+):(\d+(?:\.\d+)?)\]/;return z.forEach((b)=>{let q=b.match(f);if(q){let Z=(parseInt(q[1])*60+parseFloat(q[2]))*1000,K=b.replace(f,"").trim();if(K.includes("<")){let B=[],C=K.split(/(<\d+:\d+(?:\.\d+)?>)/g).filter((D)=>D.length>0),I=Z,A="";C.forEach((D)=>{let O=D.match(/<(\d+):(\d+(?:\.\d+)?)>/);if(O)I=(parseInt(O[1])*60+parseFloat(O[2]))*1000;else A+=D,B.push({startTime:I,word:D})}),x.push({startTime:Z,words:A.trim(),syllables:B})}else if(K)x.push({startTime:Z,words:K})}}),x},H0=(k)=>{let z=[],x=/<p[^>]*begin="([^"]*)"[^>]*>(.*?)<\/p>/gs,f=(q)=>{if(!q)return 0;let Z=q.split(":");if(Z.length===3)return(parseInt(Z[0])*3600+parseInt(Z[1])*60+parseFloat(Z[2]))*1000;if(Z.length===2)return(parseInt(Z[0])*60+parseFloat(Z[1]))*1000;if(q.endsWith("s"))return parseFloat(q.replace("s",""))*1000;return parseFloat(q)*1000},b;while((b=x.exec(k))!==null){let q=f(b[1]),Z=b[2],K=[],B="";if(Z.includes("<span")||Z.includes("<s")){let I=/<(?:s|span)[^>]*begin="([^"]*)"[^>]*>([^<]*)<\/(?:s|span)>/g,A;while((A=I.exec(Z))!==null){let D=f(A[1]),O=A[2].replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/&quot;/g,'"');if(O.trim()||O===" ")K.push({startTime:D,word:O}),B+=O}}if(K.length===0)B=Z.replace(/<[^>]*>/g,"").replace(/&apos;/g,"'").replace(/&quot;/g,'"');let C=B.replace(/<br\s*\/?>/gi," ").trim();if(C)z.push({startTime:q,words:C,syllables:K.length>0?K:void 0})}return z},V0=()=>{let k=Spicetify.React,{useEffect:z,useState:x,useRef:f}=k,b=x,[q,Z]=b([]),[K,B]=b(-1),[C,I]=b(!1),[A,D]=b("Establishing signal..."),[O,b0]=b(""),[_0,m]=b(0),[R,c]=b([]),[r,a]=b(!1),T=f([]),y=f(null),g=f(null),u=f(null),j=f(null),_=($,Y="info")=>{let H=`[${new Date().toLocaleTimeString().split(" ")[0]}] ${$}`;if(c((U)=>[H,...U].slice(0,50)),Y==="error")console.error($);else if(Y==="warn")console.warn($);else console.log($)},G0=async()=>{let $=Spicetify.Player.data,Y=$?.track||$?.item||Spicetify.Player.track||{},E=Y?.metadata||{},H=E.title||E.name||Y.title||Y.name||"",U=E.artist_name||E.artist||Y.artist||"",V=E.image_xlarge_url||E.image_large_url||E.image_url||"";if(V.startsWith("spotify:image:"))V=`https://i.scdn.co/image/${V.split(":")[2]}`;if(b0(V),!H||H.length<1)H=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackTitle")?.textContent||"",U=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-subtitles"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackArtists")?.textContent||"";if(!H||H.trim().length===0){D("Signal Lost: Searching Metadata..."),I(!1);return}let F=H.split("(")[0].split("-")[0].split(" feat.")[0].split(" ft.")[0].trim(),n=U.split(",")[0].split("&")[0].trim();I(!0);let o=`Syncing: ${n} - ${F}`;D(o),c([]),_(`Starting Fetch for ${n} - ${F}`),_(`Metadata: ${H} | ${U} | ${Y.uri}`);let q0=async()=>{_("Resolving Apple Music mapping...");let W=Y.uri?.split(":")[2],N=Y.metadata?.isrc,X="";if(N){_(`Direct ISRC lookup: ${N}`);try{let J=`https://lyrics.paxsenix.org/apple-music/search?q=${N}`,G=await Spicetify.CosmosAsync.get(J,null,{"User-Agent":"VaporLyricsExtension/1.1 (github.com/NaeNaeTart/VaporLyrics)",Accept:"application/json"});if(G?.message||G?.error)_(`AM Search Error: ${G.message||G.error}`,"error");let v=G?.results||G?.data||G?.items;if(Array.isArray(G))v=G;if(v&&v.length>0)X=v[0].id,_(`Match found via ISRC: ${X} (${v[0].name})`,"success")}catch(J){_(`ISRC Search Exception: ${J}`,"warn")}}if(!X){_("Trying Songlink mapping...");try{let J=`https://api.song.link/v1-alpha.1/links?url=spotify:track:${W}`,G=await fetch(J).then((Q)=>Q.json()),v=G?.linksByPlatform?.appleMusic;if(v)X=v.entityUniqueId.split("::")[1],_(`Songlink mapped Apple Music ID: ${X}`,"success");else if(G?.statusCode===429)_("Songlink 429: Too Many Requests.","warn")}catch(J){_("Songlink mapping failed, trying fuzzy search...","warn")}}if(!X){_(`Attempting Fuzzy Search: ${n} - ${F}`);let J=`https://lyrics.paxsenix.org/apple-music/search?q=${encodeURIComponent(n+" "+F)}`,G;try{G=await Spicetify.CosmosAsync.get(J,null,{"User-Agent":"VaporLyricsExtension/1.1 (github.com/NaeNaeTart/VaporLyrics)",Accept:"application/json"})}catch(Q){_("Fuzzy Search fetch failed.","error")}if(G?.message||G?.error)_(`Fuzzy Search Error: ${G.message||G.error}`,"error");_(`Search Response keys: ${G?Object.keys(G).join(", "):"null"}`);let v=G?.results||G?.data||G?.items;if(Array.isArray(G)&&G.length>0)v=G;if(v&&v.length>0)X=v[0].id,_(`Fuzzy Search found ID: ${X} (${v[0].name})`,"success")}if(X){let J=`https://lyrics.paxsenix.org/apple-music/lyrics?id=${X}&ttml=true`;_(`Final Target AM ID: ${X}`),_("Requesting TTML from Paxsenix...");let G="",v=(Q)=>{_(`Response Length: ${Q.length} chars`);try{let P=JSON.parse(Q);if(_(`Parsed JSON metadata: ${Object.keys(P).join(", ")}`),typeof P==="string")return P;if(P.ttml)return P.ttml;if(P.lyrics)return P.lyrics;if(P.data?.lyrics)return P.data.lyrics}catch(P){_("Response is likely raw TTML/XML string.")}return Q};try{let Q=await Spicetify.CosmosAsync.get(J,null,{"User-Agent":"VaporLyricsExtension/1.1 (github.com/NaeNaeTart/VaporLyrics)"});G=typeof Q==="string"?Q:Q.ttml||Q.lyrics||Q.data?.lyrics||JSON.stringify(Q),G=v(G)}catch(Q){_(`Paxsenix fetch failed: ${Q}`,"error")}if(G&&G.includes("<tt")){let Q=H0(G);if(Q.length>0)return _("Successfully parsed AM TTML","success"),{parsed:Q,source:"Apple Music TTML"}}else if(G)_("Text found but doesn't look like TTML. Samples: "+G.substring(0,50),"warn")}throw _("Apple Music: No results or failed mapping.","warn"),Error("No Apple Music match")},J0=async()=>{_("Attempting Musixmatch (Paxsenix)...");let W=`https://lyrics.paxsenix.org/musixmatch/lyrics?t=${encodeURIComponent(F)}&a=${encodeURIComponent(n)}&type=word`;try{let X=await fetch(W,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}});if(!X.ok)throw Error("MXM Fetch Error");text=await X.text();try{let J=JSON.parse(text);if(typeof J==="string")text=J;else if(J.lyrics)text=J.lyrics;else if(J.text)text=J.text}catch(J){}}catch(X){let J=await Spicetify.CosmosAsync.get(W,null,{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"});text=typeof J==="string"?J:J.lyrics||J.text||JSON.stringify(J)}let N=i(text);if(N.length>0)return _("Successfully parsed MXM Word-Sync","success"),{parsed:N,source:"Musixmatch Word-Sync"};throw _("Musixmatch: No match found.","warn"),Error("No MXM word match")},X0=async()=>{_("Attempting LRCLIB...");let W=await Spicetify.CosmosAsync.get(`https://lrclib.net/api/search?artist_name=${encodeURIComponent(n)}&track_name=${encodeURIComponent(F)}`);if(W&&W.length>0){let N=W[0],X=N.syncedLyrics||N.plainLyrics||"",J=i(X);if(J.length>0)return _("Successfully parsed LRCLIB","success"),{parsed:J,source:"LRCLIB"}}throw _("LRCLIB: No results.","warn"),Error("No LRCLIB match")},Z0=async()=>{_("Attempting NetEase...");let W=`https://lyrics.paxsenix.org/netease/search?q=${encodeURIComponent(n+" "+F)}`;try{let X=(await Spicetify.CosmosAsync.get(W,null,{"User-Agent":"Spicetify/1.0 (https://github.com/spicetify/spicetify-cli)"}))?.result?.songs?.[0]?.id;if(!X)throw _("NetEase: No search results.","warn"),Error("No NetEase match");_(`Found NetEase Match: ${X}. Fetching lyrics...`);let J=`https://music.cyrvoid.com/lyric?id=${X}`,G=await fetch(J).then((p)=>p.json()),v=G?.lrc?.lyric||"",Q=G?.yrc?.lyric||"";if(!v&&!Q)_("NetEase: No lyrics returned for this ID.","warn");let M=Q?((p)=>{let s=[];return p.split(`
`).forEach((v0)=>{let S=v0.match(/\[(\d+),(\d+)\](.*)/);if(S){let e=parseInt(S[1]),k0=S[3],w=[],x0="",N0=/\((\d+),(\d+),\d+\)([^\(]*)/g,d;while((d=N0.exec(k0))!==null){let Y0=parseInt(d[1]),z0=d[3];w.push({startTime:e+Y0,word:z0}),x0+=z0}s.push({startTime:e,words:w.length>0?x0:k0,syllables:w.length>0?w:void 0})}}),s})(Q):i(v);if(M.length>0)return _("NetEase parsed successfully.","success"),{parsed:M,source:Q?"NetEase Word-Sync":"NetEase"};throw _("NetEase: Parse failed.","error"),Error("NetEase parse failed")}catch(N){throw _(`NetEase fetch failed: ${N}`,"error"),N}},$0=async()=>{_("Attempting Spotify Native...");let W=Y.uri?.split(":")[2];if(!W)throw Error("No track ID");let N;try{N=await Spicetify.CosmosAsync.get(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${W}`),_(`Spotify Sync Type: ${N?.lyrics?.syncType}`,N?.lyrics?.lines?"info":"warn")}catch(X){throw _("Spotify Native API Failed.","warn"),Error("Spotify Color-Lyrics API Error")}if(N&&N.lyrics&&N.lyrics.lines){let X=N.lyrics.lines.map((J)=>{let G=J.syllables?J.syllables.map((v)=>({startTime:parseInt(v.startTimeMs||"0"),word:v.word||v.character||v.text||""})):void 0;return{startTime:parseInt(J.startTimeMs||"0"),words:J.words||"",syllables:G&&G.length>0?G:void 0}});if(X.length>0)return{parsed:X,source:N.lyrics.syncType==="SYLLABLE_SYNCED"?"Spotify Word-Sync":"Spotify"}}throw Error("No Spotify match")},K0=async()=>{_("Attempting Spotify Lyrics API (Proxy)...");let W=Y.uri?.split(":")[2];if(!W)throw Error("No track ID");let N=`https://spotify-lyric-api-984e7b4face0.herokuapp.com/?trackid=${W}`,X=await fetch(N).then((J)=>J.json());if(X&&!X.error&&(X.lines||X.lyrics?.lines)){let J=X.lines||X.lyrics.lines,G=X.syncType||X.lyrics?.syncType,v=J.map((Q)=>{let P=Q.syllables?Q.syllables.map((M)=>({startTime:parseInt(M.startTimeMs||"0"),word:M.word||M.character||M.text||""})):void 0;return{startTime:parseInt(Q.startTimeMs||"0"),words:Q.words||"",syllables:P&&P.length>0?P:void 0}});if(v.length>0)return{parsed:v,source:G==="SYLLABLE_SYNCED"?"Spotify Proxy Word-Sync":"Spotify Proxy"}}throw Error("Spotify Proxy failed")},t=!1,l=!1,L=(W)=>{if(t)return;if(W.source==="Apple Music TTML"||W.source==="Musixmatch Word-Sync"||W.source==="Spotify Word-Sync")t=!0;l=!0,Z(W.parsed),T.current=W.parsed,D(`Signal Active (${W.source})`),_(`Applied source: ${W.source}`,"success")},Q0=[$0().then(L).catch(()=>{}),q0().then(L).catch(()=>{}),J0().then(L).catch(()=>{}),K0().then(L).catch(()=>{}),Z0().then(L).catch(()=>{}),X0().then(L).catch(()=>{})];Promise.allSettled(Q0).then(()=>{if(!l)_("No providers found any lyrics.","error"),D("Database record empty for this track."),Z([]),T.current=[];I(!1)})};return z(()=>{let $,Y=()=>{let E=Spicetify.Player.getProgress(),H=T.current;if(H.length>0){let U=-1;for(let V=0;V<H.length;V++)if(E>=H[V].startTime)U=V;else break;if(U!==-1&&y.current){if(U!==K){B(U);let F=y.current.children[U];if(F){let n=y.current.parentElement?.clientHeight||0,o=F.offsetTop-n/2+F.clientHeight/2;m(-o)}}let V=y.current.children[U];if(V&&V.classList.contains("word-synced"))V.querySelectorAll(".vapor-syllable").forEach((n)=>{let o=parseInt(n.getAttribute("data-time")||"0");if(E>=o)n.classList.add("synced");else n.classList.remove("synced")})}}$=requestAnimationFrame(Y)};return $=requestAnimationFrame(Y),()=>cancelAnimationFrame($)},[K]),z(()=>{let $=(H,U=!1)=>{let V=Spicetify.Player.data?.track?.uri||Spicetify.Player.track?.uri||"unknown";if(U||H||V!==g.current)g.current=V,B(-1),m(0),G0()},Y="vapor-lyrics-styles";if(!document.getElementById("vapor-lyrics-styles")){let H=document.createElement("style");H.id="vapor-lyrics-styles",H.innerHTML=f0,document.head.appendChild(H)}Spicetify.Player.addEventListener("songchange",$);let E=setInterval(()=>$(null,!1),3000);return $(null,!0),()=>{clearInterval(E),Spicetify.Player.removeEventListener("songchange",$)}},[]),z(()=>{if(u.current&&!j.current)j.current=new h(u.current),j.current.start();return()=>{if(j.current)j.current.dispose(),j.current=null}},[]),z(()=>{if(j.current&&O)j.current.loadImage(O).catch(($)=>console.log("Kawarp load error:",$))},[O]),k.createElement("div",{id:"vapor-lyrics-app-container",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",zIndex:100}},[k.createElement("div",{className:"vapor-background",key:"bg"},[k.createElement("canvas",{key:"canvas",ref:u,style:{width:"100%",height:"100%",position:"absolute",top:0,left:0}})]),k.createElement("div",{className:"vapor-content",key:"content"},[k.createElement("header",{className:"vapor-header",key:"header"},[k.createElement("h1",{className:"vapor-title",key:"title"},"ＶＡＰＯＲ  ＬＹＲＩＣＳ")]),k.createElement("main",{className:"vapor-lyrics-container",key:"main"},[k.createElement("div",{className:"vapor-lyrics-scroll",key:"scroll",ref:y,style:{transform:`translate3d(0, ${_0}px, 0)`}},C?[k.createElement("p",{className:"vapor-lyric-line active",key:"l"},"Establishing aesthetic uplink...")]:q.length>0?q.map(($,Y)=>{let E=Y<q.length-1?q[Y+1].startTime-$.startTime:3000,H="";if(Y===K)H="active";else if(K!==-1&&Y<K)H="played";let U=$.syllables&&$.syllables.length>0;return k.createElement("p",{className:`vapor-lyric-line ${H} ${U?"word-synced":""}`,key:Y,style:{"--line-duration":`${E}ms`}},U?$.syllables.map((V,F)=>k.createElement("span",{className:"vapor-syllable",key:F,"data-time":V.startTime},V.word)):$.words)}):[k.createElement("p",{className:"vapor-lyric-line",key:"i"},A==="Establishing signal..."?"Initializing signal...":A)])]),k.createElement("div",{className:"vapor-debug-status",key:"st",onClick:()=>a(!r)},[k.createElement("span",{key:"s"},A),k.createElement("span",{key:"h",style:{opacity:0.5,marginLeft:8}},"(Click for Debug)")]),r&&k.createElement("div",{className:"vapor-debug-overlay",key:"dbg",onClick:($)=>$.stopPropagation()},[k.createElement("header",{key:"h"},[k.createElement("h2",{key:"t"},"Terminal Uplink"),k.createElement("div",{key:"btns",style:{display:"flex",gap:"8px"}},[k.createElement("button",{key:"cp",onClick:()=>{let $=R.join(`
`);navigator.clipboard.writeText($),D("Logs Copied!"),setTimeout(()=>D(A),2000)},style:{fontSize:"10px",padding:"2px 6px"}},"COPY ALL"),k.createElement("button",{key:"b",onClick:()=>a(!1)},"✖")])]),k.createElement("div",{className:"debug-list",key:"l"},R.map(($,Y)=>k.createElement("div",{key:Y,className:"debug-line"},$)))])])])};(function k(){let{Playbar:z,Platform:x,ReactDOM:f,React:b,CosmosAsync:q}=Spicetify;if(!z||!x||!f||!b||!q){setTimeout(k,500);return}function Z(){let K=document.querySelector(".main-view-container__scroll-node"),B=document.querySelector(".main-view-container__scroll-node-child")||document.querySelector("main");if(!B)return;if(K)K.style.overflow="hidden";let C=document.getElementById("vapor-lyrics-mount-root");if(!C)C=document.createElement("div"),C.id="vapor-lyrics-mount-root",B.innerHTML="",B.appendChild(C);f.render(b.createElement(V0),C)}if(x.History.listen(({pathname:K})=>{if(K.includes("vapor-lyrics"))setTimeout(Z,100);else{let B=document.getElementById("vapor-lyrics-mount-root");if(B)B.remove();let C=document.querySelector(".main-view-container__scroll-node");if(C)C.style.overflow=""}}),x.History.location.pathname.includes("vapor-lyrics"))Z();new z.Button("Vapor Lyrics",'<svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 1h-1v11h1V1zM5 1H4v11h1V1zM15 4h-1v5h1V4zM2 4H1v5h1V4zM9 0H7v14h2V0z"></path></svg>',()=>{if(x.History.location.pathname.includes("vapor-lyrics"))x.History.goBack();else x.History.push("/vapor-lyrics")},!1,!1)})();
