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
`;class i{canvas;gl;halfFloatExt=null;halfFloatLinearExt=null;blurProgram;blendProgram;tintProgram;warpProgram;outputProgram;positionBuffer;texCoordBuffer;sourceTexture;blurFBO1;blurFBO2;currentAlbumFBO;nextAlbumFBO;warpFBO;animationId=null;lastFrameTime=0;accumulatedTime=0;isPlaying=!1;isTransitioning=!1;transitionStartTime=0;_transitionDuration;_warpIntensity;_blurPasses;_animationSpeed;_targetAnimationSpeed;_saturation;_tintColor;_tintIntensity;_dithering;_scale;hasImage=!1;attribs;uniforms;constructor(k,b={}){this.canvas=k;let x=k.getContext("webgl",{preserveDrawingBuffer:!0});if(!x)throw Error("WebGL not supported");this.gl=x,this.halfFloatExt=x.getExtension("OES_texture_half_float"),this.halfFloatLinearExt=x.getExtension("OES_texture_half_float_linear"),this._warpIntensity=b.warpIntensity??1,this._blurPasses=b.blurPasses??8,this._animationSpeed=b.animationSpeed??1,this._targetAnimationSpeed=this._animationSpeed,this._transitionDuration=b.transitionDuration??1000,this._saturation=b.saturation??1.5,this._tintColor=b.tintColor??[0.157,0.157,0.235],this._tintIntensity=b.tintIntensity??0.15,this._dithering=b.dithering??0.008,this._scale=b.scale??1,this.blurProgram=this.createProgram(`
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
`),this.attribs={position:x.getAttribLocation(this.blurProgram,"a_position"),texCoord:x.getAttribLocation(this.blurProgram,"a_texCoord")},this.uniforms={blur:{resolution:x.getUniformLocation(this.blurProgram,"u_resolution"),texture:x.getUniformLocation(this.blurProgram,"u_texture"),offset:x.getUniformLocation(this.blurProgram,"u_offset")},blend:{texture1:x.getUniformLocation(this.blendProgram,"u_texture1"),texture2:x.getUniformLocation(this.blendProgram,"u_texture2"),blend:x.getUniformLocation(this.blendProgram,"u_blend")},warp:{texture:x.getUniformLocation(this.warpProgram,"u_texture"),time:x.getUniformLocation(this.warpProgram,"u_time"),intensity:x.getUniformLocation(this.warpProgram,"u_intensity")},tint:{texture:x.getUniformLocation(this.tintProgram,"u_texture"),tintColor:x.getUniformLocation(this.tintProgram,"u_tintColor"),tintIntensity:x.getUniformLocation(this.tintProgram,"u_tintIntensity")},output:{texture:x.getUniformLocation(this.outputProgram,"u_texture"),saturation:x.getUniformLocation(this.outputProgram,"u_saturation"),dithering:x.getUniformLocation(this.outputProgram,"u_dithering"),time:x.getUniformLocation(this.outputProgram,"u_time"),scale:x.getUniformLocation(this.outputProgram,"u_scale"),resolution:x.getUniformLocation(this.outputProgram,"u_resolution")}},this.positionBuffer=this.createBuffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),this.texCoordBuffer=this.createBuffer(new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),this.sourceTexture=this.createTexture(),this.blurFBO1=this.createFramebuffer(128,128,!0),this.blurFBO2=this.createFramebuffer(128,128,!0),this.currentAlbumFBO=this.createFramebuffer(128,128,!0),this.nextAlbumFBO=this.createFramebuffer(128,128,!0),this.warpFBO=this.createFramebuffer(1,1,!0),this.resize()}get warpIntensity(){return this._warpIntensity}set warpIntensity(k){this._warpIntensity=Math.max(0,Math.min(1,k))}get blurPasses(){return this._blurPasses}set blurPasses(k){let b=Math.max(1,Math.min(40,Math.floor(k)));if(b!==this._blurPasses){if(this._blurPasses=b,this.hasImage)this.reblurCurrentImage()}}get animationSpeed(){return this._targetAnimationSpeed}set animationSpeed(k){this._targetAnimationSpeed=Math.max(0.1,Math.min(5,k))}get transitionDuration(){return this._transitionDuration}set transitionDuration(k){this._transitionDuration=Math.max(0,Math.min(5000,k))}get saturation(){return this._saturation}set saturation(k){this._saturation=Math.max(0,Math.min(3,k))}get tintColor(){return this._tintColor}set tintColor(k){let b=k.map((z)=>Math.max(0,Math.min(1,z)));if(b.some((z,f)=>z!==this._tintColor[f])){if(this._tintColor=b,this.hasImage)this.reblurCurrentImage()}}get tintIntensity(){return this._tintIntensity}set tintIntensity(k){let b=Math.max(0,Math.min(1,k));if(b!==this._tintIntensity){if(this._tintIntensity=b,this.hasImage)this.reblurCurrentImage()}}get dithering(){return this._dithering}set dithering(k){this._dithering=Math.max(0,Math.min(0.1,k))}get scale(){return this._scale}set scale(k){this._scale=Math.max(0.01,Math.min(4,k))}setOptions(k){if(k.warpIntensity!==void 0)this.warpIntensity=k.warpIntensity;if(k.blurPasses!==void 0)this.blurPasses=k.blurPasses;if(k.animationSpeed!==void 0)this.animationSpeed=k.animationSpeed;if(k.transitionDuration!==void 0)this.transitionDuration=k.transitionDuration;if(k.saturation!==void 0)this.saturation=k.saturation;if(k.tintColor!==void 0)this.tintColor=k.tintColor;if(k.tintIntensity!==void 0)this.tintIntensity=k.tintIntensity;if(k.dithering!==void 0)this.dithering=k.dithering;if(k.scale!==void 0)this.scale=k.scale}getOptions(){return{warpIntensity:this._warpIntensity,blurPasses:this._blurPasses,animationSpeed:this._targetAnimationSpeed,transitionDuration:this._transitionDuration,saturation:this._saturation,tintColor:this._tintColor,tintIntensity:this._tintIntensity,dithering:this._dithering,scale:this._scale}}loadImage(k){return new Promise((b,x)=>{let z=new Image;z.crossOrigin="anonymous",z.onload=()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,z),this.processNewImage(),b()},z.onerror=()=>x(Error(`Failed to load image: ${k}`)),z.src=k})}loadImageElement(k){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,k),this.processNewImage()}loadImageData(k,b,x){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,b,x,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,k instanceof Uint8ClampedArray?new Uint8Array(k.buffer):k),this.processNewImage()}loadFromImageData(k){this.loadImageData(k.data,k.width,k.height)}async loadBlob(k){let b=await createImageBitmap(k);this.loadImageElement(b),b.close()}loadBase64(k){let b=k.startsWith("data:")?k:`data:image/png;base64,${k}`;return this.loadImage(b)}async loadArrayBuffer(k,b="image/png"){let x=new Blob([k],{type:b});return this.loadBlob(x)}loadGradient(k,b=135){let z=document.createElement("canvas");z.width=512,z.height=512;let f=z.getContext("2d");if(!f)return;let _=b*Math.PI/180,q=256-Math.cos(_)*512,X=256-Math.sin(_)*512,W=256+Math.cos(_)*512,H=256+Math.sin(_)*512,I=f.createLinearGradient(q,X,W,H);k.forEach((D,o)=>{I.addColorStop(o/(k.length-1),D)}),f.fillStyle=I,f.fillRect(0,0,512,512),this.loadImageElement(z)}processNewImage(){[this.currentAlbumFBO,this.nextAlbumFBO]=[this.nextAlbumFBO,this.currentAlbumFBO],this.blurSourceInto(this.nextAlbumFBO),this.hasImage=!0,this.isTransitioning=!0,this.transitionStartTime=performance.now()}reblurCurrentImage(){this.blurSourceInto(this.nextAlbumFBO)}blurSourceInto(k){let b=this.gl;b.useProgram(this.tintProgram),this.setupAttributes(),b.bindFramebuffer(b.FRAMEBUFFER,this.blurFBO1.framebuffer),b.viewport(0,0,128,128),b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,this.sourceTexture),b.uniform1i(this.uniforms.tint.texture,0),b.uniform3fv(this.uniforms.tint.tintColor,this._tintColor),b.uniform1f(this.uniforms.tint.tintIntensity,this._tintIntensity),b.drawArrays(b.TRIANGLES,0,6),b.useProgram(this.blurProgram),this.setupAttributes(),b.uniform2f(this.uniforms.blur.resolution,128,128),b.uniform1i(this.uniforms.blur.texture,0);let x=this.blurFBO1,z=this.blurFBO2;for(let f=0;f<this._blurPasses;f++)b.bindFramebuffer(b.FRAMEBUFFER,z.framebuffer),b.viewport(0,0,128,128),b.bindTexture(b.TEXTURE_2D,x.texture),b.uniform1f(this.uniforms.blur.offset,f+0.5),b.drawArrays(b.TRIANGLES,0,6),[x,z]=[z,x];b.bindFramebuffer(b.FRAMEBUFFER,k.framebuffer),b.viewport(0,0,128,128),b.bindTexture(b.TEXTURE_2D,x.texture),b.uniform1f(this.uniforms.blur.offset,0),b.drawArrays(b.TRIANGLES,0,6)}resize(){let k=this.canvas.width,b=this.canvas.height;if(this.warpFBO)this.deleteFramebuffer(this.warpFBO);this.warpFBO=this.createFramebuffer(k,b,!0)}start(){if(this.isPlaying)return;this.isPlaying=!0,this.lastFrameTime=performance.now(),requestAnimationFrame(this.renderLoop)}stop(){if(this.isPlaying=!1,this.animationId!==null)cancelAnimationFrame(this.animationId),this.animationId=null}renderFrame(k){let b=performance.now();if(k!==void 0)this.render(k,b);else{let x=(b-this.lastFrameTime)/1000;this.lastFrameTime=b,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=x*this._animationSpeed,this.render(this.accumulatedTime,b)}}dispose(){this.stop();let k=this.gl;k.deleteProgram(this.blurProgram),k.deleteProgram(this.blendProgram),k.deleteProgram(this.tintProgram),k.deleteProgram(this.warpProgram),k.deleteProgram(this.outputProgram),k.deleteBuffer(this.positionBuffer),k.deleteBuffer(this.texCoordBuffer),k.deleteTexture(this.sourceTexture),this.deleteFramebuffer(this.blurFBO1),this.deleteFramebuffer(this.blurFBO2),this.deleteFramebuffer(this.currentAlbumFBO),this.deleteFramebuffer(this.nextAlbumFBO),this.deleteFramebuffer(this.warpFBO)}renderLoop=(k)=>{if(!this.isPlaying)return;let b=(k-this.lastFrameTime)/1000;this.lastFrameTime=k,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*0.05,this.accumulatedTime+=b*this._animationSpeed,this.render(this.accumulatedTime,k),this.animationId=requestAnimationFrame(this.renderLoop)};render(k,b=performance.now()){let x=this.gl,z=this.canvas.width,f=this.canvas.height,_=1;if(this.isTransitioning){let X=b-this.transitionStartTime;if(_=Math.min(1,X/this._transitionDuration),_>=1)this.isTransitioning=!1}let q;if(this.isTransitioning&&_<1)x.useProgram(this.blendProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.blurFBO1.framebuffer),x.viewport(0,0,128,128),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,this.currentAlbumFBO.texture),x.uniform1i(this.uniforms.blend.texture1,0),x.activeTexture(x.TEXTURE1),x.bindTexture(x.TEXTURE_2D,this.nextAlbumFBO.texture),x.uniform1i(this.uniforms.blend.texture2,1),x.uniform1f(this.uniforms.blend.blend,_),x.drawArrays(x.TRIANGLES,0,6),q=this.blurFBO1.texture,x.useProgram(this.warpProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.warpFBO.framebuffer),x.viewport(0,0,z,f),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,q),x.uniform1i(this.uniforms.warp.texture,0),x.uniform1f(this.uniforms.warp.time,k),x.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),x.drawArrays(x.TRIANGLES,0,6),x.useProgram(this.outputProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,null),x.viewport(0,0,z,f),x.bindTexture(x.TEXTURE_2D,this.warpFBO.texture),x.uniform1i(this.uniforms.output.texture,0),x.uniform1f(this.uniforms.output.saturation,this._saturation),x.uniform1f(this.uniforms.output.dithering,this._dithering),x.uniform1f(this.uniforms.output.time,k),x.uniform1f(this.uniforms.output.scale,this._scale),x.uniform2f(this.uniforms.output.resolution,z,f),x.drawArrays(x.TRIANGLES,0,6);else x.useProgram(this.warpProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,this.warpFBO.framebuffer),x.viewport(0,0,z,f),x.activeTexture(x.TEXTURE0),x.bindTexture(x.TEXTURE_2D,this.nextAlbumFBO.texture),x.uniform1i(this.uniforms.warp.texture,0),x.uniform1f(this.uniforms.warp.time,k),x.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),x.drawArrays(x.TRIANGLES,0,6),x.useProgram(this.outputProgram),this.setupAttributes(),x.bindFramebuffer(x.FRAMEBUFFER,null),x.viewport(0,0,z,f),x.bindTexture(x.TEXTURE_2D,this.warpFBO.texture),x.uniform1i(this.uniforms.output.texture,0),x.uniform1f(this.uniforms.output.saturation,this._saturation),x.uniform1f(this.uniforms.output.dithering,this._dithering),x.uniform1f(this.uniforms.output.time,k),x.uniform1f(this.uniforms.output.scale,this._scale),x.uniform2f(this.uniforms.output.resolution,z,f),x.drawArrays(x.TRIANGLES,0,6)}setupAttributes(){let k=this.gl;k.bindBuffer(k.ARRAY_BUFFER,this.positionBuffer),k.enableVertexAttribArray(this.attribs.position),k.vertexAttribPointer(this.attribs.position,2,k.FLOAT,!1,0,0),k.bindBuffer(k.ARRAY_BUFFER,this.texCoordBuffer),k.enableVertexAttribArray(this.attribs.texCoord),k.vertexAttribPointer(this.attribs.texCoord,2,k.FLOAT,!1,0,0)}createShader(k,b){let x=this.gl,z=x.createShader(k);if(!z)throw Error("Failed to create shader");if(x.shaderSource(z,b),x.compileShader(z),!x.getShaderParameter(z,x.COMPILE_STATUS)){let f=x.getShaderInfoLog(z);throw x.deleteShader(z),Error(`Shader compile error: ${f}`)}return z}createProgram(k,b){let x=this.gl,z=this.createShader(x.VERTEX_SHADER,k),f=this.createShader(x.FRAGMENT_SHADER,b),_=x.createProgram();if(!_)throw Error("Failed to create program");if(x.attachShader(_,z),x.attachShader(_,f),x.linkProgram(_),!x.getProgramParameter(_,x.LINK_STATUS)){let q=x.getProgramInfoLog(_);throw x.deleteProgram(_),Error(`Program link error: ${q}`)}return x.deleteShader(z),x.deleteShader(f),_}createBuffer(k){let b=this.gl,x=b.createBuffer();if(!x)throw Error("Failed to create buffer");return b.bindBuffer(b.ARRAY_BUFFER,x),b.bufferData(b.ARRAY_BUFFER,k,b.STATIC_DRAW),x}createTexture(){let k=this.gl,b=k.createTexture();if(!b)throw Error("Failed to create texture");return k.bindTexture(k.TEXTURE_2D,b),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_S,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_T,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MIN_FILTER,k.LINEAR),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MAG_FILTER,k.LINEAR),b}createFramebuffer(k,b,x=!1){let z=this.gl,f=this.createTexture(),q=x&&this.halfFloatExt&&this.halfFloatLinearExt?this.halfFloatExt.HALF_FLOAT_OES:z.UNSIGNED_BYTE;z.texImage2D(z.TEXTURE_2D,0,z.RGBA,k,b,0,z.RGBA,q,null);let X=z.createFramebuffer();if(!X)throw Error("Failed to create framebuffer");return z.bindFramebuffer(z.FRAMEBUFFER,X),z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,f,0),{framebuffer:X,texture:f}}deleteFramebuffer(k){this.gl.deleteFramebuffer(k.framebuffer),this.gl.deleteTexture(k.texture)}}var h=(k)=>{let b=k.split(`
`),x=[],z=/\[(\d+):(\d+(?:\.\d+)?)\]/;return b.forEach((f)=>{let _=f.match(z);if(_){let q=(parseInt(_[1])*60+parseFloat(_[2]))*1000,X=f.replace(z,"").trim();if(X.includes("<")){let W=[],H=X.split(/(<\d+:\d+(?:\.\d+)?>)/g).filter((o)=>o.length>0),I=q,D="";H.forEach((o)=>{let P=o.match(/<(\d+):(\d+(?:\.\d+)?)>/);if(P)I=(parseInt(P[1])*60+parseFloat(P[2]))*1000;else D+=o,W.push({startTime:I,word:o})}),x.push({startTime:q,words:D.trim(),syllables:W})}else if(X)x.push({startTime:q,words:X})}}),x},W0=(k)=>{let b=[],x=/<p[^>]*begin="([^"]*)"[^>]*>(.*?)<\/p>/gs,z=(_)=>{if(!_)return 0;let q=_.split(":");if(q.length===3)return(parseInt(q[0])*3600+parseInt(q[1])*60+parseFloat(q[2]))*1000;if(q.length===2)return(parseInt(q[0])*60+parseFloat(q[1]))*1000;if(_.endsWith("s"))return parseFloat(_.replace("s",""))*1000;return parseFloat(_)*1000},f;while((f=x.exec(k))!==null){let _=z(f[1]),q=f[2],X=[],W="";if(q.includes("<span")||q.includes("<s")){let I=/<(?:s|span)[^>]*begin="([^"]*)"[^>]*>([^<]*)<\/(?:s|span)>/g,D;while((D=I.exec(q))!==null){let o=z(D[1]),P=D[2].replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/&quot;/g,'"');if(P.trim()||P===" ")X.push({startTime:o,word:P}),W+=P}}if(X.length===0)W=q.replace(/<[^>]*>/g,"").replace(/&apos;/g,"'").replace(/&quot;/g,'"');let H=W.replace(/<br\s*\/?>/gi," ").trim();if(H)b.push({startTime:_,words:H,syllables:X.length>0?X:void 0})}return b},H0=()=>{let k=Spicetify.React,{useEffect:b,useState:x,useRef:z}=k,f=x,[_,q]=f([]),[X,W]=f(-1),[H,I]=f(!1),[D,o]=f("Establishing signal..."),[P,z0]=f(""),[f0,m]=f(0),[_0,c]=f([]),[R,r]=f(!1),p=z([]),j=z(null),a=z(null),u=z(null),F=z(null),$=(Z,v="info")=>{let K=`[${new Date().toLocaleTimeString().split(" ")[0]}] ${Z}`;if(c((V)=>[K,...V].slice(0,50)),v==="error")console.error(Z);else if(v==="warn")console.warn(Z);else console.log(Z)},G0=async()=>{let Z=Spicetify.Player.data,v=Z?.track||Z?.item||Spicetify.Player.track||{},C=v?.metadata||{},K=C.title||C.name||v.title||v.name||"",V=C.artist_name||C.artist||v.artist||"",Y=C.image_xlarge_url||C.image_large_url||C.image_url||"";if(Y.startsWith("spotify:image:"))Y=`https://i.scdn.co/image/${Y.split(":")[2]}`;if(z0(Y),!K||K.length<1)K=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackTitle")?.textContent||"",V=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-subtitles"]')?.textContent||document.querySelector(".main-nowPlayingWidget-trackArtists")?.textContent||"";if(!K||K.trim().length===0){o("Signal Lost: Searching Metadata..."),I(!1);return}let U=K.split("(")[0].split("-")[0].split(" feat.")[0].split(" ft.")[0].trim(),n=V.split(",")[0].split("&")[0].trim();I(!0);let M=`Syncing: ${n} - ${U}`;o(M),c([]),$(`Starting Fetch for ${n} - ${U}`),$(`Metadata: ${K} | ${V} | ${v.uri}`);let q0=async()=>{$("Attempting Apple Music (Paxsenix)...");let Q=`https://lyrics.paxsenix.org/apple-music/search?q=${encodeURIComponent(n+" "+U)}`,J;try{J=await fetch(Q,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}}).then((G)=>G.json())}catch(G){J=await Spicetify.CosmosAsync.get(Q,null,{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"})}let N=J?.results||J?.data||J?.items;if(Array.isArray(J)&&J.length>0)N=J;else if(!N&&typeof J==="object")Object.keys(J).forEach((G)=>{if(Array.isArray(J[G]))N=J[G]});if(N&&N.length>0){let G=N[0].id;$(`Found AM Match: ${G} (${N[0].name})`,"success");let A=`https://lyrics.paxsenix.org/apple-music/lyrics?id=${G}&ttml=true`,E="";try{let d=await fetch(A,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}});if(!d.ok)throw Error("AM Fetch Error");E=await d.text();try{let B=JSON.parse(E);if(typeof B==="string")E=B;else if(B.ttml||B.lyrics)E=B.ttml||B.lyrics}catch(B){}}catch(d){let B=await Spicetify.CosmosAsync.get(A,null,{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"});E=typeof B==="string"?B:B.ttml||B.lyrics||JSON.stringify(B)}let O=W0(E);if(O.length>0)return $("Successfully parsed AM TTML","success"),{parsed:O,source:"Apple Music TTML"}}throw $("Apple Music: No results or failed search.","warn"),Error("No Apple Music match")},J0=async()=>{$("Attempting Musixmatch (Paxsenix)...");let Q=`https://lyrics.paxsenix.org/musixmatch/lyrics?t=${encodeURIComponent(U)}&a=${encodeURIComponent(n)}&type=word`;try{let N=await fetch(Q,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}});if(!N.ok)throw Error("MXM Fetch Error");text=await N.text();try{let G=JSON.parse(text);if(typeof G==="string")text=G;else if(G.lyrics)text=G.lyrics;else if(G.text)text=G.text}catch(G){}}catch(N){let G=await Spicetify.CosmosAsync.get(Q,null,{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"});text=typeof G==="string"?G:G.lyrics||G.text||JSON.stringify(G)}let J=h(text);if(J.length>0)return $("Successfully parsed MXM Word-Sync","success"),{parsed:J,source:"Musixmatch Word-Sync"};throw $("Musixmatch: No match found.","warn"),Error("No MXM word match")},X0=async()=>{$("Attempting LRCLIB...");let Q=await Spicetify.CosmosAsync.get(`https://lrclib.net/api/search?artist_name=${encodeURIComponent(n)}&track_name=${encodeURIComponent(U)}`);if(Q&&Q.length>0){let J=Q[0],N=J.syncedLyrics||J.plainLyrics||"",G=h(N);if(G.length>0)return $("Successfully parsed LRCLIB","success"),{parsed:G,source:"LRCLIB"}}throw $("LRCLIB: No results.","warn"),Error("No LRCLIB match")},Z0=async()=>{$("Attempting NetEase...");let Q=`https://lyrics.paxsenix.org/netease/search?q=${encodeURIComponent(n+" "+U)}`,N=(await fetch(Q,{headers:{"User-Agent":"Lyrically/1.0 (https://github.com/NaeNaeTart/VaporLyrics)"}}).then((L)=>L.json()))?.result?.songs?.[0]?.id;if(!N)throw $("NetEase: No search results.","warn"),Error("No NetEase match");$(`Found NetEase Match: ${N}. Fetching lyrics...`);let G=`https://music.cyrvoid.com/lyric?id=${N}`,A=await fetch(G).then((L)=>L.json()),E=A?.lrc?.lyric||"",O=A?.yrc?.lyric||"";if(!E&&!O)$("NetEase: No lyrics returned for this ID.","warn");let B=O?((L)=>{let s=[];return L.split(`
`).forEach((Q0)=>{let w=Q0.match(/\[(\d+),(\d+)\](.*)/);if(w){let l=parseInt(w[1]),e=w[3],S=[],k0="",v0=/\((\d+),(\d+),\d+\)([^\(]*)/g,T;while((T=v0.exec(e))!==null){let N0=parseInt(T[1]),x0=T[3];S.push({startTime:l+N0,word:x0}),k0+=x0}s.push({startTime:l,words:S.length>0?k0:e,syllables:S.length>0?S:void 0})}}),s})(O):h(E);if(B.length>0)return $("NetEase parsed successfully.","success"),{parsed:B,source:O?"NetEase Word-Sync":"NetEase"};throw $("NetEase: Parse failed.","error"),Error("NetEase parse failed")},$0=async()=>{$("Attempting Spotify Native...");let Q=v.uri?.split(":")[2];if(!Q)throw Error("No track ID");let J;try{J=await Spicetify.CosmosAsync.get(`https://spclient.wg.spotify.com/color-lyrics/v2/track/${Q}`),$(`Spotify Sync Type: ${J?.lyrics?.syncType}`,J?.lyrics?.lines?"info":"warn")}catch(N){throw $("Spotify Native API Failed.","warn"),Error("Spotify Color-Lyrics API Error")}if(J&&J.lyrics&&J.lyrics.lines){let N=J.lyrics.lines.map((G)=>{let A=G.syllables?G.syllables.map((E)=>({startTime:parseInt(E.startTimeMs||"0"),word:E.word||E.character||E.text||""})):void 0;return{startTime:parseInt(G.startTimeMs||"0"),words:G.words||"",syllables:A&&A.length>0?A:void 0}});if(N.length>0)return{parsed:N,source:J.lyrics.syncType==="SYLLABLE_SYNCED"?"Spotify Word-Sync":"Spotify"}}throw Error("No Spotify match")},g=!1,t=!1,y=(Q)=>{if(g)return;if(Q.source==="Apple Music TTML"||Q.source==="Musixmatch Word-Sync"||Q.source==="Spotify Word-Sync")g=!0;t=!0,q(Q.parsed),p.current=Q.parsed,o(`Signal Active (${Q.source})`),$(`Applied source: ${Q.source}`,"success")},K0=[$0().then(y).catch(()=>{}),q0().then(y).catch(()=>{}),J0().then(y).catch(()=>{}),Z0().then(y).catch(()=>{}),X0().then(y).catch(()=>{})];Promise.allSettled(K0).then(()=>{if(!t)$("No providers found any lyrics.","error"),o("Database record empty for this track."),q([]),p.current=[];I(!1)})};return b(()=>{let Z,v=()=>{let C=Spicetify.Player.getProgress(),K=p.current;if(K.length>0){let V=-1;for(let Y=0;Y<K.length;Y++)if(C>=K[Y].startTime)V=Y;else break;if(V!==-1&&j.current){if(V!==X){W(V);let U=j.current.children[V];if(U){let n=j.current.parentElement?.clientHeight||0,M=U.offsetTop-n/2+U.clientHeight/2;m(-M)}}let Y=j.current.children[V];if(Y&&Y.classList.contains("word-synced"))Y.querySelectorAll(".vapor-syllable").forEach((n)=>{let M=parseInt(n.getAttribute("data-time")||"0");if(C>=M)n.classList.add("synced");else n.classList.remove("synced")})}}Z=requestAnimationFrame(v)};return Z=requestAnimationFrame(v),()=>cancelAnimationFrame(Z)},[X]),b(()=>{let Z=(K,V=!1)=>{let Y=Spicetify.Player.data?.track?.uri||Spicetify.Player.track?.uri||"unknown";if(V||K||Y!==a.current)a.current=Y,W(-1),m(0),G0()},v="vapor-lyrics-styles";if(!document.getElementById("vapor-lyrics-styles")){let K=document.createElement("style");K.id="vapor-lyrics-styles",K.innerHTML=b0,document.head.appendChild(K)}Spicetify.Player.addEventListener("songchange",Z);let C=setInterval(()=>Z(null,!1),3000);return Z(null,!0),()=>{clearInterval(C),Spicetify.Player.removeEventListener("songchange",Z)}},[]),b(()=>{if(u.current&&!F.current)F.current=new i(u.current),F.current.start();return()=>{if(F.current)F.current.dispose(),F.current=null}},[]),b(()=>{if(F.current&&P)F.current.loadImage(P).catch((Z)=>console.log("Kawarp load error:",Z))},[P]),k.createElement("div",{id:"vapor-lyrics-app-container",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",zIndex:100}},[k.createElement("div",{className:"vapor-background",key:"bg"},[k.createElement("canvas",{key:"canvas",ref:u,style:{width:"100%",height:"100%",position:"absolute",top:0,left:0}})]),k.createElement("div",{className:"vapor-content",key:"content"},[k.createElement("header",{className:"vapor-header",key:"header"},[k.createElement("h1",{className:"vapor-title",key:"title"},"ＶＡＰＯＲ  ＬＹＲＩＣＳ")]),k.createElement("main",{className:"vapor-lyrics-container",key:"main"},[k.createElement("div",{className:"vapor-lyrics-scroll",key:"scroll",ref:j,style:{transform:`translate3d(0, ${f0}px, 0)`}},H?[k.createElement("p",{className:"vapor-lyric-line active",key:"l"},"Establishing aesthetic uplink...")]:_.length>0?_.map((Z,v)=>{let C=v<_.length-1?_[v+1].startTime-Z.startTime:3000,K="";if(v===X)K="active";else if(X!==-1&&v<X)K="played";let V=Z.syllables&&Z.syllables.length>0;return k.createElement("p",{className:`vapor-lyric-line ${K} ${V?"word-synced":""}`,key:v,style:{"--line-duration":`${C}ms`}},V?Z.syllables.map((Y,U)=>k.createElement("span",{className:"vapor-syllable",key:U,"data-time":Y.startTime},Y.word)):Z.words)}):[k.createElement("p",{className:"vapor-lyric-line",key:"i"},D==="Establishing signal..."?"Initializing signal...":D)])]),k.createElement("div",{className:"vapor-debug-status",key:"st",onClick:()=>r(!R)},[k.createElement("span",{key:"s"},D),k.createElement("span",{key:"h",style:{opacity:0.5,marginLeft:8}},"(Click for Debug)")]),R&&k.createElement("div",{className:"vapor-debug-overlay",key:"dbg",onClick:(Z)=>Z.stopPropagation()},[k.createElement("header",{key:"h"},[k.createElement("h2",{key:"t"},"Terminal Uplink"),k.createElement("button",{key:"b",onClick:()=>r(!1)},"✖")]),k.createElement("div",{className:"debug-list",key:"l"},_0.map((Z,v)=>k.createElement("div",{key:v,className:"debug-line"},Z)))])])])};(function k(){let{Playbar:b,Platform:x,ReactDOM:z,React:f,CosmosAsync:_}=Spicetify;if(!b||!x||!z||!f||!_){setTimeout(k,500);return}function q(){let X=document.querySelector(".main-view-container__scroll-node"),W=document.querySelector(".main-view-container__scroll-node-child")||document.querySelector("main");if(!W)return;if(X)X.style.overflow="hidden";let H=document.getElementById("vapor-lyrics-mount-root");if(!H)H=document.createElement("div"),H.id="vapor-lyrics-mount-root",W.innerHTML="",W.appendChild(H);z.render(f.createElement(H0),H)}if(x.History.listen(({pathname:X})=>{if(X.includes("vapor-lyrics"))setTimeout(q,100);else{let W=document.getElementById("vapor-lyrics-mount-root");if(W)W.remove();let H=document.querySelector(".main-view-container__scroll-node");if(H)H.style.overflow=""}}),x.History.location.pathname.includes("vapor-lyrics"))q();new b.Button("Vapor Lyrics",'<svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12 1h-1v11h1V1zM5 1H4v11h1V1zM15 4h-1v5h1V4zM2 4H1v5h1V4zM9 0H7v14h2V0z"></path></svg>',()=>{if(x.History.location.pathname.includes("vapor-lyrics"))x.History.goBack();else x.History.push("/vapor-lyrics")},!1,!1)})();
