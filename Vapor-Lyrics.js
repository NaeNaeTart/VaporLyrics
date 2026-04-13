var x0=`:root {\r
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
  width: 400px;\r
  max-height: 300px;\r
  background: rgba(5, 5, 10, 0.95);\r
  border: 2px solid var(--vapor-pink);\r
  border-radius: 8px;\r
  z-index: 2001;\r
  display: flex;\r
  flex-direction: column;\r
  box-shadow: 0 0 20px rgba(255, 113, 206, 0.3);\r
  font-family: "Courier New", monospace;\r
  overflow: hidden;\r
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
`;class p{canvas;gl;halfFloatExt=null;halfFloatLinearExt=null;blurProgram;blendProgram;tintProgram;warpProgram;outputProgram;positionBuffer;texCoordBuffer;sourceTexture;blurFBO1;blurFBO2;currentAlbumFBO;nextAlbumFBO;warpFBO;animationId=null;lastFrameTime=0;accumulatedTime=0;isPlaying=!1;isTransitioning=!1;transitionStartTime=0;_transitionDuration;_warpIntensity;_blurPasses;_animationSpeed;_targetAnimationSpeed;_saturation;_tintColor;_tintIntensity;_dithering;_scale;hasImage=!1;attribs;uniforms;constructor(k,b={}){this.canvas=k;let x=k.getContext("webgl",{preserveDrawingBuffer:!0});if(!x)throw Error("WebGL not supported");this.gl=x,this.halfFloatExt=x.getExtension("OES_texture_half_float"),this.halfFloatLinearExt=x.getExtension("OES_texture_half_float_linear"),this._warpIntensity=b.warpIntensity??1,this._blurPasses=b.blurPasses??8,this._animationSpeed=b.animationSpeed??1,this._targetAnimationSpeed=this._animationSpeed,this._transitionDuration=b.transitionDuration??1000,this._saturation=b.saturation??1.5,this._tintColor=b.tintColor??[0.157,0.157,0.235],this._tintIntensity=b.tintIntensity??0.15,this._dithering=b.dithering??0.008,this._scale=b.scale??1,this.blurProgram=this.createProgram(`
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
`),this.attribs={position:x.getAttribLocation(this.blurProgram,"a_position"),texCoord:x.getAttribLocation(this.blurProgram,"a_texCoord")},this.uniforms={blur:{resolution:x.getUniformLocation(this.blurProgram,"u_resolution"),texture:x.getUniformLocation(this.blurProgram,"u_texture"),offset:x.getUniformLocation(this.blurProgram,"u_offset")},blend:{texture1:x.getUniformLocation(this.blendProgram,"u_texture1"),texture2:x.getUniformLocation(this.blendProgram,"u_texture2"),blend:x.getUniformLocation(this.blendProgram,"u_blend")},warp:{texture:x.getUniformLocation(this.warpProgram,"u_texture"),time:x.getUniformLocation(this.warpProgram,"u_time"),intensity:x.getUniformLocation(this.warpProgram,"u_intensity")},tint:{texture:x.getUniformLocation(this.tintProgram,"u_texture"),tintColor:x.getUniformLocation(this.tintProgram,"u_tintColor"),tintIntensity:x.getUniformLocation(this.tintProgram,"u_tintIntensity")},output:{texture:x.getUniformLocation(this.outputProgram,"u_texture"),saturation:x.getUniformLocation(this.outputProgram,"u_saturation"),dithering:x.getUniformLocation(this.outputProgram,"u_dithering"),time:x.getUniformLocation(this.outputProgram,"u_time"),scale:x.getUniformLocation(this.outputProgram,"u_scale"),resolution:x.getUniformLocation(this.outputProgram,"u_resolution")}},this.positionBuffer=this.createBuffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),this.texCoordBuffer=this.createBuffer(new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),this.sourceTexture=this.createTexture(),this.blurFBO1=this.createFramebuffer(128,128,!0),this.blurFBO2=this.createFramebuffer(128,128,!0),this.currentAlbumFBO=this.createFramebuffer(128,128,!0),this.nextAlbumFBO=this.createFramebuffer(128,128,!0),this.warpFBO=this.createFramebuffer(1,1,!0),this.resize()}get warpIntensity(){return this._warpIntensity}set warpIntensity(k){this._warpIntensity=Math.max(0,Math.min(1,k))}get blurPasses(){return this._blurPasses}set blurPasses(k){let b=Math.max(1,Math.min(40,Math.floor(k)));if(b!==this._blurPasses){if(this._blurPasses=b,this.hasImage)this.reblurCurrentImage()}}get animationSpeed(){return this._targetAnimationSpeed}set animationSpeed(k){this._targetAnimationSpeed=Math.max(0.1,Math.min(5,k))}get transitionDuration(){return this._transitionDuration}set transitionDuration(k){this._transitionDuration=Math.max(0,Math.min(5000,k))}get saturation(){return this._saturation}set saturation(k){this._saturation=Math.max(0,Math.min(3,k))}get tintColor(){return this._tintColor}set tintColor(k){let b=k.map((z)=>Math.max(0,Math.min(1,z)));if(b.some((z,f)=>z!==this._tintColor[f])){if(this._tintColor=b,this.hasImage)this.reblurCurrentImage()}}get tintIntensity(){return this._tintIntensity}set tintIntensity(k){let b=Math.max(0,Math.min(1,k));if(b!==this._tintIntensity){if(this._tintIntensity=b,this.hasImage)this.reblurCurrentImage()}}get dithering(){return this._dithering}set dithering(k){this._dithering=Math.max(0,Math.min(0.1,k))}get scale(){return this._scale}set scale(k){this._scale=Math.max(0.01,Math.min(4,k))}setOptions(k){if(k.warpIntensity!==void 0)this.warpIntensity=k.warpIntensity;if(k.blurPasses!==void 0)this.blurPasses=k.blurPasses;if(k.animationSpeed!==void 0)this.animationSpeed=k.animationSpeed;if(k.transitionDuration!==void 0)this.transitionDuration=k.transitionDuration;if(k.saturation!==void 0)this.saturation=k.saturation;if(k.tintColor!==void 0)this.tintColor=k.tintColor;if(k.tintIntensity!==void 0)this.tintIntensity=k.tintIntensity;if(k.dithering!==void 0)this.dithering=k.dithering;if(k.scale!==void 0)this.scale=k.scale}getOptions(){return{warpIntensity:this._warpIntensity,blurPasses:this._blurPasses,animationSpeed:this._targetAnimationSpeed,transitionDuration:this._transitionDuration,saturation:this._saturation,tintColor:this._tintColor,tintIntensity:this._tintIntensity,dithering:this._dithering,scale:this._scale}}loadImage(k){return new Promise((b,x)=>{let z=new Image;z.crossOrigin="anonymous",z.onload=()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,z),this.processNewImage(),b()},z.onerror=()=>x(Error(`Failed to load image: ${k}`)),z.src=k})}loadImageElement(k){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,k),this.processNewImage()}loadImageData(k,b,x){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,b,x,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,k instanceof Uint8ClampedArray?new Uint8Array(k.buffer):k),this.processNewImage()}loadFromImageData(k){this.loadImageData(k.data,k.width,k.height)}async loadBlob(k){let b=await createImageBitmap(k);this.loadImageElement(b),b.close()}loadBase64(k){let b=k.startsWith("data:")?k:`data:image/png;base64,${k}`;return this.loadImage(b)}async loadArrayBuffer(k,b="image/png"){let x=new Blob([k],{type:b});return this.loadBlob(x)}loadGradient(k,b=135){let z=document.createElement("canvas");z.width=512,z.height=512;let f=z.getContext("2d");if(!f)return;let G=b*Math.PI/180,q=256-Math.cos(G)*512,J=256-Math.sin(G)*512,W=256+Math.cos(G)*512,B=256+Math.sin(G)*512,n=f.createLinearGradient(q,J,W,B);k.forEach((o,U)=>{n.addColorStop(U/(k.length-1),o)}),f.fillStyle=n,f.fillRect(0,0,512,512),this.loadImageElement(z)}processNewImage(){[this.currentAlbumFBO,this.nextAlbumFBO]=[this.nextAlbumFBO,this.currentAlbumFBO],this.blurSourceInto(this.nextAlbumFBO),this.hasImage=!0,this.isTransitioning=!0,this.transitionStartTime=performance.now()}reblurCurrentImage(){this.blurSourceInto(this.nextAlbumFBO)}blurSourceInto(k){let b=this.gl;b.useProgram(this.tintProgram),this.setupAttributes(),b.bindFramebuffer(b.FRAMEBUFFER,this.blurFBO1.framebuffer),b.viewport(0,0,128,128),b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,this.sourceTexture),b.uniform1i(this.uniforms.tint.texture,0),b.uniform3fv(this.uniforms.tint.tintColor,this._tintColor),b.uniform1f(this.uniforms.tint.tintIntensity,this._tintIntensity),b.drawArrays(b.TRIANGLES,0,6),b.useProgram(this.blurProgram),this.setupAttributes(),b.uniform2f(this.uniforms.blur.resolution,128,128),b.uniform1i(this.uniforms.blur.texture,0);let x=this.blurFBO1,z=this.blurFBO2;for(let f=0;f<this._blurPasses;f++)b.bindFramebuffer(b.FRAMEBUFFER,z.framebuffer),b.viewport(0,0,128,128),b.bindTexture(b.TEXTURE_2D,x.texture),b.uniform1f(this.uniforms.blur.offset,f+0.5),b.drawArrays(b.TRIANGLES,0,6),[x,z]=[z,x];b.bindFramebuffer(b.FRAMEBUFFER,k.framebuffer),b.viewport(0,0,128,128),b.bindTexture(b.TEXTURE_2D,x.texture),b.uniform1f(this.uniforms.blur.offset,0),b.drawArrays(b.TRIANGLES,0,6)}resize(){let k=this.canvas.width,b=this.canvas.height;if(this.warpFBO)this.deleteFramebuffer(this.warpFBO);this.warpFBO=this.createFramebuffer(k,b,!0)}start(){if(this.isPlaying)return;this.isPlaying=!0,this.lastFrameTime=performance.now(),requestAnimationFrame(this.renderLoop)}stop(){if(this.isPlaying=!1,this.animationId!==null)cancelAnimationFrame(this.animationId),this.animationId=null}renderFrame(k){let b=performance.now();if(k!==void 0)this.render(k,b);else{let x=(b-this.lastFrameTime)/1000;this.lastFrameTime=b,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=x*this._animationSpeed,this.render(this.accumulatedTime,b)}}dispose(){this.stop();let k=this.gl;k.deleteProgram(this.blurProgram),k.deleteProgram(this.blendProgram),k.deleteProgram(this.tintProgram),k.deleteProgram(this.warpProgram),k.deleteProgram(this.outputProgram),k.deleteBuffer(this.positionBuffer),k.deleteBuffer(this.texCoordBuffer),k.deleteTexture(this.sourceTexture),this.deleteFramebuffer(this.blurFBO1),this.deleteFramebuffer(this.blurFBO2),this.deleteFramebuffer(this.currentAlbumFBO),this.deleteFramebuffer(this.nextAlbumFBO),this.deleteFramebuffer(this.warpFBO)}renderLoop=(k)=>{if(!this.isPlaying)return;let b=(k-this.lastFrameTime)/1000;this.lastFrameTime=k,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=b*this._animationSpeed,this.render(this.accumulatedTime,k),this.animationId=requestAnimationFrame(this.renderLoop)};render(k,b=performance.now()){let x=this.gl,z=this.canvas.width,f=this.canvas.height,G=1;if(this.isTransitioning){let J=b-this.transitionStartTime;if(G=Math.min(1,J/this._transitionDuration),G>=1)this.isTransitioning=!1}let q;if(this.isTransitioning&&G<1)x.useProgram(this.blendProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.blurFBO1.framebuffer),x.viewport(0,0,128,128),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,this.currentAlbumFBO.texture),x.uniform1i(this.uniforms.blend.texture1,0),x.activeTexture(x.TEXTURE1),x.bindTexture(x.TEXTURE_2D,this.nextAlbumFBO.texture),x.uniform1i(this.uniforms.blend.texture2,1),x.uniform1f(this.uniforms.blend.blend,G),x.drawArrays(x.TRIANGLES,0,6),q=this.blurFBO1.texture,x.useProgram(this.warpProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.warpFBO.framebuffer),x.viewport(0,0,z,f),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,q),x.uniform1i(this.uniforms.warp.texture,0),x.uniform1f(this.uniforms.warp.time,k),x.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),x.drawArrays(x.TRIANGLES,0,6),x.useProgram(this.outputProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,null),x.viewport(0,0,z,f),x.bindTexture(x.TEXTURE_2D,this.warpFBO.texture),x.uniform1i(this.uniforms.output.texture,0),x.uniform1f(this.uniforms.output.saturation,this._saturation),x.uniform1f(this.uniforms.output.dithering,this._dithering),x.uniform1f(this.uniforms.output.time,k),x.uniform1f(this.uniforms.output.scale,this._scale),x.uniform2f(this.uniforms.output.resolution,z,f),x.drawArrays(x.TRIANGLES,0,6);else x.useProgram(this.warpProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.warpFBO.framebuffer),x.viewport(0,0,z,f),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,this.nextAlbumFBO.texture),x.uniform1i(this.uniforms.warp.texture,0),x.uniform1f(this.uniforms.warp.time,k),x.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),x.drawArrays(x.TRIANGLES,0,6),x.useProgram(this.outputProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,null),x.viewport(0,0,z,f),x.bindTexture(x.TEXTURE_2D,this.warpFBO.texture),x.uniform1i(this.uniforms.output.texture,0),x.uniform1f(this.uniforms.output.saturation,this._saturation),x.uniform1f(this.uniforms.output.dithering,this._dithering),x.uniform1f(this.uniforms.output.time,k),x.uniform1f(this.uniforms.output.scale,this._scale),x.uniform2f(this.uniforms.output.resolution,z,f),x.drawArrays(x.TRIANGLES,0,6)}setupAttributes(){let k=this.gl;k.bindBuffer(k.ARRAY_BUFFER,this.positionBuffer),k.enableVertexAttribArray(this.attribs.position),k.vertexAttribPointer(this.attribs.position,2,k.FLOAT,!1,0,0),k.bindBuffer(k.ARRAY_BUFFER,this.texCoordBuffer),k.enableVertexAttribArray(this.attribs.texCoord),k.vertexAttribPointer(this.attribs.texCoord,2,k.FLOAT,!1,0,0)}createShader(k,b){let x=this.gl,z=x.createShader(k);if(!z)throw Error("Failed to create shader");if(x.shaderSource(z,b),x.compileShader(z),!x.getShaderParameter(z,x.COMPILE_STATUS)){let f=x.getShaderInfoLog(z);throw x.deleteShader(z),Error(`Shader compile error: ${f}`)}return z}createProgram(k,b){let x=this.gl,z=this.createShader(x.VERTEX_SHADER,k),f=this.createShader(x.FRAGMENT_SHADER,b),G=x.createProgram();if(!G)throw Error("Failed to create program");if(x.attachShader(G,z),x.attachShader(G,f),x.linkProgram(G),!x.getProgramParameter(G,x.LINK_STATUS)){let q=x.getProgramInfoLog(G);throw x.deleteProgram(G),Error(`Program link error: ${q}`)}return x.deleteShader(z),x.deleteShader(f),G}createBuffer(k){let b=this.gl,x=b.createBuffer();if(!x)throw Error("Failed to create buffer");return b.bindBuffer(b.ARRAY_BUFFER,x),b.bufferData(b.ARRAY_BUFFER,k,b.STATIC_DRAW),x}createTexture(){let k=this.gl,b=k.createTexture();if(!b)throw Error("Failed to create texture");return k.bindTexture(k.TEXTURE_2D,b),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_S,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_T,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MIN_FILTER,k.LINEAR),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MAG_FILTER,k.LINEAR),b}createFramebuffer(k,b,x=!1){let z=this.gl,f=this.createTexture(),q=x&&this.halfFloatExt&&this.halfFloatLinearExt?this.halfFloatExt.HALF_FLOAT_OES:z.UNSIGNED_BYTE;z.texImage2D(z.TEXTURE_2D,0,z.RGBA,k,b,0,z.RGBA,q,null);let J=z.createFramebuffer();if(!J)throw Error("Failed to create framebuffer");return z.bindFramebuffer(z.FRAMEBUFFER,J),z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,f,0),{framebuffer:J,texture:f}}deleteFramebuffer(k){this.gl.deleteFramebuffer(k.framebuffer),this.gl.deleteTexture(k.texture)}}var d=(k)=>{let b=k.split(`
`),x=[],z=/\[(\d+):(\d+(?:\.\d+)?)\]/;return b.forEach((f)=>{let G=f.match(z);if(G){let q=(parseInt(G[1])*60+parseFloat(G[2]))*1000,J=f.replace(z,"").trim();if(J.includes("<")){let W=[],B=J.split(/(<\d+:\d+(?:\.\d+)?>)/g).filter((U)=>U.length>0),n=q,o="";B.forEach((U)=>{let A=U.match(/<(\d+):(\d+(?:\.\d+)?)>/);if(A)n=(parseInt(A[1])*60+parseFloat(A[2]))*1000;else o+=U,W.push({startTime:n,word:U})}),x.push({startTime:q,words:o.trim(),syllables:W})}else if(J)x.push({startTime:q,words:J})}}),x},Y0=(k)=>{let b=[],x=/<p[^>]*begin="([^"]*)"[^>]*>(.*?)<\/p>/gs,z=(G)=>{if(!G)return 0;let q=G.split(":");if(q.length===3)return(parseInt(q[0])*3600+parseInt(q[1])*60+parseFloat(q[2]))*1000;if(q.length===2)return(parseInt(q[0])*60+parseFloat(q[1]))*1000;if(G.endsWith("s"))return parseFloat(G.replace("s",""))*1000;return parseFloat(G)*1000},f;while((f=x.exec(k))!==null){let G=z(f[1]),q=f[2],J=[],W="";if(q.includes("<span")||q.includes("<s")){let n=/<(?:s|span)[^>]*begin="([^"]*)"[^>]*>([^<]*)<\/(?:s|span)>/g,o;while((o=n.exec(q))!==null){let U=z(o[1]),A=o[2].replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/&quot;/g,'"');if(A.trim()||A===" ")J.push({startTime:U,word:A}),W+=A}}if(J.length===0)W=q.replace(/<[^>]*>/g,"").replace(/&apos;/g,"'").replace(/&quot;/g,'"');let B=W.replace(/<br\s*\/?>/gi," ").trim();if(B)b.push({startTime:G,words:B,syllables:J.length>0?J:void 0})}return b},W0=()=>{let k=Spicetify.React,{useEffect:b,useState:x,useRef:z}=k,f=x,[G,q]=f([]),[J,W]=f(-1),[B,n]=f(!1),[o,U]=f("Establishing signal..."),[A,b0]=f(""),[z0,i]=f(0),[f0,h]=f([]),[m,c]=f(!1),S=z([]),O=z(null),R=z(null),u=z(null),I=z(null),Z=(X,Q="info")=>{let K=`[${new Date().toLocaleTimeString().split(" ")[0]}] ${X}`;if(h((C)=>[K,...C].slice(0,50)),Q==="error")console.error(X);else if(Q==="warn")console.warn(X);else console.log(X)},_0=async()=>{let X=Spicetify.Player.data,Q=X?.track||X?.item||Spicetify.Player.track||{},P=Q?.metadata||{},K=P.title||P.name||Q.title||Q.name||"",C=P.artist_name||P.artist||Q.artist||"",Y=P.image_xlarge_url||P.image_large_url||P.image_url||"";if(Y.startsWith("spotify:image:"))Y=`https://i.scdn.co/image/${Y.split(":")[2]}`;if(b0(Y),!K||K.length<1)K=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackTitle")?.textContent||"",C=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-subtitles"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackArtists")?.textContent||"";if(!K||K.trim().length===0){U("Signal Lost: Searching Metadata..."),n(!1);return}let E=K.split("(")[0].split("-")[0].split(" feat.")[0].split(" ft.")[0].trim(),F=C.split(",")[0].split("&")[0].trim();n(!0);let j=`Syncing: ${F} - ${E}`;U(j),h([]),Z(`Starting Fetch for ${F} - ${E}`),Z(`Metadata: ${K} | ${C} | ${Q.uri}`);let G0=async()=>{Z("Resolving Apple Music mapping...");let N=Q.uri?.split(":")[2],$="";try{let v=`https://api.song.link/v1-alpha.1/links?url=spotify:track:${N}`,H=(await fetch(v).then((D)=>D.json()))?.linksByPlatform?.appleMusic;if(H)$=H.entityUniqueId.split("::")[1],Z(`Songlink found Apple Music ID: ${$}`,"success")}catch(v){Z("Songlink mapping failed, falling back to search.","warn")}if(!$){Z("Attempting Apple Music Search (Paxsenix)...");let v=`https://lyrics.paxsenix.org/apple-music/search?q=${encodeURIComponent(F+" "+E)}`,_;try{_=await fetch(v,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}}).then((D)=>D.json())}catch(D){_=await Spicetify.CosmosAsync.get(v,null,{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"})}let H=_?.results||_?.data||_?.items;if(Array.isArray(_)&&_.length>0)H=_;if(H&&H.length>0)$=H[0].id,Z(`Found AM Search Match: ${$} (${H[0].name})`,"success")}if($){let v=`https://lyrics.paxsenix.org/apple-music/lyrics?id=${$}&ttml=true`,_="";try{let D=await fetch(v,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}});if(!D.ok)throw Error("AM Fetch Error");_=await D.text();try{let V=JSON.parse(_);if(typeof V==="string")_=V;else if(V.ttml||V.lyrics)_=V.ttml||V.lyrics}catch(V){}}catch(D){let V=await Spicetify.CosmosAsync.get(v,null,{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"});_=typeof V==="string"?V:V.ttml||V.lyrics||JSON.stringify(V)}let H=Y0(_);if(H.length>0)return Z("Successfully parsed AM TTML","success"),{parsed:H,source:"Apple Music TTML"}}throw Z("Apple Music: No results or failed mapping.","warn"),Error("No Apple Music match")},q0=async()=>{Z("Attempting Musixmatch (Paxsenix)...");let N=`https://lyrics.paxsenix.org/musixmatch/lyrics?t=${encodeURIComponent(E)}&a=${encodeURIComponent(F)}&type=word`;try{let v=await fetch(N,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}});if(!v.ok)throw Error("MXM Fetch Error");text=await v.text();try{let _=JSON.parse(text);if(typeof _==="string")text=_;else if(_.lyrics)text=_.lyrics;else if(_.text)text=_.text}catch(_){}}catch(v){let _=await Spicetify.CosmosAsync.get(N,null,{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"});text=typeof _==="string"?_:_.lyrics||_.text||JSON.stringify(_)}let $=d(text);if($.length>0)return Z("Successfully parsed MXM Word-Sync","success"),{parsed:$,source:"Musixmatch Word-Sync"};throw Z("Musixmatch: No match found.","warn"),Error("No MXM word match")},J0=async()=>{Z("Attempting LRCLIB...");let N=await Spicetify.CosmosAsync.get(`https://lrclib.net/api/search?artist_name=${encodeURIComponent(F)}&track_name=${encodeURIComponent(E)}`);if(N&&N.length>0){let $=N[0],v=$.syncedLyrics||$.plainLyrics||"",_=d(v);if(_.length>0)return Z("Successfully parsed LRCLIB","success"),{parsed:_,source:"LRCLIB"}}throw Z("LRCLIB: No results.","warn"),Error("No LRCLIB match")},X0=async()=>{Z("Attempting NetEase...");let N=`https://lyrics.paxsenix.org/netease/search?q=${encodeURIComponent(F+" "+E)}`,v=(await fetch(N,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}}).then((L)=>L.json()))?.result?.songs?.[0]?.id;if(!v)throw Z("NetEase: No search results.","warn"),Error("No NetEase match");Z(`Found NetEase Match: ${v}. Fetching lyrics...`);let _=`https://music.cyrvoid.com/lyric?id=${v}`,H=await fetch(_).then((L)=>L.json()),D=H?.lrc?.lyric||"",V=H?.yrc?.lyric||"";if(!D&&!V)Z("NetEase: No lyrics returned for this ID.","warn");let g=V?((L)=>{let t=[];return L.split(`
`).forEach((K0)=>{let w=K0.match(/\[(\d+),(\d+)\](.*)/);if(w){let s=parseInt(w[1]),l=w[3],y=[],e="",Q0=/\((\d+),(\d+),\d+\)([^\(]*)/g,T;while((T=Q0.exec(l))!==null){let v0=parseInt(T[1]),k0=T[3];y.push({startTime:s+v0,word:k0}),e+=k0}t.push({startTime:s,words:y.length>0?e:l,syllables:y.length>0?y:void 0})}}),t})(V):d(D);if(g.length>0)return Z("NetEase parsed successfully.","success"),{parsed:g,source:V?"NetEase Word-Sync":"NetEase"};throw Z("NetEase: Parse failed.","error"),Error("NetEase parse failed")},Z0=async()=>{Z("Attempting Spotify Native...");let N=Q.uri?.split(":")[2];if(!N)throw Error("No track ID");let $;try{$=await Spicetify.CosmosAsync.get(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${N}`),Z(`Spotify Sync Type: ${$?.lyrics?.syncType}`,$?.lyrics?.lines?"info":"warn")}catch(v){throw Z("Spotify Native API Failed.","warn"),Error("Spotify Color-Lyrics API Error")}if($&&$.lyrics&&$.lyrics.lines){let v=$.lyrics.lines.map((_)=>{let H=_.syllables?_.syllables.map((D)=>({startTime:parseInt(D.startTimeMs||"0"),word:D.word||D.character||D.text||""})):void 0;return{startTime:parseInt(_.startTimeMs||"0"),words:_.words||"",syllables:H&&H.length>0?H:void 0}});if(v.length>0)return{parsed:v,source:$.lyrics.syncType==="SYLLABLE_SYNCED"?"Spotify Word-Sync":"Spotify"}}throw Error("No Spotify match")},r=!1,a=!1,M=(N)=>{if(r)return;if(N.source==="Apple Music TTML"||N.source==="Musixmatch Word-Sync"||N.source==="Spotify Word-Sync")r=!0;a=!0,q(N.parsed),S.current=N.parsed,U(`Signal Active (${N.source})`),Z(`Applied source: ${N.source}`,"success")},$0=[Z0().then(M).catch(()=>{}),G0().then(M).catch(()=>{}),q0().then(M).catch(()=>{}),X0().then(M).catch(()=>{}),J0().then(M).catch(()=>{})];Promise.allSettled($0).then(()=>{if(!a)Z("No providers found any lyrics.","error"),U("Database record empty for this track."),q([]),S.current=[];n(!1)})};return b(()=>{let X,Q=()=>{let P=Spicetify.Player.getProgress(),K=S.current;if(K.length>0){let C=-1;for(let Y=0;Y<K.length;Y++)if(P>=K[Y].startTime)C=Y;else break;if(C!==-1&&O.current){if(C!==J){W(C);let E=O.current.children[C];if(E){let F=O.current.parentElement?.clientHeight||0,j=E.offsetTop-F/2+E.clientHeight/2;i(-j)}}let Y=O.current.children[C];if(Y&&Y.classList.contains("word-synced"))Y.querySelectorAll(".vapor-syllable").forEach((F)=>{let j=parseInt(F.getAttribute("data-time")||"0");if(P>=j)F.classList.add("synced");else F.classList.remove("synced")})}}X=requestAnimationFrame(Q)};return X=requestAnimationFrame(Q),()=>cancelAnimationFrame(X)},[J]),b(()=>{let X=(K,C=!1)=>{let Y=Spicetify.Player.data?.track?.uri||Spicetify.Player.track?.uri||"unknown";if(C||K||Y!==R.current)R.current=Y,W(-1),i(0),_0()},Q="vapor-lyrics-styles";if(!document.getElementById("vapor-lyrics-styles")){let K=document.createElement("style");K.id="vapor-lyrics-styles",K.innerHTML=x0,document.head.appendChild(K)}Spicetify.Player.addEventListener("songchange",X);let P=setInterval(()=>X(null,!1),3000);return X(null,!0),()=>{clearInterval(P),Spicetify.Player.removeEventListener("songchange",X)}},[]),b(()=>{if(u.current&&!I.current)I.current=new p(u.current),I.current.start();return()=>{if(I.current)I.current.dispose(),I.current=null}},[]),b(()=>{if(I.current&&A)I.current.loadImage(A).catch((X)=>console.log("Kawarp load error:",X))},[A]),k.createElement("div",{id:"vapor-lyrics-app-container",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",zIndex:100}},[k.createElement("div",{className:"vapor-background",key:"bg"},[k.createElement("canvas",{key:"canvas",ref:u,style:{width:"100%",height:"100%",position:"absolute",top:0,left:0}})]),k.createElement("div",{className:"vapor-content",key:"content"},[k.createElement("header",{className:"vapor-header",key:"header"},[k.createElement("h1",{className:"vapor-title",key:"title"},"ＶＡＰＯＲ  ＬＹＲＩＣＳ")]),k.createElement("main",{className:"vapor-lyrics-container",key:"main"},[k.createElement("div",{className:"vapor-lyrics-scroll",key:"scroll",ref:O,style:{transform:`translate3d(0, ${z0}px, 0)`}},B?[k.createElement("p",{className:"vapor-lyric-line active",key:"l"},"Establishing aesthetic uplink...")]:G.length>0?G.map((X,Q)=>{let P=Q<G.length-1?G[Q+1].startTime-X.startTime:3000,K="";if(Q===J)K="active";else if(J!==-1&&Q<J)K="played";let C=X.syllables&&X.syllables.length>0;return k.createElement("p",{className:`vapor-lyric-line ${K} ${C?"word-synced":""}`,key:Q,style:{"--line-duration":`${P}ms`}},C?X.syllables.map((Y,E)=>k.createElement("span",{className:"vapor-syllable",key:E,"data-time":Y.startTime},Y.word)):X.words)}):[k.createElement("p",{className:"vapor-lyric-line",key:"i"},o==="Establishing signal..."?"Initializing signal...":o)])]),k.createElement("div",{className:"vapor-debug-status",key:"st",onClick:()=>c(!m)},[k.createElement("span",{key:"s"},o),k.createElement("span",{key:"h",style:{opacity:0.5,marginLeft:8}},"(Click for Debug)")]),m&&k.createElement("div",{className:"vapor-debug-overlay",key:"dbg",onClick:(X)=>X.stopPropagation()},[k.createElement("header",{key:"h"},[k.createElement("h2",{key:"t"},"Terminal Uplink"),k.createElement("button",{key:"b",onClick:()=>c(!1)},"✖")]),k.createElement("div",{className:"debug-list",key:"l"},f0.map((X,Q)=>k.createElement("div",{key:Q,className:"debug-line"},X)))])])])};(function k(){let{Playbar:b,Platform:x,ReactDOM:z,React:f,CosmosAsync:G}=Spicetify;if(!b||!x||!z||!f||!G){setTimeout(k,500);return}function q(){let J=document.querySelector(".main-view-container__scroll-node"),W=document.querySelector(".main-view-container__scroll-node-child")||document.querySelector("main");if(!W)return;if(J)J.style.overflow="hidden";let B=document.getElementById("vapor-lyrics-mount-root");if(!B)B=document.createElement("div"),B.id="vapor-lyrics-mount-root",W.innerHTML="",W.appendChild(B);z.render(f.createElement(W0),B)}if(x.History.listen(({pathname:J})=>{if(J.includes("vapor-lyrics"))setTimeout(q,100);else{let W=document.getElementById("vapor-lyrics-mount-root");if(W)W.remove();let B=document.querySelector(".main-view-container__scroll-node");if(B)B.style.overflow=""}}),x.History.location.pathname.includes("vapor-lyrics"))q();new b.Button("Vapor Lyrics",'<svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 1h-1v11h1V1zM5 1H4v11h1V1zM15 4h-1v5h1V4zM2 4H1v5h1V4zM9 0H7v14h2V0z"></path></svg>',()=>{if(x.History.location.pathname.includes("vapor-lyrics"))x.History.goBack();else x.History.push("/vapor-lyrics")},!1,!1)})();
