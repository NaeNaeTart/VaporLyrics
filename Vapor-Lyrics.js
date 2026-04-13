var b0=`:root {\r
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
`;class S{canvas;gl;halfFloatExt=null;halfFloatLinearExt=null;blurProgram;blendProgram;tintProgram;warpProgram;outputProgram;positionBuffer;texCoordBuffer;sourceTexture;blurFBO1;blurFBO2;currentAlbumFBO;nextAlbumFBO;warpFBO;animationId=null;lastFrameTime=0;accumulatedTime=0;isPlaying=!1;isTransitioning=!1;transitionStartTime=0;_transitionDuration;_warpIntensity;_blurPasses;_animationSpeed;_targetAnimationSpeed;_saturation;_tintColor;_tintIntensity;_dithering;_scale;hasImage=!1;attribs;uniforms;constructor(k,z={}){this.canvas=k;let x=k.getContext("webgl",{preserveDrawingBuffer:!0});if(!x)throw Error("WebGL not supported");this.gl=x,this.halfFloatExt=x.getExtension("OES_texture_half_float"),this.halfFloatLinearExt=x.getExtension("OES_texture_half_float_linear"),this._warpIntensity=z.warpIntensity??1,this._blurPasses=z.blurPasses??8,this._animationSpeed=z.animationSpeed??1,this._targetAnimationSpeed=this._animationSpeed,this._transitionDuration=z.transitionDuration??1000,this._saturation=z.saturation??1.5,this._tintColor=z.tintColor??[0.157,0.157,0.235],this._tintIntensity=z.tintIntensity??0.15,this._dithering=z.dithering??0.008,this._scale=z.scale??1,this.blurProgram=this.createProgram(`
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
`),this.attribs={position:x.getAttribLocation(this.blurProgram,"a_position"),texCoord:x.getAttribLocation(this.blurProgram,"a_texCoord")},this.uniforms={blur:{resolution:x.getUniformLocation(this.blurProgram,"u_resolution"),texture:x.getUniformLocation(this.blurProgram,"u_texture"),offset:x.getUniformLocation(this.blurProgram,"u_offset")},blend:{texture1:x.getUniformLocation(this.blendProgram,"u_texture1"),texture2:x.getUniformLocation(this.blendProgram,"u_texture2"),blend:x.getUniformLocation(this.blendProgram,"u_blend")},warp:{texture:x.getUniformLocation(this.warpProgram,"u_texture"),time:x.getUniformLocation(this.warpProgram,"u_time"),intensity:x.getUniformLocation(this.warpProgram,"u_intensity")},tint:{texture:x.getUniformLocation(this.tintProgram,"u_texture"),tintColor:x.getUniformLocation(this.tintProgram,"u_tintColor"),tintIntensity:x.getUniformLocation(this.tintProgram,"u_tintIntensity")},output:{texture:x.getUniformLocation(this.outputProgram,"u_texture"),saturation:x.getUniformLocation(this.outputProgram,"u_saturation"),dithering:x.getUniformLocation(this.outputProgram,"u_dithering"),time:x.getUniformLocation(this.outputProgram,"u_time"),scale:x.getUniformLocation(this.outputProgram,"u_scale"),resolution:x.getUniformLocation(this.outputProgram,"u_resolution")}},this.positionBuffer=this.createBuffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),this.texCoordBuffer=this.createBuffer(new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),this.sourceTexture=this.createTexture(),this.blurFBO1=this.createFramebuffer(128,128,!0),this.blurFBO2=this.createFramebuffer(128,128,!0),this.currentAlbumFBO=this.createFramebuffer(128,128,!0),this.nextAlbumFBO=this.createFramebuffer(128,128,!0),this.warpFBO=this.createFramebuffer(1,1,!0),this.resize()}get warpIntensity(){return this._warpIntensity}set warpIntensity(k){this._warpIntensity=Math.max(0,Math.min(1,k))}get blurPasses(){return this._blurPasses}set blurPasses(k){let z=Math.max(1,Math.min(40,Math.floor(k)));if(z!==this._blurPasses){if(this._blurPasses=z,this.hasImage)this.reblurCurrentImage()}}get animationSpeed(){return this._targetAnimationSpeed}set animationSpeed(k){this._targetAnimationSpeed=Math.max(0.1,Math.min(5,k))}get transitionDuration(){return this._transitionDuration}set transitionDuration(k){this._transitionDuration=Math.max(0,Math.min(5000,k))}get saturation(){return this._saturation}set saturation(k){this._saturation=Math.max(0,Math.min(3,k))}get tintColor(){return this._tintColor}set tintColor(k){let z=k.map((b)=>Math.max(0,Math.min(1,b)));if(z.some((b,f)=>b!==this._tintColor[f])){if(this._tintColor=z,this.hasImage)this.reblurCurrentImage()}}get tintIntensity(){return this._tintIntensity}set tintIntensity(k){let z=Math.max(0,Math.min(1,k));if(z!==this._tintIntensity){if(this._tintIntensity=z,this.hasImage)this.reblurCurrentImage()}}get dithering(){return this._dithering}set dithering(k){this._dithering=Math.max(0,Math.min(0.1,k))}get scale(){return this._scale}set scale(k){this._scale=Math.max(0.01,Math.min(4,k))}setOptions(k){if(k.warpIntensity!==void 0)this.warpIntensity=k.warpIntensity;if(k.blurPasses!==void 0)this.blurPasses=k.blurPasses;if(k.animationSpeed!==void 0)this.animationSpeed=k.animationSpeed;if(k.transitionDuration!==void 0)this.transitionDuration=k.transitionDuration;if(k.saturation!==void 0)this.saturation=k.saturation;if(k.tintColor!==void 0)this.tintColor=k.tintColor;if(k.tintIntensity!==void 0)this.tintIntensity=k.tintIntensity;if(k.dithering!==void 0)this.dithering=k.dithering;if(k.scale!==void 0)this.scale=k.scale}getOptions(){return{warpIntensity:this._warpIntensity,blurPasses:this._blurPasses,animationSpeed:this._targetAnimationSpeed,transitionDuration:this._transitionDuration,saturation:this._saturation,tintColor:this._tintColor,tintIntensity:this._tintIntensity,dithering:this._dithering,scale:this._scale}}loadImage(k){return new Promise((z,x)=>{let b=new Image;b.crossOrigin="anonymous",b.onload=()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,b),this.processNewImage(),z()},b.onerror=()=>x(Error(`Failed to load image: ${k}`)),b.src=k})}loadImageElement(k){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,k),this.processNewImage()}loadImageData(k,z,x){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,z,x,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,k instanceof Uint8ClampedArray?new Uint8Array(k.buffer):k),this.processNewImage()}loadFromImageData(k){this.loadImageData(k.data,k.width,k.height)}async loadBlob(k){let z=await createImageBitmap(k);this.loadImageElement(z),z.close()}loadBase64(k){let z=k.startsWith("data:")?k:`data:image/png;base64,${k}`;return this.loadImage(z)}async loadArrayBuffer(k,z="image/png"){let x=new Blob([k],{type:z});return this.loadBlob(x)}loadGradient(k,z=135){let b=document.createElement("canvas");b.width=512,b.height=512;let f=b.getContext("2d");if(!f)return;let q=z*Math.PI/180,X=256-Math.cos(q)*512,$=256-Math.sin(q)*512,B=256+Math.cos(q)*512,C=256+Math.sin(q)*512,O=f.createLinearGradient(X,$,B,C);k.forEach((F,D)=>{O.addColorStop(D/(k.length-1),F)}),f.fillStyle=O,f.fillRect(0,0,512,512),this.loadImageElement(b)}processNewImage(){[this.currentAlbumFBO,this.nextAlbumFBO]=[this.nextAlbumFBO,this.currentAlbumFBO],this.blurSourceInto(this.nextAlbumFBO),this.hasImage=!0,this.isTransitioning=!0,this.transitionStartTime=performance.now()}reblurCurrentImage(){this.blurSourceInto(this.nextAlbumFBO)}blurSourceInto(k){let z=this.gl;z.useProgram(this.tintProgram),this.setupAttributes(),z.bindFramebuffer(z.FRAMEBUFFER,this.blurFBO1.framebuffer),z.viewport(0,0,128,128),z.activeTexture(z.TEXTURE0),z.bindTexture(z.TEXTURE_2D,this.sourceTexture),z.uniform1i(this.uniforms.tint.texture,0),z.uniform3fv(this.uniforms.tint.tintColor,this._tintColor),z.uniform1f(this.uniforms.tint.tintIntensity,this._tintIntensity),z.drawArrays(z.TRIANGLES,0,6),z.useProgram(this.blurProgram),this.setupAttributes(),z.uniform2f(this.uniforms.blur.resolution,128,128),z.uniform1i(this.uniforms.blur.texture,0);let x=this.blurFBO1,b=this.blurFBO2;for(let f=0;f<this._blurPasses;f++)z.bindFramebuffer(z.FRAMEBUFFER,b.framebuffer),z.viewport(0,0,128,128),z.bindTexture(z.TEXTURE_2D,x.texture),z.uniform1f(this.uniforms.blur.offset,f+0.5),z.drawArrays(z.TRIANGLES,0,6),[x,b]=[b,x];z.bindFramebuffer(z.FRAMEBUFFER,k.framebuffer),z.viewport(0,0,128,128),z.bindTexture(z.TEXTURE_2D,x.texture),z.uniform1f(this.uniforms.blur.offset,0),z.drawArrays(z.TRIANGLES,0,6)}resize(){let k=this.canvas.width,z=this.canvas.height;if(this.warpFBO)this.deleteFramebuffer(this.warpFBO);this.warpFBO=this.createFramebuffer(k,z,!0)}start(){if(this.isPlaying)return;this.isPlaying=!0,this.lastFrameTime=performance.now(),requestAnimationFrame(this.renderLoop)}stop(){if(this.isPlaying=!1,this.animationId!==null)cancelAnimationFrame(this.animationId),this.animationId=null}renderFrame(k){let z=performance.now();if(k!==void 0)this.render(k,z);else{let x=(z-this.lastFrameTime)/1000;this.lastFrameTime=z,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=x*this._animationSpeed,this.render(this.accumulatedTime,z)}}dispose(){this.stop();let k=this.gl;k.deleteProgram(this.blurProgram),k.deleteProgram(this.blendProgram),k.deleteProgram(this.tintProgram),k.deleteProgram(this.warpProgram),k.deleteProgram(this.outputProgram),k.deleteBuffer(this.positionBuffer),k.deleteBuffer(this.texCoordBuffer),k.deleteTexture(this.sourceTexture),this.deleteFramebuffer(this.blurFBO1),this.deleteFramebuffer(this.blurFBO2),this.deleteFramebuffer(this.currentAlbumFBO),this.deleteFramebuffer(this.nextAlbumFBO),this.deleteFramebuffer(this.warpFBO)}renderLoop=(k)=>{if(!this.isPlaying)return;let z=(k-this.lastFrameTime)/1000;this.lastFrameTime=k,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=z*this._animationSpeed,this.render(this.accumulatedTime,k),this.animationId=requestAnimationFrame(this.renderLoop)};render(k,z=performance.now()){let x=this.gl,b=this.canvas.width,f=this.canvas.height,q=1;if(this.isTransitioning){let $=z-this.transitionStartTime;if(q=Math.min(1,$/this._transitionDuration),q>=1)this.isTransitioning=!1}let X;if(this.isTransitioning&&q<1)x.useProgram(this.blendProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.blurFBO1.framebuffer),x.viewport(0,0,128,128),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,this.currentAlbumFBO.texture),x.uniform1i(this.uniforms.blend.texture1,0),x.activeTexture(x.TEXTURE1),x.bindTexture(x.TEXTURE_2D,this.nextAlbumFBO.texture),x.uniform1i(this.uniforms.blend.texture2,1),x.uniform1f(this.uniforms.blend.blend,q),x.drawArrays(x.TRIANGLES,0,6),X=this.blurFBO1.texture,x.useProgram(this.warpProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.warpFBO.framebuffer),x.viewport(0,0,b,f),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,X),x.uniform1i(this.uniforms.warp.texture,0),x.uniform1f(this.uniforms.warp.time,k),x.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),x.drawArrays(x.TRIANGLES,0,6),x.useProgram(this.outputProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,null),x.viewport(0,0,b,f),x.bindTexture(x.TEXTURE_2D,this.warpFBO.texture),x.uniform1i(this.uniforms.output.texture,0),x.uniform1f(this.uniforms.output.saturation,this._saturation),x.uniform1f(this.uniforms.output.dithering,this._dithering),x.uniform1f(this.uniforms.output.time,k),x.uniform1f(this.uniforms.output.scale,this._scale),x.uniform2f(this.uniforms.output.resolution,b,f),x.drawArrays(x.TRIANGLES,0,6);else x.useProgram(this.warpProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.warpFBO.framebuffer),x.viewport(0,0,b,f),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,this.nextAlbumFBO.texture),x.uniform1i(this.uniforms.warp.texture,0),x.uniform1f(this.uniforms.warp.time,k),x.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),x.drawArrays(x.TRIANGLES,0,6),x.useProgram(this.outputProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,null),x.viewport(0,0,b,f),x.bindTexture(x.TEXTURE_2D,this.warpFBO.texture),x.uniform1i(this.uniforms.output.texture,0),x.uniform1f(this.uniforms.output.saturation,this._saturation),x.uniform1f(this.uniforms.output.dithering,this._dithering),x.uniform1f(this.uniforms.output.time,k),x.uniform1f(this.uniforms.output.scale,this._scale),x.uniform2f(this.uniforms.output.resolution,b,f),x.drawArrays(x.TRIANGLES,0,6)}setupAttributes(){let k=this.gl;k.bindBuffer(k.ARRAY_BUFFER,this.positionBuffer),k.enableVertexAttribArray(this.attribs.position),k.vertexAttribPointer(this.attribs.position,2,k.FLOAT,!1,0,0),k.bindBuffer(k.ARRAY_BUFFER,this.texCoordBuffer),k.enableVertexAttribArray(this.attribs.texCoord),k.vertexAttribPointer(this.attribs.texCoord,2,k.FLOAT,!1,0,0)}createShader(k,z){let x=this.gl,b=x.createShader(k);if(!b)throw Error("Failed to create shader");if(x.shaderSource(b,z),x.compileShader(b),!x.getShaderParameter(b,x.COMPILE_STATUS)){let f=x.getShaderInfoLog(b);throw x.deleteShader(b),Error(`Shader compile error: ${f}`)}return b}createProgram(k,z){let x=this.gl,b=this.createShader(x.VERTEX_SHADER,k),f=this.createShader(x.FRAGMENT_SHADER,z),q=x.createProgram();if(!q)throw Error("Failed to create program");if(x.attachShader(q,b),x.attachShader(q,f),x.linkProgram(q),!x.getProgramParameter(q,x.LINK_STATUS)){let X=x.getProgramInfoLog(q);throw x.deleteProgram(q),Error(`Program link error: ${X}`)}return x.deleteShader(b),x.deleteShader(f),q}createBuffer(k){let z=this.gl,x=z.createBuffer();if(!x)throw Error("Failed to create buffer");return z.bindBuffer(z.ARRAY_BUFFER,x),z.bufferData(z.ARRAY_BUFFER,k,z.STATIC_DRAW),x}createTexture(){let k=this.gl,z=k.createTexture();if(!z)throw Error("Failed to create texture");return k.bindTexture(k.TEXTURE_2D,z),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_S,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_T,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MIN_FILTER,k.LINEAR),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MAG_FILTER,k.LINEAR),z}createFramebuffer(k,z,x=!1){let b=this.gl,f=this.createTexture(),X=x&&this.halfFloatExt&&this.halfFloatLinearExt?this.halfFloatExt.HALF_FLOAT_OES:b.UNSIGNED_BYTE;b.texImage2D(b.TEXTURE_2D,0,b.RGBA,k,z,0,b.RGBA,X,null);let $=b.createFramebuffer();if(!$)throw Error("Failed to create framebuffer");return b.bindFramebuffer(b.FRAMEBUFFER,$),b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,f,0),{framebuffer:$,texture:f}}deleteFramebuffer(k){this.gl.deleteFramebuffer(k.framebuffer),this.gl.deleteTexture(k.texture)}}var i=(k)=>{let z=k.split(`
`),x=[],b=/\[(\d+):(\d+(?:\.\d+)?)\]/;return z.forEach((f)=>{let q=f.match(b);if(q){let X=(parseInt(q[1])*60+parseFloat(q[2]))*1000,$=f.replace(b,"").trim();if($.includes("<")){let B=[],C=$.split(/(<\d+:\d+(?:\.\d+)?>)/g).filter((D)=>D.length>0),O=X,F="";C.forEach((D)=>{let n=D.match(/<(\d+):(\d+(?:\.\d+)?)>/);if(n)O=(parseInt(n[1])*60+parseFloat(n[2]))*1000;else F+=D,B.push({startTime:O,word:D})}),x.push({startTime:X,words:F.trim(),syllables:B})}else if($)x.push({startTime:X,words:$})}}),x},W0=(k)=>{let z=[],x=/<p[^>]*begin="([^"]*)"[^>]*>(.*?)<\/p>/gs,b=(q)=>{if(!q)return 0;let X=q.split(":");if(X.length===3)return(parseInt(X[0])*3600+parseInt(X[1])*60+parseFloat(X[2]))*1000;if(X.length===2)return(parseInt(X[0])*60+parseFloat(X[1]))*1000;if(q.endsWith("s"))return parseFloat(q.replace("s",""))*1000;return parseFloat(q)*1000},f;while((f=x.exec(k))!==null){let q=b(f[1]),X=f[2],$=[],B="";if(X.includes("<span")||X.includes("<s")){let O=/<(?:s|span)[^>]*begin="([^"]*)"[^>]*>([^<]*)<\/(?:s|span)>/g,F;while((F=O.exec(X))!==null){let D=b(F[1]),n=F[2].replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/&quot;/g,'"');if(n.trim()||n===" ")$.push({startTime:D,word:n}),B+=n}}if($.length===0)B=X.replace(/<[^>]*>/g,"").replace(/&apos;/g,"'").replace(/&quot;/g,'"');let C=B.replace(/<br\s*\/?>/gi," ").trim();if(C)z.push({startTime:q,words:C,syllables:$.length>0?$:void 0})}return z},H0=()=>{let k=Spicetify.React,{useEffect:z,useState:x,useRef:b}=k,f=x,[q,X]=f([]),[$,B]=f(-1),[C,O]=f(!1),[F,D]=f("Establishing signal..."),[n,f0]=f(""),[_0,h]=f(0),[m,R]=f([]),[c,r]=f(!1),w=b([]),M=b(null),a=b(null),T=b(null),j=b(null),_=(Z,v="info")=>{let N=`[${new Date().toLocaleTimeString().split(" ")[0]}] ${Z}`;if(R((U)=>[N,...U].slice(0,50)),v==="error")console.error(Z);else if(v==="warn")console.warn(Z);else console.log(Z)},G0=async()=>{let Z=Spicetify.Player.data,v=Z?.track||Z?.item||Spicetify.Player.track||{},P=v?.metadata||{},N=P.title||P.name||v.title||v.name||"",U=P.artist_name||P.artist||v.artist||"",V=P.image_xlarge_url||P.image_large_url||P.image_url||"";if(V.startsWith("spotify:image:"))V=`https://i.scdn.co/image/${V.split(":")[2]}`;if(f0(V),!N||N.length<1)N=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackTitle")?.textContent||"",U=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-subtitles"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackArtists")?.textContent||"";if(!N||N.trim().length===0){D("Signal Lost: Searching Metadata..."),O(!1);return}let E=N.split("(")[0].split("-")[0].split(" feat.")[0].split(" ft.")[0].trim(),A=U.split(",")[0].split("&")[0].trim();O(!0);let L=`Syncing: ${A} - ${E}`;D(L),R([]),_(`Starting Fetch for ${A} - ${E}`),_(`Metadata: ${N} | ${U} | ${v.uri}`);let q0=async()=>{_("Resolving Apple Music mapping...");let H=v.uri?.split(":")[2],Y=v.metadata?.isrc,K="";if(Y){_(`Direct ISRC lookup: ${Y}`);try{let J=`https://lyrics.paxsenix.org/apple-music/search?q=${Y}`,G=await Spicetify.CosmosAsync.get(J,null,{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"});if(G?.message||G?.error)_(`AM Search Error: ${G.message||G.error}`,"error");let Q=G?.results||G?.data||G?.items;if(Array.isArray(G))Q=G;if(Q&&Q.length>0)K=Q[0].id,_(`Match found via ISRC: ${K} (${Q[0].name})`,"success")}catch(J){_(`ISRC Search Exception: ${J}`,"warn")}}if(!K){_("Trying Songlink mapping...");try{let J=`https://api.song.link/v1-alpha.1/links?url=spotify:track:${H}`,G=await fetch(J).then((W)=>W.json()),Q=G?.linksByPlatform?.appleMusic;if(Q)K=Q.entityUniqueId.split("::")[1],_(`Songlink mapped Apple Music ID: ${K}`,"success");else if(G?.statusCode===429)_("Songlink 429: Too Many Requests.","warn")}catch(J){_("Songlink mapping failed, trying fuzzy search...","warn")}}if(!K){_(`Attempting Fuzzy Search: ${A} - ${E}`);let J=`https://lyrics.paxsenix.org/apple-music/search?q=${encodeURIComponent(A+" "+E)}`,G;try{G=await Spicetify.CosmosAsync.get(J,null,{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"})}catch(W){_("Fuzzy Search fetch failed.","error")}if(G?.message||G?.error)_(`Fuzzy Search Error: ${G.message||G.error}`,"error");_(`Search Response keys: ${G?Object.keys(G).join(", "):"null"}`);let Q=G?.results||G?.data||G?.items;if(Array.isArray(G)&&G.length>0)Q=G;if(Q&&Q.length>0)K=Q[0].id,_(`Fuzzy Search found ID: ${K} (${Q[0].name})`,"success")}if(K){let J=`https://lyrics.paxsenix.org/apple-music/lyrics?id=${K}&ttml=true`;_(`Final Target AM ID: ${K}`),_("Requesting TTML from Paxsenix...");let G="",Q=(W)=>{_(`Response Length: ${W.length} chars`);try{let I=JSON.parse(W);if(_(`Parsed JSON metadata: ${Object.keys(I).join(", ")}`),typeof I==="string")return I;if(I.ttml)return I.ttml;if(I.lyrics)return I.lyrics;if(I.data?.lyrics)return I.data.lyrics}catch(I){_("Response is likely raw TTML/XML string.")}return W};try{let W=await Spicetify.CosmosAsync.get(J,null,{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"});G=typeof W==="string"?W:W.ttml||W.lyrics||W.data?.lyrics||JSON.stringify(W),G=Q(G)}catch(W){_(`Paxsenix fetch failed: ${W}`,"error")}if(G&&G.includes("<tt")){let W=W0(G);if(W.length>0)return _("Successfully parsed AM TTML","success"),{parsed:W,source:"Apple Music TTML"}}else if(G)_("Text found but doesn't look like TTML. Samples: "+G.substring(0,50),"warn")}throw _("Apple Music: No results or failed mapping.","warn"),Error("No Apple Music match")},J0=async()=>{_("Attempting Musixmatch (Paxsenix)...");let H=`https://lyrics.paxsenix.org/musixmatch/lyrics?t=${encodeURIComponent(E)}&a=${encodeURIComponent(A)}&type=word`;try{let K=await fetch(H,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}});if(!K.ok)throw Error("MXM Fetch Error");text=await K.text();try{let J=JSON.parse(text);if(typeof J==="string")text=J;else if(J.lyrics)text=J.lyrics;else if(J.text)text=J.text}catch(J){}}catch(K){let J=await Spicetify.CosmosAsync.get(H,null,{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"});text=typeof J==="string"?J:J.lyrics||J.text||JSON.stringify(J)}let Y=i(text);if(Y.length>0)return _("Successfully parsed MXM Word-Sync","success"),{parsed:Y,source:"Musixmatch Word-Sync"};throw _("Musixmatch: No match found.","warn"),Error("No MXM word match")},X0=async()=>{_("Attempting LRCLIB...");let H=await Spicetify.CosmosAsync.get(`https://lrclib.net/api/search?artist_name=${encodeURIComponent(A)}&track_name=${encodeURIComponent(E)}`);if(H&&H.length>0){let Y=H[0],K=Y.syncedLyrics||Y.plainLyrics||"",J=i(K);if(J.length>0)return _("Successfully parsed LRCLIB","success"),{parsed:J,source:"LRCLIB"}}throw _("LRCLIB: No results.","warn"),Error("No LRCLIB match")},Z0=async()=>{_("Attempting NetEase...");let H=`https://lyrics.paxsenix.org/netease/search?q=${encodeURIComponent(A+" "+E)}`;try{let K=(await Spicetify.CosmosAsync.get(H,null,{"User-Agent":"Spicetify/1.0 (https://github.com/spicetify/spicetify-cli)"}))?.result?.songs?.[0]?.id;if(!K)throw _("NetEase: No search results.","warn"),Error("No NetEase match");_(`Found NetEase Match: ${K}. Fetching lyrics...`);let J=`https://music.cyrvoid.com/lyric?id=${K}`,G=await fetch(J).then((p)=>p.json()),Q=G?.lrc?.lyric||"",W=G?.yrc?.lyric||"";if(!Q&&!W)_("NetEase: No lyrics returned for this ID.","warn");let l=W?((p)=>{let s=[];return p.split(`
`).forEach((Q0)=>{let u=Q0.match(/\[(\d+),(\d+)\](.*)/);if(u){let e=parseInt(u[1]),k0=u[3],o=[],x0="",v0=/\((\d+),(\d+),\d+\)([^\(]*)/g,d;while((d=v0.exec(k0))!==null){let N0=parseInt(d[1]),z0=d[3];o.push({startTime:e+N0,word:z0}),x0+=z0}s.push({startTime:e,words:o.length>0?x0:k0,syllables:o.length>0?o:void 0})}}),s})(W):i(Q);if(l.length>0)return _("NetEase parsed successfully.","success"),{parsed:l,source:W?"NetEase Word-Sync":"NetEase"};throw _("NetEase: Parse failed.","error"),Error("NetEase parse failed")}catch(Y){throw _(`NetEase fetch failed: ${Y}`,"error"),Y}},$0=async()=>{_("Attempting Spotify Native...");let H=v.uri?.split(":")[2];if(!H)throw Error("No track ID");let Y;try{Y=await Spicetify.CosmosAsync.get(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${H}`),_(`Spotify Sync Type: ${Y?.lyrics?.syncType}`,Y?.lyrics?.lines?"info":"warn")}catch(K){throw _("Spotify Native API Failed.","warn"),Error("Spotify Color-Lyrics API Error")}if(Y&&Y.lyrics&&Y.lyrics.lines){let K=Y.lyrics.lines.map((J)=>{let G=J.syllables?J.syllables.map((Q)=>({startTime:parseInt(Q.startTimeMs||"0"),word:Q.word||Q.character||Q.text||""})):void 0;return{startTime:parseInt(J.startTimeMs||"0"),words:J.words||"",syllables:G&&G.length>0?G:void 0}});if(K.length>0)return{parsed:K,source:Y.lyrics.syncType==="SYLLABLE_SYNCED"?"Spotify Word-Sync":"Spotify"}}throw Error("No Spotify match")},g=!1,t=!1,y=(H)=>{if(g)return;if(H.source==="Apple Music TTML"||H.source==="Musixmatch Word-Sync"||H.source==="Spotify Word-Sync")g=!0;t=!0,X(H.parsed),w.current=H.parsed,D(`Signal Active (${H.source})`),_(`Applied source: ${H.source}`,"success")},K0=[$0().then(y).catch(()=>{}),q0().then(y).catch(()=>{}),J0().then(y).catch(()=>{}),Z0().then(y).catch(()=>{}),X0().then(y).catch(()=>{})];Promise.allSettled(K0).then(()=>{if(!t)_("No providers found any lyrics.","error"),D("Database record empty for this track."),X([]),w.current=[];O(!1)})};return z(()=>{let Z,v=()=>{let P=Spicetify.Player.getProgress(),N=w.current;if(N.length>0){let U=-1;for(let V=0;V<N.length;V++)if(P>=N[V].startTime)U=V;else break;if(U!==-1&&M.current){if(U!==$){B(U);let E=M.current.children[U];if(E){let A=M.current.parentElement?.clientHeight||0,L=E.offsetTop-A/2+E.clientHeight/2;h(-L)}}let V=M.current.children[U];if(V&&V.classList.contains("word-synced"))V.querySelectorAll(".vapor-syllable").forEach((A)=>{let L=parseInt(A.getAttribute("data-time")||"0");if(P>=L)A.classList.add("synced");else A.classList.remove("synced")})}}Z=requestAnimationFrame(v)};return Z=requestAnimationFrame(v),()=>cancelAnimationFrame(Z)},[$]),z(()=>{let Z=(N,U=!1)=>{let V=Spicetify.Player.data?.track?.uri||Spicetify.Player.track?.uri||"unknown";if(U||N||V!==a.current)a.current=V,B(-1),h(0),G0()},v="vapor-lyrics-styles";if(!document.getElementById("vapor-lyrics-styles")){let N=document.createElement("style");N.id="vapor-lyrics-styles",N.innerHTML=b0,document.head.appendChild(N)}Spicetify.Player.addEventListener("songchange",Z);let P=setInterval(()=>Z(null,!1),3000);return Z(null,!0),()=>{clearInterval(P),Spicetify.Player.removeEventListener("songchange",Z)}},[]),z(()=>{if(T.current&&!j.current)j.current=new S(T.current),j.current.start();return()=>{if(j.current)j.current.dispose(),j.current=null}},[]),z(()=>{if(j.current&&n)j.current.loadImage(n).catch((Z)=>console.log("Kawarp load error:",Z))},[n]),k.createElement("div",{id:"vapor-lyrics-app-container",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",zIndex:100}},[k.createElement("div",{className:"vapor-background",key:"bg"},[k.createElement("canvas",{key:"canvas",ref:T,style:{width:"100%",height:"100%",position:"absolute",top:0,left:0}})]),k.createElement("div",{className:"vapor-content",key:"content"},[k.createElement("header",{className:"vapor-header",key:"header"},[k.createElement("h1",{className:"vapor-title",key:"title"},"ＶＡＰＯＲ  ＬＹＲＩＣＳ")]),k.createElement("main",{className:"vapor-lyrics-container",key:"main"},[k.createElement("div",{className:"vapor-lyrics-scroll",key:"scroll",ref:M,style:{transform:`translate3d(0, ${_0}px, 0)`}},C?[k.createElement("p",{className:"vapor-lyric-line active",key:"l"},"Establishing aesthetic uplink...")]:q.length>0?q.map((Z,v)=>{let P=v<q.length-1?q[v+1].startTime-Z.startTime:3000,N="";if(v===$)N="active";else if($!==-1&&v<$)N="played";let U=Z.syllables&&Z.syllables.length>0;return k.createElement("p",{className:`vapor-lyric-line ${N} ${U?"word-synced":""}`,key:v,style:{"--line-duration":`${P}ms`}},U?Z.syllables.map((V,E)=>k.createElement("span",{className:"vapor-syllable",key:E,"data-time":V.startTime},V.word)):Z.words)}):[k.createElement("p",{className:"vapor-lyric-line",key:"i"},F==="Establishing signal..."?"Initializing signal...":F)])]),k.createElement("div",{className:"vapor-debug-status",key:"st",onClick:()=>r(!c)},[k.createElement("span",{key:"s"},F),k.createElement("span",{key:"h",style:{opacity:0.5,marginLeft:8}},"(Click for Debug)")]),c&&k.createElement("div",{className:"vapor-debug-overlay",key:"dbg",onClick:(Z)=>Z.stopPropagation()},[k.createElement("header",{key:"h"},[k.createElement("h2",{key:"t"},"Terminal Uplink"),k.createElement("div",{key:"btns",style:{display:"flex",gap:"8px"}},[k.createElement("button",{key:"cp",onClick:()=>{let Z=m.join(`
`);navigator.clipboard.writeText(Z),D("Logs Copied!"),setTimeout(()=>D(F),2000)},style:{fontSize:"10px",padding:"2px 6px"}},"COPY ALL"),k.createElement("button",{key:"b",onClick:()=>r(!1)},"✖")])]),k.createElement("div",{className:"debug-list",key:"l"},m.map((Z,v)=>k.createElement("div",{key:v,className:"debug-line"},Z)))])])])};(function k(){let{Playbar:z,Platform:x,ReactDOM:b,React:f,CosmosAsync:q}=Spicetify;if(!z||!x||!b||!f||!q){setTimeout(k,500);return}function X(){let $=document.querySelector(".main-view-container__scroll-node"),B=document.querySelector(".main-view-container__scroll-node-child")||document.querySelector("main");if(!B)return;if($)$.style.overflow="hidden";let C=document.getElementById("vapor-lyrics-mount-root");if(!C)C=document.createElement("div"),C.id="vapor-lyrics-mount-root",B.innerHTML="",B.appendChild(C);b.render(f.createElement(H0),C)}if(x.History.listen(({pathname:$})=>{if($.includes("vapor-lyrics"))setTimeout(X,100);else{let B=document.getElementById("vapor-lyrics-mount-root");if(B)B.remove();let C=document.querySelector(".main-view-container__scroll-node");if(C)C.style.overflow=""}}),x.History.location.pathname.includes("vapor-lyrics"))X();new z.Button("Vapor Lyrics",'<svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 1h-1v11h1V1zM5 1H4v11h1V1zM15 4h-1v5h1V4zM2 4H1v5h1V4zM9 0H7v14h2V0z"></path></svg>',()=>{if(x.History.location.pathname.includes("vapor-lyrics"))x.History.goBack();else x.History.push("/vapor-lyrics")},!1,!1)})();
